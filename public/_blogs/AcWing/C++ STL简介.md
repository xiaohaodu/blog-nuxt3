# C++ STL简介

```c++
vector, 变长数组，倍增的思想
    size()  返回元素个数
    empty()  返回是否为空
    clear()  清空
    front()/back()
    push_back()/pop_back()
    begin()/end()
    []
    支持比较运算，按字典序

pair<int, int>
    first, 第一个元素
    second, 第二个元素
    支持比较运算，以first为第一关键字，以second为第二关键字（字典序）

string，字符串
    size()/length()  返回字符串长度
    empty()
    clear()
    substr(起始下标，(子串长度))  返回子串
    c_str()  返回字符串所在字符数组的起始地址

queue, 队列
    size()
    empty()
    push()  向队尾插入一个元素
    front()  返回队头元素
    back()  返回队尾元素
    pop()  弹出队头元素

priority_queue, 优先队列，默认是大根堆
    size()
    empty()
    push()  插入一个元素
    top()  返回堆顶元素
    pop()  弹出堆顶元素
    定义成小根堆的方式：priority_queue<int, vector<int>, greater<int>> q;

stack, 栈
    size()
    empty()
    push()  向栈顶插入一个元素
    top()  返回栈顶元素
    pop()  弹出栈顶元素

deque, 双端队列
    size()
    empty()
    clear()
    front()/back()
    push_back()/pop_back()
    push_front()/pop_front()
    begin()/end()
    []

set, map, multiset, multimap, 基于平衡二叉树（红黑树），动态维护有序序列
    size()
    empty()
    clear()
    begin()/end()
    ++, -- 返回前驱和后继，时间复杂度 O(logn)

    set/multiset
        insert()  插入一个数
        find()  查找一个数
        count()  返回某一个数的个数
        erase()
            (1) 输入是一个数x，删除所有x   O(k + logn)
            (2) 输入一个迭代器，删除这个迭代器
        lower_bound()/upper_bound()
            lower_bound(x)  返回大于等于x的最小的数的迭代器
            upper_bound(x)  返回大于x的最小的数的迭代器
    map/multimap
        insert()  插入的数是一个pair
        erase()  输入的参数是pair或者迭代器
        find()
        []  注意multimap不支持此操作。 时间复杂度是 O(logn)
        lower_bound()/upper_bound()

unordered_set, unordered_map, unordered_multiset, unordered_multimap, 哈希表
    和上面类似，增删改查的时间复杂度是 O(1)
    不支持 lower_bound()/upper_bound()， 迭代器的++，--

bitset, 圧位
    bitset<10000> s;
    ~, &, |, ^
    >>, <<
    ==, !=
    []

    count()  返回有多少个1

    any()  判断是否至少有一个1
    none()  判断是否全为0

    set()  把所有位置成1
    set(k, v)  将第k位变成v
    reset()  把所有位变成0
    flip()  等价于~
    flip(k) 把第k位取反
```

C++的STL（Standard Template Library，标准模板库）是C++标准库的一个重要组成部分。它提供了一组通用的、可重用的数据结构和算法，这些数据结构和算法以模板的形式实现，因此可以用于多种数据类型。

STL主要由以下几个部分组成：

1. **容器**（Containers）：
   - 容器是用来存储对象的类模板，如`vector`、`list`、`deque`、`set`、`map`等。它们提供了不同的性能特征和访问模式。
   - 容器分为序列容器（如`vector`和`deque`）、关联容器（如`set`和`map`）、不规则容器（如`list`）以及辅助容器（如`array`）。
2. **迭代器**（Iterators）：
   - 迭代器类似于指针，用于遍历容器中的元素。
   - STL定义了五种不同类型的迭代器：输入迭代器、输出迭代器、前向迭代器、双向迭代器和随机访问迭代器。
3. **算法**（Algorithms）：
   - 算法是一系列作用于容器上的函数模板，例如`sort`、`find`、`copy`等。
   - 这些算法通过接受迭代器作为参数来操作容器中的元素，使得可以在任何容器上使用相同的算法而无需修改代码。
4. **函数对象**（Function Objects）：
   - 也称为仿函数，是一种特殊的类实例，可以像函数一样被调用。
   - 函数对象通常用于定制算法的行为，比如排序时指定自定义比较逻辑。
5. **分配器**（Allocators）：
   - 分配器负责管理内存的分配和释放，为容器提供高效地创建和销毁对象的能力。
   - 默认情况下，STL容器使用`std::allocator`，但用户也可以提供自己的分配器以适应特定需求。

STL的设计原则之一是分离容器与算法，这使得开发者可以灵活选择最适合他们需求的组件。例如，你可以在`vector`或`list`上使用相同的排序算法，而不需要关心底层容器的具体实现细节。

由于STL的广泛适用性和效率，它是C++编程中不可或缺的一部分，极大地提高了开发者的生产力。