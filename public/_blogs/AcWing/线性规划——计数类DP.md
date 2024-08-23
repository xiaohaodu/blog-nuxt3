# 线性规划——计数类DP

### AcWing 900. 整数划分

完全背包解法
状态表示：
f\[i][j]表示只从1~i中选，且总和等于j的方案数

状态转移方程:
f\[i][j] = f\[i - 1][j] + f\[i][j - i];
```c++
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 1010; // 定义数组的最大长度
const int mod = 1e9 + 7; // 定义模数

int n; // 需要划分的整数
int f[N]; // f[j]: 将j划分成若干个正整数之和的不同方法的数量

int main()
{
    cin >> n; // 输入需要划分的整数n

    f[0] = 1; // 基础情况：0可以被唯一地划分成0

    for (int i = 1; i <= n; i ++ ) // 遍历每个可能的划分数i
        for (int j = i; j <= n; j ++ ) // 从i到n，计算将j划分成若干个正整数之和的方法数量
            f[j] = (f[j] + f[j - i]) % mod; // 更新f[j]，将j划分成若干个正整数之和的方法数量

    cout << f[n] << endl; // 输出将n划分成若干个正整数之和的不同方法的数量

    return 0;
}
```
其他算法
状态表示：
f\[i][j]表示总和为i，总个数为j的方案数

状态转移方程：
f\[i][j] = f\[i - 1][j - 1] + f\[i - j][j];
```c++
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 1010; // 定义数组的最大长度
const int mod = 1e9 + 7; // 定义模数

int n; // 需要划分的整数
int f[N][N]; // f[i][j]: 将i划分成j个正整数之和的不同方法的数量

int main()
{
    cin >> n; // 输入需要划分的整数n

    f[1][1] = 1; // 基础情况：1只能被唯一地划分成1

    for (int i = 2; i <= n; i ++ ) // 遍历每个需要划分的整数i
        for (int j = 1; j <= i; j ++ ) // 从1到i，计算将i划分成j个正整数之和的方法数量
            f[i][j] = (f[i - 1][j - 1] + f[i - j][j]) % mod; // 更新f[i][j]，将i划分成j个正整数之和的方法数量

    int res = 0; // 初始化结果
    for (int i = 1; i <= n; i ++ ) // 计算将n划分成不同数量的正整数之和的方法数量之和
        res = (res + f[n][i]) % mod; // 累加不同划分方法的数量

    cout << res << endl; // 输出将n划分成若干个正整数之和的不同方法的数量

    return 0;
}
```