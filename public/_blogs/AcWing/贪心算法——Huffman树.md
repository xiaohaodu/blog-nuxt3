# 贪心算法——Huffman树

### AcWing 148. 合并果子
**算法**
(贪心,哈夫曼树,堆,优先队列) O(nlogn)
经典哈夫曼树的模型，每次合并重量最小的两堆果子即可。

**时间复杂度**
使用小根堆维护所有果子，每次弹出堆顶的两堆果子，并将其合并，合并之后将两堆重量之和再次插入小根堆中。

每次操作会将果子的堆数减一，一共操作 n−1 次即可将所有果子合并成1堆。每次操作涉及到2次堆的删除操作和1次堆的插入操作，计算量是 O(logn)。因此总时间复杂度是 O(nlogn)

**C++ 代码**
```c++
#include <iostream>
#include <algorithm>
#include <queue>

using namespace std;

int main()
{
    int n;
    scanf("%d", &n);

    priority_queue<int, vector<int>, greater<int>> heap;
    while (n -- )
    {
        int x;
        scanf("%d", &x);
        heap.push(x);
    }
    
    int res = 0;
    while (heap.size() > 1)
    {
        int a = heap.top(); heap.pop();
        int b = heap.top(); heap.pop();
        res += a + b;
        heap.push(a + b);
    }
    
    printf("%d\n", res);
    return 0;
}
```