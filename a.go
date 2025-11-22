package main

import (
	"crypto/rand"
	"crypto/aes"
	"encoding/base64"
	"encoding/binary"
	"math/big"
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
		// block[0] ^= 0x3
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

var Sbox = [256]byte{
	0xd6, 0x90, 0xe9, 0xfe, 0xcc, 0xe1, 0x3d, 0xb7, 0x16, 0xb6, 0x14, 0xc2, 0x28, 0xfb, 0x2c, 0x05,
	0x2b, 0x67, 0x9a, 0x76, 0x2a, 0xbe, 0x04, 0xc3, 0xaa, 0x44, 0x13, 0x26, 0x49, 0x86, 0x06, 0x99,
	0x9c, 0x42, 0x50, 0xf4, 0x91, 0xef, 0x98, 0x7a, 0x33, 0x54, 0x0b, 0x43, 0xed, 0xcf, 0xac, 0x62,
	0xe4, 0xb3, 0x1c, 0xa9, 0xc9, 0x08, 0xe8, 0x95, 0x80, 0xdf, 0x94, 0xfa, 0x75, 0x8f, 0x3f, 0xa6,
	0x47, 0x07, 0xa7, 0xfc, 0xf3, 0x73, 0x17, 0xba, 0x83, 0x59, 0x3c, 0x19, 0xe6, 0x85, 0x4f, 0xa8,
	0x68, 0x6b, 0x81, 0xb2, 0x71, 0x64, 0xda, 0x8b, 0xf8, 0xeb, 0x0f, 0x4b, 0x70, 0x56, 0x9d, 0x35,
	0x1e, 0x24, 0x0e, 0x5e, 0x63, 0x58, 0xd1, 0xa2, 0x25, 0x22, 0x7c, 0x3b, 0x01, 0x21, 0x78, 0x87,
	0xd4, 0x00, 0x46, 0x57, 0x9f, 0xd3, 0x27, 0x52, 0x4c, 0x36, 0x02, 0xe7, 0xa0, 0xc4, 0xc8, 0x9e,
	0xea, 0xbf, 0x8a, 0xd2, 0x40, 0xc7, 0x38, 0xb5, 0xa3, 0xf7, 0xf2, 0xce, 0xf9, 0x61, 0x15, 0xa1,
	0xe0, 0xae, 0x5d, 0xa4, 0x9b, 0x34, 0x1a, 0x55, 0xad, 0x93, 0x32, 0x30, 0xf5, 0x8c, 0xb1, 0xe3,
	0x1d, 0xf6, 0xe2, 0x2e, 0x82, 0x66, 0xca, 0x60, 0xc0, 0x29, 0x23, 0xab, 0x0d, 0x53, 0x4e, 0x6f,
	0xd5, 0xdb, 0x37, 0x45, 0xde, 0xfd, 0x8e, 0x2f, 0x03, 0xff, 0x6a, 0x72, 0x6d, 0x6c, 0x5b, 0x51,
	0x8d, 0x1b, 0xaf, 0x92, 0xbb, 0xdd, 0xbc, 0x7f, 0x11, 0xd9, 0x5c, 0x41, 0x1f, 0x10, 0x5a, 0xd8,
	0x0a, 0xc1, 0x31, 0x88, 0xa5, 0xcd, 0x7b, 0xbd, 0x2d, 0x74, 0xd0, 0x12, 0xb8, 0xe5, 0xb4, 0xb0,
	0x89, 0x69, 0x97, 0x4a, 0x0c, 0x96, 0x77, 0x7e, 0x65, 0xb9, 0xf1, 0x09, 0xc5, 0x6e, 0xc6, 0x84,
	0x18, 0xf0, 0x7d, 0xec, 0x3a, 0xdc, 0x4d, 0x20, 0x79, 0xee, 0x5f, 0x3e, 0xd7, 0xcb, 0x39, 0x48,
}

var FK = [4]uint32{0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc}

var CK = [32]uint32{
	0x00070e15, 0x1c232a31, 0x383f464d, 0x545b6269,
	0x70777e85, 0x8c939aa1, 0xa8afb6bd, 0xc4cbd2d9,
	0xe0e7eef5, 0xfc030a11, 0x181f262d, 0x343b4249,
	0x50575e65, 0x6c737a81, 0x888f969d, 0xa4abb2b9,
	0xc0c7ced5, 0xdce3eaf1, 0xf8ff060d, 0x141b2229,
	0x30373e45, 0x4c535a61, 0x686f767d, 0x848b9299,
	0xa0a7aeb5, 0xbcc3cad1, 0xd8dfe6ed, 0xf4fb0209,
	0x10171e25, 0x2c333a41, 0x484f565d, 0x646b7279,
}

func rotl32(x uint32, n uint) uint32 { return (x << n) | (x >> (32 - n)) }

func tau(a uint32) uint32 {
	var b [4]byte
	b[0] = Sbox[byte(a>>24)] // 高八位
	b[1] = Sbox[byte(a>>16)] // 次高八位
	b[2] = Sbox[byte(a>>8)] // 次低八位
	b[3] = Sbox[byte(a)] // 低八位
	return uint32(b[0])<<24 | uint32(b[1])<<16 | uint32(b[2])<<8 | uint32(b[3]) // 合并还原32位并返回
}

// L linear transform for encryption rounds
func L(b uint32) uint32 {
	return b ^ rotl32(b, 2) ^ rotl32(b, 10) ^ rotl32(b, 18) ^ rotl32(b, 24)
}

// L' used in key schedule (T' transform)
func Lprime(b uint32) uint32 {
	return b ^ rotl32(b, 13) ^ rotl32(b, 23) // b ^ b循环左移13位 ^ 循环左移23位
}

// T = L(τ(...))
func T(x uint32) uint32 { return L(tau(x)) }

// T' = L'(τ(...))
func Tprime(x uint32) uint32 { return Lprime(tau(x)) }

// Expand 128-bit key (16 bytes) into 32 round keys (rk)
func keySchedule(key []byte) [32]uint32 {
	if len(key) != 16 {
		panic("key must be 16 bytes")
	}
	var MK [4]uint32 // init uint32 key
	for i := 0; i < 4; i++ {
		MK[i] = uint32(key[4*i])<<24 | uint32(key[4*i+1])<<16 | uint32(key[4*i+2])<<8 | uint32(key[4*i+3]) // make uint32 key
	}
	var K [36]uint32
	for i := 0; i < 4; i++ {
		K[i] = MK[i] ^ FK[i] // make key ^ local key
	}
	var rk [32]uint32
	for i := 0; i < 32; i++ {
		tmp := K[i+1] ^ K[i+2] ^ K[i+3] ^ CK[i] // k1 ^ k2 ^ k3 ^ ck0
		K[i+4] = K[i] ^ Tprime(tmp) // k4 => k[0] ^
		rk[i] = K[i+4] // rk[0] = k[4]
	}
	return rk
}

func encryptBlock(plaintext []byte, rk [32]uint32) []byte {
	if len(plaintext) != 16 {
		panic("plaintext must be 16 bytes")
	}
	var X [36]uint32
	for i := 0; i < 4; i++ { // 组合明文
		X[i] = uint32(plaintext[4*i])<<24 | uint32(plaintext[4*i+1])<<16 | uint32(plaintext[4*i+2])<<8 | uint32(plaintext[4*i+3])
	}
	for i := 0; i < 32; i++ { // 明文和rk进行异或处理并回填
		tmp := X[i+1] ^ X[i+2] ^ X[i+3] ^ rk[i]
		X[i+4] = X[i] ^ T(tmp) // 生成出来的数据和上面进行处理过的tmp经过t函数收进行异或处理
	}
	// output is X[35], X[34], X[33], X[32]
	out := make([]byte, 16)
	bs := []uint32{X[35], X[34], X[33], X[32]} // 根据规则进行选取
	for i := 0; i < 4; i++ {
		out[4*i] = byte(bs[i] >> 24)
		out[4*i+1] = byte(bs[i] >> 16)
		out[4*i+2] = byte(bs[i] >> 8)
		out[4*i+3] = byte(bs[i])
	}
	// uint32数到字节序列化
	return out
}

func decryptBlock(ciphertext []byte, rk [32]uint32) []byte {
	if len(ciphertext) != 16 {
		panic("ciphertext must be 16 bytes")
	}
	// For decryption, use rk in reverse order
	var rkInv [32]uint32
	for i := 0; i < 32; i++ {
		rkInv[i] = rk[31-i]
	}
	return encryptBlock(ciphertext, rkInv)
}

// DHKey 包含 Diffie-Hellman 的密钥对
type DHKey struct {
	PrivateKey *big.Int
	PublicKey  *big.Int
}

// GenerateDHKey 生成 Diffie-Hellman 密钥对
// p: 大质数, g: 生成元
func GenerateDHKey(p, g *big.Int) (*DHKey, error) {
	// 生成私钥：一个随机的大整数，范围 [1, p-2]
	// p-2 是因为私钥不能为0，且应该小于 p-1 以确保安全性
	privateKey, err := rand.Int(rand.Reader, new(big.Int).Sub(p, big.NewInt(2)))
	if err != nil {
		return nil, err
	}
	// 私钥至少为1
	privateKey.Add(privateKey, big.NewInt(1))

	// 计算公钥：g^privateKey mod p
	publicKey := new(big.Int).Exp(g, privateKey, p)

	return &DHKey{
		PrivateKey: privateKey,
		PublicKey:  publicKey,
	}, nil
}

// ComputeSharedSecret 计算共享密钥
// 使用自己的私钥和对方的公钥
func ComputeSharedSecret(privateKey, otherPublicKey, p *big.Int) *big.Int {
	// sharedSecret = otherPublicKey^privateKey mod p
	return new(big.Int).Exp(otherPublicKey, privateKey, p)
}

func DH() {
	// 1. 双方约定公共参数
	// 在实际应用中，这些参数通常是标准化的（如 RFC 3526 中定义）
	// 这里我们使用一个相对较小的质数作为示例（实际应用要用2048位或更大的质数）
	
	// p: 一个大质数
	p := big.NewInt(23) // 示例使用小质数，实际要用非常大的质数
	
	// g: 生成元，通常是2或者5
	g := big.NewInt(5)

	fmt.Printf("公共参数:\n")
	fmt.Printf("  质数 p = %s\n", p.String())
	fmt.Printf("  生成元 g = %s\n", g.String())
	fmt.Println()

	// 2. Alice 生成密钥对
	aliceKey, err := GenerateDHKey(p, g)
	if err != nil {
		fmt.Printf("Alice 密钥生成失败: %v\n", err)
		return
	}
	fmt.Printf("Alice:\n")
	fmt.Printf("  私钥 a = %s (保密)\n", aliceKey.PrivateKey.String())
	fmt.Printf("  公钥 A = g^a mod p = %s (公开)\n", aliceKey.PublicKey.String())
	fmt.Println()

	// 3. Bob 生成密钥对
	bobKey, err := GenerateDHKey(p, g)
	if err != nil {
		fmt.Printf("Bob 密钥生成失败: %v\n", err)
		return
	}
	fmt.Printf("Bob:\n")
	fmt.Printf("  私钥 b = %s (保密)\n", bobKey.PrivateKey.String())
	fmt.Printf("  公钥 B = g^b mod p = %s (公开)\n", bobKey.PublicKey.String())
	fmt.Println()

	// 4. 双方交换公钥后计算共享密钥

	// Alice 使用自己的私钥和 Bob 的公钥计算共享密钥
	aliceSharedSecret := ComputeSharedSecret(aliceKey.PrivateKey, bobKey.PublicKey, p)
	fmt.Printf("Alice 计算的共享密钥:\n")
	fmt.Printf("  s = B^a mod p = %s\n", aliceSharedSecret.String())
	fmt.Println()

	// Bob 使用自己的私钥和 Alice 的公钥计算共享密钥
	bobSharedSecret := ComputeSharedSecret(bobKey.PrivateKey, aliceKey.PublicKey, p)
	fmt.Printf("Bob 计算的共享密钥:\n")
	fmt.Printf("  s = A^b mod p = %s\n", bobSharedSecret.String())
	fmt.Println()

	// 5. 验证双方计算的共享密钥是否相同
	if aliceSharedSecret.Cmp(bobSharedSecret) == 0 {
		fmt.Printf("✅ 成功！双方建立了相同的共享密钥: %s\n", aliceSharedSecret.String())
		fmt.Printf("   这个密钥可以用于 AES 等对称加密\n")
	} else {
		fmt.Printf("❌ 错误！共享密钥不匹配\n")
	}

	// 6. 演示窃听者看到的信息
	fmt.Println("\n--- 窃听者视角 ---")
	fmt.Printf("能看到的信息: p=%s, g=%s\n", p.String(), g.String())
	fmt.Printf("               Alice公钥 A=%s\n", aliceKey.PublicKey.String())
	fmt.Printf("               Bob公钥 B=%s\n", bobKey.PublicKey.String())
	fmt.Printf("无法得知: Alice私钥(a), Bob私钥(b), 共享密钥(s)\n")
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

	// key := "1234567890123456"
	// data := "HelloAES12345678"
	// AES(key, data)

	// verifyWithStdlib(key, data)
	// dfa_try()

	// key, _ := hex.DecodeString("000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f")
	// nonce, _ := hex.DecodeString("000000090000004a00000000")
	//
	// plaintext := []byte("Hello ChaCha20")
	// fmt.Println("plaintext:", string(plaintext))
	//
	// cipher := ChaCha20(key, nonce, plaintext, 1)
	// fmt.Println("cipher hex:", hex.EncodeToString(cipher))
	//
	// restore := ChaCha20(key, nonce, cipher, 1)
	// fmt.Println("restore:", string(restore))

	// test vector from SM4 specification:
	// keyHex := "0123456789abcdeffedcba9876543210"
	// ptHex := "0123456789abcdeffedcba9876543210"
	// expectedCtHex := "681edf34d206965e86b3e94f536e4246"
	//
	// key, _ := hex.DecodeString(keyHex)
	// pt, _ := hex.DecodeString(ptHex)
	// // expectedCt, _ := hex.DecodeString(expectedCtHex)
	//
	// rk := keySchedule(key)
	// ct := encryptBlock(pt, rk)
	// dt := decryptBlock(ct, rk)
	//
	// fmt.Printf("Key: %s\n", keyHex)
	// fmt.Printf("Plain: %s\n", ptHex)
	// fmt.Printf("Expected CT: %s\n", expectedCtHex)
	// fmt.Printf("Got CT: %s\n", hex.EncodeToString(ct))
	// fmt.Printf("Decrypted: %s\n", hex.EncodeToString(dt))
	//
	// if hex.EncodeToString(ct) == expectedCtHex {
	// 	fmt.Println("SM4 encrypt test: OK")
	// } else {
	// 	fmt.Println("SM4 encrypt test: FAIL")
	// }
}
