---
title: 滑块
type: docs
prev: docs/dun163/
---

本文仅用于学习，如有侵权，联系站长删除
</br>
禁止商业，否则后果自负
</br>
![bg](../../../yidun_bg.png)
---
今天我们来搞易盾官网的demo滑块，这个我是一点没写，这个是一起来做的那种</br>
依旧是先滑动一手，看看校验的是什么地方
{{< callout >}}
  **校验接口** : https://c.dun.163.com/api/v3/check?
{{< /callout >}}
可以看见，校验的接口就是这个，里面包含了一些信息和校验的轨迹，返回值依旧是token值
``` json 
{
    "data": {
        "result": false,
        "zoneId": "CN31",
        "token": "0dd7784e6f664e039a285d122a419082",
        "validate": ""
    },
    "error": 0,
    "msg": "ok"
}
```
好，我们基本理清楚了，我们来搞前置请求
# 前置请求
通过对图片的搜索我们发现接口是在
{{< callout >}}
  **校验接口** : https://c.dun.163.com/api/v3/get?
{{< /callout >}}
这个后面也肯定会有东西，我们再来多次重放测试
![chayi](../../../yidun_getapichayi.png)
来吧，开始我们的逆向之旅了，我们首先就搞一下`cb`值，依旧是搜索大法，看值在什么地方</br>
这个值很好发现，可以搜到，并且函数都是一个，调用一下发现很像，我们就暂且说它是，然后我们来进入这个函数，发现有点复杂，来补环境吧
易盾环境检测不狠，补环境更简单一些，补环境这就属于基本操作了，未定义补了，报错和浏览器进行对比
```js 
function get_enviroment(proxy_array) {
    for (var i = 0; i < proxy_array.length; i++) {
        handler = '{\n' +
            '    get: function(target, property, receiver) {\n' +
            '        console.log("方法:", "get  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
            // 'if (typeof target[property] == "undefined"){debugger}' +
            '        return target[property];\n' +
            '    },\n' +
            '    set: function(target, property, value, receiver) {\n' +
            '        console.log("方法:", "set  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
            '        return Reflect.set(...arguments);\n' +
            '    }\n' +
            '}'
        eval('try{\n' + proxy_array[i] + ';\n' +
            proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}catch (e) {\n' + proxy_array[i] + '={};\n' +
            proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}')
    }
}
proxy_array = ['window', 'document', 'location', 'navigator', 'history', 'screen']
// 这里写你要补的环境
get_enviroment(proxy_array)
```
各位可以多尝试重放特定参数，其实需要逆向的只有`cb`值，`irToken`和`token`值去掉依旧可以拿到，
然后就是下载保存图片了，这次我们来使用`ddddorc`进行图片识别，这个各位自己安装一下吧也就是个pip的事情，
```py 
def ddddocr(self, slider_bytes, background_bytes):
    det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
    res = det.slide_match(slider_bytes, background_bytes)
    logger.success(f"滑动的距离是:{res['target'][0]}")
    os.remove("dd.png")
    os.remove("ee.png")
    return res["target"][0]
```
初始化出来OCR然后再调用滑动就可以了，然后我是选择把图片给删除，看起来不乱
下一步就是去看易盾的轨迹了，易盾轨迹校验也不是很严格,依旧是打鼠标断点然后来单步调试，会来到
```js 
this['onVerifyCaptcha']({
    'data': JSON[a0_0x1e60(0x138)]({
        'd': _0xa8a0c6(_0x4a4a62['join'](':')),
        'm': '',
        'p': _0x15278a,
        'f': _0xa8a0c6(_0x564a9f(_0x319bb4, _0x4d98f2['join'](','))),
        'ext': _0xa8a0c6(_0x564a9f(_0x319bb4, this['mouseDownCounts'] + ',' + this['traceData']['length']))
    })
});
```
这个地方，这就是轨迹最终加密的地方，解决办法依旧是补环境，然后导出函数进行调用,对于轨迹的生成我这里不方便说了，我使用的是我朋友的轨迹，不是我自己的轨迹，各位可以自己找AI或者身边大佬乞讨一手，
说不定就会议欧意外收获，最终拼接调用就可以了，依旧是放点通过案例(我朋友轨迹过于牛逼，100成功)
![success](../../../yidun_success.png)
