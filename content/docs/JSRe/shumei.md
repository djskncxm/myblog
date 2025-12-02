---
title: 数美滑块验证码
next: first-page
---

本文仅用于学习，如有侵权，联系站长删除
</br>
禁止商业，否则后果自负
</br>
![s](../../../shumei_bg.png)
这次看的是数美滑块的验证码
![huakuai](../../../shumei_huakuai.png)
这次的也是比较简单的验证码，适合验证码逆向学习入门</br>
还是F12看数据包，正常滑动过去看看怎么回事，成功的结果返回过来什么数据
``` text
sm_1761388489446({
    "code": 1100,
    "message": "success",
    "requestId": "3d23191c5da7d9ab3a6da4f6193c9e23",
    "riskLevel": "PASS"
})
```
可以看见，返回的有标记是否验证成功的，还有一个后续使用的ID，那我们依旧是查看校验字段
数美恶心的地方就是它的字段非常非常多，可能别的验证码4个，数美21个字段，不过构造时候不是什么困难
![file](../../../shumei_filde.png)
因为字段太多了，我们就不一个一个看了，各位依旧是重放解决</br>
![no](../../../%20shumei_not.png)
可以看见，两次之间变的值很少，并且还有上下文之类的数值，我们真正逆向的值并不算多，下面就开始分析前置拿图片的接口了
# 获取图片
{{< callout icon="sparkles" >}}
  直接换到图片，找你的滑块图片，然后直接搜图片的名字一般都可以搜到
{{< /callout >}}
``` text
https://captcha1.fengkongcloud.cn/ca/v1/register?xxx
```
这个就是我们拿图片的接口了，依旧是分析接口字段
![ziduan](../../../shumei_ziduan.png)
这次的字段就非常少了，还是多重放出来几次去做对，分析一下需要构造的值
![respi](../../../reapi.png)
好的，这就很好说了，仅仅只有时间戳不一样，我们可以直接去进行构造参数了
```py 
def GetIMG():
    url = "https://captcha1.fengkongcloud.cn/ca/v1/register"
    ts = int(time.time() * 1000)

    params = {
        "lang": "zh-cn",
        "appId": "default",
        "organization": "d6tpAY1oV0Kv5jRSgxQr",
        "data": "{}",
        "model": "slide",
        "sdkver": "1.1.3",
        "captchaUuid": uuid,
        "rversion": "1.0.4",
        "channel": "default",
        "callback": f"sm_{ts}",
    }
    response = requests.get(url, headers=headers, params=params)

    info = json.loads(response.text[17:-1])
    return info
```
然后我这对它进行了一个JSON的处理，下面就该搞滑动距离了，这个工作就交给各位自己了，我是用的打码平台，平台暂时不方便透露 ~~没给我打钱~~
# 验证码主体分析
我们需要看的值也不多 `callback` `hg` `th` `rid` `gg`,其中`callback`就是一个前缀加上时间戳的值,`rid`在我们前面也可以找到,我们只需要去搞出来`hg` `th` `gg`的值就好了</br>
</br>
首先就是我们的搜索大法，直接`'th'`来搜这个值，
结果也非常可以，我们可以看见好多个加密，我们都打上断点，然后去滑动一下，看看加密的是什么值</br>
然后会在第二个case时候进入语句内进行执行，我们这时候就可以看加密的函数是什么了 `_0x1ba2d9(0x5ba)` 执行出来是`getEncryptContent`，这时候我们会发现看的非常难受，
直接开yrx反混淆的一模式一键走起就行，保存到本地以后我们发现这个位置变的非常非常清晰,然后我们也可以直接搜函数了
{{< callout type="warning" >}}
解出来的混淆并不完美，可能触发了某种检测，替换代码图片不加载并且控制台报错
{{< /callout >}}
</br>
解出来的报错那我们只能靠本地硬看了，不过非常非常幸运的是VSCode可以直接找到它的来源
```js 
_0x2d5ea1["prototype"]["getEncryptContent"] = function _0x2f0df6(_0x45fc77, _0x2b737e) {
        var _0x359d06 = this["_data"]["__key"],
                _0x64cdde = _0x2b737e || _0x359d06;

        _0x1758fe["default"]['isJsFormat']() && (_0x64cdde = _0x3793b6);

        var _0x1bd344 = typeof _0x45fc77 === "string" ? true : false,
                _0x37c790 = _0x1bd344 ? _0x45fc77 : _0x1758fe["default"]['smStringify'](_0x45fc77),
                _0x437bde = '';

        _0x437bde = _0x5b5da0['default']["DES"](_0x64cdde, _0x37c790, 1, 0);
        _0x437bde = _0x5b5da0["default"]["base64Encode"](_0x437bde);
        return _0x437bde;
};
```
我们可以看见有`isJsFormat`这个可能是检测，但是不用在意了，我们已经能看见下面的算法了，des的算法，我们打上断点查看是不是标准DES算法，第一个进来的是`gg`，参数，我们向上查找，可以发现就是
`_0x12c64a = _0x488717["mouseEndX"]`这个就是鼠标最后的X轴坐标了，它和我们图片的宽度进行了除法操作，取了一个结果来进行加密，然后第二个来的参数就是我们的密钥了，因为是DES加密，所以是需要密钥的
我们可以从解出来混淆的代码中看见，它对被加密的值做了一个`smStringify`的操作，经过多次重放可以知道这个就是对数据进行转化了，转化成字符串格式，然后参与加密，
然后我们可以发现加密的东西我们都集齐了，接下来就是验证了，各位可以找个网站进行验证，这个加密起始就是原版DES加密ECB模式无填充，我们的逆向到此结束，它所有的东西都是根据这个来进行加密，标准算法这方面，各位就自己AI吧，
后面参数拼接，发包方面就不再描述，都是基本功了</br>
放点成功的吧
```text
sm_1761394418306({"code":1100,"message":"success","requestId":"5bd37542acfbfaa8ac41543d86880ad5","riskLevel":"PASS"})
sm_1761394425531({"code":1100,"message":"success","requestId":"6aa3b986070d550e530b58823eb81028","riskLevel":"PASS"})
sm_1761394427067({"code":1100,"message":"success","requestId":"b92cd95700a54ac4eb9f3166416f1762","riskLevel":"REJECT"})
sm_1761394428810({"code":1100,"message":"success","requestId":"137b50fdaf70681e972b496f865997d1","riskLevel":"PASS"})
sm_1761394430653({"code":1100,"message":"success","requestId":"5a6a6ef1e7c3b82acfbb327fab808518","riskLevel":"PASS"})
sm_1761394432599({"code":1100,"message":"success","requestId":"a16d3467558e9fba4dc4ad6b180546b6","riskLevel":"PASS"})
sm_1761394434345({"code":1100,"message":"success","requestId":"1564ac3b5ff3d4ecd0e973a65eb0e588","riskLevel":"REJECT"})
sm_1761394436180({"code":1100,"message":"success","requestId":"646e84f19362b57b4a1ed994eb09cf99","riskLevel":"PASS"})
sm_1761394447552({"code":1100,"message":"success","requestId":"8245565b370fa1d6f4cd15ac5dcd8e9f","riskLevel":"PASS"})
sm_1761394449286({"code":1100,"message":"success","requestId":"aa56fdaa2191deb2ae3bd23fbd98e913","riskLevel":"PASS"})
sm_1761394451099({"code":1100,"message":"success","requestId":"d9a1474fa1899a6d52e146183c538f52","riskLevel":"PASS"})
sm_1761394452669({"code":1100,"message":"success","requestId":"0b1e9607970209bb7ce94ccd159ca322","riskLevel":"PASS"})
sm_1761394454509({"code":1100,"message":"success","requestId":"10edcbd9cb9ab4a7b04e2cc0a15725a2","riskLevel":"PASS"})
sm_1761394456184({"code":1100,"message":"success","requestId":"d64b5227fb712200b74ec4c46cf17a8f","riskLevel":"PASS"})
sm_1761394457993({"code":1100,"message":"success","requestId":"852f76ef416698eab8992ff996fd06fa","riskLevel":"PASS"})
sm_1761394459835({"code":1100,"message":"success","requestId":"87c80e695c1e04a5c731c22e2034833e","riskLevel":"PASS"})
sm_1761394461683({"code":1100,"message":"success","requestId":"3bd0120beb0e9d238636f4e5bf937feb","riskLevel":"PASS"})
sm_1761394463528({"code":1100,"message":"success","requestId":"5e5d965281900544e2da1fb79213f7eb","riskLevel":"PASS"})
sm_1761394465243({"code":1100,"message":"success","requestId":"ec80da6542d41885750eef6153d4e42c","riskLevel":"REJECT"})
```
![success](../../../shumei_success.png)
