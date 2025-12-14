---
title: 密钥拓展算法总结
type: docs
next: docs/Cryptography_Modern/SM4
---
![des](../../../pink-clouds.jpg)

这个其实非常简单，作用就是把你本身简单的密钥拓展成非常非常复杂的长16进制串，然后使用这个串进行后续的加密解密   
说是密钥拓展，其实这玩意就是用你选择的hash函数来把这个东西进行hash，建议是600000以上

```py
import hashlib
import os
import binascii

# 使用 Python 标准库
password = b"my_secure_password"
salt = os.urandom(16)
iterations = 100000
dklen = 32

# 标准库实现
key = hashlib.pbkdf2_hmac(
    'sha256',
    password,
    salt,
    iterations,
    dklen
)

print(f"盐值: {binascii.hexlify(salt).decode()}")
print(f"密钥: {binascii.hexlify(key).decode()}")
print(f"密钥长度: {len(key)} 字节 ({len(key)*8} 位)")
```
这个是叫PBKDF2的密钥脱展

```py
# 安装：pip install argon2-cffi
from argon2 import PasswordHasher

ph = PasswordHasher(
    time_cost=3,      # 迭代次数
    memory_cost=65536, # 内存使用（KB）
    parallelism=4,     # 并行线程数
    hash_len=32,       # 哈希长度
    salt_len=16        # 盐长度
)

hash = ph.hash("password")
ph.verify(hash, "password")  # 验证
```
因为经典sha256不扛GPU暴力破解，所以也可以选择使用更新的Argon2，这个的输出长度和md5一样，有必要可以用这个来代替md5

HKDF基于HMAC的密钥派生函数，设计简洁且安全，特别适合从高质量随机数派生出多个密钥

> 密码 → Argon2/PBKDF2 (强化) → HKDF (派生多个密钥)




