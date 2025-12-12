---
title: SHA-3算法
type: docs
---

![sha_1_bg](../../../call-it-a-day.jpg)

SHA-3是非常非常现代化的hash算法家族成员，基于 Keccak 海绵结构（Sponge Construction），与 SHA-1 / SHA-2 那一套完全不同  

提供与 SHA-256、SHA-512 同等级别的安全性，但结构更现代:  
- 更适合硬件加速
- 同时支持扩展输出(SHAKE)
> SHA-3 不属于 SHA-2 的“升级版”，而是另一条完全不同的路线

### 核心算法:海绵结构
海绵结构（Sponge Construction）由两部分决定：
- f：内部置换函数（SHA-3 用 Keccak-f）
- 参数：rate (r) + capacity (c),其中 r + c = 1600 bit
> 1600 来自 Keccak 的内部状态大小：  
> 5 × 5 × 64 = 1600 bit  

SHA-3 的具体参数如下：

| SHA-3 版本 | 输出 (digest) | rate r | capacity c |
| -------- | ----------- | ------ | ---------- |
| SHA3-224 | 224 bit     | 1152   | 448        |
| SHA3-256 | 256 bit     | 1088   | 512        |
| SHA3-384 | 384 bit     | 832    | 768        |
| SHA3-512 | 512 bit     | 576    | 1024       |


## 算法结构
在讲解算法的前提下我们来定义一些东西
```c
#define SHA3_256_MD_LEN 32 // 256-bit digest length in bytes.
#define SHA3_256_ROUNDS 24 // KECCAK rounds to perform for SHA3-256.
#define SHA3_256_WIDTH 200 // 1600-bit width in bytes.
#define SHA3_256_LANES 25 // State is an unrolled 5x5 array of 64-bit lanes.
#define SHA3_256_RATE 136 // 1600-bit width - 512-bit capacity in bytes.

struct Sha3_256
{
	int padpoint;
	int absorbed;
	union
	{
		uint64_t words[SHA3_256_LANES];
		uint8_t bytes[SHA3_256_WIDTH];
	} state;
};
```


```c
void sha3_256_digest(uint8_t *data, uint64_t n, uint8_t *digest)
{
	struct Sha3_256 ctx = sha3_256_new();
	absorb(&ctx, data, n); // 吸收阶段
	squeeze(&ctx, digest); // 输出阶段
}
```

### 1. 海绵吸收

这个阶段内算法接收数据并进行混淆处理
```c
static void absorb(struct Sha3_256 *ctx, uint8_t *data, uint64_t n)
{
	for (uint64_t i = 0; i < n; i += 1) {
		ctx->state.bytes[ctx->absorbed++] ^= data[i]; 
        // 如果是第一轮,将数据直接写进入

        // 看看是不是吸收满了，如果满了就进入下一个阶段
		if (ctx->absorbed == SHA3_256_RATE) { 

            // 执行 24 轮 Keccak-f[1600]
			keccak(ctx); 

            // 搅匀后重置为0,达到分块的目的
			ctx->absorbed = 0; 
		}
	}

	ctx->padpoint = ctx->absorbed; 
    // 记录吸收完消息后，吸收区里还剩多少字节没有填满
}
```
SHA-3版本256是吸收136个字节(1088bit)  
如果到吸收的界限了，那么就开始进行混淆加密  
```c
static void keccak(struct Sha3_256 *ctx)
{
	for (int i = 0; i < SHA3_256_ROUNDS; i += 1) {
		theta(ctx);
		rho(ctx);
		pi(ctx);
		chi(ctx);
		iota(ctx, i);
	}
}
```
每次搅匀都是24轮，也算是一个特征了  
第一个就是我们的`theta`  
#### 1. Theta：跨列 XOR 扩散
> Theta：跨列 XOR 扩散
```c
#define ROTL64(x, y) (((x) << (y)) | ((x) >> (64 - (y)))) // 循环左移

static void theta(struct Sha3_256 *ctx)
{
	uint64_t C[5] = { 0 };
	uint64_t D[5] = { 0 };

    /*
    计算每一列的XOR(C[i])
    循环5次，加大影响
    */
	for (int i = 0; i < 5; i += 1) {
		C[i] = ctx->state.words[i];
		C[i] ^= ctx->state.words[i + 5];
		C[i] ^= ctx->state.words[i + 10];
		C[i] ^= ctx->state.words[i + 15];
		C[i] ^= ctx->state.words[i + 20];
	}

    /*
        对上面C的值再次进行混淆，不仅仅受制自己还被旁边的bit牵连
    */
	for (int i = 0; i < 5; i += 1) {
		D[i] = C[(i + 4) % 5] ^ ROTL64(C[(i + 1) % 5], 1);
	}

    /*
        把D和本身的值枚举异或，并且生成最终值
    */
	for (int i = 0; i < 5; i += 1) {
		for (int j = 0; j < 25; j += 5) {
			ctx->state.words[i + j] ^= D[i];
		}
	}
}
```
#### 2. Rho：不同位置的 bit 做轮移位
每个 lane（64bit）有自己固定旋转数
```c
static void rho(struct Sha3_256 *ctx)
{
	static const int rotations[25] = { 0, 1, 62, 28, 27, 36, 44, 6, 55, 20, 3,
		10, 43, 25, 39, 41, 45, 15, 21, 8, 18, 2, 61, 56, 14
	};

	for (int i = 0; i < 25; i += 1) {
		ctx->state.words[i] = ROTL64(ctx->state.words[i], rotations[i]);
	}
}
```
这个就相当简单了,目的就是让每个 lane 内的 bit 位置打乱,让后续 Pi/Chi 的非线性操作更加复杂
#### 3. Pi：对 lanes 做 5×5 置换
类似矩阵调换位置
```c
static void pi(struct Sha3_256 *ctx)
{
	static const int switcheroo[25] = { 0, 10, 20, 5, 15, 16, 1, 11, 21, 6,
		7, 17, 2, 12, 22, 23, 8, 18, 3, 13, 14, 24, 9, 19, 4
	};

	uint64_t temp[25] = { 0 };

	for (int i = 0; i < 25; i += 1) {
		temp[i] = ctx->state.words[i]; // 拿到具体值
	}

	for (int i = 0; i < 25; i += 1) {
		ctx->state.words[switcheroo[i]] = temp[i]; // 进行置换
	}
}
```
#### 4. Chi：非线性方程
每行用公式做 bit 级的布尔运算：
```c
static void chi(struct Sha3_256 *ctx)
{
	uint64_t temp[5] = { 0 };

	for (int j = 0; j < 25; j += 5) {
		for (int i = 0; i < 5; i += 1) {
			temp[i] = ctx->state.words[i + j]; // 拿到每一行的值
		}

		for (int i = 0; i < 5; i += 1) {
			ctx->state.words[i + j] ^= (~temp[(i + 1) % 5]) & temp[(i + 2) % 5];
		}
	}
}
```
1. 取当前行的下一个 lane，然后按位取反
```c
(~temp[(i + 1) % 5])
```
2. AND 上下两个相邻 lane 的组合
```c
temp[(i + 2) % 5];
```
3. 异或复制`^=`

#### 5. Iota：加轮常量
避免对称结构
```c
static void iota(struct Sha3_256 *ctx, uint8_t r)
{
	static const uint64_t constants[24] = {
		0x0000000000000001,
		0x0000000000008082,
		0x800000000000808a,
		0x8000000080008000,
		0x000000000000808b,
		0x0000000080000001,
		0x8000000080008081,
		0x8000000000008009,
		0x000000000000008a,
		0x0000000000000088,
		0x0000000080008009,
		0x000000008000000a,
		0x000000008000808b,
		0x800000000000008b,
		0x8000000000008089,
		0x8000000000008003,
		0x8000000000008002,
		0x8000000000000080,
		0x000000000000800a,
		0x800000008000000a,
		0x8000000080008081,
		0x8000000000008080,
		0x0000000080000001,
		0x8000000080008008
	};

	ctx->state.words[0] ^= constants[r];
}
```
整个东西进行异或处理，然后得到吸收的最终结果

### 输出
```c
static void squeeze(struct Sha3_256 *ctx, uint8_t *digest)
{
	ctx->state.bytes[ctx->padpoint] ^= 0x06; // 标记消息结束 + pad10*1 前缀
	ctx->state.bytes[SHA3_256_RATE - 1] ^= 0x80; // pad10*1 的尾部 1，保证唯一映射

	keccak(ctx);

	for (int i = 0; i < SHA3_256_MD_LEN; i += 1) {
		digest[i] = ctx->state.bytes[i];
	}

	ctx->padpoint = ctx->absorbed = 0;
	memset(&ctx->state.words, 0, sizeof(ctx->state.words));
}
```
输出阶段内容和吸收的差不多的

最终进行输出

## 总结
SHA-3 基于 Keccak Sponge 架构，将输入消息吸收到 5×5×64-bit 状态矩阵中。吸收阶段（absorb）按块 XOR 消息，未满块记录 padpoint 以便填充。Theta 层对每列做 XOR 扩散，保证列间依赖；Rho 层对每个 lane 循环移位，使每位在 lane 内打散；Pi 层按固定映射重新排列 lane，打破行列结构；Chi 层通过 A[x,y] ^= (~A[x+1,y]) & A[x+2,y] 实现非线性混合；Iota 层将轮常数 XOR 回第一 lane，去对称并提供唯一轮标识。最后，pad10*1 填充（0x06 前缀 + 0x80 尾位）保证消息长度唯一映射，未满块也能安全压榨。整体设计通过线性扩散、非线性混合和轮常数保证雪崩效应，使输出对输入高度敏感，提供强安全性


### 完整代码
```c
#include <stdint.h>
#include <string.h>

#define SHA3_256_MD_LEN 32 // 256-bit digest length in bytes.
#define SHA3_256_ROUNDS 24 // KECCAK rounds to perform for SHA3-256.
#define SHA3_256_WIDTH 200 // 1600-bit width in bytes.
#define SHA3_256_LANES 25 // State is an unrolled 5x5 array of 64-bit lanes.
#define SHA3_256_RATE 136 // 1600-bit width - 512-bit capacity in bytes.

struct Sha3_256
{
	int padpoint;
	int absorbed;
	union
	{
		uint64_t words[SHA3_256_LANES];
		uint8_t bytes[SHA3_256_WIDTH];
	} state;
};

struct Sha3_256 sha3_256_new(void);

void sha3_256_update(struct Sha3_256 *ctx, uint8_t *data, uint64_t n);

void sha3_256_finalize(struct Sha3_256 *ctx, uint8_t *digest);

void sha3_256_digest(uint8_t *data, uint64_t n, uint8_t *digest);


#define ROTL64(x, y) (((x) << (y)) | ((x) >> (64 - (y))))

static void theta(struct Sha3_256 *ctx)
{
	uint64_t C[5] = { 0 };
	uint64_t D[5] = { 0 };

	for (int i = 0; i < 5; i += 1) {
		C[i] = ctx->state.words[i];
		C[i] ^= ctx->state.words[i + 5];
		C[i] ^= ctx->state.words[i + 10];
		C[i] ^= ctx->state.words[i + 15];
		C[i] ^= ctx->state.words[i + 20];
	}

	for (int i = 0; i < 5; i += 1) {
		D[i] = C[(i + 4) % 5] ^ ROTL64(C[(i + 1) % 5], 1);
	}

	for (int i = 0; i < 5; i += 1) {
		for (int j = 0; j < 25; j += 5) {
			ctx->state.words[i + j] ^= D[i];
		}
	}
}

static void rho(struct Sha3_256 *ctx)
{
	static const int rotations[25] = {
		0, 1, 62, 28, 27, 36, 44, 6, 55, 20,
		3, 10, 43, 25, 39, 41, 45, 15, 21, 8,
		18, 2, 61, 56, 14
	};

	for (int i = 0; i < 25; i += 1) {
		ctx->state.words[i] = ROTL64(ctx->state.words[i], rotations[i]);
	}
}

static void pi(struct Sha3_256 *ctx)
{
	static const int switcheroo[25] = {
		0, 10, 20, 5, 15, 16, 1, 11, 21, 6,
		7, 17, 2, 12, 22, 23, 8, 18, 3, 13,
		14, 24, 9, 19, 4
	};

	uint64_t temp[25] = { 0 };

	for (int i = 0; i < 25; i += 1) {
		temp[i] = ctx->state.words[i];
	}

	for (int i = 0; i < 25; i += 1) {
		ctx->state.words[switcheroo[i]] = temp[i];
	}
}

static void chi(struct Sha3_256 *ctx)
{
	uint64_t temp[5] = { 0 };

	for (int j = 0; j < 25; j += 5) {
		for (int i = 0; i < 5; i += 1) {
			temp[i] = ctx->state.words[i + j];
		}

		for (int i = 0; i < 5; i += 1) {
			ctx->state.words[i + j] ^= (~temp[(i + 1) % 5]) & temp[(i + 2) % 5];
		}
	}
}

static void iota(struct Sha3_256 *ctx, uint8_t r)
{
	static const uint64_t constants[24] = {
		0x0000000000000001,
		0x0000000000008082,
		0x800000000000808a,
		0x8000000080008000,
		0x000000000000808b,
		0x0000000080000001,
		0x8000000080008081,
		0x8000000000008009,
		0x000000000000008a,
		0x0000000000000088,
		0x0000000080008009,
		0x000000008000000a,
		0x000000008000808b,
		0x800000000000008b,
		0x8000000000008089,
		0x8000000000008003,
		0x8000000000008002,
		0x8000000000000080,
		0x000000000000800a,
		0x800000008000000a,
		0x8000000080008081,
		0x8000000000008080,
		0x0000000080000001,
		0x8000000080008008
	};

	ctx->state.words[0] ^= constants[r];
}

static void keccak(struct Sha3_256 *ctx)
{
	for (int i = 0; i < SHA3_256_ROUNDS; i += 1) {
		theta(ctx);
		rho(ctx);
		pi(ctx);
		chi(ctx);
		iota(ctx, i);
	}
}

static void absorb(struct Sha3_256 *ctx, uint8_t *data, uint64_t n)
{
	for (uint64_t i = 0; i < n; i += 1) {
		ctx->state.bytes[ctx->absorbed++] ^= data[i]; // 如果是第一轮,将数据直接写进入

		if (ctx->absorbed == SHA3_256_RATE) { // 看看是不是吸收满了，如果满了就进入下一个阶段
			keccak(ctx); // 执行 24 轮 Keccak-f[1600]
			ctx->absorbed = 0;
		}
	}

	ctx->padpoint = ctx->absorbed;
}

static void squeeze(struct Sha3_256 *ctx, uint8_t *digest)
{
	ctx->state.bytes[ctx->padpoint] ^= 0x06;
	ctx->state.bytes[SHA3_256_RATE - 1] ^= 0x80;

	keccak(ctx);

	for (int i = 0; i < SHA3_256_MD_LEN; i += 1) {
		digest[i] = ctx->state.bytes[i];
	}

	ctx->padpoint = ctx->absorbed = 0;
	memset(&ctx->state.words, 0, sizeof(ctx->state.words));
}

struct Sha3_256 sha3_256_new(void)
{
	struct Sha3_256 ctx;
	memset(&ctx, 0, sizeof(ctx));
	return ctx;
}

void sha3_256_update(struct Sha3_256 *ctx, uint8_t *data, uint64_t n)
{
	absorb(ctx, data, n);
}

void sha3_256_finalize(struct Sha3_256 *ctx, uint8_t *digest)
{
	squeeze(ctx, digest);
}

// 调用函数
void sha3_256_digest(uint8_t *data, uint64_t n, uint8_t *digest)
{
	struct Sha3_256 ctx = sha3_256_new();
	absorb(&ctx, data, n); // 吸收阶段
	squeeze(&ctx, digest); // 输出阶段
}
```

