# setTimeout、setInterval 和requestAnimationFrame 之间的区别

JS 中制作动画可以用以下三种 API

- [setInterval](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FsetInterval)
- [setTimeout](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FsetTimeout)
- [requestAnimationFrame](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2Fwindow%2FrequestAnimationFrame)

## 很流行的setInterval糟糕论

## 原因之一：setInterval无视代码错误

setInterval有个讨厌的习惯，即对自己调用的代码是否报错这件事漠不关心。换句话说，如果setInterval执行的代码由于某种原因出了错，它还会持续不断（不管不顾）地调用该代码

##原因之二：setInterval无视网络延迟，不保证执行

假设你每隔一段时间就通过Ajax轮询一次服务器，看看有没有新数据，而由于某些原因（服务器过载、临时断网、流量剧增、用户带宽受限，等等），你的请求要花的时间远比你想象的要长。但setInterval不在乎。它仍然会按定时持续不断地触发请求，最终你的客户端网络队列会塞满Ajax调用

考虑极端情况，假如定时器里面的代码需要进行大量的计算，或者是 DOM 操作。这样一来，花的时间就比较长，有可能前一次代码还没有执行完，后一次代码就被添加到队列了

> 一开始执行 `setInterval`, 100 毫秒后将要执行的代码添加到队列。
>
> 100 毫秒时，执行代码进入队列，队列空闲，定时器内的代码执行。
>
> 200 毫秒时，第一次的定时器代码还在执行当中。第二次的定时器代码被推入事件队列，等待队列空闲，然后执行。
>
> 300 毫秒时，第一次的定时器代码还在执行中，第二次的定时器代码在事件队列末端等待执行。因为该定时器已经有第二次的代码在队列中等待了，所以这一次的代码不会被推入队列，被忽略了。
>
> 400 毫秒时，第一次的定时器代码执行完毕，队列空闲，下一个等待的代码执行，第二次的定时器代码开始执行。
>
> 捋一捋，这里的第一次的代码和第二次代码的间隔并没有预期的 100 毫米，而是第一次的执行完，第二次的立马执行了。因为第一的代码还没执行完，第二次的代码就已经在队列中等待了。
>
> 关于被忽略的第三次定时器代码，因为 300 毫秒时，这个定时器已经有第二次的代码在等待了，而只有当没有该定时器的代码在队列中时，该定时器新的代码才能去排队，所以第三次不会被添加到队列中。
>
> 由上可见，在这种极端情况下，`setIntreval` 实现不了需求。

## 用 setTimeout 实现 类setInterval

而 `setTimeout` 可以实现 `setInterval` 的功能，并且不会出现上面的情况。

```js
function myInterval(func, time) {
    let ids = [];
    function fn() {
        let id = setTimeout(() => {
            func();
            fn();
        }, time);
        ids.push(id);
    }
    fn();
    return ids;
}
let ids = myInterval(() => {
    console.log('Hello World');
}, 500);

function clearMyInterval(idList) {
    idList.forEach((id) => {
        clearTimeout(id);
    });
}
setTimeout(()=>{clearMyInterval(ids)},3000)
//有清清除整个Interval能力但是，并没有清除timeout定时器
```

#### 改进

```js
function myInterval(func, time) {
    let ids = [];
    function fn() {
        let id = setTimeout(() => {
            func();
            clearTimeout(id);//清除上次的定时器
            fn();
        }, time);
        ids.push(id);
    }
    fn();
    return ids;
}
let ids = myInterval(() => {
    console.log('Hello World');
}, 500);

setTimeout(() => { clearTimeout(ids.pop()); }, 3000);
```



## 如果必须保证间隔相等怎么办？

使用requestAnimationFrame 和date实现