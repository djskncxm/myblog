---
title: 现代密码学
toc: false
---

![Modern_Cryptography](../../../2025-10-31-22-24-38.png)
现代密码学不再只是把字母换来换去——它是保证互联网、通信与数据存储安全的工程学：算法、协议、实现和部署的集合。本章从实用与实现的角度出发，带你理解对称加密、哈希、消息认证、公钥密码、密钥派生与常见协议(如 TLS / JWT)，并重点讲清楚“为什么会出错”以及“如何用 C/Go 实现并在二进制/汇编层面验证”

{{< callout type="important" icon="sparkles" >}}
**目标读者：** 已经完成古典密码学练习,并希望把重点放在实现,逆向与漏洞识别的读者
{{< /callout >}}

### **1. 对称加密(Symmetric Ciphers)**

1. DES -> 已经完成
2. 3DES -> 这个不是很想写了(因为学过DES和AES了)
3. AES-ECB -> 已经完成
4. AES-CBC -> 已经完成
5. AES-CTR -> 已经完成
6. AES-GCM -> 已经完成
7. ChaCha20 -> 已经完成
8. ChaCha20-Poly1305(AEAD) -> 已经完成
9. RC4(已不安全)
10. SM4(国密)

### **2. 非对称加密(Public-Key / Asymmetric)**

11. RSA(加密/签名)
12. ElGamal
13. Diffie–Hellman(DH)
14. ECC 通用(椭圆曲线密码)
15. ECDH(密钥交换)
16. ECDSA(签名)
17. Ed25519(签名)
18. X25519(密钥交换)
19. SM2(国密)

### **3. 哈希函数(Hash Functions)**

20. MD5(不安全，了解即可)
21. SHA-1(不安全) -> 已经完成
22. SHA-256
23. SHA-512
24. SHA-3(Keccak)
25. BLAKE2
26. SM3(国密)

### **4. 消息认证码 MAC**

27. HMAC
28. CMAC(AES)

### **5. 密钥派生函数 KDF**

29. PBKDF2
30. HKDF
