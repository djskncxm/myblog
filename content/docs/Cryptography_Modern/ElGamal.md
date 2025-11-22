---
title: ElGamal加密算法
type: docs
---

![des](../../../city-on-water.jpg)
这个是一个加密+签名的算法，和上一篇的HD很类似，还是比较相似的，下面就开始看这个加密的逻辑吧

# 算法逻辑

## 加密
DH在这里的作用是拿一个一组密钥(私钥和公钥)进行加密，然后对方去做解密操作
- p => 大质数
- g => 底数
- x => 私钥
- h = g^x mod p 公钥
- m => 加密消息

1. 选取临时密钥`y`
2. 生成两部分密文
    1. c1 = g^y mod p
    2. 计算公共密钥
    ```text
    k = h^y mod p
    ```
    然后使用k把m加密
    ```text
    c2 = m * k mod p
    ```
3. 得到`c1`和`c2`
## 签名

> [!NOTE]
> ElGamal 签名的核心：用一次性随机数 k，把私钥 x 隐藏在两个值 (r, s) 里

- p => 大质数
- g => 底数
- x => 私钥
- h = g^x mod p 公钥

在这里我们还是会有这些东西

1. 加入我们要签名`m`
2. 选取一个随机数，随机数需要满足一些条件
    ```text
    1 < k < p-1
    gcd(k, p-1) = 1  // 必须互质
    ```
    这个 k = “一次性密钥（nonce）”
3. 计算`r`
    ```text
    r = g^k mod p
    ```
4. 计算`s`
    ```text
    s = (m - x*r) * k^{-1} mod (p-1)
    ```
    - m => 消息
    - x => 私钥
    - r => 第一步结果
    - k_{-1} => 随机数的模逆

5. 返回(r,s)    

# 简易代码实现

## 加密
```go
package main

import (
	"crypto/rand"
	"fmt"
	"math/big"
)

// GenerateKey 生成ElGamal密钥对
func GenerateKey() (p, g, x, h *big.Int) {
	// 简化: 直接使用一个安全的p, g
	p, _ = new(big.Int).SetString("170141183460469231731687303715884105727", 10) // 2^127 - 1 近似
	g = big.NewInt(3)

	// 私钥 x
	x, _ = rand.Int(rand.Reader, p)
	// 公钥 h = g^x mod p
	h = new(big.Int).Exp(g, x, p)

	return
}

// Encrypt ElGamal 加密
func Encrypt(p, g, h, m *big.Int) (c1, c2 *big.Int) {
	// 随机 y
	y, _ := rand.Int(rand.Reader, p)

	// c1 = g^y mod p
	c1 = new(big.Int).Exp(g, y, p)

	// k = h^y mod p
	k := new(big.Int).Exp(h, y, p)

	// c2 = m * k mod p
	c2 = new(big.Int).Mul(m, k)
	c2.Mod(c2, p)

	return
}

// Decrypt ElGamal 解密
func Decrypt(p, x, c1, c2 *big.Int) *big.Int {
	// k = c1^x mod p
	k := new(big.Int).Exp(c1, x, p)

	// 求 k 的模逆
	kInv := new(big.Int).ModInverse(k, p)

	// m = c2 * k^{-1} mod p
	m := new(big.Int).Mul(c2, kInv)
	m.Mod(m, p)

	return m
}

func main() {
	// 生成密钥
	p, g, x, h := GenerateKey()

	// 明文（整数表示）
	m := big.NewInt(123456)

	// 加密
	c1, c2 := Encrypt(p, g, h, m)

	// 解密
	plain := Decrypt(p, x, c1, c2)

	fmt.Println("原文:", m)
	fmt.Println("密文:", c1, c2)
	fmt.Println("解密:", plain)
}
```

## 签名
```go
package main

import (
	"crypto/rand"
	"fmt"
	"math/big"
)

// 生成密钥：p, g, x, y
func GenerateKey() (p, g, x, y *big.Int) {
	p, _ = new(big.Int).SetString("170141183460469231731687303715884105727", 10)
	g = big.NewInt(3)

	x, _ = rand.Int(rand.Reader, p)
	y = new(big.Int).Exp(g, x, p)

	return
}

// 计算模逆
func modInverse(a, m *big.Int) *big.Int {
	return new(big.Int).ModInverse(a, m)
}

// 签名
func Sign(p, g, x, m *big.Int) (r, s *big.Int) {
	pm1 := new(big.Int).Sub(p, big.NewInt(1))

	// 选随机 k，且 gcd(k, p-1) = 1
	var k *big.Int
	for {
		k, _ = rand.Int(rand.Reader, pm1)
		if new(big.Int).GCD(nil, nil, k, pm1).Cmp(big.NewInt(1)) == 0 {
			break
		}
	}

	// r = g^k mod p
	r = new(big.Int).Exp(g, k, p)

	// s = (m - x*r) * k^{-1} mod (p-1)
	xr := new(big.Int).Mul(x, r)
	xr.Mod(xr, pm1)

	num := new(big.Int).Sub(m, xr)
	num.Mod(num, pm1)

	kInv := modInverse(k, pm1)

	s = new(big.Int).Mul(num, kInv)
	s.Mod(s, pm1)

	return
}

// 验证
func Verify(p, g, y, m, r, s *big.Int) bool {
	// g^m mod p
	left := new(big.Int).Exp(g, m, p)

	// y^r * r^s mod p
	yr := new(big.Int).Exp(y, r, p)
	rs := new(big.Int).Exp(r, s, p)
	right := new(big.Int).Mul(yr, rs)
	right.Mod(right, p)

	return left.Cmp(right) == 0
}

func main() {
	p, g, x, y := GenerateKey()

	m := big.NewInt(123456)

	r, s := Sign(p, g, x, m)

	fmt.Println("签名 (r, s):", r, s)

	fmt.Println("验证结果:", Verify(p, g, y, m, r, s))
}
```

