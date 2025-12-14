---
title: SM3哈希函数
type: docs
---

![SM4](../../../touhou-lake.jpg)
这个也是一个经典的`SHA-2`系列的hash函数，输出是64位长度  
别的不多说了，直接看需要记住什么吧

### 1. 常量
```c
static const uint32_t T[64] = {
    0x79CC4519, 0x7A879D8A, 0x3C6EF372, 0x3F67C4C3, 0x72D8F6EC, 0x5B2D7B0E, 
    0x2C3F7B58, 0x8B8C15E1, 0x7BFE72B0, 0x97E72CB4, 0xA4A23813, 0x1FDD56A3, 
    0x32C9D03A, 0xD6D047F7, 0x1B9E4E06, 0x45DB4A8C, 0x65D96BC8, 0x30A4E307, 
    0x705E57A1, 0xC7D5F50F, 0x9DC99CB1, 0x5A5C1B2F, 0x559F96D5, 0xA80B0839, 
    0x27B0D56D, 0xDE80C2D7, 0x9FB3E857, 0x7FB7FEC1, 0x08B90C13, 0x68F76A8F, 
    0x6D73DAB8, 0x845A726A, 0x16A92A18, 0x41B50C02, 0xBCE7B13F, 0xF4D2B3C1, 
    0xD44F1595, 0x13E3EC29, 0x1C2BE46F, 0x0A018A8C, 0x1498D5A5, 0x7986FDF5, 
    0xF033F951, 0xBB1DDF19, 0x9601DCBD, 0x8A35B825, 0x2D3E3A6E, 0x800F167F, 
    0x0F88CBA0, 0x05E8D3F2, 0xD89E6C55, 0x2F1FB07E, 0x70787AC5, 0x93FE2D45, 
    0x6F3B472B, 0x1E597F92, 0x2F38D539, 0x2CCF6D3B, 0x34292B96, 0xBA10B832
};
 
static const uint32_t IV[8] = {
    0x7380166F, 0x4914B2B9, 0x172442D7, 0xDA8A0600, 
    0xA96F30BC, 0x50B9E7D6, 0x10B1C56E, 0x3A2D71F1
};
```
这种玩意记不住也正常，hash函数那么多都记住也是神人了  
就记住3个就可以，连续的3个不知道是什么系列也能搜  

### 2. 轮数
在消息扩散部分有一个64+68的循环特征，压缩函数是64轮，这个可以留意一下

### 3. 位移运算
```c
x ^ (x <<< 9) ^ (x <<< 17)
x ^ (x <<< 15) ^ (x <<< 23)
```
这两个都是循环左移，并且是写死的

## 代码实现
```c
#include <stdio.h>
#include <string.h>
#include <stdint.h>
 
#define SM3_BLOCK_SIZE 64 // 每个块的大小（512位）
#define SM3_HASH_SIZE 32  // 输出哈希值的大小（256位）
 
// 常数Tj（用于压缩函数的循环）
static const uint32_t T[64] = {
    0x79CC4519, 0x7A879D8A, 0x3C6EF372, 0x3F67C4C3, 0x72D8F6EC, 0x5B2D7B0E, 
    0x2C3F7B58, 0x8B8C15E1, 0x7BFE72B0, 0x97E72CB4, 0xA4A23813, 0x1FDD56A3, 
    0x32C9D03A, 0xD6D047F7, 0x1B9E4E06, 0x45DB4A8C, 0x65D96BC8, 0x30A4E307, 
    0x705E57A1, 0xC7D5F50F, 0x9DC99CB1, 0x5A5C1B2F, 0x559F96D5, 0xA80B0839, 
    0x27B0D56D, 0xDE80C2D7, 0x9FB3E857, 0x7FB7FEC1, 0x08B90C13, 0x68F76A8F, 
    0x6D73DAB8, 0x845A726A, 0x16A92A18, 0x41B50C02, 0xBCE7B13F, 0xF4D2B3C1, 
    0xD44F1595, 0x13E3EC29, 0x1C2BE46F, 0x0A018A8C, 0x1498D5A5, 0x7986FDF5, 
    0xF033F951, 0xBB1DDF19, 0x9601DCBD, 0x8A35B825, 0x2D3E3A6E, 0x800F167F, 
    0x0F88CBA0, 0x05E8D3F2, 0xD89E6C55, 0x2F1FB07E, 0x70787AC5, 0x93FE2D45, 
    0x6F3B472B, 0x1E597F92, 0x2F38D539, 0x2CCF6D3B, 0x34292B96, 0xBA10B832
};
 
// 常数IV，表示初始状态
static const uint32_t IV[8] = {
    0x7380166F, 0x4914B2B9, 0x172442D7, 0xDA8A0600, 
    0xA96F30BC, 0x50B9E7D6, 0x10B1C56E, 0x3A2D71F1
};
 
// 循环左移（位运算）
#define ROTATE_LEFT(x, n) (((x) << (n)) | ((x) >> (32 - (n))))
 
// 消息填充，符合SM3的填充规则
void sm3_padding(uint8_t *message, size_t *message_len) {
    size_t new_len = *message_len + 1;
    while (new_len % SM3_BLOCK_SIZE != 56) {
        new_len++;
    }
    new_len += 8;  // 追加64位长度信息
 
    uint8_t *padded_message = (uint8_t *)malloc(new_len);
    memcpy(padded_message, message, *message_len);
    padded_message[*message_len] = 0x80;  // 填充1
    memset(padded_message + *message_len + 1, 0, new_len - *message_len - 9);
 
    uint64_t message_bit_len = *message_len * 8;
    for (int i = 0; i < 8; i++) {
        padded_message[new_len - 1 - i] = (message_bit_len >> (i * 8)) & 0xFF;
    }
 
    *message_len = new_len;
    memcpy(message, padded_message, new_len);
    free(padded_message);
}
 
// 消息扩展
void sm3_message_schedule(uint8_t *message, uint32_t W[68], uint32_t W1[64]) {
    for (int i = 0; i < 16; i++) {
        W[i] = (message[i * 4] << 24) | (message[i * 4 + 1] << 16) |
               (message[i * 4 + 2] << 8) | message[i * 4 + 3];
    }
 
    for (int i = 16; i < 68; i++) {
        W[i] = W[i - 16] ^ W[i - 9] ^ ROTATE_LEFT(W[i - 3], 15) ^
               ROTATE_LEFT(W[i - 13], 7) ^ W[i - 6];
    }
 
    for (int i = 0; i < 64; i++) {
        W1[i] = W[i] ^ W[i + 4];
    }
}
 
// 压缩函数
void sm3_compress(uint32_t state[8], uint8_t *message) {
    uint32_t W[68], W1[64];
    sm3_message_schedule(message, W, W1);
 
    uint32_t A = state[0];
    uint32_t B = state[1];
    uint32_t C = state[2];
    uint32_t D = state[3];
    uint32_t E = state[4];
    uint32_t F = state[5];
    uint32_t G = state[6];
    uint32_t H = state[7];
 
    for (int j = 0; j < 64; j++) {
        uint32_t SS1 = ROTATE_LEFT(ROTATE_LEFT(A, 12) + E + ROTATE_LEFT(T[j], j), 7);
        uint32_t SS2 = SS1 ^ ROTATE_LEFT(A, 12);
        uint32_t TT1 = FF1(A, B, C) + D + SS2 + W1[j];
        uint32_t TT2 = GG1(E, F, G) + H + SS1 + W[j];
 
        D = C;
        C = ROTATE_LEFT(B, 9);
        B = A;
        A = TT1;
 
        H = G;
        G = ROTATE_LEFT(F, 19);
        F = E;
        E = P0(TT2);
    }
 
    state[0] ^= A;
    state[1] ^= B;
    state[2] ^= C;
    state[3] ^= D;
    state[4] ^= E;
    state[5] ^= F;
    state[6] ^= G;
    state[7] ^= H;
}
 
// SM3哈希函数
void sm3_hash(uint8_t *message, size_t message_len, uint8_t *output_hash) {
    sm3_padding(message, &message_len);
    uint32_t state[8];
    memcpy(state, IV, sizeof(IV));
 
    for (size_t i = 0; i < message_len; i += SM3_BLOCK_SIZE) {
        sm3_compress(state, message + i);
    }
 
    for (int i = 0; i < 8; i++) {
        output_hash[i * 4] = (state[i] >> 24) & 0xFF;
        output_hash[i * 4 + 1] = (state[i] >> 16) & 0xFF;
        output_hash[i * 4 + 2] = (state[i] >> 8) & 0xFF;
        output_hash[i * 4 + 3] = state[i] & 0xFF;
    }
}
 
int main() {
    uint8_t message[] = "hello SM3!";
    size_t message_len = strlen((char *)message);
    uint8_t output_hash[SM3_HASH_SIZE];
 
    sm3_hash(message, message_len, output_hash);
 
    printf("SM3 哈希值: ");
    for (int i = 0; i < SM3_HASH_SIZE; i++) {
        printf("%02x", output_hash[i]);
    }
    printf("\n");
 
    return 0;
}
```
