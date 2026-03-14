---
title: Android12 Security Lab
type: docs
---

# Android 漏洞研究训练流程

## 1. 搭建可控环境

> 确保有一份可编译、可运行的 Android 源码环境。

建议准备一台可刷机设备，例如：

- 小米 Mi 8 (Android smartphone)
- Google Pixel 4 (Android smartphone)

配合：

- Android Open Source Project (AOSP, official Android source)
- 或可刷入的 LineageOS (custom Android OS)

真实设备通常比虚拟机更流畅，调试体验更好。虚拟机（如 QEMU / Emulator）也可以使用，但在性能和调试体验上可能稍差。

目标是：

- 能编译系统
- 能刷入或启动系统
- 能方便调试和测试漏洞

---

## 2. 收集漏洞

> 获取权威 CVE 编号和漏洞组件信息。

主要来源：

- [Google 官方安全公告](https://source.android.com/docs/security/bulletin/asb-overview?hl=zh-cn)
- [National Vulnerability Database (NVD)](https://nvd.nist.gov/)
- [Common Vulnerabilities and Exposures](https://cve.org/)

整理漏洞信息：

```
CVE ID
影响组件
漏洞类型
影响 Android 版本
```

这样可以逐步建立自己的漏洞列表。

---

## 3. 先思考攻击

> 在查看 PoC 前先自己推测攻击路径。

步骤：

1. 阅读相关源码
2. 分析漏洞可能出现的位置
3. 推测攻击路径

然后再去查看：

- 官方 PoC
- 社区 exploit

重点是对比：

```
自己的推测
VS
真实攻击方式
```

这样可以逐渐培养漏洞分析直觉。

---

## 4. 漏洞复现

> 在可控环境中运行 exploit，验证漏洞存在。

可以在：

- Android 实机
- 模拟器环境

中执行 PoC 或 exploit，验证漏洞是否可以成功触发。

同时观察：

- 崩溃日志
- 权限变化
- 系统行为

以确认漏洞真实存在。

---

## 5. 尝试修复

> 根据自己的理解编写 patch。

步骤：

1. 分析漏洞 root cause
2. 编写自己的修复代码
3. 重新编译系统
4. 再次执行 exploit

如果 exploit 失效，说明修复可能有效。

---

## 6. 对比官方方案

> 查看官方 patch 并进行对比分析。

在源码仓库中查找官方修复 commit，例如：

```
git log --grep=CVE
```

然后对比：

- 自己的 patch
- 官方 patch

分析：

- 官方为什么这样修
- 是否考虑了更多边界情况
- 修复是否更通用或更安全

---

## 7. 写笔记

> 将整个过程记录下来。

建议记录：

```
漏洞描述
影响范围
攻击思路
PoC / exploit
Root Cause
个人修复方案
官方修复方案
Patch 对比
总结
```

长期积累可以形成自己的漏洞研究知识库。

---

## 8. 更新迭代

> 持续加入新的漏洞并更新已有分析。

不断：

- 研究新的 CVE
- 补充旧漏洞的理解
- 更新 exploit 或 patch 思路

逐渐形成系统化知识体系。

---

## 9. 回顾激发思路

> 在积累一定数量漏洞后重新回顾。

当研究了 10~20 个漏洞之后：  
重新查看之前研究过的模块，例如：

- Binder
- Media
- Framework

思考：

- 官方 patch 是否完全修复问题
- 是否存在绕过方式
- 是否存在新的攻击路径

这一步的目标是：  
从 **漏洞复现者** 逐渐成长为 **漏洞发现者**。

---

# 一句话总结

> 通过“复现漏洞 → 自己修复 → 对比官方 → 长期回顾”的循环训练，逐步建立 Android 系统级安全研究能力。
