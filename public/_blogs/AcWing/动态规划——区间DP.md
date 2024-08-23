# 动态规划——区间DP

### AcWing 282. 石子合并

```c++
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 310; // 定义数组的最大长度

int n; // 石子堆的数量
int s[N]; // s[i]: 前i堆石子的总重量
int f[N][N]; // f[i][j]: 将第i堆到第j堆石子合并成一堆的最小代价

int main()
{
    scanf("%d", &n); // 输入石子堆的数量n

    for (int i = 1; i <= n; i ++ ) scanf("%d", &s[i]); // 读取每堆石子的重量

    // 计算前缀和，s[i]现在表示前i堆石子的总重量
    for (int i = 1; i <= n; i ++ ) s[i] += s[i - 1];

    // 动态规划求解
    for (int len = 2; len <= n; len ++ ) // 遍历石子堆的长度
        for (int i = 1; i + len - 1 <= n; i ++ ) // 遍历起始位置
        {
            int l = i, r = i + len - 1; // 当前石子堆的起始和结束位置
            f[l][r] = 1e8; // 初始化为一个较大的值
            for (int k = l; k < r; k ++ ) // 遍历分割点
                f[l][r] = min(f[l][r], f[l][k] + f[k + 1][r] + s[r] - s[l - 1]); // 更新最优解
        }

    printf("%d\n", f[1][n]); // 输出将所有石子堆合并成一堆的最小代价

    return 0;
}
```