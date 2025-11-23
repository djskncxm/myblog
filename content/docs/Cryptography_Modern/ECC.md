---
title: ECC密钥交换 
type: docs
---

![des](../../../voyager-7.jpg)

椭圆曲线密码学（ECC）的数学核心非常简洁：它把密码运算归结为有限域上的点加法与倍点运算，然后用这些点的坐标构建公钥、私钥和共享密钥。为了理解 ECC，我们可以先看一条简单的椭圆曲线
<div align="center">y2≡x3+ax+b (mod p)</div>
这里的 𝑝 p 是模数，所有计算都在有限域 𝐹 𝑝 F p ​ 内进行，超过 𝑝 p 的结果会“折回”到 0 到 𝑝 − 1 p−1 之间

在 ECC 中，我们把曲线上的点记作 𝑃 = ( 𝑥 , 𝑦) P=(x,y)。点加法 𝑃 + 𝑄 P+Q 的定义如下：    
1. 普通加法(P ≠ Q)   
    画一条直线穿过 P 和 Q，它会再交曲线一个点 R′。点加法结果是 R′ 关于 x 轴的镜像。公式化为有限域运算：
    ```text
    m = (y2 - y1) / (x2 - x1) mod p
    x3 = m^2 - x1 - x2 mod p
    y3 = m*(x1 - x3) - y1 mod p
    ```
2. 倍点运算(P = Q)     
    当 P = Q 时，直线退化为通过 P 的切线，斜率变为：
    ```text
    m = (3*x1^2 + a) / (2*y1) mod p
    ```
    再用同样公式计算 R = 2P
3. 相反点(P = -Q)     
    当两个点在竖直线上时，它们纵坐标互为负数，横坐标相同，点加法结果定义为“无穷远点 O”，在程序里通常用 (nil, nil) 表示
> [!NOTE]
> 注意，在有限域里“除法”不能直接做，所以公式里的除法都是通过模逆实现的：a / b mod p = a * b^(-1) mod p，对应 Go 里的 ModInverse

有了点加法和倍点运算，就可以实现标量乘法（scalar multiplication）：计算 𝑘*𝑃 kP，也就是 P 加自己 k 次。Go 代码里通过二进制展开、循环翻倍加法高效实现
```go
for i := k.BitLen()-1; i>=0; i-- {
    result = Add(result, result) // 翻倍
    if k.Bit(i) == 1 {
        result = Add(result, addend) // 累加
    }
}
```

这是 ECC 的核心运算。它可以用来生成公钥和私钥：选择一个随机私钥 k，然后计算公钥 K = kG（G 是曲线上的基点）。因为有限域上的离散对数问题很难解，已知 G 和 K 几乎不可能反推出 k，从而保证安全性。

基于这个原理，ECC 可以实现密钥交换（ECDH）、数字签名（ECDSA、EdDSA）等。在你提供的 Go 代码里：
- Alice 和 Bob 各自生成私钥（aPriv, bPriv）
- 通过标量乘法计算公钥（aPub, bPub）
- 最终共享密钥通过对方公钥再乘自己私钥得到（shared1, shared2），两者相等

整个逻辑核心就是：通过有限域上的点加法和倍点运算不断求出新点 R，然后利用 R 的坐标生成公钥、共享密钥或签名。理解了点加法公式、倍点运算和模逆

```go
package main

import (
	"fmt"
	"math/big"
)

// 定义椭圆曲线 y^2 = x^3 + ax + b (mod p)
type Curve struct {
	P *big.Int // 模数
	A *big.Int
	B *big.Int
	G Point
}

type Point struct {
	X, Y *big.Int
}

// 是否为无穷远点
func (p Point) IsInfinity() bool {
	return p.X == nil && p.Y == nil
}

// 椭圆曲线加法 P + Q
func (c Curve) Add(p1, p2 Point) Point {
	if p1.IsInfinity() {
		return p2
	}
	if p2.IsInfinity() {
		return p1
	}

	p := c.P
	var m *big.Int

	if p1.X.Cmp(p2.X) == 0 && p1.Y.Cmp(p2.Y) != 0 {
		// P + (-P) = O
		return Point{nil, nil}
	}

	if p1.X.Cmp(p2.X) == 0 && p1.Y.Cmp(p2.Y) == 0 {
		// P + P
		two := big.NewInt(2)
		num := new(big.Int).Mul(two, p1.Y)
		num.Mod(num, p)

		den := new(big.Int).Mul(big.NewInt(3), new(big.Int).Mul(p1.X, p1.X))
		den.Add(den, c.A)
		den.Mod(den, p)

		m = new(big.Int).ModInverse(den, p)
		m.Mul(m, num)
	} else {
		// P + Q, P != Q
		num := new(big.Int).Sub(p2.Y, p1.Y)
		num.Mod(num, p)

		den := new(big.Int).Sub(p2.X, p1.X)
		den.Mod(den, p)

		m = new(big.Int).ModInverse(den, p)
		m.Mul(m, num)
	}

	m.Mod(m, p)

	// x3 = m^2 - x1 - x2
	x3 := new(big.Int).Mul(m, m)
	x3.Sub(x3, p1.X)
	x3.Sub(x3, p2.X)
	x3.Mod(x3, p)

	// y3 = m*(x1 - x3) - y1
	y3 := new(big.Int).Sub(p1.X, x3)
	y3.Mul(m, y3)
	y3.Sub(y3, p1.Y)
	y3.Mod(y3, p)

	return Point{x3, y3}
}

// 倍点运算 k*P
func (c Curve) ScalarMult(p Point, k *big.Int) Point {
	result := Point{nil, nil} // 初始化无穷远点
	addend := p

	for i := k.BitLen() - 1; i >= 0; i-- {
		result = c.Add(result, result) // 翻倍
		if k.Bit(i) == 1 {
			result = c.Add(result, addend)
		}
	}

	return result
}

func main() {
	// 定义小曲线示例 y^2 = x^3 + 2x + 3 mod 97
	p := big.NewInt(97)
	a := big.NewInt(2)
	b := big.NewInt(3)
	G := Point{big.NewInt(3), big.NewInt(6)}

	curve := Curve{P: p, A: a, B: b, G: G}

	// Alice 的私钥
	aPriv := big.NewInt(20)
	aPub := curve.ScalarMult(G, aPriv)

	// Bob 的私钥
	bPriv := big.NewInt(15)
	bPub := curve.ScalarMult(G, bPriv)

	fmt.Println("Alice 公钥:", aPub)
	fmt.Println("Bob 公钥:", bPub)

	// 计算共享密钥
	shared1 := curve.ScalarMult(bPub, aPriv)
	shared2 := curve.ScalarMult(aPub, bPriv)

	fmt.Println("Alice 共享密钥:", shared1)
	fmt.Println("Bob 共享密钥:", shared2)
}
```
