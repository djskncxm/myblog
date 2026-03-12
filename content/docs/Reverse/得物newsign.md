好久不逆向，今天来一个 app 的简单参数分析，得物登录的 newsign 参数账号密码登录方式进行登录

```json
{
  "cipherParam": "userName",
  "countryCode": 86,
  "loginToken": "",
  "newSign": "6b890ea1511c597133d354bd8522df1a",
  "password": "ca8f119a27ec17f98b463807cd0b6b62",
  "platform": "android",
  "timestamp": "1770907528158",
  "type": "pwd",
  "userName": "a66aca56fa1342b8fe900f5e5a3082ae_1",
  "v": "5.81.3"
}
```

可以看见 JSON 的数据，这一篇目标就是`newSign`参数，话不多说进入逆向正题

首先我们看这个长度是32的hash值很容易产生思路，安卓原生的加密库计算，自己实现的加密库实现，最简单的就是拿Frida对原生加密库进行hook(hook代码各位自己搜一手吧，很多)
