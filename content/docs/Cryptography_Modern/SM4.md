---
title: SM4加密算法
type: docs
---

![SM4](../../../subway.jpg)
提到对称加密，你脑海中首先浮现的可能是 AES 或 DES。但在世界的另一端，中国有一套与之并驾齐驱，甚至在某些方面更具特色的算法——SM4。它不仅是我国商用密码体系的核心，更是自主创新精神的体现。如果说 AES 是密码世界的‘国际通用语’，那么 SM4 就是我们的‘母语’，它更懂中国的安全需求。让我们一起探索，这门‘母语’的语法与精妙之处

难度方便只能说和 DES 旗鼓相当，对比 AES 的复杂度还是很简单了，这个是使用 Feistel 结构的，AES 使用 SPN 结构，话不多说我们下面开始看这个算法的实现

> 我们实现的是最基本的 ECB 工作模式，对于加密算法的工作模式各位可以搜一下或者问问 AI

# 算法原理

我们在开始之前先定义一些东西

- key => 0123456789abcdeffedcba9876543210
- data => 0123456789abcdeffedcba9876543210

1. 算法自己定义的东西

- S 盒
- FK
- CK

这些后面代码我们给具体内容，这个都是算法规定里面的，不是我们自己推算的

2. 密钥处理
   1. 扁平化处理密钥,这个是代码实现，并不是算法的东西
   ```go
   var MK [4]uint32 // init uint32 key
   for i := 0; i < 4; i++ {
   	MK[i] = uint32(key[4*i])<<24 | uint32(key[4*i+1])<<16 | uint32(key[4*i+2])<<8 | uint32(key[4*i+3]) // make uint32 key
   }
   ```
   2. 系统参数`FK`会和主密钥进行异或
   ```go
   var K [36]uint32
   for i := 0; i < 4; i++ {
   	K[i] = MK[i] ^ FK[i] // make key ^ local key
   }
   ```
   3. 开始生成轮密钥，`CK`是算法定义的内容，我们生成算法定义出来的 32 轮密钥
   ```go
   var rk [32]uint32
   for i := 0; i < 32; i++ {
   	tmp := K[i+1] ^ K[i+2] ^ K[i+3] ^ CK[i] // k1 ^ k2 ^ k3 ^ ck0
   	K[i+4] = K[i] ^ Tprime(tmp) // k4 => k[0] ^
   	rk[i] = K[i+4] // rk[0] = k[4]
   }
   ```
   4. 最后把密钥给返回就行了
   ```go
   return rk
   ```
3. 明文处理
   1. 依旧是扁平化处理，为了我们后面更好计算和写代码
   ```go
   var X [36]uint32
   for i := 0; i < 4; i++ { // 组合明文
   	X[i] = uint32(plaintext[4*i])<<24 | uint32(plaintext[4*i+1])<<16 | uint32(plaintext[4*i+2])<<8 | uint32(plaintext[4*i+3])
   }
   ```
   2. 明文与轮密钥进行异或处理
   ```go
   for i := 0; i < 32; i++ { // 明文和rk进行异或处理并回填
   	tmp := X[i+1] ^ X[i+2] ^ X[i+3] ^ rk[i]
   	X[i+4] = X[i] ^ T(tmp) // 生成出来的数据和上面进行处理过的tmp经过t函数收进行异或处理
   }
   ```
   3. 根据返回数据规则进行写入返回值
   ```go
   // output is X[35], X[34], X[33], X[32]
   out := make([]byte, 16)
   bs := []uint32{X[35], X[34], X[33], X[32]} // 根据规则进行选取
   for i := 0; i < 4; i++ {
   	out[4*i] = byte(bs[i] >> 24)
   	out[4*i+1] = byte(bs[i] >> 16)
   	out[4*i+2] = byte(bs[i] >> 8)
   	out[4*i+3] = byte(bs[i])
   }
   ```
   这里循环是为了把大数转成 byte 类型，更好序列化 4. 最终返回数据
   ```go
   return out
   ```

## 完整代码

```go
import (
   "encoding/hex"
   "fmt"
)
var Sbox = [256]byte{
	0xd6, 0x90, 0xe9, 0xfe, 0xcc, 0xe1, 0x3d, 0xb7, 0x16, 0xb6, 0x14, 0xc2, 0x28, 0xfb, 0x2c, 0x05,
	0x2b, 0x67, 0x9a, 0x76, 0x2a, 0xbe, 0x04, 0xc3, 0xaa, 0x44, 0x13, 0x26, 0x49, 0x86, 0x06, 0x99,
	0x9c, 0x42, 0x50, 0xf4, 0x91, 0xef, 0x98, 0x7a, 0x33, 0x54, 0x0b, 0x43, 0xed, 0xcf, 0xac, 0x62,
	0xe4, 0xb3, 0x1c, 0xa9, 0xc9, 0x08, 0xe8, 0x95, 0x80, 0xdf, 0x94, 0xfa, 0x75, 0x8f, 0x3f, 0xa6,
	0x47, 0x07, 0xa7, 0xfc, 0xf3, 0x73, 0x17, 0xba, 0x83, 0x59, 0x3c, 0x19, 0xe6, 0x85, 0x4f, 0xa8,
	0x68, 0x6b, 0x81, 0xb2, 0x71, 0x64, 0xda, 0x8b, 0xf8, 0xeb, 0x0f, 0x4b, 0x70, 0x56, 0x9d, 0x35,
	0x1e, 0x24, 0x0e, 0x5e, 0x63, 0x58, 0xd1, 0xa2, 0x25, 0x22, 0x7c, 0x3b, 0x01, 0x21, 0x78, 0x87,
	0xd4, 0x00, 0x46, 0x57, 0x9f, 0xd3, 0x27, 0x52, 0x4c, 0x36, 0x02, 0xe7, 0xa0, 0xc4, 0xc8, 0x9e,
	0xea, 0xbf, 0x8a, 0xd2, 0x40, 0xc7, 0x38, 0xb5, 0xa3, 0xf7, 0xf2, 0xce, 0xf9, 0x61, 0x15, 0xa1,
	0xe0, 0xae, 0x5d, 0xa4, 0x9b, 0x34, 0x1a, 0x55, 0xad, 0x93, 0x32, 0x30, 0xf5, 0x8c, 0xb1, 0xe3,
	0x1d, 0xf6, 0xe2, 0x2e, 0x82, 0x66, 0xca, 0x60, 0xc0, 0x29, 0x23, 0xab, 0x0d, 0x53, 0x4e, 0x6f,
	0xd5, 0xdb, 0x37, 0x45, 0xde, 0xfd, 0x8e, 0x2f, 0x03, 0xff, 0x6a, 0x72, 0x6d, 0x6c, 0x5b, 0x51,
	0x8d, 0x1b, 0xaf, 0x92, 0xbb, 0xdd, 0xbc, 0x7f, 0x11, 0xd9, 0x5c, 0x41, 0x1f, 0x10, 0x5a, 0xd8,
	0x0a, 0xc1, 0x31, 0x88, 0xa5, 0xcd, 0x7b, 0xbd, 0x2d, 0x74, 0xd0, 0x12, 0xb8, 0xe5, 0xb4, 0xb0,
	0x89, 0x69, 0x97, 0x4a, 0x0c, 0x96, 0x77, 0x7e, 0x65, 0xb9, 0xf1, 0x09, 0xc5, 0x6e, 0xc6, 0x84,
	0x18, 0xf0, 0x7d, 0xec, 0x3a, 0xdc, 0x4d, 0x20, 0x79, 0xee, 0x5f, 0x3e, 0xd7, 0xcb, 0x39, 0x48,
}

var FK = [4]uint32{0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc}

var CK = [32]uint32{
	0x00070e15, 0x1c232a31, 0x383f464d, 0x545b6269,
	0x70777e85, 0x8c939aa1, 0xa8afb6bd, 0xc4cbd2d9,
	0xe0e7eef5, 0xfc030a11, 0x181f262d, 0x343b4249,
	0x50575e65, 0x6c737a81, 0x888f969d, 0xa4abb2b9,
	0xc0c7ced5, 0xdce3eaf1, 0xf8ff060d, 0x141b2229,
	0x30373e45, 0x4c535a61, 0x686f767d, 0x848b9299,
	0xa0a7aeb5, 0xbcc3cad1, 0xd8dfe6ed, 0xf4fb0209,
	0x10171e25, 0x2c333a41, 0x484f565d, 0x646b7279,
}

func rotl32(x uint32, n uint) uint32 { return (x << n) | (x >> (32 - n)) }

func tau(a uint32) uint32 {
	var b [4]byte
	b[0] = Sbox[byte(a>>24)] // 高八位
	b[1] = Sbox[byte(a>>16)] // 次高八位
	b[2] = Sbox[byte(a>>8)] // 次低八位
	b[3] = Sbox[byte(a)] // 低八位
	return uint32(b[0])<<24 | uint32(b[1])<<16 | uint32(b[2])<<8 | uint32(b[3]) // 合并还原32位并返回
}

// L linear transform for encryption rounds
func L(b uint32) uint32 {
	return b ^ rotl32(b, 2) ^ rotl32(b, 10) ^ rotl32(b, 18) ^ rotl32(b, 24)
}

// L' used in key schedule (T' transform)
func Lprime(b uint32) uint32 {
	return b ^ rotl32(b, 13) ^ rotl32(b, 23) // b ^ b循环左移13位 ^ 循环左移23位
}

// T = L(τ(...))
func T(x uint32) uint32 { return L(tau(x)) }

// T' = L'(τ(...))
func Tprime(x uint32) uint32 { return Lprime(tau(x)) }

// Expand 128-bit key (16 bytes) into 32 round keys (rk)
func keySchedule(key []byte) [32]uint32 {
	if len(key) != 16 {
		panic("key must be 16 bytes")
	}
	var MK [4]uint32 // init uint32 key
	for i := 0; i < 4; i++ {
		MK[i] = uint32(key[4*i])<<24 | uint32(key[4*i+1])<<16 | uint32(key[4*i+2])<<8 | uint32(key[4*i+3]) // make uint32 key
	}
	var K [36]uint32
	for i := 0; i < 4; i++ {
		K[i] = MK[i] ^ FK[i] // make key ^ local key
	}
	var rk [32]uint32
	for i := 0; i < 32; i++ {
		tmp := K[i+1] ^ K[i+2] ^ K[i+3] ^ CK[i] // k1 ^ k2 ^ k3 ^ ck0
		K[i+4] = K[i] ^ Tprime(tmp) // k4 => k[0] ^
		rk[i] = K[i+4] // rk[0] = k[4]
	}
	return rk
}

func encryptBlock(plaintext []byte, rk [32]uint32) []byte {
	if len(plaintext) != 16 {
		panic("plaintext must be 16 bytes")
	}
	var X [36]uint32
	for i := 0; i < 4; i++ { // 组合明文
		X[i] = uint32(plaintext[4*i])<<24 | uint32(plaintext[4*i+1])<<16 | uint32(plaintext[4*i+2])<<8 | uint32(plaintext[4*i+3])
	}
	for i := 0; i < 32; i++ { // 明文和rk进行异或处理并回填
		tmp := X[i+1] ^ X[i+2] ^ X[i+3] ^ rk[i]
		X[i+4] = X[i] ^ T(tmp) // 生成出来的数据和上面进行处理过的tmp经过t函数收进行异或处理
	}
	// output is X[35], X[34], X[33], X[32]
	out := make([]byte, 16)
	bs := []uint32{X[35], X[34], X[33], X[32]} // 根据规则进行选取
	for i := 0; i < 4; i++ {
		out[4*i] = byte(bs[i] >> 24)
		out[4*i+1] = byte(bs[i] >> 16)
		out[4*i+2] = byte(bs[i] >> 8)
		out[4*i+3] = byte(bs[i])
	}
	// uint32数到字节序列化
	return out
}

func decryptBlock(ciphertext []byte, rk [32]uint32) []byte {
	if len(ciphertext) != 16 {
		panic("ciphertext must be 16 bytes")
	}
	// For decryption, use rk in reverse order
	var rkInv [32]uint32
	for i := 0; i < 32; i++ {
		rkInv[i] = rk[31-i]
	}
	return encryptBlock(ciphertext, rkInv)
}

func main() {
	keyHex := "0123456789abcdeffedcba9876543210"
	ptHex := "0123456789abcdeffedcba9876543210"
	expectedCtHex := "681edf34d206965e86b3e94f536e4246"

	key, _ := hex.DecodeString(keyHex)
	pt, _ := hex.DecodeString(ptHex)
	// expectedCt, _ := hex.DecodeString(expectedCtHex)

	rk := keySchedule(key)
	ct := encryptBlock(pt, rk)
	dt := decryptBlock(ct, rk)

	fmt.Printf("Key: %s\n", keyHex)
	fmt.Printf("Plain: %s\n", ptHex)
	fmt.Printf("Expected CT: %s\n", expectedCtHex)
	fmt.Printf("Got CT: %s\n", hex.EncodeToString(ct))
	fmt.Printf("Decrypted: %s\n", hex.EncodeToString(dt))

	if hex.EncodeToString(ct) == expectedCtHex {
		fmt.Println("SM4 encrypt test: OK")
	} else {
		fmt.Println("SM4 encrypt test: FAIL")
	}
}
```
