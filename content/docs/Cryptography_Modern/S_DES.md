---
title: S-DES密码
type: docs
---
![s-des](../../../S_DES_bg.png)
> 在数字安全的浩瀚星空中，总有一些算法如同恒星般闪耀——它们或许已不再用于实战，却永远照亮着前行的道路。S-DES，正是这样一颗永恒的启明星。

想象一下1970年代的数字世界：计算机网络刚刚萌芽，商业机构开始意识到数据安全的重要性，却苦于没有标准化的加密方案。就在这样的背景下，DES（Data Encryption Standard） 横空出世，成为历史上第一个公开的、标准化的加密算法，开启了现代密码学的黄金时代

# 什么是S-DES？
这个算法是`Simplified DES`,这个就是简单版本的DES加密,不过它保存了DES算法的核心概念，我们也可以根据它进行DES的预习
- 密钥生成的艺术——从10位主密钥衍生子密钥的奇妙旅程
- Feistel结构的优雅——轮函数的精妙舞蹈
- S盒的神秘魔法——密码学中唯一的非线性变换
- 置换与混淆—— Shannon密码理论的可视化呈现


它是现代密码学中教学使用的，因为上课时候人很难直接手撕出来完整标准DES，那么我们就把这个标准DES减小范围，S-DES的范围是,
明文`8 byte`，密钥是`10 byte`,我们的对密码学的研究就可以从这里开始，到这我自己都不知道应该怎么写下去了，这个完全用文字写出来还是对我很难，我们还是来拿一个案例吧，不再这里干讲了
# S-DES
## 手推算法
我们来规定明文和密钥
- 密钥 -> 1010000010
- 明文 -> 01100100

### 密钥处理
首先我们还是来先处理密钥，密钥也不算很难，不过涉及了一些新概念
#### 密钥生成
K = 1 0 1 0 0 0 0 0 1 0

然后引入一个新概念，`P10`置换，这个是怎么做的呢？</br>
P10是一个数组，一个标准算法中写死的东西</br>
P10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6]</br>
P10就是我们密钥的顺序，从1-10来进行密钥索引的置换
```text
原：1 0 1 0 0 0 0 0 1 0
P10: 1 0 0 0 0 | 0 1 1 0 0
```
然后我们从中间分开，让他们各自左移一位
```text
L1 = 00001
R1 = 11000
```
然后我们接着引入一个新东西，`P8`置换，这个和P10类似，不过也有不同的地方</br>
`P8 = [6, 3, 7, 4, 8, 5, 10, 9]`</br>
然后`L1 + R1`拼接一下，再按照P8的位置进行选择，这时候我们发现P8没有1和2，这是因为1和2被丢弃了，这是专门设计出来的
- 破坏线性
- 增加非线性
- 增强混淆

这三点加出来以后就可以大大提高安全性，让攻击者无法按照古典密码的思想进行破解</br>
下一步是偏移过后的L1再左移两位
```text
L2 = 00100
R2 = 00011
```
它们再进行拼接，继续按照上次的P8表进行选择置换，这样就得到了第二个密钥
这时候我们K1和K2都得到了
```text
K1 => 10100100
K2 => 01000011
```
### 明文处理
然后就是该我们的明文处理了，这个其实也不是很难</br>
我们的明文是`d`,转成二进制是`01100100`
#### 明文生成
经过前面密钥的推算，我们也对置换有了一点熟悉，S-DES的明文也是需要置换的</br>
IP = [2, 6, 3, 1, 4, 8, 5, 7]</br>
```text
M  = 0 1 1 0 0 1 0 0
idx= 1 2 3 4 5 6 7 8
```
然后按IP的位置进行置换
```text
1位 = 2 = 1
2位 = 6 = 1
3位 = 3 = 1
4位 = 1 = 0
5位 = 4 = 0
6位 = 8 = 0
7位 = 5 = 0
8位 = 7 = 0
IP(M) = 1 1 1 0 0 0 0 0
```
然后我们又要遇见一个新东西，`Feistel结构`,这个也是DES现代美密码学的一个重要的东西，不过也不难，还是可以用手推算出来
把这个IP出来的东西分成两块，我们先来讲第一块东西做的操作
```text
L0 = 1 1 1 0
R0 = 0 0 0 0
```
##### EP置换
EP = [4,1,2,3,2,3,4,1] </br>
EP是对R0进行扩展置换，它就是找位置然后填充到一个数组里面去</br>
EP = [0 0 0 0 0 0 0 0]
然后我们使用现在这个EP和K1密钥进行异或运算
```text
EP输出: 0 0 0 0 0 0 0 0
K1:     1 0 1 0 0 1 0 0
XOR:    1 0 1 0 | 0 1 0 0
```
然后分割成两块，左边4位和右边四位，这里有引出了一个新东西`S盒`，这个东西是两个二维数组
- S0
```text
行\列 | 0  1  2  3
-----|-------------
  0  | 1  0  3  2
  1  | 3  2  1  0  
  2  | 0  2  1  3
  3  | 3  1  3  2
```
- S1
```text
行\列 | 0  1  2  3
-----|-------------
  0  | 0  1  2  3  
  1  | 2  0  1  3
  2  | 3  0  1  0
  3  | 2  1  0  3
```
左边四位进入S0，右边四位进入S1，我们开始第一个S0的运算
- S0运算
这个是行和列的运算
> 行 = (b1,b4) = (1,0) = 2</br>
行计算就是拿到对应位置的两个数字，组合起来然后转成10进制，这个作为行
> 列 = (b2,b3) = (0,1) = 1</br>
列计算就是拿到对应位置的两个数字，组合起来然后转成10进制，这个作为列
> S0[2,1] = 2 → 10</br>
行和列进行交叉，然后转成二进制
- S1运算
行 = 10 = 2
列 = 00 = 0
2,0 = 2 = 10
这个是右边四位，计算方法和上面S0是一样的
然后得出来的也是11
两个进行拼接，最后得出来的就是`1010`，然后进行P4置换</br>
P4 = [2, 4, 3, 1]</br>
将S盒结果置换到里面得到`0101`</br>
然后我们来和左边L0部分进行异或
```text
左半 L0: 1 1 1 0
P4输出:  0 1 0 1
XOR:     1 0 1 1
```
然后我们把最原来的R0放到左半边，把上一部异或出来的东西放到右半边,得到`00001011`，得到这个结果后我们再拆分两块，右边那块再使用K2密钥继续运算，得到`10111111`

接下来就是我们最后一步了，一个叫做`IP-1`的置换操作</br>
IP⁻¹ = [4, 1, 3, 5, 7, 2, 8, 6]</br>
```text
IP⁻¹ = [4, 1, 3, 5, 7, 2, 8, 6]

输入：1 0 1 1 1 1 1 1
位置：1 2 3 4 5 6 7 8

IP⁻¹置换：
- 位置1 ← 原位置4 = 1
- 位置2 ← 原位置1 = 1  
- 位置3 ← 原位置3 = 1
- 位置4 ← 原位置5 = 1
- 位置5 ← 原位置7 = 1
- 位置6 ← 原位置2 = 0
- 位置7 ← 原位置8 = 1
- 位置8 ← 原位置6 = 1

输出：1 1 1 1 1 0 1 1
```
最终结果是`11111011`
---
终于写完了，想的我脑子疼，马上爆炸

# 代码
我写了的是个go版本，cpp的GitHub上面有个版本，C我是真写不出来太费劲了，还请各位自己写吧
```go
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
	key := [10]byte{1, 0, 1, 0, 0, 0, 0, 0, 1, 0}
	reslut := S_DES('d', key)

	var val byte
	for i := 0; i < 8; i++ {
		val <<= 1
		val |= reslut[i]
	}
	letter := 'A' + val%26
	fmt.Printf("%c\n", letter)
}
```
