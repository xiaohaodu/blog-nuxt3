# 动态规划——线性DP

### AcWing 898. 数字三角形

```c++
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 510; // 定义数组的最大长度
const int INF = 1e9; // 定义无穷大值

int n; // 三角形的层数
int a[N][N]; // 三角形的数字
int f[N][N]; // f[i][j]: 到达第i层第j个位置的最大路径和

int main()
{
    scanf("%d", &n); // 输入三角形的层数n

    for (int i = 1; i <= n; i ++ ) // 读取每一层的数字
        for (int j = 1; j <= i; j ++ )
            scanf("%d", &a[i][j]);

    for (int i = 0; i <= n; i ++ ) // 初始化f数组为负无穷
        for (int j = 0; j <= i + 1; j ++ )
            f[i][j] = -INF;

    f[1][1] = a[1][1]; // 从第一层的第一个位置开始

    for (int i = 2; i <= n; i ++ ) // 从第二层开始遍历
        for (int j = 1; j <= i; j ++ )
            f[i][j] = max(f[i - 1][j - 1] + a[i][j], f[i - 1][j] + a[i][j]); // 更新到达当前位置的最大路径和

    int res = -INF; // 初始化结果为负无穷
    for (int i = 1; i <= n; i ++ ) // 找到最后一层的最大路径和
        res = max(res, f[n][i]);

    printf("%d\n", res); // 输出最大路径和

    return 0;
}
```

### AcWing 895. 最长上升子序列

```c++
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 1010; // 定义数组的最大长度

int n; // 序列的长度
int a[N]; // 序列中的整数
int f[N]; // f[i]: 以a[i]结尾的最长递增子序列的长度

int main()
{
    scanf("%d", &n); // 输入序列的长度n

    for (int i = 1; i <= n; i ++ ) // 读取序列中的每个元素
        scanf("%d", &a[i]);

    for (int i = 1; i <= n; i ++ ) // 遍历每个元素
    {
        f[i] = 1; // 最短的递增子序列只包含a[i]本身
        for (int j = 1; j < i; j ++ ) // 遍历a[i]之前的元素
            if (a[j] < a[i]) // 如果前面的元素小于当前元素，则可能形成递增子序列
                f[i] = max(f[i], f[j] + 1); // 更新以a[i]结尾的最长递增子序列的长度
    }

    int res = 0; // 初始化结果为0
    for (int i = 1; i <= n; i ++ ) // 找到最长递增子序列的长度
        res = max(res, f[i]);

    printf("%d\n", res); // 输出最长递增子序列的长度

    return 0;
}
```

### AcWing 896. 最长上升子序列 II

```c++
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 100010; // 定义数组的最大长度

int n; // 序列的长度
int a[N]; // 序列中的整数
int q[N]; // 存储最长递增子序列中的最小结尾值

int main()
{
    scanf("%d", &n); // 输入序列的长度n

    for (int i = 0; i < n; i ++ ) // 读取序列中的每个元素
        scanf("%d", &a[i]);

    int len = 0; // 最长递增子序列的长度
    for (int i = 0; i < n; i ++ ) // 遍历每个元素
    {
        int l = 0, r = len; // 初始化二分查找的左右边界
        while (l < r) // 使用二分查找来定位a[i]应该插入的位置
        {
            int mid = l + r + 1 >> 1; // 计算中间位置
            if (q[mid] < a[i]) l = mid; // 如果中间位置的值小于a[i]，则在右半部分查找
            else r = mid - 1; // 否则，在左半部分查找
        }
        len = max(len, r + 1); // 更新最长递增子序列的长度
        q[r + 1] = a[i]; // 更新q数组中的值
    }

    printf("%d\n", len); // 输出最长递增子序列的长度

    return 0;
}
```

### AcWing 897. 最长公共子序列

```c++
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 1010; // 定义数组的最大长度

int n, m; // 两个字符串的长度
char a[N], b[N]; // 两个字符串
int f[N][N]; // f[i][j]: 字符串a的前i个字符和字符串b的前j个字符的最长公共子序列的长度

int main()
{
    scanf("%d%d", &n, &m); // 输入两个字符串的长度n和m

    scanf("%s%s", a + 1, b + 1); // 读取两个字符串

    for (int i = 1; i <= n; i ++ ) // 遍历字符串a的每个字符
        for (int j = 1; j <= m; j ++ ) // 遍历字符串b的每个字符
        {
            f[i][j] = max(f[i - 1][j], f[i][j - 1]); // 如果当前字符不匹配，则取两者中的最大值
            if (a[i] == b[j]) // 如果当前字符匹配，则可能形成公共子序列
                f[i][j] = max(f[i][j], f[i - 1][j - 1] + 1); // 更新最长公共子序列的长度
        }

    printf("%d\n", f[n][m]); // 输出最长公共子序列的长度

    return 0;
}
```

### AcWing 902. 最短编辑距离

```c++
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 1010; // 定义数组的最大长度

int n, m; // 两个字符串的长度
char a[N], b[N]; // 两个字符串
int f[N][N]; // f[i][j]: 将字符串a的前i个字符转换为字符串b的前j个字符所需的最少操作次数

int main()
{
    scanf("%d%s", &n, a + 1); // 输入第一个字符串的长度n和字符串a
    scanf("%d%s", &m, b + 1); // 输入第二个字符串的长度m和字符串b

    for (int i = 0; i <= m; i ++ ) f[0][i] = i; // 初始化第一行
    for (int i = 0; i <= n; i ++ ) f[i][0] = i; // 初始化第一列

    for (int i = 1; i <= n; i ++ ) // 遍历字符串a的每个字符
        for (int j = 1; j <= m; j ++ ) // 遍历字符串b的每个字符
        {
            f[i][j] = min(f[i - 1][j] + 1, f[i][j - 1] + 1); // 删除或插入操作
            if (a[i] == b[j]) // 如果当前字符相同，则不需要额外的操作
                f[i][j] = min(f[i][j], f[i - 1][j - 1]); // 不需要替换
            else
                f[i][j] = min(f[i][j], f[i - 1][j - 1] + 1); // 替换操作
        }

    printf("%d\n", f[n][m]); // 输出将字符串a转换为字符串b所需的最少操作次数

    return 0;
}
```

### AcWing 899. 编辑距离

```c++
#include <iostream>
#include <algorithm>
#include <cstring> // 用于字符串操作

using namespace std;

const int N = 15; // 定义字符串的最大长度
const int M = 1010; // 定义字符串的数量

int n, m; // 字符串数量和查询次数
int f[N][N]; // 用于计算编辑距离的动态规划表
char str[M][N]; // 存储给定的字符串

// 计算两个字符串之间的编辑距离
int edit_distance(char a[], char b[])
{
    int la = strlen(a); // 获取字符串a的长度
    int lb = strlen(b); // 获取字符串b的长度

    for (int i = 0; i <= lb; i ++ ) f[0][i] = i; // 初始化第一行
    for (int i = 0; i <= la; i ++ ) f[i][0] = i; // 初始化第一列

    for (int i = 1; i <= la; i ++ ) // 遍历字符串a的每个字符
        for (int j = 1; j <= lb; j ++ ) // 遍历字符串b的每个字符
        {
            f[i][j] = min(f[i - 1][j] + 1, f[i][j - 1] + 1); // 删除或插入操作
            f[i][j] = min(f[i][j], f[i - 1][j - 1] + (a[i] != b[j])); // 替换操作
        }

    return f[la][lb]; // 返回编辑距离
}

int main()
{
    scanf("%d%d", &n, &m); // 输入字符串数量n和查询次数m
    for (int i = 0; i < n; i ++ ) scanf("%s", str[i]); // 读取每个字符串

    while (m -- )
    {
        char s[N]; // 目标字符串
        int limit; // 编辑距离的限制值
        scanf("%s%d", s, &limit); // 读取查询的目标字符串和限制值

        int res = 0; // 初始化计数器
        for (int i = 0; i < n; i ++ ) // 对于每个给定的字符串
            if (edit_distance(str[i], s) <= limit) // 如果编辑距离小于等于限制值
                res ++ ; // 增加计数

        printf("%d\n", res); // 输出满足条件的字符串数量
    }

    return 0;
}
```