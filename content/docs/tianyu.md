---
title: 360天御滑块验证码
next: first-page
---

本文仅用于学习，如有侵权，联系站长删除
</br>
禁止商业，否则后果自负
</br>
![.](../../a.png)

此次看的站点就是360天域的官方demo站点，是一个滑块验证码</br>
需要点击一下登录然后会弹出一个窗口然后有图片出现
</br>
</br>
好的，然后我们打开控制台来看看是什么样子
```js
(function anonymous(
) {
        debugger
})

```
好的，一个非常非常经典的自执行反调试，我们直接右键不在此停留即可解决
</br>
然后，我们来滑动让验证码通过验证试试看是什么样子并且是什么特征和字段
```text
https://captcha.jiagu.360.cn/api/v3/check
```

最终验证接口是这个东西，非常的标准了，`check`接口的校验，然后来看有什么字段进行校验
```text
captchaId token length version width report tracking
```
最后校验的是这些字段，属于中规中矩了，基本也就是校验这些东西，`id` `token` `version`等
鉴于我这是第一次写验证码文章，我也认各位是新手，没有任何经验，所以我们从头开始搞
# 分析字段来源
## check接口
### captchaId,token
这个就需要我们来进行一些留意了，这个就是验证码的上下文，什么是验证码，上下文???验证码还需要上下文吗?</br>
是的验证码，需要上下文来确定你谁的验证码，你的滑动距离是多少，图片是什么之类的信息都会在厂商的后端进行存储，这个东西怎么寻找呢?起始也很简单，我们直接去搜就可以得到结果，在前面的auth接口中，后面我们再去分析auth接口
### length,version,width
这两个就不说了，长度和版本，起始就是移动距离和版本，字面意思就可以理解
### report
这个字段就是我们在逆向验证码时候嘴里说的鼠标轨迹，听起来是神秘莫测，不可理解，其实360这个轨迹不是很难，后面代码部分我们会仔细详谈
### tracking
这个字段我从逆向的时候就是这个样子，现在还是这个样子，我也不知道怎么回事，可能是前端对demo不怎么上心?
## auth接口
现在我们来分析这个前置的auth接口，这个接口也是至关重要的一次请求里面也包含了很多很多字段
### appid
虽然我们从头开始搞但是我认为各位也是有js逆向经验了，这个id我们可以通过重放来进行测试这个是否会进行改变，实际上这个东西是不会进行改变的，这个就是验证码的身份证，厂家会根据这个ID来进行数据库查询来源和响应扣费
所以这个我们会写死
### type,version,pn,os,sdkName,ts
此类字段太多了，不去一个一个写了，各位自己重复滑动几次验证码就可以发现变化值和不变值
### sign
这个字段是我们第一个需要逆向的值
至此auth字段我们分析完毕接下来就是开始逆向了
# 逆向代码
### auth接口的构造
我们直接邮件复制然后复制出来curl即可，找个curl转朋友直接转成requests的代码就可以了
```py
def GetImg():
    url = "https://captcha.jiagu.360.cn/api/v3/auth"
    ts = int(time.time() * 1000)
    nonce = ts + 59553499
    data = {
        "appId": "dc1db94ea7b3843c",
        "type": "1",
        "version": "2.0.0",
        "pn": "com.web.tianyu",
        "os": "3",
        "sdkName": "360CaptchaSDK",
        "timestamp": str(ts),
        "nonce": str(nonce),
        "ui": "null",
        "rc": "0",
        "pc": "0",
        "ec": "0",
        "hc": "0",
        "xc": "0",
        "dc": "0",
        "phone": "10000000000",
        "sign": md5(ts, nonce),
    }
    response = requests.post(url, headers=headers, data=data).json()
    bg = requests.get(url=response["data"]["bg"][0], headers=headers).content

    with open("output.png", "wb") as f:
        f.write(bg)
    return {
        "name": extract_filename_from_url(response["data"]["bg"][0]),
        "captchaId": response["data"]["captchaId"],
        "token": response["data"]["token"],
        "k": response["data"]["k"],
    }

```
这个代码是我自己写的，我现在看的有点懵逼了，k我都不知道是干啥的，name我看了后面代码知道了点东西，代码这个东西还是得常看，尤其是逆向
别的不说了，我们开始逆向第一个参数`sign`，其实看我代码已经知道了，但是我们还是要从js上来寻找逻辑，这样才算是学会了
</br>
第一步我们不知道这个是什么东西，搜索也搜不到怎么办?
</br>
打xhr断点，看看这个调用栈在什么位置断出来了
```js 
_0x39fa58.send( _0x1b59d6[_0x207798(0x355, '\x55\x35\x6a\x4d')]( _0xda915, _0x13992c,),)
```
好的，我们看见了`send`函数，这个函数很显而易见了，xhr的发送函数，并且我们也可以看见这些变量名没有具体含义，这时候可以选择硬干混淆也可以选择解混淆，解混淆也不用自己去写，我们可以直接用现成的工具
不过在此之前还是看看变量都是什么意思，有没有弄错，这个就留给各位看了，我想说的是在这里面
</br>
然后我们就可以追栈了，这个基本功我相信各位是有的,尴尬的来了，我自己干不出来了，我看混淆看傻逼了，不知道怎么弄了，我自己弄了一下ast解了一下混淆
</br>
其实不用解混淆也可以，因为我们`sign`搜不到可以搜别的，搜长一点的值`timestamp`，这时候就能完美搜到了，然后下断点，慢慢调试，好的，其实我也不是很想看混淆代码，这时候打开yrx反混淆平台直接粘贴进去把模式一全点上
然后再复制出来到一个新的js文件里面，这时候你就会发现一个新天地，sign值直接可以搜出来了，就是一个md5函数
```js
_0x18ee40["sign"] = _0x1b59d6["pmrAl"](md5, _0x3ca1de);
```
然后我们可以直接找这个md5，显然就是在我们给时间戳打断点的下面，我们先看看后面的变量是什么东西，然后再跟进去看是不是标准算法
```text
appIddc1db94ea7b3843cdc0ec0hc0nonce1761364214102os3pc0phone10000000000pncom.web.tianyurc0sdkName360CaptchaSDKtimestamp1761320598172type1uinullversion2.0.0xc0
```
好家伙，原来是对这东西进行了加密计算，这时候我们来看是不是标准算法，接着追代码
```js 
function md5(string, key, raw) {
    if (!key) {
        if (!raw) {
                return hexMD5(string);
        }
        return rawMD5(string);
    }
    if (!raw) {
        return hexHMACMD5(key, string);
    }
    return rawHMACMD5(key, string);
}
```
我们并没有传递key和raw，那我们就会走那个`hexMD5`的算法，我们直接打印参数去md5平台上对比一下看看，是不是一样的值就好了，显然这个是一个标准的md5算法函数，那我们就可以进行参数的构造了，多弄几次这种参数然后对比发现变化值只有时间戳和`nonce`,直接拼接构造计算即可得到结果，当然以后更新了我们的参数也要更新
```python 
def md5(ts, nonce):
    s = (
        f"appIddc1db94ea7b3843cdc0ec0hc0"
        f"nonce{nonce}"
        f"os3pc0"
        f"phone10000000000"
        f"pncom.web.tianyurc0"
        f"sdkName360CaptchaSDK"
        f"timestamp{ts}"
        f"type1"
        f"uinull"
        f"version2.0.0xc0"
    )
    return hashlib.md5(s.encode()).hexdigest()
```
这时候就完成了`auth`这个前置参数的构造了，我们发包就能得到结果了
```json
{
    "error": 0,
    "msg": "成功",
    "data": {
        "k": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1NSUdmTUEwR0NTcUdTSWIzRFFFQkFRVUFBNEdOQURDQmlRS0JnUURTUldxb050YjZwNFlSWjlvd2lZQXJrV3ZxbXdQeGZ5T2xKaGNrZE9nN2Y5QWExTDEwaFp5OFc4NlZwRThxQWVCQ0pxSjJxVUJ0b1B5SDFQUEp4Wi93TnZhRlY5TU9LakZLMmFCcU5Za0Y2djhvYlVsUjJuKytaR1hHYlFUT2NFYWFReE05SUUzNDQ3ODAvVHZHd1FZYlhPQTgwS0xDOWNPRlpqQ2xNZWhkdHdJREFRQUItLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0=",
        "captchaId": "1077541773062766ec7067d6a1e4cca2",
        "heigh": 0.29,
        "token": "650f8a925e3709797bca3af35ab10390",
        "front": [
            "https://p432.ssl.qhimgs4.com/d/jiagubao/sdk/captcha/6a995c79l84e991n0jbfhgm392odki99.1.png"
        ],
        "bg": [
            "https://p432.ssl.qhimgs4.com/d/jiagubao/sdk/captcha/6a995c79l84e991n0jbfhgm392odki99.png"
        ],
        "text": {
            "sBarVerifySuccess": "验证成功",
            "sBarDefault": "移动滑块到正确的位置",
            "sBarVerifyFailed": "验证未通过",
            "title": "滑块验证",
            "loading": "正在加载中"
        }
    }
}
```
这个就是auth接口得到的，我们需要拿的值也在前面的代码中写出来了，拿图片，证书，名字
</br>
然后我们正常保存图片，却发现图片不能看，像是碎玻璃，我们完全没办法进行下一步，这时候我们就需要进行第二个逆向了，还原底图
# 还原底图
我们用什么样的思想去还原呢? 怎么去还原呢?
</br>
这个询问GPT即可得到回答，`canvas`画布技术可以操作图片来进行分割再处理，这时候我们就可以通过打画布断点来进行调试了
</br>
这时候再刷新一下然后就会被断住，我们可以看看
```js 
_0x264d99(0x22e, '\x75\x6d\x25\x6c')
```
的结果是什么，这个的结果是`getContext`，这个就是创建画布的webAPI，我们可以去auth接口解混淆出来的文件里面搜，我们会发现这个后面跟了一个`2d`，这个就是创建一个平铺画布窗口来显示图片
</br>
算了，我们还是替换一下文件吧，我看这个文件后面没有跟时间戳或者值，算是比较稳定的js文件，替换出来以后还是打这个断点，这时候我们就可以非常非常清晰的看见这个是怎么回事了，
一行一行看下来，会发现的是这个图片会根据名字来进行拼接，先使用名字进行一个编码然后还原成数字，并且这个数字对应的是图片某一块，这个数字的索引是图片某一块的位置
``` js 
_0x5080d6["src"]["split"]("/")[_0x18d30b["NfPti"](_0x5080d6["src"]["split"]("/")["length"], 1)]["split"](".")[0];// 获取图片名称
_0x18d30b["RvBju"](_0x1ac65f, _0x18d30b["JWbtv"])(_0x251234); // 进行编码处理
[ 15, 8, 14, 25, 18, 10, 5, 12, 2, 26, 27, 11, 23, 16, 28, 13, 29, 30, 19, 1, 31, 9, 0, 4, 21, 22, 20, 7, 6, 3, 24, 17 ]
```
得到的列表就是我们图片的顺序，这个是一个32位长度的数组，编码函数就各位自己扣一下看看规律吧
```py
def get_sequence_from_string():
    info = GetImg()
    s = info["name"]
    result = []
    for i in range(min(len(s), 32)):
        code = ord(s[i])
        val = code % 32
        while val in result:
            code += 1
            val = code % 32
        result.append(val)
    return [result, info]
```
这个是py版本的，下一步就是我们拿py去进行图片还原了，其实也不难，首先要知道py什么库能处理图片`PIL`库当仁不让，py最强的图片处理,怎么用这个库就还是问ai吧，我们拿到图片列表了，拿到乱序底图了，我们就具备了还原条件
现在就可以开始还原了,我们先打开图片再看图片宽高，然后再看图片的每一小块的数据
</br>
`drawImage`这个函数我们可以知道一些东西，比如图片位置，图片大小，这时候我们就可以去找对应参数去看了，这个验证码是9个参数
```js 
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```
我们可以看见，函数原型正好也有9个参数的情况，这时候就可以直接问GPT了，`我遇见一个乱序底图验证码，我现在发现它是9个参数，我想知道每一块小图的宽度`，然后就ok了，我们就知道了是`sWidth`这个参数，我们就直接写17就可以了
这时候图片的全部数据我们都知道了，我们就可以进行还原了，我这里直接贴代码
```py 
def reduction():
    info = get_sequence_from_string()
    array_list = info[0]
    confusion_img = "/home/duck/NewCode/WebPage/RE/Projects/Cap/360ty/output.png"
    _img = Image.open(confusion_img)
    new_img = Image.new("RGBA", (544, 284))
    w_sep = 17
    h_sep = 284
    __imgx = 544
    _cutX = int(__imgx / 32)
    for i in range(len(array_list)):
        x = abs_value1(i * (-_cutX))
        y = 0
        img_cut = _img.crop(box=(x, y, x + w_sep, y + h_sep))
        new_img.paste(img_cut, box=(int(array_list[i]) * 17, 0))
    new_img.save(confusion_img)
    return info[1]
```
从乱序图里面copy出来一块图片然后粘贴到新图里面，然后保存新图
# 构造check请求
现在是万事俱备只欠东风，我们现在可以来构造最终请求包了
</br>
我们多发几次包，得到固定的值，然后直接写死，并且去构造动态值
</br>
在构造值之前，我们需要知道需要滑动的距离是多少，然后我们才能去滑动，关于这个各位使用ddddorc或者打码平台自行解决，B站很多佬都给出方法了
</br>
现在是开始构造请求了，我们先把不需要计算的值都按位置写上去
```py 
"captchaId": info["captchaId"],
"token": info["token"],
"length": verify_, # 滑动长度
"version": "2.0.0",
"width": "300",
"tracking": "[object Object]",
```
我们把这些东西写上，当然还缺少一个字段，那个字段就是我们去构造的字段，就是轨迹了
</br>
轨迹这个东西，肯定会和鼠标有关系，那么我们就去打鼠标的断点，直接就会被断到相关位置，我们打到按下和抬起的就行，移动断点会被一直卡导致不知道什么是重要的地方，在确定两点以后再开移动
```js 
!_0x2235fe["rarr"][0][_0x2b87d0] && (_0x2235fe[_0x9b6740["nROMT"]][0][_0x2b87d0] = { "t": new Date()["getTime"](), "y": _0x2235fe["curPos"]["y"] });
```
最后进行汇总的位置是在这里，我也不知道我怎么找到的，现在是看了一篇文章直接复制出来的，我完全不知道当时怎么找到的，这个地方各位可以倒推跟栈
```js 
const _0x451587 = {
        "captchaId": _0x1022c0["vConfig"][_0x1b59d6["priWD"]],
        "token": _0x1022c0["vConfig"][_0x1b59d6["FCsae"]],
        "length": Math["round"](_0x1022c0["eles"]["mvbox"]["style"]["marginLeft"]["replace"]("px", '')),
        "version": _0x32e427[_0x1b59d6["wMocC"]],
        "width": 300,
        "report": _0x1b59d6["YiEkH"](_0x204684, _0x1b59d6["sQorU"])(JSON["stringify"](_0x1022c0["rarr"])),
        "tracking": _0x1022c0[_0x1b59d6["cFriW"]]
};
```
最后会在这个地方汇合，这时候我们就可以去追`report`的加密方法了，是一个rsa加密，前面auth接口拿到的t值就是公钥，这个基本功跟栈就留给各位了，我困的一批，不想写了
</br>
</br>
看看最终结果吧
```text 
{'error': 0, 'msg': '成功', 'data': {'result': True, 'token': '2db5a2c8193468282f4953176afa8a3d'}}
{'error': 0, 'msg': '成功', 'data': {'result': True, 'token': '3d4fe78df1ed612b163b693a1b1186d1'}}
{'error': 0, 'msg': '成功', 'data': {'result': True, 'token': 'e537e5a1410ca95d88b3df038ed393bb'}}
{'error': 0, 'msg': '成功', 'data': {'result': True, 'token': '11ae36d59332e550736629bf3255b009'}}
{'error': 0, 'msg': '成功', 'data': {'result': True, 'token': '5c77f727a362f6703c976c8e303f36c2'}}
{'error': 0, 'msg': '成功', 'data': {'result': True, 'token': '2c38015374fa482452461f199eb862d3'}}
{'error': 0, 'msg': '成功', 'data': {'result': True, 'token': '3ebea9dc60091b514b01a8fa47944c8e'}}
```


