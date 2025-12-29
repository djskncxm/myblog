---
title: 米8编译LineageOS
type: docs
---

![bg](../../../rooftops.jpg)

编译这个很简单的，但是我编译的过程比较窝囊  
首先我们肯定不会选择从GitHub，官网来拉代码的，太难受了，梯子都拉爆了
对抗期间肯定不会完全去使用手机原版系统来做东西比如脱壳机，系统自带hook，直接获取root等等操作

编译环境肯定就是选择Linux，Windows我没找到资料也懒的找资料了
首先来配置一些东西，环境方面的
```bash
export USE_CCACHE=1
export CCACHE_EXEC=/usr/bin/ccache
ccache -M 50G
ccache -o compression=true
```

这些的让你编译速度加速的，我是编译了一个小时左右相当快了，我编译chromium的时候还花6个小时以上  
然后mkdir创建一个你自己顺手的目录，里面分两个子目录分别是`rom`和`source`，一个用来下载系统包，一个用来保存系统源码  
在此说一句，LineageOS的官网立场是你在感觉原本系统不好用或者想维护的情况下才去编译，所以依赖本身版本的系统包

在我们创建好目录后我们就开始初始化项目地址了
```bash
repo init -u https://mirrors.tuna.tsinghua.edu.cn/git/lineageOS/LineageOS/android.git -b lineage-19.1 --git-lfs
```
我使用清华源来进行下载源码然后还要在`.repo/manifests/default.xml`里面修改一些东西
```xml
<remote  name="github"
       fetch="https://github.com/" />
<remote  name="lineage"
       fetch="https://mirrors.tuna.tsinghua.edu.cn/git/lineageOS/"
       review="review.lineageos.org" />

<remote  name="private"
       fetch="ssh://git@github.com" />

<remote  name="aosp"
       fetch="https://mirrors.tuna.tsinghua.edu.cn/git/AOSP"
       review="android-review.googlesource.com"
       revision="refs/tags/android-12.1.0_r22" />

<default revision="refs/heads/lineage-19.1"
       remote="github"
       sync-c="true"
       sync-j="8" />

<superproject name="platform/superproject" remote="aosp" revision="android-12.1.0_r22" />
<contactinfo bugurl="go/repo-bug" />
```
你直接复制我的就行了，这时候再克隆代码就是走国内清华源了，这里面分别是AOSP的代码和LineageOS的代码,差不多会有170G的代码

下一步就是装一些Linux的东西，我自己使用的ManjaroLinux但是官网写的Ubuntu，我也推荐各位使用Ubuntu
```bash
sudo apt-get install bc bison build-essential ccache curl flex g++-multilib gcc-multilib git git-lfs gnupg gperf imagemagick
lib32ncurses5-dev lib32readline-dev lib32z1-dev libelf-dev liblz4-tool libncurses5 libncurses5-dev
libsdl1.2-dev libssl-dev libxml2 libxml2-utils lzop pngcrush rsync
schedtool squashfs-tools xsltproc
zip zlib1g-dev

#然后再安装 libwxgtk3.0-dev
sudo apt-get install libwxgtk3.0-dev
```

这些都是依赖项，必须安装的

然后就开始配置环境变量了
```bash
source build/envsetup.sh
```
这里就是环境设置的shell脚本，按照官方接着走
```bash
breakfast dipper
``` 
然后发现报错了找不到配置什么的东西，这时候就只能自己下载了
```bash
#源码根目录执行
mkdir device/xiaomi 
cd device/xiaomi

#克隆设备的特定配置, 注意看分支版本，我当前默认是 lineage-19.1
git clone https://github.com/LineageOS/android_device_xiaomi_dipper -b lineage-19.1 dipper
git clone https://github.com/LineageOS/android_device_xiaomi_sdm845-common.git -b lineage-19.1 sdm845-common
```
下载配置然后我们来下载内核
```bash
#源码根目录执行
mkdir kernel/xiaomi
cd kernel/xiaomi

#克隆内核,注意看分支版本，我当前默认是 lineage-19.1
git clone https://github.com/LineageOS/android_kernel_xiaomi_sdm845.git -b lineage-19.1 sdm845
```

下一步就比较抽象了，从刷机包里面提取设备硬件的一些东西，这个各位可以找AI问一些这个系统的历史镜像，然后找到这个19.1的版本，下载到你开头创建的`rom`目录里面  
```bash
cd rom/
mkdir system_dump
cd system_dump/
unzip lineage-19.1-20221229-nightly-dipper-signed.zip system.transfer.list system.new.dat*
unzip lineage-19.1-20221229-nightly-dipper-signed.zip system_ext.transfer.list system_ext.new.dat*
unzip lineage-19.1-20221229-nightly-dipper-signed.zip vendor.transfer.list vendor.new.dat*

sudo apt-get install brotli
brotli --decompress --output=system.new.dat system.new.dat.br
brotli --decompress --output=system_ext.new.dat system_ext.new.dat.br
brotli --decompress --output=vendor.new.dat vendor.new.dat.br

git clone http://github.com/xpirt/sdat2img
python sdat2img/sdat2img.py system.transfer.list system.new.dat system.img
python sdat2img/sdat2img.py system_ext.transfer.list system_ext.new.dat system_ext.img

mkdir system/
sudo mount system.img system/

mkdir system_ext/
sudo mount system_ext.img system_ext/

python sdat2img/sdat2img.py vendor.transfer.list vendor.new.dat vendor.img
sudo rm -rf system/vendor
sudo mkdir system/vendor
sudo mount vendor.img system/vendor/
```

直接跑就行了，信我，可以直接跑通的，官网给的那些玩意不全，这玩意也是我自己找资料的  

然后回到源码根目录下，提取blob
```bash
cd device/xiaomi/dipper
./extract-files.sh ~/android/system_dump/

#等待几分钟，如果没有异常的话 vendor/xiaomi/ 生成两个目录, 然后可以删除之前的挂载了
sudo umount ~/android/system_dump/system/vendor
sudo umount ~/android/system_dump/system
sudo umount ~/android/system_dump/system_ext
rm -rf ~/android/system_dump/
```

然后就开始下载我们的硬件平台了
```bash
#源码根目录
cd hardware

git clone https://github.com/LineageOS/android_hardware_xiaomi.git -b lineage-19.1 xiaomi
```

ok了，万事俱备只欠东风，我们接下来就开始编译
```bash
#源码根目录
source build/envsetup.sh

#选择编译设备
breakfast dipper

#开始编译
brunch dipper
```

然后就差不多了，有个小点，就是`webview.apk`这玩意可能是个文件而不是应用安装包，这时候就需要各位进入
```bash
cd external/chromium-webview/prebuilt/arm/
# 执行
git lfs pull
```
这样拿到真正的应用，然后才可以被打包进系统包刷机包里面



最后就是编译完成，然后刷机了，刷机我觉得也不太用讲，因为你都开始编译系统包了，这个还不会就有点说不过去了




