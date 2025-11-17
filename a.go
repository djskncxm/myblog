package main

import (
	"crypto/aes"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"sort"
	"strings"
)

var base64Table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

func EncodeBase64(data []byte) string {
	var result []byte
	n := len(data)
	for i := 0; i < n; i += 3 {
		var b [3]byte
		remaining := n - i
		copy(b[:], data[i:])

		val := uint(b[0])<<16 | uint(b[1])<<8 | uint(b[2])

		for j := 18; j >= 0; j -= 6 {
			index := (val >> j) & 0x3F
			result = append(result, base64Table[index])
		}

		if remaining == 1 {
			result[len(result)-2] = '='
			result[len(result)-1] = '='
		} else if remaining == 2 {
			result[len(result)-1] = '='
		}
	}
	return string(result)
}

func Caesar_Cipher(data string) string {
	data = strings.ToUpper(data)
	var res strings.Builder
	for _, char := range data {
		if char >= 'A' && char <= 'Z' {
			enc := byte((int(char-'A')+3)%26 + 'A')
			res.WriteByte(enc)
		}
	}
	return res.String()
}
func Vigenère_Cipher(data string, key string) string {
	var result strings.Builder
	key = strings.ToUpper(key)
	keyIndex := 0
	for i := 0; i < len(data); i++ {
		char := data[i]

		if char >= 'A' && char <= 'Z' {
			plainIndex := char - 'A'
			keyChar := key[keyIndex%len(key)]
			cipherIndex := (plainIndex + (keyChar - 'A')) % 26
			result.WriteByte('A' + cipherIndex)
			keyIndex++
		} else if char >= 'a' && char <= 'z' {
			plainIndex := char - 'a'
			keyChar := key[keyIndex%len(key)]
			cipherIndex := (plainIndex + (keyChar - 'A')) % 26
			result.WriteByte('a' + cipherIndex)
			keyIndex++
		} else {
			result.WriteByte(char)
		}
	}

	return result.String()
}

func playfair_buildMatrix(key string) (Matrix [5][5]rune, key_table map[rune][2]int) {
	data := strings.ToUpper(strings.ReplaceAll(key, "J", "I"))

	used := map[rune]bool{}
	var chars []rune

	for _, c := range data {
		if c >= 'A' && c <= 'Z' && !used[c] {
			used[c] = true
			chars = append(chars, c)
		}
	}

	for c := 'A'; c <= 'Z'; c++ {
		if c == 'J' {
			continue
		}
		if !used[c] {
			chars = append(chars, c)
			used[c] = true
		}
	}

	var matrix [5][5]rune
	pos := map[rune][2]int{}
	for i, c := range chars {
		r, col := i/5, i%5
		matrix[r][col] = c
		pos[c] = [2]int{r, col}
	}

	return matrix, pos
}

func playfair_Preprocess(text string) string {
	text = strings.ToUpper(strings.ReplaceAll(text, "J", "I"))
	var result []rune

	for i := 0; i < len(text); i++ {
		c1 := rune(text[i])
		var c2 rune
		if i+1 < len(text) {
			c2 = rune(text[i+1])
			if c1 == c2 {
				c2 = 'X'
			} else {
				i++
			}
		}
		result = append(result, c1, c2)
	}
	if len(result)%2 == 0 {
		result = append(result, 'X')
	}

	return strings.ReplaceAll(string(result), " ", "")
}

func playfair_encrypt(data string, key string) (res string) {
	var result []rune
	data = playfair_Preprocess(data)
	matrix, pos := playfair_buildMatrix(key)
	fmt.Println(pos)

	for i := 0; i < len(data); i += 2 {
		a, b := rune(data[i]), rune(data[i+1])
		r1, c1 := pos[a][0], pos[a][1]
		r2, c2 := pos[b][0], pos[b][1]

		var x, y rune
		switch {
		case r1 == r2:
			x = matrix[r1][(c1+1)%5]
			y = matrix[r2][(c2+1)%5]
		case c1 == c2:
			x = matrix[(r1+1)%5][c1]
			y = matrix[(r2+1)%5][c2]
		default:
			x = matrix[r1][c2]
			y = matrix[r2][c1]
		}
		result = append(result, x, y)
	}

	return string(result)
}
func S_DES_KeyLL(key []byte, shiftCount int) [5]byte {
	length := len(key)
	reslut := make([]byte, length)

	for i := 0; i < length; i++ {
		reslut[i] = key[(i+shiftCount)%length]
	}
	var out [5]byte
	copy(out[:], reslut)
	return out
}

func S_DES_P8(key []byte) [8]byte {

	P8 := [8]int{5, 2, 6, 3, 7, 4, 9, 8}

	var result [8]byte
	for i, pos := range P8 {
		result[i] = key[pos]
	}
	return result
}

func S_DESBuildKeys(key [10]byte) map[string][]byte {
	P10 := [10]int{2, 4, 1, 6, 3, 9, 0, 8, 7, 5}

	var newKey [10]byte

	for i, pos := range P10 {
		newKey[i] = key[pos]
	}

	L1 := newKey[:5]
	R1 := newKey[5:]
	LL1 := S_DES_KeyLL(L1, 1)
	RR1 := S_DES_KeyLL(R1, 1)

	combined := append(LL1[:], RR1[:]...)
	P8_KEY1 := S_DES_P8(combined)

	LL2 := S_DES_KeyLL(LL1[:], 2)
	RR2 := S_DES_KeyLL(RR1[:], 2)
	combined2 := append(LL2[:], RR2[:]...)
	P8_KEY2 := S_DES_P8(combined2)

	return map[string][]byte{"k1": P8_KEY1[:], "k2": P8_KEY2[:]}
}

func S_DESBuildData(data [8]byte) (result [8]byte) {
	IP := [8]int{1, 5, 2, 0, 3, 7, 4, 6}

	for i, p := range IP {
		result[i] = data[p]
	}

	return result
}

func S_DES_EP(bin []byte, key []byte) [8]byte {
	EP := [8]byte{3, 0, 1, 2, 1, 2, 3, 0}

	var EP_1 [8]byte
	for i, p := range EP {
		EP_1[i] = bin[p] ^ key[i]
	}

	return EP_1
}

func S_DES_S(bin []byte, S [4][4]byte) [2]byte {
	row := bin[0]*2 + bin[3]
	col := bin[1]*2 + bin[2]

	val := S[row][col]

	return [2]byte{(val >> 1) & 1, val & 1}
}

func S_DES_F(bin [8]byte, key []byte) [8]byte {
	EPout := S_DES_EP(bin[4:], key)
	var S0 = [4][4]byte{
		{1, 0, 3, 2},
		{3, 2, 1, 0},
		{0, 2, 1, 3},
		{3, 1, 3, 2},
	}

	var S1 = [4][4]byte{
		{0, 1, 2, 3},
		{2, 0, 1, 3},
		{3, 0, 1, 0},
		{2, 1, 0, 3},
	}

	S0out := S_DES_S(EPout[:4], S0)
	S1out := S_DES_S(EPout[4:], S1)

	preP4 := [4]byte{S0out[0], S0out[1], S1out[0], S1out[1]}
	P4 := [4]byte{1, 3, 2, 0}

	var out [4]byte
	for i, p := range P4 {
		out[i] = preP4[p]
	}

	L1 := [4]byte{}
	for i := 0; i < 4; i++ {
		L1[i] = bin[i] ^ out[i]
	}
	R1 := bin[4:]

	result := [8]byte{}
	copy(result[:4], L1[:])
	copy(result[4:], R1)

	fmt.Println(result)

	return result
}

func S_DES_IP_1(fout []byte) []byte {
	IPinv := [8]int{3, 0, 2, 4, 6, 1, 7, 5}
	var ciphertext [8]byte
	for i, p := range IPinv {
		ciphertext[i] = fout[p]
	}
	return ciphertext[:]
}

func S_DES(text byte, key [10]byte) []byte {
	keys := S_DESBuildKeys(key)

	var bin [8]uint8

	for i := 0; i < 8; i++ {
		bin[i] = (text >> (7 - i)) & 1
	}

	data := S_DESBuildData(bin)

	Fout := S_DES_F(data, keys["k1"])
	swapped := [8]byte{}
	copy(swapped[:4], Fout[4:])
	copy(swapped[4:], Fout[:4])
	F2out := S_DES_F(swapped, keys["k2"])

	return S_DES_IP_1(F2out[:])
}

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

// --- 在文件顶部或合适位置放 SBox / InvSBox ---
var invSbox = [256]byte{
	0x52, 0x09, 0x6A, 0xD5, 0x30, 0x36, 0xA5, 0x38, 0xBF, 0x40, 0xA3, 0x9E, 0x81, 0xF3, 0xD7, 0xFB,
	0x7C, 0xE3, 0x39, 0x82, 0x9B, 0x2F, 0xFF, 0x87, 0x34, 0x8E, 0x43, 0x44, 0xC4, 0xDE, 0xE9, 0xCB,
	0x54, 0x7B, 0x94, 0x32, 0xA6, 0xC2, 0x23, 0x3D, 0xEE, 0x4C, 0x95, 0x0B, 0x42, 0xFA, 0xC3, 0x4E,
	0x08, 0x2E, 0xA1, 0x66, 0x28, 0xD9, 0x24, 0xB2, 0x76, 0x5B, 0xA2, 0x49, 0x6D, 0x8B, 0xD1, 0x25,
	0x72, 0xF8, 0xF6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xD4, 0xA4, 0x5C, 0xCC, 0x5D, 0x65, 0xB6, 0x92,
	0x6C, 0x70, 0x48, 0x50, 0xFD, 0xED, 0xB9, 0xDA, 0x5E, 0x15, 0x46, 0x57, 0xA7, 0x8D, 0x9D, 0x84,
	0x90, 0xD8, 0xAB, 0x00, 0x8C, 0xBC, 0xD3, 0x0A, 0xF7, 0xE4, 0x58, 0x05, 0xB8, 0xB3, 0x45, 0x06,
	0xD0, 0x2C, 0x1E, 0x8F, 0xCA, 0x3F, 0x0F, 0x02, 0xC1, 0xAF, 0xBD, 0x03, 0x01, 0x13, 0x8A, 0x6B,
	0x3A, 0x91, 0x11, 0x41, 0x4F, 0x67, 0xDC, 0xEA, 0x97, 0xF2, 0xCF, 0xCE, 0xF0, 0xB4, 0xE6, 0x73,
	0x96, 0xAC, 0x74, 0x22, 0xE7, 0xAD, 0x35, 0x85, 0xE2, 0xF9, 0x37, 0xE8, 0x1C, 0x75, 0xDF, 0x6E,
	0x47, 0xF1, 0x1A, 0x71, 0x1D, 0x29, 0xC5, 0x89, 0x6F, 0xB7, 0x62, 0x0E, 0xAA, 0x18, 0xBE, 0x1B,
	0xFC, 0x56, 0x3E, 0x4B, 0xC6, 0xD2, 0x79, 0x20, 0x9A, 0xDB, 0xC0, 0xFE, 0x78, 0xCD, 0x5A, 0xF4,
	0x1F, 0xDD, 0xA8, 0x33, 0x88, 0x07, 0xC7, 0x31, 0xB1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xEC, 0x5F,
	0x60, 0x51, 0x7F, 0xA9, 0x19, 0xB5, 0x4A, 0x0D, 0x2D, 0xE5, 0x7A, 0x9F, 0x93, 0xC9, 0x9C, 0xEF,
	0xA0, 0xE0, 0x3B, 0x4D, 0xAE, 0x2A, 0xF5, 0xB0, 0xC8, 0xEB, 0xBB, 0x3C, 0x83, 0x53, 0x99, 0x61,
	0x17, 0x2B, 0x04, 0x7E, 0xBA, 0x77, 0xD6, 0x26, 0xE1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0C, 0x7D,
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

func dfa_try() {
	// ------------- 这里是你给的例子 -------------
	C0 := byte(57)   // 正确密文该字节（示例）
	Cf0 := byte(206) // 错误密文该字节（示例）
	delta := byte(0x02)

	// 单样本候选
	cands := RecoverCandidatesForByte(C0, Cf0, delta)
	for _, b := range cands {
		fmt.Printf("候选key 0x%02x \n", b)
	}
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
		block[0] ^= 0x3
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
func verifyWithStdlib(key, data string) {
	keyBytes := []byte(key)
	dataBytes := []byte(data)

	// 使用标准库AES
	block, _ := aes.NewCipher(keyBytes)
	encrypted := make([]byte, 16)
	block.Encrypt(encrypted, dataBytes)

	fmt.Printf("标准库结果 (Hex): %s\n", hex.EncodeToString(encrypted))
	fmt.Printf("标准库结果 (Base64): %s\n", base64.StdEncoding.EncodeToString(encrypted))

	// 你的实现
	yourResult := AES(key, data)
	fmt.Printf("你的结果 (Hex): %s\n", hex.EncodeToString([]byte(yourResult)))
	fmt.Printf("你的结果 (Base64): %s\n", base64.StdEncoding.EncodeToString([]byte(yourResult)))

	// 比较
	if hex.EncodeToString(encrypted) == hex.EncodeToString([]byte(yourResult)) {
		fmt.Println("✅ 实现正确！")
	} else {
		fmt.Println("❌ 实现有误")
	}
}

func gcd(a, b int) {
	for b != 0 {
		a, b = b, a%b
	}

	fmt.Println(a)
}

func gcd2(x, y int) (a, b, c int) {
	// x = 30
	// y = 12
	x0, x1 := 1, 0 // 用 1 个 A + 0 个 B = 30
	y0, y1 := 0, 1 // 用 0 个 A + 1 个 B = 12

	for y != 0 {
		q := x / y
		// 大堆 30，减去两(2的由来)堆小堆 12 → 剩余 6
		// 12 / 6 = 2
		x, y = y, x%y
		// 12 6
		// 6 0

		x0, x1 = x1, x0-q*x1
		//        0  1
		//        1  0
		y0, y1 = y1, y0-q*y1
		//       1   -2
		//       -2  -4
	}

	return x, x0, y0
}

func main() {
	// data := []byte("Hello World!")
	// encoded := EncodeBase64(data)
	// fmt.Println(encoded)

	// data := "duck"
	// Caesar_Cipher(data)

	// fmt.Println(Vigenère_Cipher("DUCK", "KEY"))

	// fmt.Println(playfair_encrypt("HELLO WORLD", "PLAYFAIR EXAMPLE"))

	// key := [10]byte{1, 0, 1, 0, 0, 0, 0, 0, 1, 0}
	// reslut := S_DES('d', key)
	//
	// var val byte
	// for i := 0; i < 8; i++ {
	// 	val <<= 1
	// 	val |= reslut[i]
	// }
	// letter := 'A' + val%26
	// fmt.Printf("%c\n", letter)

	key := "1234567890123456"
	data := "HelloAES12345678"
	AES(key, data)

	// verifyWithStdlib(key, data)
	// dfa_try()
	gcd2(30, 12)
}
