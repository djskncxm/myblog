---
title: ECDH加密算法
type: docs
---

![des](../../../maji-no-tabitabi-3.jpg)

在网络通信中，如何在不泄露密钥的情况下生成共享密钥，是加密通信的核心问题  
传统的 Diffie-Hellman（DH）通过大整数模幂运算生成共享密钥，但在大数计算上存在效率和安全限制  
ECDH（Elliptic Curve Diffie-Hellman）则把 DH 的思想和椭圆曲线结合，让密钥交换既安全又高效  

# 简单回顾
- DH 需要选择基数 g 和模数 p（可以理解为“两个公开点”），双方生成私钥、计算公钥、交换公钥、生成共享密钥
<div align="center"> S=aB=bA=abG </div>

- ECC 不是随便选点，而是定义在椭圆曲线上的点:
<div align="center"> y^2=x^3+ax+b(mod p) </div>

- 椭圆曲线上定义了加法运算，使得 DH 的“乘法”变成了“点乘”(Scalar Multiplication)   
- 安全性来自 椭圆曲线离散对数问题(ECDLP),比传统 DH 所需密钥长度更短,但安全性相当

## ECDH步骤
- 公共参数：椭圆曲线 E(a,b,p) + 基点 G
- 私钥：随机选 a, b
- 公钥：A = aG, B = bG
- 交换公钥 → 生成共享密钥 S = abG
- 安全性：私钥不传输，攻击者无法通过公钥计算共享密钥

## 安全性和优势
- 比传统 DH 密钥短：256-bit ECC ≈ 3072-bit DH
- 效率高：点运算比大整数模幂快
- 广泛使用：TLS、SSH、加密钱包等


这个我就不写具体的算法了，后面写更加现代的版本
