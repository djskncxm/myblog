---
title: AES_CTR加密
type: docs
next: docs/Cryptography_Modern/AES_GCM
---

![bg](../../../gingerbread-house.jpg)
这个在你看过前两篇(ECB,CBC)后还是非常简单的，几句话就讲明白了

AES-CTR 模式就是把 AES 当作流密码生成器使用：每个块用“计数器块（Nonce + Counter）”做 AES 单块加密，生成 16 字节的密钥流，再和明文异或得到密文；解密时同样用 AES 加密计数器块生成密钥流，再 XOR 密文即可得到明文。注意，明文本身从不进入 AES，加密和解密完全相同

就是把我们的计数器进行aes加密，但是明文不进行aes，我们把被加密后的计数器块和明文进行异或处理，得到最终密文

流程:
1. 准备一个 8 字节 nonce 和一个 8 字节计数器 counter，拼成 16 字节计数器块
2. 将计数器块 AES 加密 → 得到 16 字节的密钥流（keystream）
3. 将密钥流与明文块 XOR → 得到密文块
4. 计数器自增，处理下一块明文，重复步骤 2~3

特点:
1. 每块独立 → 可以并行加密
2. 不需要填充，明文任意长度
3. 密文长度 = 明文长度
4. AES 只处理计数器块，明文不进入 AES
5. 现代标准推荐（CTR/GCM、TLS1.3、QUIC 等
```go
func AES_CTR(key []byte, nonce []byte, data []byte) []byte {
    if len(key) != 16 {
        panic("key must be 16 bytes")
    }
    if len(nonce) != 8 {
        panic("nonce must be 8 bytes")
    }

    // 生成 round keys
    roundKeys := AES_keyExpansion(key)

    out := make([]byte, len(data))

    counter := uint64(0)

    block := make([]byte, 16) // nonce(8) + counter(8)
    copy(block[:8], nonce)

    for i := 0; i < len(data); i += 16 {
        // 设置计数器
        binary.BigEndian.PutUint64(block[8:], counter)
        counter++

        // keystream = AES_encryptBlock(counter_block)
        keystream := AES_encryptBlock(block, roundKeys)

        // 处理可能不足 16 字节的块
        end := i + 16
        if end > len(data) {
            end = len(data)
        }

        // XOR 生成密文或明文
        for j := i; j < end; j++ {
            out[j] = data[j] ^ keystream[j-i]
        }
    }

    return out
}

```
