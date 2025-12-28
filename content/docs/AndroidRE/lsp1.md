---
title: lsp模块环境搭建
type: docs
---

![bg](../../../beach.jpg)

欢迎各位来看lsp模块第一篇环境搭建，其实很简单

### 1. 创建项目

对于项目来说，搞一个C++的原生项目就可以了，然后就是配置，我选择kt的配置文件，比较现代化了

### 2.项目配置

1. 修改setting.gradle.kts文件内的
```kts
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven(url = "https://api.xposed.info/") // 这一行是我们添加xposed的API
    }
}
```
2. 在libs.versions.toml文件内加入两条内容

```kts
[versions]
agp = "8.10.0"
api = "82" // 我们加入的xposed接口版本
junit = "4.13.2"
junitVersion = "1.3.0"
espressoCore = "3.7.0"
appcompat = "1.7.1"
material = "1.13.0"
constraintlayout = "2.2.1"

[libraries]
api = { module = "de.robv.android.xposed:api", version.ref = "api" } // 写死就行，规范这样写的
junit = { group = "junit", name = "junit", version.ref = "junit" }
ext-junit = { group = "androidx.test.ext", name = "junit", version.ref = "junitVersion" }
espresso-core = { group = "androidx.test.espresso", name = "espresso-core", version.ref = "espressoCore" }
appcompat = { group = "androidx.appcompat", name = "appcompat", version.ref = "appcompat" }
material = { group = "com.google.android.material", name = "material", version.ref = "material" }
constraintlayout = { group = "androidx.constraintlayout", name = "constraintlayout", version.ref = "constraintlayout" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
```

3. 在你java的同级目录下创建一个资源文件夹，然后里面创建一个`xposed_init`文件，然后在java目录下创建一个java类，然后把这个类的包名写入，再拼接上类名
```text
com.duck.lspdemo1.HookEntry
             包名|类名
```

然后就可以在你的项目内写lsp了

```java

package com.duck.lspdemo1;

import android.util.Log;

import de.robv.android.xposed.IXposedHookZygoteInit;
import de.robv.android.xposed.IXposedHookLoadPackage;
import de.robv.android.xposed.callbacks.XC_LoadPackage;

public class HookEntry implements IXposedHookZygoteInit, IXposedHookLoadPackage {
    @Override
    public void initZygote(StartupParam startupParam) throws Throwable {
        // 初始化Zygote进行时候进行的

    }

    @Override
    public void handleLoadPackage(XC_LoadPackage.LoadPackageParam lpparam) throws Throwable {
        // 加载包名进行
        Log.i("duck => ", "PackageName => " + lpparam);
    }
}
```

4. 设置AndroidManifest文件
```xml
<meta-data
    android:name="xposedmodule"
    android:value="true"/>
<meta-data
    android:name="xposeddescription"
    android:value="lsp模块模板"/>
<meta-data
    android:name="xposedminversion"
    android:value="52"/>
```

加入这几个就可以，第一个是说明是xp模块，第二个是说明，第三个是最低版本

5. 推荐hook设置
这个功能是你自己写一些你要搞的app，比如抖快小

1. 先在res目录里面的values目录创建一个`arrays.xml`文件里面写
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string-array name="xposedscope">
        <item>被hook的包名</item>
    </string-array>
</resources>
```
然后在AndroidManifest里面再加入这个文件，xp的作用域
```xml
<meta-data android:name="xposedscope" android:resource="@array/xposedscope" />
```

6. build.gradle.kts添加依赖
这个文件我们只需要加一行
```kts
compileOnly(libs.api)
```
让它加入我们的依赖


