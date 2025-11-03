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

func main() {
	// data := []byte("Hello World!")
	// encoded := EncodeBase64(data)
	// fmt.Println(encoded)

	// data := "duck"
	// Caesar_Cipher(data)

	// fmt.Println(Vigenère_Cipher("DUCK", "KEY"))

	fmt.Println(playfair_encrypt("HELLO WORLD", "PLAYFAIR EXAMPLE"))

}
