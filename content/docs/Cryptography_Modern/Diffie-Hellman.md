---
title: Diffie-Hellman密钥交换协议
type: docs
---

![des](../../../trippy-purple.png)
这个更确切说是学习思想不是实际代码，这个代码实现起来其实很简单   

# 算法理论

想象一下，你要和一位从未见过面的朋友共用一个密码本，但所有通信都被中间人监控。这听起来是个不可能的任务？然而，Diffie-Hellman密钥交换算法正是解决这个难题的魔法。

{{< callout >}}
颜色的魔术
{{< /callout >}}

理解这个算法最经典的比喻是“颜色混合”：

1. 首先，Alice和Bob公开约定一种起始颜色(比如黄色)
2. 然后，各自秘密选择一种私人颜色(Alice选红色,Bob选蓝色)
3. 他们将私人颜色与公共黄色混合，得到新颜色(Alice得到橙红,Bob得到青绿),然后公开交换混合后的颜色
4. 最关键的一步:他们各自将自己的私人颜色再次混入对方发来的颜色中,奇迹发生了——双方最终得到了完全相同的颜色!

这个最终颜色就是他们的共享密钥，而窃听者虽然看到了所有公开交换的颜色，却无法推导出最终结果。

{{< callout >}}
数学的魔法
{{< /callout >}}

现实中，我们用的不是颜色，而是数学。算法依赖“模幂运算”的单向性——正向计算容易，反向求解极其困难   

具体步骤十分优雅:
1. 双方公开约定两个数：一个大质数p和一个生成元g
2. Alice选择一个私密数字a作为私钥，计算并发送她的公钥 A = gᵃ mod p
3. Bob选择一个私密数字b作为私钥，计算并发送他的公钥 B = gᵇ mod p
4. Alice用Bob的公钥计算共享密钥 s = Bᵃ mod p
5. Bob用Alice的公钥计算共享密钥 s = Aᵇ mod p

这个算法的精妙在于：双方通过交换“半成品”，结合自己的秘密原料，各自独立生产出了相同的“成品”。这是一种巧妙的协作——任何一方单独都无法完成，但合作时又无需泄露核心秘密   
# 总结
如今，Diffie-Hellman算法已成为TLS/HTTPS等安全协议的基石，守护着我们的每一次网络通信。它告诉我们：即使在最不安全的环境下，通过巧妙的数学设计，仍然能够建立可靠的信任

# 简略代码实现
```go
package main

import (
	"crypto/rand"
	"fmt"
	"math/big"
)

// DHKey 包含 Diffie-Hellman 的密钥对
type DHKey struct {
	PrivateKey *big.Int
	PublicKey  *big.Int
}

// GenerateDHKey 生成 Diffie-Hellman 密钥对
// p: 大质数, g: 生成元
func GenerateDHKey(p, g *big.Int) (*DHKey, error) {
	// 生成私钥：一个随机的大整数，范围 [1, p-2]
	// p-2 是因为私钥不能为0，且应该小于 p-1 以确保安全性
	privateKey, err := rand.Int(rand.Reader, new(big.Int).Sub(p, big.NewInt(2)))
	if err != nil {
		return nil, err
	}
	// 私钥至少为1
	privateKey.Add(privateKey, big.NewInt(1))

	// 计算公钥：g^privateKey mod p
	publicKey := new(big.Int).Exp(g, privateKey, p)

	return &DHKey{
		PrivateKey: privateKey,
		PublicKey:  publicKey,
	}, nil
}

// ComputeSharedSecret 计算共享密钥
// 使用自己的私钥和对方的公钥
func ComputeSharedSecret(privateKey, otherPublicKey, p *big.Int) *big.Int {
	// sharedSecret = otherPublicKey^privateKey mod p
	return new(big.Int).Exp(otherPublicKey, privateKey, p)
}

func main() {
	// 1. 双方约定公共参数
	// 在实际应用中，这些参数通常是标准化的（如 RFC 3526 中定义）
	// 这里我们使用一个相对较小的质数作为示例（实际应用要用2048位或更大的质数）
	
	// p: 一个大质数
	p := big.NewInt(23) // 示例使用小质数，实际要用非常大的质数
	
	// g: 生成元，通常是2或者5
	g := big.NewInt(5)

	fmt.Printf("公共参数:\n")
	fmt.Printf("  质数 p = %s\n", p.String())
	fmt.Printf("  生成元 g = %s\n", g.String())
	fmt.Println()

	// 2. Alice 生成密钥对
	aliceKey, err := GenerateDHKey(p, g)
	if err != nil {
		fmt.Printf("Alice 密钥生成失败: %v\n", err)
		return
	}
	fmt.Printf("Alice:\n")
	fmt.Printf("  私钥 a = %s (保密)\n", aliceKey.PrivateKey.String())
	fmt.Printf("  公钥 A = g^a mod p = %s (公开)\n", aliceKey.PublicKey.String())
	fmt.Println()

	// 3. Bob 生成密钥对
	bobKey, err := GenerateDHKey(p, g)
	if err != nil {
		fmt.Printf("Bob 密钥生成失败: %v\n", err)
		return
	}
	fmt.Printf("Bob:\n")
	fmt.Printf("  私钥 b = %s (保密)\n", bobKey.PrivateKey.String())
	fmt.Printf("  公钥 B = g^b mod p = %s (公开)\n", bobKey.PublicKey.String())
	fmt.Println()

	// 4. 双方交换公钥后计算共享密钥

	// Alice 使用自己的私钥和 Bob 的公钥计算共享密钥
	aliceSharedSecret := ComputeSharedSecret(aliceKey.PrivateKey, bobKey.PublicKey, p)
	fmt.Printf("Alice 计算的共享密钥:\n")
	fmt.Printf("  s = B^a mod p = %s\n", aliceSharedSecret.String())
	fmt.Println()

	// Bob 使用自己的私钥和 Alice 的公钥计算共享密钥
	bobSharedSecret := ComputeSharedSecret(bobKey.PrivateKey, aliceKey.PublicKey, p)
	fmt.Printf("Bob 计算的共享密钥:\n")
	fmt.Printf("  s = A^b mod p = %s\n", bobSharedSecret.String())
	fmt.Println()

	// 5. 验证双方计算的共享密钥是否相同
	if aliceSharedSecret.Cmp(bobSharedSecret) == 0 {
		fmt.Printf("✅ 成功！双方建立了相同的共享密钥: %s\n", aliceSharedSecret.String())
		fmt.Printf("   这个密钥可以用于 AES 等对称加密\n")
	} else {
		fmt.Printf("❌ 错误！共享密钥不匹配\n")
	}

	// 6. 演示窃听者看到的信息
	fmt.Println("\n--- 窃听者视角 ---")
	fmt.Printf("能看到的信息: p=%s, g=%s\n", p.String(), g.String())
	fmt.Printf("               Alice公钥 A=%s\n", aliceKey.PublicKey.String())
	fmt.Printf("               Bob公钥 B=%s\n", bobKey.PublicKey.String())
	fmt.Printf("无法得知: Alice私钥(a), Bob私钥(b), 共享密钥(s)\n")
}
```
