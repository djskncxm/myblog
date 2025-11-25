---
title: ChaCha20 加密
type: docs
next: docs/Cryptography_Modern/ChaCha20-Poly1305
---

![Modern_Cryptography](../../../droplets.png)

在你看完前面AES篇的加密后再看这个也肯定会觉得这个算是比较简单的那种加密，难度我觉得和TEA差不多，那么我们就开始学习这个密码吧    

# 算法原理
ChaCha20 是一种高速、轻量的流密码，比 AES 简单，但同样安全。我们来一步步拆开它的加密过程，你会发现它其实非常直观。ChaCha20 的加密需要四样东西：key、nonce、data、counter

- key：256 位，也就是 32 字节
- nonce：96 位（RFC 8439 推荐），也就是 12 字节
- counter：块计数器，通常用 uint32
- data：要加密的明文

1. 状态矩阵初始化
> 它把一个 256 位密钥、32 位计数器和 96 位（或早期 64 位）随机 nonce 与固定常量一起填入 16 个 32-bit 词的内部状态中   

里面存储东西是有边界的，ChaCha20为我们规定了这些

- words 0..3: 固定常量 ("expand 32-byte k" 的 ASCII 切成 4 个 32-bit 小端)
- words 4..11: 256-bit key(8 个 32-bit)
- word 12: 32-bit block counter(计数器)
- words 13..15: 96-bit nonce(3 个 32-bit)
> (历史上有 64-bit nonce + 64-bit counter 的版本，但 IETF / RFC 8439 用的是 32-bit counter + 96-bit nonce)

2. QUARTERROUND   
Quarter Round（四分之一轮）指的是对 16 个状态元素中的 4 个数进行一次小型搅拌。ChaCha20 通过 Column Round 和 Diagonal Round 多次调用 Quarter Round，把整个状态矩阵彻底混合，从而生成安全的密钥流。

- 一轮（Round）与 20 轮细节(小插曲)
    1. 一个 column round：对 4 个 column 各自做 QUARTERROUND，也就是索引 (0,4,8,12), (1,5,9,13), (2,6,10,14), (3,7,11,15)
    2. 一个 diagonal round：对 4 个对角线做 QUARTERROUND，即 (0,5,10,15), (1,6,11,12), (2,7,8,13), (3,4,9,14)
    3. ChaCha20 的一个“完整轮”通常表示 column round + diagonal round。默认做 10 个完整轮 ⇒ 20 次 QUARTERROUND 就是 20 rounds(有时简写为 20 rounds)

3. 生成一个64字节keystream块
- 把初始 16个词构成 state(记作 X)
- 复制 X 到working_state(记作 Y)
- 对Y执行20轮(每轮 = column + diagonal)
- 执行完毕后,把 Y 的每个 32-bit 词与初始 X 对应词做+(32-bit 加法,模 2^32)
- 把结果按小端序列化为 64 字节 —— 就是该 block 的 keystream(第 counter 值对应的 keystream)
- 对明文的对应 64 字节部分做 XOR 即成密文；计数器加一，处理下一个 block

原理就是这么简单，比AES少多了相信你看配合代码看几遍肯定能看得懂的

# 代码

```go
package main

import (
	"encoding/binary"
	"encoding/hex"
	"fmt"
	"strings"
)

func ChaCha20Rotl(x uint32, n uint) uint32 {
	return (x << n) | (x >> (32 - n))
}

func ChaCha20quarterRound(a, b, c, d *uint32) {
	*a += *b
	*d ^= *a
	*d = ChaCha20Rotl(*d, 16)

	*c += *d
	*b ^= *c
	*b = ChaCha20Rotl(*b, 12)

	*a += *b
	*d ^= *a
	*d = ChaCha20Rotl(*d, 8)

	*c += *d
	*b ^= *c
	*b = ChaCha20Rotl(*b, 7)
}

func ChaCha20InitState(key, nonce []byte, counter uint32) [16]uint32 {
	if len(key) != 32 {
		panic("key must be 32 bytes")
	}
	if len(nonce) != 12 {
		panic("nonce must be 12 bytes")
	}

	var st [16]uint32

	// constants
	st[0] = binary.LittleEndian.Uint32([]byte("expa"))
	st[1] = binary.LittleEndian.Uint32([]byte("nd 3"))
	st[2] = binary.LittleEndian.Uint32([]byte("2-by"))
	st[3] = binary.LittleEndian.Uint32([]byte("te k"))

	for i := 0; i < 8; i++ {
		st[4+i] = binary.LittleEndian.Uint32(key[i*4 : (i+1)*4])
	}
	st[12] = counter

	st[13] = binary.LittleEndian.Uint32(nonce[0:4])
	st[14] = binary.LittleEndian.Uint32(nonce[4:8])
	st[15] = binary.LittleEndian.Uint32(nonce[8:12])

	return st
}

func ChaCha20Block(state [16]uint32) [64]byte {
	var work [16]uint32
	copy(work[:], state[:])

	for i := 0; i < 10; i++ {
		ChaCha20quarterRound(&work[0], &work[4], &work[8], &work[12])
		ChaCha20quarterRound(&work[1], &work[5], &work[9], &work[13])
		ChaCha20quarterRound(&work[2], &work[6], &work[10], &work[14])
		ChaCha20quarterRound(&work[3], &work[7], &work[11], &work[15])

		ChaCha20quarterRound(&work[0], &work[5], &work[10], &work[15])
		ChaCha20quarterRound(&work[1], &work[6], &work[11], &work[12])
		ChaCha20quarterRound(&work[2], &work[7], &work[8], &work[13])
		ChaCha20quarterRound(&work[3], &work[4], &work[9], &work[14])
	}

	var out [64]byte

	for i := 0; i < 16; i++ {
		val := work[i] + state[i]
		binary.LittleEndian.PutUint32(out[i*4:(i+1)*4], val)
	}
	return out
}

func ChaCha20(key, nonce, in []byte, counter uint32) []byte {
	out := make([]byte, len(in))
	st := ChaCha20InitState(key, nonce, counter)

	var BlockCounter uint32 = 0
	pos := 0
	remaining := len(in)

	for remaining > 0 {
		st[12] = counter + BlockCounter
		ks := ChaCha20Block(st)

		n := 64

		if remaining < 64 {
			n = remaining
		}

		for i := 0; i < n; i++ {
			out[pos+i] = in[pos+i] ^ ks[i]
		}

		remaining -= n
		pos += n
		BlockCounter++
	}
	return out
}

func main() {
	key, _ := hex.DecodeString("000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f")
	nonce, _ := hex.DecodeString("000000090000004a00000000")

	plaintext := []byte("Hello ChaCha20")
	fmt.Println("plaintext:", string(plaintext))

	cipher := ChaCha20(key, nonce, plaintext, 1)
	fmt.Println("cipher hex:", hex.EncodeToString(cipher))

	restore := ChaCha20(key, nonce, cipher, 1)
	fmt.Println("restore:", string(restore))
}
```

