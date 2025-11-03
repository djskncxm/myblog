---
title: Playfair密码
type: docs
---

![Playfair](../../../Playfair.png)
在密码学的万神殿里，如果说凯撒密码是入门级的“Hello World”，那么Playfair密码无疑是第一座真正需要动脑筋翻越的小山。它首次告别了简单的单字母替换，开创了“双字母组” 加密的先河，将密码的强度提升了一个维度。

这个由查尔斯·惠斯通发明，并由他的朋友Playfair勋爵推广的算法，以其优雅的规则和手工时代难以破解的特性而闻名。它不仅是维多利亚时代密码学的杰作，更是理解现代分组密码思想的绝佳起点。准备好你的5x5矩阵，我们即将开始一场逻辑与智慧的构建之旅

---
这个密码我自己感觉不行，信息损坏太多了，对于这个在我们讲完就可以给各位揭秘了，不过这个也是密码学的一座丰碑了
# 算法原理
## 密钥处理
我们首先来讲一个Playfair开创性的东西，`密钥表`这个不再像维吉尼亚密码一样只在一维进行偏移计算了，他使用密钥来生成一个比表格，接下来我来讲表格是怎么生成的

首先对密钥本身进行处理

- 将密钥中所有非英文字符去除
- 将密钥所有英文字符转大写
- 讲字母`J`替换为字母`I`
- 移除密钥中重复字符,只保存第一次出现的字符

然后就是表的生成了

- 将处理过后的密钥依次填入
- 将剩余未使用的字母按顺序填入,表格剩余位置

我们来看一个示例 密钥为:`PLAYFAIR EXAMPLE`

我们首先处理掉空格，然后转成大写，将J替换为I，这里没有就暂时不处理了，然后去除掉重复出现的字符,然后得到的真实密钥就是`PLAYFIREXM`

然后进行填入
```text 
P L A Y F
I R E X M
B C D G H
K N O Q S
T U V W Z
```
前两行是我们已使用过的字符，后面填充没有使用过的字符,这时候我们就搞定密钥表了，下面来看明文处理
## 明文处理
对于明文处理Playfair算法也是和维吉尼亚密码有相当大的区别，维吉尼亚密码以及之前的密码都是单字符进行加密，Playfair密码是两个字符进行分组并加密

我们来加密一句话吧`Hello World`，加密也是非常常见的话了

- 首先全部转化为大写，得到`HELLO WORLD`
- 移除非字母字符，得到`HELLOWORLD`
- 讲字符`J`替换为`I`，这里没有J就不进行替换了
- 然后就是处理重复字符
> - Playfair处理是两个字符两个字符进行处理
> - 每两个相同字符之间来进行插入`X`，我们的`HELLO`的`LL`是重复的那么我们就在这之间插入`X`占位符，还有就是插入结束后求现在明文的长度，如果是奇数那么就在最后插入`X`占位,我们最后的处理结果就是
>> HE LX LO WO RL DX
- 然后下一步就是进行真正的加密了

## 加密处理
```text
HE LX LO WO RL DX

P L A Y F
I R E X M
B C D G H
K N O Q S
T U V W Z
```
这个计算有三条计算规则

- 同一行
> 取右边的字母（循环）
- 同一列
> 取下边的字母（循环）
- 不同行不同列
> 形成矩形 → 用同一行、对角列的字母替换

然后我们来进行计算

## 手推密码
HE：H 在 (3,5)，E 在 (2,3),不同列不同行 → 取矩形的另一角 </br>
H → (3,3)=D， E → (2,5)=M → DM </br>
LX：L (1,2)，X (2,4)。矩形规则 </br>
L → (1,4)=Y， X → (2,2)=R → YR </br>
LO：L (1,2)，O (4,3)。矩形规则 </br>
L → (1,3)=A， O → (4,2)=N → AN </br>
WO：W (5,4)，O (4,3)。矩形规则 </br>
W → (5,3)=V， O → (4,4)=Q → VQ </br>
RL：R (2,2)，L (1,2)。同一列 → 各取下一行(下方循环)</br>
DX：D (3,3)，X (2,4)。矩形规则 </br>
D → (3,4)=G， X → (2,3)=E → GE </br>
最后得到的结果就是`dmyrqvneac`

# 代码
这个东西的代码还需要打磨，实现起来确实复杂，等我自己想象
![Playfair_img](../../../Playfair_img.png)
就这个东西很抽象，它标准算法并不包含处理字符串，但是你自己需要处理字符串的，这个字符串如果是偶数，最后一个你X你还需要去做内容含义判断
然后还有里面插入的x和空格也是需要解密人员去自己根据含义来进行还原，消息损耗太大了，我感觉不好用，现在已经是下午了，上午把文章写完，下午自己又想了想算法
```go
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
	fmt.Println(playfair_encrypt("HELLO WORLD", "PLAYFAIR EXAMPLE"))
}
```


