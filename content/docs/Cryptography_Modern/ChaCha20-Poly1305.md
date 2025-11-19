---
title: ChaCha20-Poly1305加密
type: docs
---
![bg](../../../soft-rose.jpg)

这个和上一篇基本的ChaCha20加密算法是相关的，这个加密算法更像是一种加密+认证
1. ChaCha20 -> 对称加密(流加密器)
2. Poly1305 -> MAC(认证)   

我们主要来讲MAC认证的算法，加密算法各位可以看上一篇

# 算法原理
Poly1305属于一种MAC算法，这个和hash不一样，hash是谁都可以算，只能看数据是不是被篡改了，不能看是谁发的   
hash是一种指纹，MAC像带密钥的指纹，不知道key就没办法伪造正确的MAC   
它需要一个 256-bit key:我们这里的算法中，key是从ChaCha20 派生出来的     
`poly1305_key = ChaCha20(key, nonce, block_counter=0) 前 256 bit`    
接下来我们进入算法主要部分

1. key的处理
```text
r (16字节，低 130 bit 有效)
s (16字节)
```
我们把整个key分成两部分，r和s    
r是需要被剪裁处理的，RFC规定了这一部分，我们只需要使用代码来进行实现即可
```text
r[3], r[7], r[11], r[15]  & 0x0f
r[4], r[8], r[12]        & 0xfc
```
> r 的低 130 bit 才能用,某些 bit 会被强制清零,防止攻击(保证 r 的大小限制)
- 为什么？
    
    - 经过裁剪后,r 满足:   
        - rmod4=0（通过清零低 2 位实现）
        - r < 2^124(通过每 4 字节清零高 4 位实现)
    - 安全意义
        - 防止数值溢出：确保在模运算中不会出现意外行为
        - 标准化输入：无论原始密钥是什么，裁剪后的 r 都满足算法要求的数学属性

2. 接下来就是算法主要的计算逻辑了
```text
acc = 0
for each 16-byte block m_i:
    n = m_i || 0x01
    acc = (acc + n) * r mod (2^130 - 5)

tag = acc + s  (mod 2^128)
```
可以和代码配合起来看，我们现在到了 `acc := big.NewInt(0)`   

下一步我们声明了主要计算逻辑:    

- 按照每16byte进行分块
    - 把每一块16byte都拓展一位，成为17byte
    - 最终大数加上每一块字节数组组成的大数乘`r`值然后对`2^130 - 5`进行取模
        - 进行循环
    - 最后让大数加上另一半的s密钥去对`2^128`取模

然后真实步骤各位看代码实现吧，我感觉这个算法讲起来有点抽象，也可能是今天不在状态

# 代码
Poly1305的代码是这样的
```go
var (
	modP  *big.Int 
	two128 *big.Int
)

func init() {
	modP = new(big.Int).Lsh(big.NewInt(1), 130)
	modP.Sub(modP, big.NewInt(5))
	two128 = new(big.Int).Lsh(big.NewInt(1), 128)
}

func clampR(r []byte) []byte {
	if len(r) != 16 {
		panic("r must be 16 bytes")
	}
	out := make([]byte, 16)
	copy(out, r)
	out[3] &= 15
	out[7] &= 15
	out[11] &= 15
	out[15] &= 15
	out[4] &= 252
	out[8] &= 252
	out[12] &= 252
	return out
}

// 小端序字节数组转换为大整数
func leToBig(b []byte) *big.Int {
	// big.Int expects big-endian, so reverse
	be := make([]byte, len(b))
	for i := 0; i < len(b); i++ {
		be[i] = b[len(b)-1-i]
	}
	return new(big.Int).SetBytes(be)
}

// 大整数转化为小端序byte数组
func bigToLe(x *big.Int, sz int) []byte {
	be := x.Bytes() // big-endian, may be shorter
	le := make([]byte, sz)
	// copy from end
	for i := 0; i < len(be) && i < sz; i++ {
		le[i] = be[len(be)-1-i]
	}
	return le
}
func Poly1305Tag(key [32]byte, aad, ciphertext []byte) [16]byte {
    var tag [16]byte

    // split key
    r := clampR(key[0:16]) // 处理r密钥
    s := key[16:32]

    rInt := leToBig(r) // 转化成大数
    sInt := leToBig(s)

    acc := big.NewInt(0) // 最终结果大数

    // 处理AAD
    processBlock := func(block []byte, isFinal bool) {
        buf := make([]byte, 17)
        copy(buf, block)
        if !isFinal || len(block) == 16 {
            buf[16] = 1
        } else {
            buf[len(block)] = 1
        }
        n := leToBig(buf)
        acc.Add(acc, n)
        acc.Mul(acc, rInt)
        acc.Mod(acc, modP)
    }

    // 处理AAD
    for i := 0; i < len(aad); i += 16 {
        end := i + 16
        if end > len(aad) {
            end = len(aad)
        }
        processBlock(aad[i:end], end == len(aad))
    }

    // 处理密文
    for i := 0; i < len(ciphertext); i += 16 {
        end := i + 16
        if end > len(ciphertext) {
            end = len(ciphertext)
        }
        processBlock(ciphertext[i:end], end == len(ciphertext))
    }

    /*
        处理长度块

        这一段是对加密数据的特征进行再次加密，为了防止攻击者对长度进行枚举爆破，所以完整的MAC算法是
        内容MAC+特征(AAD长度/明文长度)MAC
    */
    lenBlock := make([]byte, 16)
    binary.LittleEndian.PutUint64(lenBlock[0:8], uint64(len(aad)))
    binary.LittleEndian.PutUint64(lenBlock[8:16], uint64(len(ciphertext)))
    processBlock(lenBlock, true)

    // 最终计算
    acc128 := new(big.Int).Mod(acc, two128)
    sum := new(big.Int).Add(acc128, sInt)
    sum.Mod(sum, two128)

    le := bigToLe(sum, 16)
    copy(tag[:], le)
    return tag
}
```
