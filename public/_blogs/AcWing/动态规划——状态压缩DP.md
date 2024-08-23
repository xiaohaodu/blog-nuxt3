# 动态规划——状态压缩DP

### AcWing 291. 蒙德里安的梦想

```c++
#include <cstring>         // 用于memset函数
#include <iostream>        // 输入输出流
#include <algorithm>       // 标准算法库，这里未直接使用

using namespace std;

const int N = 12;          // 定义行的最大数量
const int M = 1 << N;      // 定义列的状态表示的最大数量（2^N）

int n, m;                  // n 行数, m 矩形数量
long long f[N][M];         // 动态规划数组，f[i][j]表示放置i个矩形后列状态为j的方案数
bool st[M];                // 判断两种状态是否可以相邻的数组

int main()
{
    while (cin >> n >> m, n || m)  // 循环读入数据直到n和m均为0
    {
        // 预处理st数组，判断两种状态是否可以相邻
        for (int i = 0; i < 1 << n; i++)
        {
            int cnt = 0;
            st[i] = true;          // 默认为true
            for (int j = 0; j < n; j++)
                if (i >> j & 1)    // 检查第j位是否为1
                {
                    if (cnt & 1)  // 如果之前有奇数个连续0，则这两种状态不可以相邻
                        st[i] = false;
                    cnt = 0;      // 重置计数器
                }
                else
                    cnt++;        // 计数连续的0
            if (cnt & 1)          // 检查最后是否有奇数个连续0
                st[i] = false;
        }

        memset(f, 0, sizeof f);   // 初始化动态规划数组
        f[0][0] = 1;              // 初始状态，没有放置任何矩形

        // 动态规划转移
        for (int i = 1; i <= m; i++)  // 枚举矩形数量
            for (int j = 0; j < 1 << n; j++)  // 枚举当前列的状态
                for (int k = 0; k < 1 << n; k++)  // 枚举前一列的状态
                    if ((j & k) == 0 && st[j | k])  // 如果两个状态没有重叠且可以相邻
                        f[i][j] += f[i - 1][k];  // 更新动态规划数组

        cout << f[m][0] << endl;  // 输出结果，即放置m个矩形后所有列状态为0的方案数
    }
    return 0;
}
```

去除无效状态的优化写法，230ms
```c++
#include <cstring>         // 用于memset函数
#include <iostream>        // 输入输出流
#include <algorithm>       // 标准算法库，这里未直接使用
#include <vector>          // 使用vector容器

using namespace std;

typedef long long LL;      // 定义长整型别名

const int N = 12;          // 定义行的最大数量
const int M = 1 << N;      // 定义列的状态表示的最大数量（2^N）

int n, m;                  // n 行数, m 矩形数量
LL f[N][M];                // 动态规划数组，f[i][j]表示放置i个矩形后列状态为j的方案数
vector<int> state[M];      // 存储每个状态可以转移到的状态
bool st[M];                // 判断两种状态是否可以相邻的数组

int main()
{
    while (cin >> n >> m, n || m)  // 循环读入数据直到n和m均为0
    {
        // 预处理st数组，判断两种状态是否可以相邻
        for (int i = 0; i < 1 << n; i++)
        {
            int cnt = 0;
            bool is_valid = true;   // 初始设为true
            for (int j = 0; j < n; j++)
                if (i >> j & 1)    // 检查第j位是否为1
                {
                    if (cnt & 1)  // 如果之前有奇数个连续0，则这两种状态不可以相邻
                    {
                        is_valid = false;
                        break;    // 一旦发现不合法就退出循环
                    }
                    cnt = 0;      // 重置计数器
                }
                else
                    cnt++;        // 计数连续的0
            if (cnt & 1)          // 检查最后是否有奇数个连续0
                is_valid = false;
            st[i] = is_valid;     // 标记状态是否有效
        }

        // 预处理state数组，对于每种状态找到所有可以相邻的状态
        for (int i = 0; i < 1 << n; i++)
        {
            state[i].clear();     // 清空之前的记录
            for (int j = 0; j < 1 << n; j++)
                if ((i & j) == 0 && st[i | j])  // 如果两个状态没有重叠且可以相邻
                    state[i].push_back(j);      // 添加到可以转移的状态列表中
        }
    
        memset(f, 0, sizeof f);   // 初始化动态规划数组
        f[0][0] = 1;              // 初始状态，没有放置任何矩形

        // 动态规划转移
        for (int i = 1; i <= m; i++)  // 枚举矩形数量
            for (int j = 0; j < 1 << n; j++)  // 枚举当前列的状态
                for (auto k : state[j])  // 枚举可以从上一列转移过来的状态
                    f[i][j] += f[i - 1][k];  // 更新动态规划数组

        cout << f[m][0] << endl;  // 输出结果，即放置m个矩形后所有列状态为0的方案数
    }
    
    return 0;
}
```

### AcWing 91. 最短Hamilton路径

```c++
#include <cstring>         // 用于memset函数
#include <iostream>        // 输入输出流
#include <algorithm>       // 标准算法库，这里使用min函数

using namespace std;

const int N = 20;          // 定义城市数量的最大值
const int M = 1 << N;      // 定义状态表示的最大数量（2^N）

int n;                     // 城市数量
int w[N][N];               // 二维数组，w[i][j]表示从城市i到城市j的距离
int f[M][N];               // 动态规划数组，f[i][j]表示经过的城市集合为i且最后一个访问的城市为j的最短路径长度

int main()
{
    cin >> n;              // 读入城市数量
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> w[i][j];  // 读入距离矩阵

    memset(f, 0x3f, sizeof f);  // 初始化动态规划数组为无穷大
    f[1][0] = 0;                // 初始状态，只访问了第一个城市(0号城市)，距离为0

    // 动态规划转移
    for (int i = 0; i < 1 << n; i++)  // 枚举所有可能的城市集合
        for (int j = 0; j < n; j++)   // 枚举最后一个访问的城市
            if (i >> j & 1)           // 如果城市j属于集合i
                for (int k = 0; k < n; k++)  // 枚举之前访问的城市
                    if (i >> k & 1)   // 如果城市k也属于集合i
                        f[i][j] = min(f[i][j], f[i - (1 << j)][k] + w[k][j]);  // 动态规划转移

    cout << f[(1 << n) - 1][n - 1] << endl;  // 输出结果，即访问完所有城市并回到起点的最短路径长度

    return 0;
}
```