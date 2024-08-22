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

const int N = 1010, mod = 1e9 + 7;

int n;
int f[N];

int main()
{
    cin >> n;

    f[0] = 1;
    for (int i = 1; i <= n; i ++ )
        for (int j = i; j <= n; j ++ )
            f[j] = (f[j] + f[j - i]) % mod;
    
    cout << f[n] << endl;
    
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

const int N = 1010, mod = 1e9 + 7;

int n;
int f[N][N];

int main()
{
    cin >> n;

    f[1][1] = 1;
    for (int i = 2; i <= n; i ++ )
        for (int j = 1; j <= i; j ++ )
            f[i][j] = (f[i - 1][j - 1] + f[i - j][j]) % mod;
    
    int res = 0;
    for (int i = 1; i <= n; i ++ ) res = (res + f[n][i]) % mod;
    
    cout << res << endl;
    
    return 0;
}
```