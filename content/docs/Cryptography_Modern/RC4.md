---
title: RC4加密算法
type: docs
---

![des](../../../foggy-city.jpg)

RC4加密是一种流密码算法，通过生成伪随机密钥流与数据进行异或操作来实现加密。算法分为两个核心阶段：密钥调度算法（KSA）和伪随机生成算法（PRGA）。

首先，KSA阶段使用密钥对256字节的S盒进行初始化打乱。S盒初始化为顺序值[0,1,2,...,255]，然后通过256轮操作将密钥特征混入其中。每轮计算中，根据当前S盒值、密钥字节和上一轮的j值更新j位置，然后交换S[i]和S[j]。这个过程确保相同的密钥总是产生相同的S盒排列，为密钥流生成奠定基础。

接着，PRGA阶段利用打乱后的S盒生成密钥流。对于每个待加密字节，算法递增i索引，根据S[i]更新j索引，然后交换S[i]和S[j]以保持S盒的动态变化。关键步骤是计算t = S[i] + S[j]，以S[t]作为当前密钥字节。最后，将明文字节与S[t]进行异或操作得到密文，解密时同样过程再次异或即可恢复原文。

整个算法的安全性依赖于S盒的随机性和密钥的保密性，通过简单的索引运算和交换操作实现高效加密，但交换过程的简单性也是其安全漏洞的根源

代码也是非常简单，看一遍基本就有概念的


```go
package main

import "fmt"

func rc4(key, data []byte) []byte {
    // KSA (Key Scheduling Algorithm)
    var S [256]byte
    for i := 0; i < 256; i++ {
        S[i] = byte(i)
    }
    
    j := 0
    for i := 0; i < 256; i++ {
        j = (j + int(S[i]) + int(key[i%len(key)])) % 256
        S[i], S[j] = S[j], S[i]
    }

    // PRGA (Pseudo-Random Generation Algorithm)
    i, j := 0, 0
    out := make([]byte, len(data))

    for k := 0; k < len(data); k++ {
        i = (i + 1) % 256
        j = (j + int(S[i])) % 256
        S[i], S[j] = S[j], S[i]
        t := (int(S[i]) + int(S[j])) % 256
        out[k] = data[k] ^ S[t]
    }
    return out
}

func main() {
    key := []byte("secret")
    plain := []byte("hello world")
    cipher := rc4(key, plain)
    fmt.Printf("cipher: %x\n", cipher)
    fmt.Println("decrypt:", string(rc4(key, cipher)))
}
```

