---
title: renef 注入源码
type: docs
---

renef 源码解析篇，用来学习 so 是如何注入到 app 内的

### 第一步：README 和文档

先通读  `README.md`，了解项目用途、特性、命令行示例，对整体功能有直观印象。

### 第二步：构建与入口

- 查看  `binr/renef/main.cpp`：CLI 主循环，解析参数，初始化连接，进入交互模式。
- 查看  `librenef/binding/renef.cpp`：如何与 Agent 建立连接、发送命令、接收结果。

### 第三步：Agent 核心

- `agent/core/agent.c`：Agent 初始化，注册命令，启动 Lua 引擎。
- `agent/core/registry.c`：命令注册表，将字符串命令映射到处理函数。
- `agent/handlers/`  下每个 .c 文件对应一个命令实现，例如  `memscan.c`  实现内存扫描。

### 第四步：Hook 机制

- `agent/hook/native.c`：Native 函数 hook（PLT/GOT、inline hook）。
- `agent/hook/java.c`：Java 方法 hook（通过 JNI）。
- 查看  `agent/lua/api_hook.c`  了解 Lua 如何调用 hook 函数。

### 第五步：Lua 引擎

- `agent/lua/engine.c`：Lua 状态初始化，加载基础库。
- `agent/lua/api_*.c`：每个文件实现一组 Lua API，如  `api_memory.c`  提供  `memory.read/write/search`。
- 阅读  `agent/include/agent/lua_*.h`  查看 Lua 函数注册表。

### 第六步：内存操作

- `agent/handlers/memscan.c`  和  `memdump.c`  实现底层扫描/转储。
- `agent/lua/api_memory.c`  将底层能力暴露给 Lua。
- `librenef/cmd/cmd_memscan.cpp`  是 CLI 对内存扫描命令的封装。

### 第七步：注入与通信

- `inject/injector.cpp`：如何将 Agent 注入到目标进程（memfd + shellcode）。
- `librenef/transport/`：TCP 和 UDS 的具体实现，`server.cpp`  可能用于监听 Agent 连接。
