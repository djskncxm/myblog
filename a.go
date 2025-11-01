package main

import "fmt"

var base64Table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

func EncodeBase64(data []byte) string {
	var result []byte
	n := len(data)
	for i := 0; i < n; i += 3 {
		var b [3]byte
		remaining := n - i
		copy(b[:], data[i:])

		// 24 位数据
		val := uint(b[0])<<16 | uint(b[1])<<8 | uint(b[2])

		// 取 6 位一组
		for j := 18; j >= 0; j -= 6 {
			index := (val >> j) & 0x3F
			result = append(result, base64Table[index])
		}

		// 填充 '='
		if remaining == 1 {
			result[len(result)-2] = '='
			result[len(result)-1] = '='
		} else if remaining == 2 {
			result[len(result)-1] = '='
		}
	}
	return string(result)
}

func main() {
	data := []byte("Hello World!")
	encoded := EncodeBase64(data)
	fmt.Println(encoded) // 输出: "SGVsbG8gV29ybGQh"
}
