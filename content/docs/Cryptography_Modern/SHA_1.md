---
title: SHA-1摘要算法
type: docs
---

![sha_1_bg](../../../sha_1_bg.png)
SHA-1 是一种曾经被广泛使用的密码散列函数，它能把任意长度的输入数据（比如一段文字、一个文件）转换成一个固定长度（160位，即40个十六进制字符） 的唯一“指纹”，这个指纹就叫做“摘要”或“哈希值”</br>

与加密算法相比，哈希算法通常更简单，但它同样遵循严格的数学规则</br>
SHA-1 具有以下几个核心特性：
- 固定输出：无论输入多大，输出永远是160位(40个十六进制数)
- 确定性：相同的输入永远产生相同的输出
- 雪崩效应：输入的微小改变,都会导致输出的哈希值发生巨大的,无法预测的变化 
- 单向性：从哈希值几乎不可能反向推导出原始输入数据。这是一个非常重要的安全特性

那么这个算法在我刚刚学的时候感觉非常脆弱，没有任何用处，只是一个数值而已,现在依然有使用sha1进行校验的网站,但是sha1不再完全安全
并在 2017 年通过“SHA-1 碰撞攻击”在现实中证实可以通过巨量数据来进行强算， 虽然这种攻击成本极高，但现实安全系统不能依赖“攻击代价高”来保证安全。于是，SHA-1 已逐渐被 SHA-2、SHA-3 等更强的算法所取代。
# 算法原理
在hash算法系列里面涉及巨量的大数运算和循环迭代，已经不是人力可以一步一步进行推敲的，所以我们会讲流程，然后写代码，不在手动推敲</br>
sha1的主要思想是:
> 将输入分块 → 填充 → 扩展消息 → 多轮迭代压缩 → 合并结果。
## 基本概念
SHA-1 将输入消息处理成 512 位的分组，然后对每个分组进行一系列复杂的数学运算，最终生成 160 位的哈希值
### 第一步:消息填充
无论原始消息长度是多少，我们需要把它填充成512的倍数，最低可以填充1倍就是512本身</br>
填充规则:
- 先在消息末尾添加一个 1 bit
- 然后添加若干个 0 bit
- 最后 64 位用来表示原始消息的长度（以 bit 为单位）
比如我们输入`duck`</br>
- 原始消息长度为`4 * 8 = 24`
- 填充数据为`512 - 1 - 24`
### 第二步:初始化hash值
sha-1使用5个初始hash值
```text
h0 = 0x67452301
h1 = 0xEFCDAB89
h2 = 0x98BADCFE
h3 = 0x10325476
h4 = 0xC3D2E1F0
```
这些是固定的魔术数字，提供了算法的初始状态。
### 第三步:处理分组消息
1. 创建消息调度表
> 将512位拆分成16个32位的字 -> w[0] => [15] </br>
> 然后拓展为80个字，算上前面的16个字，总体数据是80个字</br>
> W[t] = LEFT_ROTATE(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1)</br>
> 选择4个之前的字:</br>
>> W[t-3]：3步前的字</br>
>> W[t-8]：8步前的字</br>
>> W[t-14]：14步前的字</br>
>> W[t-16]：16步前的字</br>
>> 然后进行异或运算`temp = W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16]` </br>
>> 也就是取前面第 3、8、14、16 个字异或后左循环移 1 位。
>> 最后再循环左移1位
2. 主循环:80轮运算
首先我们把上面的初始hash值先赋值到这里</br>
然后就是轮函数了，这个是有明确定义的
- 第 0-19 轮
> f(t, b, c, d) = (b & c) | ((~b) & d)</br>
> K(t) = 0x5A827999</br>
- 第 20-39 轮  </br>
> f(t, b, c, d) = b ^ c ^ d</br>
> K(t) = 0x6ED9EBA1</br>
- 第 40-59 轮
> f(t, b, c, d) = (b & c) | (b & d) | (c & d)</br>
> K(t) = 0x8F1BBCDC</br>

- 第 60-79 轮
> f(t, b, c, d) = b ^ c ^ d</br>
> K(t) = 0xCA62C1D6</br>

```py
for t in range(0, 80):
    temp = LEFT_ROTATE(a, 5) + f(t, b, c, d) + e + K(t) + W[t]
    e = d
    d = c
    c = LEFT_ROTATE(b, 30)
    b = a
    a = temp
```
py的伪代码差不多就是这样的,后面我们实际写代码时候再去详细说明

处理完一个512分组后，更新最终的哈希值：
```text
h0 = (h0 + a) & 0xFFFFFFFF
h1 = (h1 + b) & 0xFFFFFFFF  
h2 = (h2 + c) & 0xFFFFFFFF
h3 = (h3 + d) & 0xFFFFFFFF
h4 = (h4 + e) & 0xFFFFFFFF
```

### 第四步:生成最终结果
最终哈希 = h0 || h1 || h2 || h3 || h4</br>
这样就得到了 160 位（5 × 32 位）的 SHA-1 哈希值，通常表示为 40 个十六进制字符

## 总结
SHA-1 的核心思想是 “迭代压缩”：通过多轮逻辑运算和位移操作，把任意长度的输入“压缩”成一个固定长度的摘要</br>
尽管它在现代安全场景中已被淘汰，但作为学习密码学的第一步，SHA-1 能让你深入理解哈希算法的底层机制，也为后续学习 SHA-256、SHA-3 等算法奠定坚实基础。

# 代码
``` go
package main

import (
	"encoding/binary"
	"fmt"
)

// SHA1 结构体
type SHA1 struct {
	h [5]uint32
}

// 初始化SHA1常量
func NewSHA1() *SHA1 {
	return &SHA1{
		h: [5]uint32{
			0x67452301,
			0xEFCDAB89,
			0x98BADCFE,
			0x10325476,
			0xC3D2E1F0,
		},
	}
}

// 填充消息
func padMessage(message []byte) []byte {
	originalLength := len(message)
	originalBitLength := uint64(originalLength * 8)

	// 添加1比特（0x80字节）
	padded := append(message, 0x80)

	// 填充0直到长度满足 (长度 % 64 == 56)
	for len(padded)%64 != 56 {
		padded = append(padded, 0x00)
	}

	// 添加原始消息长度的64位表示（大端序）
	lengthBytes := make([]byte, 8)
	binary.BigEndian.PutUint64(lengthBytes, originalBitLength)
	padded = append(padded, lengthBytes...)

	return padded
}

// 循环左移
func leftRotate(n uint32, shift uint) uint32 {
	return (n << shift) | (n >> (32 - shift))
}

// 主要的SHA1处理函数
func (s *SHA1) Process(chunk []byte) {
	if len(chunk) != 64 {
		panic("chunk size must be 64 bytes")
	}

	// 将512位块分成16个32位字
	var w [80]uint32
	for i := 0; i < 16; i++ {
		w[i] = binary.BigEndian.Uint32(chunk[i*4 : (i+1)*4])
	}

	// 扩展16个字到80个字
	for i := 16; i < 80; i++ {
		w[i] = leftRotate(w[i-3]^w[i-8]^w[i-14]^w[i-16], 1)
	}

	// 初始化工作变量
	a, b, c, d, e := s.h[0], s.h[1], s.h[2], s.h[3], s.h[4]

	// 主循环
	for i := 0; i < 80; i++ {
		var f, k uint32

		switch {
		case i < 20:
			f = (b & c) | (^b & d)
			k = 0x5A827999
		case i < 40:
			f = b ^ c ^ d
			k = 0x6ED9EBA1
		case i < 60:
			f = (b & c) | (b & d) | (c & d)
			k = 0x8F1BBCDC
		default:
			f = b ^ c ^ d
			k = 0xCA62C1D6
		}

		temp := leftRotate(a, 5) + f + e + k + w[i]
		e = d
		d = c
		c = leftRotate(b, 30)
		b = a
		a = temp
	}

	// 添加到当前哈希值
	s.h[0] += a
	s.h[1] += b
	s.h[2] += c
	s.h[3] += d
	s.h[4] += e
}

// 计算SHA1哈希
func (s *SHA1) Sum(message []byte) [20]byte {
	// 重置初始哈希值
	s.h = [5]uint32{
		0x67452301,
		0xEFCDAB89,
		0x98BADCFE,
		0x10325476,
		0xC3D2E1F0,
	}

	// 填充消息
	padded := padMessage(message)

	// 处理每个512位块
	for i := 0; i < len(padded); i += 64 {
		s.Process(padded[i : i+64])
	}

	// 将哈希值转换为字节数组
	var result [20]byte
	for i, h := range s.h {
		binary.BigEndian.PutUint32(result[i*4:(i+1)*4], h)
	}

	return result
}

// 将字节数组转换为十六进制字符串
func bytesToHex(b [20]byte) string {
	const hexChars = "0123456789abcdef"
	var result [40]byte
	for i, v := range b {
		result[i*2] = hexChars[v>>4]
		result[i*2+1] = hexChars[v&0x0F]
	}
	return string(result[:])
}
```
这个过于仓促了，我直接抄了份代码，hash记住轮数，初始hash值，填充区块大小，初始区块大小也就差不多了
