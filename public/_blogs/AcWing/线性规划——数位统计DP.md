# 线性规划——数位统计DP

### AcWing 338. 计数问题

```c++
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

const int N = 10;

// 辅助函数：计算从num的第l位到第r位构成的数字
int get(vector<int> num, int l, int r)
{
    int res = 0;
    for (int i = l; i >= r; i -- ) res = res * 10 + num[i];
    return res;
}

// 辅助函数：计算10的x次方
int power10(int x)
{
    int res = 1;
    while (x -- ) res *= 10;
    return res;
}

// 主函数：计算数字n中数字x出现的次数
int count(int n, int x)
{
    if (!n) return 0; // 如果n为0，则返回0

    vector<int> num; // 存储n的每一位数字
    while (n)
    {
        num.push_back(n % 10); // 将n的每一位数字存入vector
        n /= 10; // 移除最低位
    }
    n = num.size(); // n现在表示数字n的位数

    int res = 0; // 初始化结果
    for (int i = n - 1 - !x; i >= 0; i -- ) // 从最高位到最低位遍历
    {
        if (i < n - 1) // 如果不是最高位
        {
            res += get(num, n - 1, i + 1) * power10(i); // 加上前缀贡献
            if (!x) res -= power10(i); // 如果x为0，减去多余的贡献
        }

        if (num[i] == x) res += get(num, i - 1, 0) + 1; // 如果当前位等于x，加上贡献
        else if (num[i] > x) res += power10(i); // 如果当前位大于x，加上贡献
    }

    return res;
}

int main()
{
    int a, b;
    while (cin >> a >> b && a) // 读取a和b，直到输入结束
    {
        if (a > b) swap(a, b); // 确保a ≤ b

        for (int i = 0; i <= 9; i ++ ) // 对于每个数字0到9
            cout << count(b, i) - count(a - 1, i) << ' '; // 输出在[a, b]区间内该数字出现的次数
        cout << endl;
    }

    return 0;
}
```