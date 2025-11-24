---
title: ECDSA加密算法
type: docs
---

![des](../../../blue-kaiju.png)

相信各位看见这个密码是EC开头的就知道这个是椭圆曲线函数相关的东西了      
这个有两部分组成
1. 信息签名
2. 消息校验

对于椭圆曲线函数相关知识点就请各位自己了解了，我能力实在有限就不写了

## 签名生成
1. 选择随机数 𝑘 , 1 ≤ 𝑘 ≤ 𝑛 − 1
    > n => 椭圆曲线基点 𝐺 的阶   
    > 阶 => 点 𝐺 重复加自己多少次会回到“无穷远点” 𝑂
2. 计算 𝑘𝐺 = ( 𝑥1 , 𝑦1) 
3. 计算 𝑟 = 𝑥1 mod 𝑛,如果 𝑟 = 0 重新选 𝑘
4. 计算 s = K^-1(H(m)-d*r) mod n, 如果s等于0,重新选择k

## 签名校验
1. 检查 𝑟 , 𝑠 ∈ [ 1,𝑛−1]
2. 计算 w = s^-1 mod n
3. 计算
    > u1=H(m)⋅w mod n   
    > u2=r⋅w mod n
4. 计算椭圆曲线点
    > X=u1\*G + u2\*Q
5. 校验签名
    > r ?= Xx mod n

主要内容就是这些，具体代码我会放一些简单的小量级实现
```go
package main

import (
	"crypto/sha256"
	"fmt"
	"math/big"
)

// 定义椭圆曲线 y^2 = x^3 + ax + b mod p
type Curve struct {
	P, A, B *big.Int
	Gx, Gy  *big.Int
	N       *big.Int
}

// 模运算下求逆元
func modInverse(k, p *big.Int) *big.Int {
	return new(big.Int).ModInverse(k, p)
}

// 点加法 P + Q
func pointAdd(x1, y1, x2, y2, a, p *big.Int) (*big.Int, *big.Int) {
	var m *big.Int
	if x1.Cmp(x2) == 0 && y1.Cmp(y2) == 0 {
		// P = Q 时用倍点公式
		two := big.NewInt(2)
		num := new(big.Int).Add(new(big.Int).Mul(big.NewInt(3), new(big.Int).Mul(x1, x1)), a)
		den := new(big.Int).Mul(two, y1)
		m = new(big.Int).Mul(num, modInverse(den, p))
		m.Mod(m, p)
	} else {
		num := new(big.Int).Sub(y2, y1)
		den := new(big.Int).Sub(x2, x1)
		m = new(big.Int).Mul(num, modInverse(den, p))
		m.Mod(m, p)
	}
	x3 := new(big.Int).Sub(new(big.Int).Sub(new(big.Int).Mul(m, m), x1), x2)
	x3.Mod(x3, p)
	y3 := new(big.Int).Sub(new(big.Int).Mul(m, new(big.Int).Sub(x1, x3)), y1)
	y3.Mod(y3, p)
	return x3, y3
}

// 点乘 k*G
func scalarMult(x, y, k, a, p *big.Int) (*big.Int, *big.Int) {
	xr, yr := big.NewInt(0), big.NewInt(0) // 初始为无穷远点
	kBin := fmt.Sprintf("%b", k)
	for _, bit := range kBin {
		xr, yr = pointAdd(xr, yr, xr, yr, a, p)
		if bit == '1' {
			xr, yr = pointAdd(xr, yr, x, y, a, p)
		}
	}
	return xr, yr
}

func main() {
	// 小曲线参数示例 (不安全)
	p := big.NewInt(17)
	a := big.NewInt(2)
	b := big.NewInt(2)
	Gx := big.NewInt(5)
	Gy := big.NewInt(1)
	n := big.NewInt(19) // G 的阶

	curve := Curve{p, a, b, Gx, Gy, n}

	// 私钥 d
	d := big.NewInt(7)
	// 公钥 Q = d*G
	Qx, Qy := scalarMult(curve.Gx, curve.Gy, d, curve.A, curve.P)
	fmt.Println("Public Key Q:", Qx, Qy)

	// 消息
	msg := "Hello ECDSA"
	h := sha256.Sum256([]byte(msg))
	e := new(big.Int).SetBytes(h[:])
	fmt.Println("Message hash:", e)

	// 签名
	k := big.NewInt(3) // 随机数
	Rx, Ry := scalarMult(curve.Gx, curve.Gy, k, curve.A, curve.P)
	r := new(big.Int).Mod(Rx, n)
	if r.Cmp(big.NewInt(0)) == 0 {
		fmt.Println("r=0, 需重选 k")
		return
	}
	kInv := modInverse(k, n)
	s := new(big.Int).Mod(new(big.Int).Mul(kInv, new(big.Int).Add(e, new(big.Int).Mul(d, r))), n)
	if s.Cmp(big.NewInt(0)) == 0 {
		fmt.Println("s=0, 需重选 k")
		return
	}
	fmt.Println("Signature (r,s):", r, s)

	// 验证签名
	w := modInverse(s, n)
	u1 := new(big.Int).Mod(new(big.Int).Mul(e, w), n)
	u2 := new(big.Int).Mod(new(big.Int).Mul(r, w), n)
	Xx, Xy := pointAdd(
		scalarMult(curve.Gx, curve.Gy, u1, curve.A, curve.P),
		scalarMult(Qx, Qy, u2, curve.A, curve.P),
	)
	v := new(big.Int).Mod(Xx, n)
	fmt.Println("Verification v:", v)
	if v.Cmp(r) == 0 {
		fmt.Println("Signature verified!")
	} else {
		fmt.Println("Signature invalid!")
	}
}
```
