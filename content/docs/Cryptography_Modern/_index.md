---
title: 现代密码学
toc: false
---
![Modern_Cryptography](../../../2025-10-31-22-24-38.png)
现代密码学不再只是把字母换来换去——它是保证互联网、通信与数据存储安全的工程学：算法、协议、实现和部署的集合。本章从实用与实现的角度出发，带你理解对称加密、哈希、消息认证、公钥密码、密钥派生与常见协议（如 TLS / JWT），并重点讲清楚“为什么会出错”以及“如何用 C/Go 实现并在二进制/汇编层面验证”

{{< callout type="important" icon="sparkles" >}}
**目标读者：** 已经完成古典密码学练习,并希望把重点放在实现,逆向与漏洞识别的读者
{{< /callout >}}

- 对称加密（AES 系列 -> ECB / CBC / CTR / GCM / XTS）
  - AES-128 / AES-192 / AES-256
  - 模式：ECB（示例/问题）、CBC（padding & oracle）、CTR（流化、nonce 要求）、GCM（AEAD，nonce 管理）、XTS（磁盘加密场景）

- 哈希与消息认证（MD5 / SHA-1 / SHA-2 / SHA-3 => HMAC 版本）
  - MD5（历史/已破坏的碰撞示例）
  - SHA-1（弱化历史与现实影响）
  - SHA-2：SHA-224 / SHA-256 / SHA-384 / SHA-512（压缩函数与应用）
  - SHA-3 / Keccak（Sponge 结构）
  - HMAC（基于上述哈希的消息认证构造；用法与陷阱）

- 公钥密码学（RSA）
  - RSA 加密 / 解密（模幂、填充：PKCS#1 v1.5 / OAEP）
  - RSA 签名（PKCS#1 v1.5 / PSS）
  - 实现注意：模幂实现指纹、大整数库调用、常见漏洞（填充 oracle、低指数攻击）
---
暂时列举，后续还会有一些算法，请等待笔者学习
