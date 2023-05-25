# Random Permutation（均匀随机排列）

##第一种定义

如果集合中有`n`个元素，则有`n!`种排列，我们从这`n!`种排列随机抽样，则为均匀随机排列

##第二种定义

任何位置上出现所有n种元素的概率都相同，都为$\frac{1}{n}$，则为均匀随机排列

# Fisher-Yates Shuffle:Original Version

1. 构建一个伪随机数生成器
2. 生成器的输入正整数n
3. 生成均匀介于`（0~n-1）`之间的整数

每次从原数组做随机抽样，取出，从剩下的元素中做随机抽样，重复上面的步骤，得到均匀随机排列；

> 时间复杂度：抽样为O(1)，但是抽出之后移动元素补充空位要O(n)，所以整个算法为O(n^2)

```js
function shuffle(arr){
  let n=arr.length;
  let arrres=[]
  for(let i=0;i<n-1;i++){
    arrres.push(arr.splice(Math.floor(Math.random()*(n-i)),1))
  }
}
```

# Fisher-Yates Shuffle:Modern Version

1. 构建一个伪随机数生成器
2. 生成器的输入正整数n
3. 生成均匀介于`（0~n-1）`之间的整数

从元素中随机抽样，得到的元素与0号位置元素交换位置，重复上面操作抽样交换(与第i号元素交换)的操作，得到均匀随机排列；

> 时间复杂度：每次循环都要交换一次O(1)，要循环n-1次，所以时间复杂度为O(n)

```js
function shuffle(arr){
  let n=arr.length;
  for(let i=0;i<n-1;i++){
    let k= Math.floor(Math.random()*(n-i))+i;
    [arr[i],arr[k]]=[arr[k],arr[i]]
  }
}
```

# 注：两种经典的错误❌洗牌算法❌

1. 其原理是，在第 i 次循环中，从所有元素中等可能地选一个元素，与第 i 个元素交换。这种算法的错误可以如下证明：对于一个长度为 n n 的数组，算法创造了 nnn^n 个等可能的基本事件，这些事件对应于 n!n! 种排列顺序。在非平凡情况下， nnn^n 不能被 n!n! 整除，所以各种排列顺序不可能等概率。

```js
function shuffle(arr) {
   for (let i = 0; i < arr.length; i++) {
       let j = Math.floor(Math.random() * arr.length);
       [arr[i],arr[j]]=[arr[j],arr[i]]
   }
}
```

2. JavaScript 中数组自带的 sort 方法允许提供一个比较器，其返回值的正负号代表两个元素的大小关系。在上面的代码中，比较器返回的是 -0.5 到 0.5 之间的一个随机数，也就是说每次比较的结果是随机且均匀的。但是，基于随机比较的整个洗牌算法是不均匀的：它的各种运行结果的概率都形如 2−m2^{-m}（mm 为算法执行过程中的比较次数），而我们希望每种顺序的概率都是 1/n!1/n! ，在非平凡情况下，后者不能由前者通过加法组合出来。

   当 sort 函数采用**插入排序**的实现时，**各个元素都有较大的概率留在初始位置**，并通过统计多次运行的结果进行了验证。

```js
arr.sort(function() {
    return .5 - Math.random();
}); 
```

参考视频：[随机排列与Fisher-Yates算法 - YouTube](https://www.youtube.com/watch?v=1m68x5Gy5No)

参考文章：[10809 一种错误的洗牌算法，以及乱排常数 (1) - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/31547382)