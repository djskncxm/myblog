---
title: SM2加密算法
type: docs
---

![SM4](../../../desolate-city.jpg)
SM2 是一种 椭圆曲线公钥密码算法（ECC），专门由中国国家密码管理局制定，主要用于 数字签名、密钥交换和公钥加密   

1. 椭圆曲线：使用的是 y^2 = x^3 + ax + b (mod p) 的椭圆曲线，国密标准规定了曲线参数
    - p: 大素数(有限域)
    - a, b: 曲线系数
    - G: 基点(生成点)
    - n: 基点阶
2. 非对称密钥对
    - 私钥 d：随机数，1 ≤ d ≤ n-2
    - 公钥 P = d * G
3. 用途
    - 签名：对消息生成数字签名
    - 验证：验证消息的完整性和来源
    - 加密/解密：公钥加密，私钥解密


### 加密流程
0. 生成随机数 k
1. 计算 C1 = k * G
2. 共享点 S = k * P (P 为接收者公钥)
3. 生成对称密钥 t = KDF(S)
4. C2 = M XOR t(消息加密)
5. 生成哈希 C3 = Hash(x2 || M || y2)
6. 最终密文 C = C1 || C3 || C2
### 解密流程
1. 用私钥 d 计算共享点 S = d * C1
2. 计算 t = KDF(S)
3. M = C2 XOR t
4. 验证哈希 C3 == Hash(x2 || M || y2)


我自己能力有限，只能梳理好加密到代码的东西，更详细的底层还请各位自己学习和探索了
```go
import (
    "crypto/rand"
    "fmt"
    "github.com/tjfoc/gmsm/sm2"
)

func main() {
    priv, err := sm2.GenerateKey(rand.Reader)
    if err != nil {
        panic(err)
    }
    fmt.Printf("私钥: %x\n", priv.D)
    fmt.Printf("公钥: (%x, %x)\n", priv.X, priv.Y)

    msg := []byte("Hello SM2")
    sig, _ := priv.Sign(rand.Reader, msg, nil)
    fmt.Printf("签名: %x\n", sig)

    ok := priv.PublicKey.Verify(msg, sig)
    fmt.Println("验证签名:", ok)
}
```
