---
title: 获取安卓设备信息
type: docs
---

![bg](../../../ruins.jpg)

这篇内容我们来获取一些安卓设备的信息特征，这个东西还是靠自己专门收集，多用几个设备来进行测试  
我这个是收集差不多20+了，都是纯Java的，Linux层的特征我还没开始收集，不过慢慢来吧，现在我看jd也还是在Java上收集信息然后进行加密  

```text
制造商 => Xiaomi
安卓版本 => 15
SDK版本 => 35
ROM相关信息 => lineage_dipper-userdebug 15 BP1A.250505.005 662e3fc477
CPU核心 => 8
语言 => zh
国家 => CN
时区 => Asia/Shanghai
CPU型号 => sdm845
手机品牌 => Xiaomi
设备型号 => dipper
硬件厂家(CPU) => qcom
设备名称 => MI 8
产品名称 => lineage_dipper
编译标签 => release-keys
编译版本 =>userdebug
用户 => root
SUPPORTED_ABIS=arm64-v8a,armeabi-v7a,armeabi
CPU_ABI=arm64-v8a
屏幕分辨率 => 1080x2248
=== 内存信息 ===
总内存(MB) => 5631
可用内存(MB) => 2205
低内存设备 => false
```

这个是我自己写的获取内容，内存那块有点问题，以后再修一下吧  
我感觉现在已经不少了，现在先用最基础的lsp模块来写吧，以后在过度到apatch直接hook系统底层
代码也就不到100行，下面给各位写出来，我是直接选择拼接出来了，如果感觉不好看或者想以后打包发到服务器的也可以选择打包成JSON对象，其实也不咋难，后面做成设备指纹库

```java
package com.duck.adfps.collector;

import android.os.Build;
import java.util.Locale;
import java.util.TimeZone;
import android.util.DisplayMetrics;
import android.view.WindowManager;
import android.content.Context;
import android.app.ActivityManager;

public class BaseInfo {
    public static String getBuildInfo(Context context) {
        String language = Locale.getDefault().getLanguage();   // zh
        String country  = Locale.getDefault().getCountry();    // CN
        String timezone = TimeZone.getDefault().getID();       // Asia/Shanghai
        StringBuilder sb = new StringBuilder();

        sb.append("制造商 => ").append(Build.MANUFACTURER).append("\n");
        sb.append("安卓版本 => ").append(Build.VERSION.RELEASE).append("\n");
        sb.append("SDK版本 => ").append(Build.VERSION.SDK_INT).append("\n");
        sb.append("ROM相关信息 => ").append(Build.DISPLAY).append("\n");
        sb.append("CPU核心 => ").append("").append(Runtime.getRuntime().availableProcessors()).append("\n");
        sb.append("语言 => ").append(language).append("\n");
        sb.append("国家 => ").append(country).append("\n");
        sb.append("时区 => ").append(timezone).append("\n");
        sb.append("CPU型号 => ").append(Build.BOARD).append("\n");
        sb.append("手机品牌 => ").append(Build.BRAND).append("\n");
        sb.append("设备型号 => ").append(Build.DEVICE).append("\n");
        sb.append("硬件厂家(CPU) => ").append(Build.HARDWARE).append("\n");
        sb.append("设备名称 => ").append(Build.MODEL).append("\n");
        sb.append("产品名称 => ").append(Build.PRODUCT).append("\n");
        sb.append("编译标签 => ").append(Build.TAGS).append("\n");
        sb.append("编译版本 =>").append(Build.TYPE).append("\n");
        sb.append("用户 => ").append(Build.USER).append("\n");
        sb.append("SUPPORTED_ABIS=");
        if (Build.SUPPORTED_ABIS != null) {
            for (int i = 0; i < Build.SUPPORTED_ABIS.length; i++) {
                sb.append(Build.SUPPORTED_ABIS[i]);
                if (i != Build.SUPPORTED_ABIS.length - 1) {
                    sb.append(",");
                }
            }
        }
        sb.append("\n");
        sb.append("CPU_ABI=").append(Build.CPU_ABI).append("\n");
        DisplayMetrics metrics = new DisplayMetrics();
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        if (wm != null && wm.getDefaultDisplay() != null) {
            wm.getDefaultDisplay().getMetrics(metrics);
            int width = metrics.widthPixels;
            int height = metrics.heightPixels;
            sb.append("屏幕分辨率 => ").append(width).append("x").append(height).append("\n");
        }
        sb.append("=== 内存信息 ===\n");
        sb.append(getMemoryInfo(context)).append("\n");
        return sb.toString();
    }
    public static String getMemoryInfo(Context context) {
        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
        am.getMemoryInfo(memInfo);

        long totalMem = memInfo.totalMem / (1024 * 1024); // MB
        long availMem = memInfo.availMem / (1024 * 1024); // MB
        boolean lowRam = am.isLowRamDevice();

        String sb = "总内存(MB) => " + totalMem + "\n" +
                "可用内存(MB) => " + availMem + "\n" +
                "低内存设备 => " + lowRam;
        return sb;
    }

}
```


