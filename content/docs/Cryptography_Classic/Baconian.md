---
title: Baconian密码
type: docs
---
![Baconian](../../../dark-waves.jpg)
这个密码也是非常非常好玩有意思的密码
# 加密规则
1. 核心原理：二进制思想的雏形</br>
    培根密码的本质是一种替换密码，但它不是直接把字母换成另一个字母，而是将每个明文字母替换成一个由“A”和“B”组成的5位二进制组合  
    为什么是5位？ 因为 2^5 = 32，这足以覆盖26个英文字母(I/J和U/V在某些版本中被视为相同,以凑整26个)  
    “A”和“B”代表什么？ 它们可以代表任何两种截然不同的状态，比如：
    > 两种字体（如普通字体和粗体）  
    > 大小写字母  
    > 两种不同的符号  
    > 声音的高低  

```text
字  密码	字符  密码	 字符   密码  字符   密码
a   AAAAA   g     AABBA   n    ABBAA   t     BAABA
b   AAAAB   h     AABBB   o    ABBAB   u-v   BAABB
c   AAABA   i-j   ABAAA   p    ABBBA   w     BABAA
d   AAABB   k     ABAAB   q    ABBBB   x     BABAB
e   AABAA   l     ABABA   r    BAAAA   y     BABBA
f   AABAB   m     ABABB   s    BAAAB   z     BABBB
```
#### 案例1
1. 假设我们要加密单词：HELLO
    - H -> aabbb
    - E -> aabaa
    - L -> ababa
    - L -> ababa
    - O -> abbab
2. 组合密码：将上面所有的5位组合连起来  
`aabbb aabaa ababa ababa abbab` 或者写成：`aabbbaabaaababaababaabbab`  

这就是最原始的培根密码形式。但这种方式太明显了，一眼就能看出是密码

#### 案例2
使用两种字体(培根的本意)  
这是培根密码的精髓所在。我们找一段正常的文字作为“载体”，然后用字体的变化来隐藏信息  
- 明文（要隐藏的信息）： ACT
- 载体文本： I Love You （我们将用这个句子的字母大小写来隐藏信息）

1. 将明文转为培根码：
    - A -> aaaaa
    - C -> aaaba
    - T -> baaba  
    - 组合：aaaaa aaaba baaba
2. 制定规则：我们规定，培根码中的 a 对应小写字母，b 对应大写字母(这个规则可以任意设定,但加解密双方必须一致)
3. 加密
- 我们需要 5 * 3 = 15 个字母的载体。I Love You 去掉空格是 ILoveYou，只有8个字母，不够。所以我们把它延长为 **I LoVe YoU DeAr** (15个字符)
- 现在，将培根码 aaaaa aaaba baaba 的每一个字母，对应到载体文本的每一个字母上，并应用大小写规则  
我们得到`i love you DeAr`   

对于不知情的人来说,这看起来只是一个有点奇怪大小写的“I love you dear”,但对于知道规则的人来说,他们可以提取出大小写模式:小 小 小 小 小 小 小 小 大 小 大 小 大 小,然后将其转换为 a a a a a a a a b a b a b a,再分成5位一组 aaaaa (A), aaaba (C), baaba (T)，从而破解出真实信息 ACT

## 总结
你可以发挥想象力，用任何两种对立的事物来表示A和B  
用不同字体:在一篇文章中,用“宋体”代表 A,用“楷体”代表 B


### 注意事项与优缺点  

优点：
1. 隐蔽性极强：如果隐藏得好（比如在一篇长文中偶尔改变字体），几乎无法被察觉。
2. 概念简单：不需要复杂的数学计算。

缺点：
1. 编码效率低：加密一个字母需要5个符号，信息会变得很长。
2. 依赖预共享规则：加解密双方必须事先约定好哪两种状态代表A和B。
3. 一旦被识破，很容易破解：因为其模式固定，一旦有人意识到这是培根密码，破解就是分分钟的事
