---
title: 恺撒密码
type: docs
prev: docs/base64
---
![Caesar_Cipher](../../../Caesar_Cipher_bg.png)
今天来学习的`恺撒密码`，恺撒密码，这个对比base64就要简单的多了，这个纯就是字母之间的转化，标准恺撒是没有对数字进行操作的</br>

{{< callout >}} **标准码表** ABCDEFGHIJKLMNOPQRSTUVWXYZ {{< /callout >}}
{{< callout >}} **映射码表** ZEBRASCDFGHIJKLMNOPQTUVWXY {{< /callout >}}
这个就纯是属于对照了，我还是以`duck`来做演示，小写字母依旧会转成大写字母，信息传输应该是不会有什么以外损耗
- d -> G
- u -> X
- c -> F
- k -> N
结果就是`GXFN`，翻译出来就是`duck`
然后我们来实现一下代码吧
```C 
void caesar_encrypt(char* plaintext, int shift) {
    for (int i = 0; plaintext[i] != '\0'; i++) {
        if (isalpha(plaintext[i])) {
            char base = isupper(plaintext[i]) ? 'A' : 'a';
            plaintext[i] = (plaintext[i] - base + shift) % 26 + base;
        }
    }
}

void test() {
    char data[] = "duck";
    caesar_encrypt(data, 3);
}
```
这个就是代码了，难度也不高，go基本一模一样，没必要再发了</br>
这个加密算法算是非常简单的了，魔改空间也非常大</br>
