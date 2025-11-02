---
title: 维吉尼亚密码
type: docs
prev: docs/base64
---
![VigenèreCipher](../../../2025-11-02-15-42-20.png)
在密码学的长河中，维吉尼亚密码曾是一座难以逾越的丰碑。它凭借多表替换的巧思，将简单的单字母频率分析彻底粉碎，让数百年的密码破译者徒呼奈何。这座由密钥词编织的迷宫，虽最终被巴贝奇和卡西斯基的利剑攻破，但其精妙的设计，永远标志着古典密码艺术所能抵达的辉煌顶峰

--- 
维吉尼亚密码是一个具有开创性的加密算法，是当时很难破解的密码，现在站在21世纪的思想来看这个是有一定漏洞，可以破解的，那我们就一起来看这个密码的具体算法吧
# 算法和表现
## 核心思想
维吉尼亚密码通过将明文与重复的密钥词对齐，根据密钥字母决定每个明文字母的偏移量，实现加密。每个明文字母的偏移量可能不同，因此同一字母在密文中可能对应不同字母，频率分析难度增加</br>
我还是以`duck`来举例，不过维吉尼亚密码多了一个东西`key`密钥，这个密钥就是维吉尼亚密码开创之一，后面很多密码也是带有密钥的
- 加密内容`duck`
- 加密密钥`key`
明文与重复密钥词对齐，根据每个明文字母偏移量，这句话其实就是</br>
明文： D U C K</br>
密钥： K E Y K</br>
然后就是加密运算了，字母偏移量其实就是码表的index，这样理解好点</br>
ABCDEFGHIJKLMNOPQRSTUVWXYZ</br>
A到Z从0到25偏移量就是字母的索引,对于怎么找索引这个就看各位了,确实很基础的东西</br>
既然知道了,我们就开始实际推敲一下这个密码是怎么做的</br>
- D -> 3
- U -> 20
- C -> 2
- K -> 10

- K -> 10
- E -> 4
- Y -> 24

具体加密算法也给出了</br>
{{< callout >}} **密文索引 =** (明文索引 + 密钥索引) mod 26 {{< /callout >}}
- D(3)  + K(10) = 13            = N
- U(20) + E(4)  = 24            = Y
- C(2)  + Y(24) = 26 % 26 = 0   = A
- k(10) + K(10) = 20            = U

这样的结果就是`NYAU`,主要算法就是这样,那么我们就可以来进行代码编写了

# 写代码
首先开始go的代码,然后再写C的代码
```go

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

func main() {
	fmt.Println(Vigenère_Cipher("DUCK", "KEY"))
}
```
这个就是一个基本实现了，各位可可以根据代码来推敲一下算法,这个我自己实现的版本太垃圾了，这个是AI优化过的，好看了很多，对于C语言代码只要换一下关键字就行了，基本不用重写，
我们维吉尼亚密码到这里就结束了，下次更新`Playfair密码`
