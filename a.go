package main

import (
	"fmt"
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
}
