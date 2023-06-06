# 深度优先搜索（DFS）和广度优先搜索（BFS）

### BFS与DFS比较

|      | 数据结构      | 空间     |        |
| ---- | --------- | ------ | ------ |
| DFS  | stack（栈）  | O(n)   | 不具有最短性 |
| BFS  | queue（队列） | O(2^n) | 最短路    |

### DFS—深度优先搜索

#### 例题：全排列

##### DFS-深度优先搜索，什么样的顺序来遍历搜索？

1. 每一位填，后一位填的话不能与前面相同，可以往下走一直走，否则向前回溯
2. 回溯到可以向下走的话，接着往下走，重复1、2步深搜、回溯两步

> 回溯时注意恢复现场

```c++
#include <iostream>
using namespace std;

const int N = 10;
int n , path[N];
bool st[N]; // 状态数组

void dfs(int u) // 第几个数字，一共几个数字
{
    if(u == n)// 递归到最后一个数字
    {
        for (int i = 0; i < n; i ++ ) cout << path[i] << ' '; // 输出保存的结果
        puts(" ");
    }
    for (int i = 1; i <= n; i ++ )
        if (!st[i]) // 没有被用过的数
        {
            path[u] = i ;
            st[i] = true; // i被用过
            dfs(u + 1);// 走到下一层
            st[i] = false;// 恢复现场
        }
}

int main()
{
    cin >> n;
    dfs(0);
    return 0;
}
```

### 例题：N-皇后问题

方法一

1. 先看第一行皇后可以放到哪个位置上去，然后看第二行皇后可以放到哪里去
2. 深度搜索后得到所有排列后，过滤掉不满足的情况

方法二

1. 先看第一行皇后可以放到哪个位置上去，然后看第二行皇后可以放到哪里去
2. 当不满足条件时不向下继续深搜，直接回溯（剪枝）

```c++
#include <iostream>
using namespace std;

const int N = 20;
int n ;
bool row[N] , col[N] ,dg[N], udg[N] ; // 行列正对角线斜对角线的状态
char g[N][N];

void dfs(int x ,int y ,int s ) // 行 ， 列  ， 皇后
{
    if(y == n)// 第一行递归完毕 ， 转到下一行的第一个
    {
        y = 0,x ++ ;
    }

    if(x == n)// 递归到最后一行数字
    {
        if(s == n) // 皇后的个数等于 n 说明递归完毕
        {
            for (int i = 0; i < n; i ++ ) cout <<g[i]<< endl; // 输出保存的结果
            puts("");
        }
        return ;
    }
    // 不放皇后

    dfs(x, y + 1, s); // 下一行
    // 放皇后
    if(!row[x] && !col[y] && !dg[x + y] && !udg[x - y + n] ) // 没有皇后
    {
        row[x] = col[y] =dg[x + y] =  udg[x - y + n ] = true ; // 放上皇后
        g[x][y] = 'Q';
        dfs(x, y + 1, s + 1);// 下一层
        g[x][y] = '.';
        row[x] = col[y] = dg[x + y] = udg[x - y + n] = false; // 恢复现场

    }
}

int main()
{
    cin >> n;
    for (int i = 0; i < n; i ++ )
        for (int j = 0; j < n; j ++ )
            g[i][j] = '.';
    dfs(0 , 0 ,0);
    return 0;
}
```

### BFS—广度优先搜索

