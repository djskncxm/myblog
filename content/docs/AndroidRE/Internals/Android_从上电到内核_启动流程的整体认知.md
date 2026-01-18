---
title: 启动流程的整体认知
toc: true
---
![des](../../../../clouds-3.png)

```text
SoC 上电
  ↓
BootROM（芯片内）
  ↓
Bootloader（Flash / eMMC / UFS）
  ↓
Linux Kernel
  ↓
Android userspace（init → zygote → system_server）
```

整体启动的流程差不多就是这个样子的，不过我们不看SoC部分，因为那个太硬件了

### 1.BootROM
#### 1. 这个东西是什么
- BootROM 是烧死在 SoC 芯片里的第一段代码：
    - 存在位置：
    - 芯片内部 ROM（Mask ROM / One-Time Programmable）
    - 上电后 CPU 执行的第一条指令
    - 不在 Android 镜像里
    - 不在你刷机能碰到的任何分区里
- 你可以把它理解为：
> 硬件厂商写给 CPU 的“出厂 BIOS”

#### 2.BootROM 职责边界
1. 最基本的硬件初始化
    - CPU时钟
    - SRAM
    - 极简总线
2. 找到下一步的代码(Bootloader)
    - 校验Bootloader是否符合里面写的密钥和结果
    - 从 eMMC / UFS / NAND / SPI Flash 或 USB（刷机模式）
3. 验证下一阶段是否可信
    - Root of Trust
    - 公钥通常烧在芯片里

在软件视角下，BootROM 被视为不可变组件。
其代码在芯片出厂时即被固化，生命周期完全早于并独立于任何软件阶段，因此不受操作系统或固件更新机制控制

### 2.Bootloader
#### 1. Bootloader 是什么？
- Bootloader 是 BootROM 加载的“第一段可更新代码”。
2. 在 Android 世界里，通常是：
    - Qualcomm：ABL / XBL
    - 通用叫法：Primary / Secondary Bootloader
    - 用户可感知层面：fastboot 模式

#### 2. Bootloader 的职责边界
Bootloader 不运行 Android，也不理解 Java，它的边界是：
1. 更完整的硬件初始化
    - DDR 初始化（这是重头戏）
    - 外设
2. 安全状态决策
    - bootloader 是否锁定
    - AVB / Verified Boot
3. 加载并验证 Kernel
    - kernel
    - ramdisk
    - dtb
- 提供刷机 / 调试接口
    - fastboot
    - recovery 入口判断

### 3.Linux Kernel
到这里差不多我们也从硬件进入操作系统了
1. Kernel 在启动链中的地位
这是一个质变点：
> Kernel 是第一段“通用操作系统代码”  

从这一刻开始：
- 不再是厂商私有代码
- 开始执行真正的代码了，而不是写死的二进制

### 2. Kernel 的职责边界
在启动阶段，Kernel 只关心这些：
1. 建立最小内核运行环境
    - MMU
    - 页表
    - 中断
2. 识别硬件
    - Device Tree
3. 挂载临时根文件系统
    - initramfs / ramdisk
4. 启动第一个用户态进程
    - /init
Kernel 不会：
    启动 SystemServer
    管理 App
    理解 Android Framework

下一篇就是安卓启动的核心了，`system/core/init/main.cpp`

