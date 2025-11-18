---
title: AES_CBC加密
type: docs
---

![bg](../../../sousou-no-frieren-flowers.png)

这个模式的AES在你学习完上一篇ECB加密模式后会非常简单，这个也就是引入了一个新东西`iv`   
话不多说好吧，直接拿代码来看   

流程
1. 给定一个 16 字节的初始向量 IV。
2. 第一块明文 P₀ 与 IV 做 XOR，然后再 AES 加密 → 得到第一块密文 C₀。
3. 第二块明文 P₁ 与上一块密文 C₀ 做 XOR，然后 AES 加密 → 得到 C₁。
4. 后续块依次类推：每一块明文都先与上一块密文 XOR，再 AES 加密 → 得到当前密文块。

公式表示：
```text
C₀ = AES(P₀ XOR IV)
C₁ = AES(P₁ XOR C₀)
C₂ = AES(P₂ XOR C₁)
...
```

特点:
1. 每块密文依赖前一块 → 无法并行加密
2. 明文长度必须是 16 字节倍数，需要填充
3. 历史漏洞较多（BEAST、Lucky13），现代应用逐渐被 CTR/GCM 替代

```go
func AES_CBC(key string, data string, iv string) string {
	dataBytes := []byte(data)
	keyBytes := []byte(key)
	ivBytes := []byte(iv)

	if len(keyBytes) != 16 {
		panic("密钥长度必须是16个字节")
	}
	if len(ivBytes) != 16 {
		panic("IV长度必须是16个字节")
	}
	if len(dataBytes)%16 != 0 {
		panic("明文长度必须是16倍数")
	}

	key_11 := AES_keyExpansion(keyBytes)
	var result []byte

	// 使用IV作为第一个"前一个密文块"
	previousBlock := ivBytes

	for i := 0; i < len(dataBytes); i += 16 {
		// 1. 取出当前明文块
		block := make([]byte, 16)
		copy(block, dataBytes[i:i+16])

		// 2. CBC核心：明文块与前一个密文块异或
		for j := 0; j < 16; j++ {
			block[j] ^= previousBlock[j]
		}

		// 3. 对异或后的结果进行正常的AES加密流程
		var blockArray [16]byte
		copy(blockArray[:], block)
		AES_AddRoundKey(&blockArray, getRoundKey(key_11, 0))

		block = blockArray[:]
		for k := 1; k <= 9; k++ {
			bm := AES_ByteMatrix(block)
			bm = AES_SubBytes(bm)
			bm = AES_ShiftRows(bm)
			bm = AES_MixColumns(bm)
			arr := flattenByColumns(bm)
			AES_AddRoundKey(&arr, getRoundKey(key_11, k))
			block = arr[:]
		}
		bm := AES_ByteMatrix(block)
		bm = AES_SubBytes(bm)
		bm = AES_ShiftRows(bm)
		arr := flattenByColumns(bm)
		AES_AddRoundKey(&arr, getRoundKey(key_11, 10))

		// 4. 得到当前密文块
		cipherBlock := arr[:]
		result = append(result, cipherBlock...)

		// 5. 更新previousBlock为当前密文块，供下一块使用
		previousBlock = cipherBlock
	}

	return string(result)
}
```


