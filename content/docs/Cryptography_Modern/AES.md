---
title: AES -> 对称加密的风向标
type: docs
next: docs/Cryptography_Modern/AES_CBC
---

![bg](../../../wallhaven-85zooo_1920x1080.png)
各位看见这张图也就大改知道这次学习的密码重要性和难度
>当你用手机转账、在网站输入密码、甚至只是发送一条私密消息时，一场无声的加密风暴正在幕后上演。而这场风暴的核心，有一个名字如雷贯耳——AES</br>
>它不是科幻小说里的黑科技，却是守护我们数字生活每一刻的基石。从军事机密到你的聊天记录，AES是如何成为全球加密标准的？它背后的魔法，究竟是什么？

AES密码作为对称密码的标杆，目前尚未有公开的、能够大规模替代它的算法。它经过了二十多年的考验，仍然是全球范围内最受信赖的对称加密标准之一</br>

那么这篇博客来详细的讲解对称加密的风向标`AES`，这玩意快给我干吐了，博客根本写不出来，给各位推荐个CSDN的博客</br>
[AES权威博客](https://blog.csdn.net/qq_28205153/article/details/55798628)

### 我的代码
```go
var sbox = [256]byte{
	0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5,
	0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
	0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0,
	0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
	0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc,
	0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
	0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a,
	0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
	0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0,
	0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
	0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b,
	0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
	0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85,
	0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
	0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5,
	0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
	0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17,
	0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
	0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88,
	0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
	0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c,
	0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
	0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9,
	0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
	0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6,
	0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
	0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e,
	0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
	0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94,
	0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
	0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68,
	0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16,
}
var rcon = [11]byte{0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1B, 0x36}

func xtime(a byte) byte {
	if a&0x80 != 0 {
		return ((a << 1) ^ 0x1B) & 0xFF
	}
	return (a << 1) & 0xFF
}

// multiply in GF(2^8) for small constants (1,2,3,9,11,13,14)
func gmul(a, b byte) byte {
	var res byte = 0
	var temp byte = a
	for i := 0; i < 8; i++ {
		if (b & (1 << i)) != 0 {
			res ^= temp
		}
		// multiply temp by x
		if temp&0x80 != 0 {
			temp = (temp << 1) ^ 0x1B
		} else {
			temp = temp << 1
		}
	}
	return res
}

func AES_AddRoundKey(state *[16]byte, roundKey []byte) {
	for i := 0; i < 16; i++ {
		state[i] ^= roundKey[i]
	}
}
func flattenByColumns(matrix [4][4]byte) [16]byte {
	var result [16]byte
	index := 0

	// 按列遍历：第0列 → 第1列 → 第2列 → 第3列
	for col := 0; col < 4; col++ {
		for row := 0; row < 4; row++ {
			result[index] = matrix[row][col]
			index++
		}
	}
	return result
}

func AES_ByteMatrix(data []byte) [4][4]byte {
	var reslut [4][4]byte
	for i := 0; i < 4; i++ {
		for j := 0; j < 4; j++ {
			reslut[i][j] = data[i+j*4]
		}
	}
	return reslut
}

func AES_keyExpansion(key []byte) []byte {
	reslut := make([]byte, 176)
	copy(reslut[:16], key)

	var temp [4]byte
	bytesGenerated := 16 // 已经生成的字节数
	rconIter := 1        // 常量索引

	for bytesGenerated < 176 {
		copy(temp[:], reslut[bytesGenerated-4:bytesGenerated])
		if bytesGenerated%16 == 0 { // 密钥扩展以 4字节字（word） 为单位进行
			temp = [4]byte{temp[1], temp[2], temp[3], temp[0]}
			for i := 0; i < 4; i++ {
				temp[i] = sbox[temp[i]]
			}

			temp[0] ^= rcon[rconIter] // 破坏对称性
			rconIter++
		}

		for i := 0; i < 4; i++ {
			reslut[bytesGenerated] = reslut[bytesGenerated-16] ^ temp[i]
			bytesGenerated++
		}
	}

	return reslut
}

func AES_ShiftRows(data [4][4]byte) [4][4]byte {
	result := data // 创建副本

	// 第0行不变

	// 第1行：循环左移1位
	temp1 := result[1][0]
	result[1][0] = result[1][1]
	result[1][1] = result[1][2]
	result[1][2] = result[1][3]
	result[1][3] = temp1

	// 第2行：循环左移2位（相当于交换第0-2列和第1-3列）
	temp2a, temp2b := result[2][0], result[2][1]
	result[2][0] = result[2][2]
	result[2][1] = result[2][3]
	result[2][2] = temp2a
	result[2][3] = temp2b

	// 第3行：循环左移3位（相当于循环右移1位）
	temp3 := result[3][3]
	result[3][3] = result[3][2]
	result[3][2] = result[3][1]
	result[3][1] = result[3][0]
	result[3][0] = temp3

	return result
}
func AES_MixColumns(data [4][4]byte) [4][4]byte {
	result := data // 创建副本

	for col := 0; col < 4; col++ {
		// 获取当前列
		a0 := data[0][col]
		a1 := data[1][col]
		a2 := data[2][col]
		a3 := data[3][col]

		// 矩阵乘法（在GF(2^8)上）
		// [02 03 01 01]   [a0]
		// [01 02 03 01] × [a1]
		// [01 01 02 03]   [a2]
		// [03 01 01 02]   [a3]

		result[0][col] = gmul(0x02, a0) ^ gmul(0x03, a1) ^ a2 ^ a3
		result[1][col] = a0 ^ gmul(0x02, a1) ^ gmul(0x03, a2) ^ a3
		result[2][col] = a0 ^ a1 ^ gmul(0x02, a2) ^ gmul(0x03, a3)
		result[3][col] = gmul(0x03, a0) ^ a1 ^ a2 ^ gmul(0x02, a3)
	}

	return result
}
func AES_SubBytes(state [4][4]byte) [4][4]byte {
	result := state
	for i := 0; i < 4; i++ {
		for j := 0; j < 4; j++ {
			result[i][j] = sbox[state[i][j]]
		}
	}
	return result
}

func getRoundKey(expandedKey []byte, round int) []byte {
	start := round * 16
	return expandedKey[start : start+16]
}
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
func RecoverCandidatesForByte(Cbyte, Cfbyte, delta byte) []byte {
	var cand []byte
	for k := 0; k < 256; k++ {
		kb := byte(k)
		v1 := invSbox[Cbyte^kb]
		v2 := invSbox[Cfbyte^kb]
		if (v1 ^ v2) == delta {
			cand = append(cand, kb)
		}
	}
	return cand
}

// IntersectSlices: 交集（去重）并按升序返回
func IntersectSlices(sets [][]byte) []byte {
	if len(sets) == 0 {
		return nil
	}
	count := make(map[byte]int)
	for _, b := range sets[0] {
		count[b] = 1
	}
	for i := 1; i < len(sets); i++ {
		cur := make(map[byte]bool)
		for _, b := range sets[i] {
			cur[b] = true
		}
		for k := range count {
			if !cur[k] {
				delete(count, k)
			}
		}
	}
	var res []byte
	for k := range count {
		res = append(res, k)
	}
	sort.Slice(res, func(i, j int) bool { return res[i] < res[j] })
	return res
}
func AES(key string, data string) string {
	dataBytes := []byte{0x32, 0x43, 0xf6, 0xa8, 0x88, 0x5a, 0x30, 0x8d, 0x31, 0x31, 0x98, 0xa2, 0xe0, 0x37, 0x07, 0x34}
	keyBytes := []byte{0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c}
	expected := []byte{0x39, 0x25, 0x84, 0x1d, 0x02, 0xdc, 0x09, 0xfb, 0xdc, 0x11, 0x85, 0x97, 0x19, 0x6a, 0x0b, 0x32}
	// dataBytes := []byte(data)
	// keyBytes := []byte(key)

	if len(keyBytes) != 16 {
		panic("密钥长度必须是16个字节")
	}

	if len(dataBytes)%16 != 0 {
		panic("明文长度必须是16倍数")
	}

	key_11 := AES_keyExpansion(keyBytes)

	for i := 0; i < len(key_11); i += 16 {
		end := i + 16
		if end > len(key_11) {
			end = len(key_11)
		}
		chunk := key_11[i:end]
		fmt.Printf("KEY %d => %x\n", i/16, chunk)
	}

	var result []byte

	for i := 0; i < len(dataBytes); i += 16 {
		block := make([]byte, 16)
		copy(block, dataBytes[i:i+16])
		var blockArray [16]byte
		copy(blockArray[:], block)
		AES_AddRoundKey(&blockArray, getRoundKey(key_11, 0))
		fmt.Println("AES_AddRoundKey =>", blockArray)
		block = blockArray[:]
		for k := 1; k <= 9; k++ {
			fmt.Printf("-------------------%d-------------------------\n", k)
			bm := AES_ByteMatrix(block)
			fmt.Println("AES_ByteMatrix => ", bm)
			bm = AES_SubBytes(bm)
			fmt.Println("AES_SubBytes => ", bm)
			bm = AES_ShiftRows(bm)
			fmt.Println("AES_ShiftRows => ", bm)
			bm = AES_MixColumns(bm)
			fmt.Println("AES_MixColumns => ", bm)
			arr := flattenByColumns(bm)
			fmt.Println("flattenByColumns => ", arr)
			AES_AddRoundKey(&arr, getRoundKey(key_11, k))
			block = arr[:]
			fmt.Println("AES_AddRoundKey => ", block)
		}
		fmt.Printf("-------------------%d-------------------------\n", 10)
		fmt.Println("Block => ", block)
		fmt.Println("Block_DFA => ", block)
		bm := AES_ByteMatrix(block)
		fmt.Println("AES_ByteMatrix => ", bm)
		bm = AES_SubBytes(bm)
		fmt.Println("AES_SubBytes => ", bm)
		bm = AES_ShiftRows(bm)
		fmt.Println("AES_ShiftRows => ", bm)
		arr := flattenByColumns(bm)
		fmt.Println("flattenByColumns => ", arr)
		AES_AddRoundKey(&arr, getRoundKey(key_11, 10))
		result = append(result, arr[:]...)
		fmt.Println("AES_AddRoundKey => ", arr)
	}
	fmt.Printf("-------------------%s-------------------------\n", "结果")
	fmt.Println(result)
	fmt.Println(expected)

	return string(result)
}

fun main() {
	key := "1234567890123456"
	data := "HelloAES12345678"
	AES(key, data)
}
```
