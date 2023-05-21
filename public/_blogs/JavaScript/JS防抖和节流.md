# JS防抖和节流

1. 防抖=>固定时间内，事件只允许发生一次

   > - **所谓防抖，就是指触发事件后 n 秒后才执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间（销毁掉上次请求）**
   > - 立即执行：触发事件后函数会立即执行，n 秒内触发事件不会执行功能函数下一次调用，n秒后再次触发才会再次执行功能函数
   >
   > ```js
   > // 防抖函数，立即执行版本
   > function debounce(func, wait) {
   >   let timeout;
   >   return function () {
   >     const context = this;
   >     //获取this，让执行函数的this执行不变，依旧可以接收到事件参数
   >     const args = [...arguments];
   >     if (timeout) clearTimeout(timeout);
   >     //每次触发调用防抖函数，如果之前的定时器（以定时器序号作为标识符）还在。就清除前面一个定时器，并开启一个新的定时器，定时器即使清除了，其返回值也不会清除，之后设置定时器的返回值也会在其返回值的基础上继续向后排
   >     const callNow = !timeout;
   >     timeout = setTimeout(() => {
   >       //不管是setTimeout还是setInterval，都会有一个返回值。这个返回值是一个数字，代表当前是在浏览器中设置的第几个定时器(返回的是定时器序号)
   >       timeout = null;
   >     }, wait);
   >     if (callNow) func.apply(context, args);
   >     //功能函数通过调用apply方法将debounce 函数最终返回的函数 this 指向绑定给自身
   >   };
   > }
   > ```
   >
   > - 非立即执行：就是指触发事件后 n 秒后才执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
   >
   > ```js
   > // 防抖函数，非立即执行版本
   >  function debounce(func, wait) {
   >   let timeout;
   >   return function () {
   >     const context = this;
   >     const args = [...arguments];
   >     if (timeout) clearTimeout(timeout);
   >     timeout = setTimeout(() => {
   >       func.apply(context, args)
   >     }, wait);
   >   }
   > }
   > ```

2. 节流=>保证一定时间内只调用一次函数

   > 应用场景
   >
   > * 提交表单
   > * 高频监听事件

   > 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。

   > 节流的实现
   >
   > 1. 时间戳：功能函数触发是在时间段内开始的时候
   >
   > ```js
   > function throttle(func, wait) {
   >     var previous = 0;
   >     return function() {
   >         let now = Date.now();
   >         let context = this;
   >         let args = arguments;
   >         if (now - previous > wait) {//时间缓冲
   >             func.apply(context, args);
   >             previous = now;
   >         }
   >     }
   > }
   > content.onmousemove = throttle(count,1000);
   > ```
   >
   > 2. 定时器
   >
   >    > - 第一次调用节流函数，还没有定时器，创建一个定时器，并在时间间隔结束时触发功能函数
   >    > - 在时间间隔内再次调用节流函数，由于定时器已经存在，不响应
   >    > - 当时间间隔结束后将本定时器标识符timeout清除，再创建一个定时器
   >    > - 由于定时器标识符timeout被设置为null,再次调用节流函数便可再次触发
   >
   > ```js
   > function throttle(func, wait) {
   >     let timeout;
   >     return function() {
   >         let context = this;
   >         let args = arguments;
   >         if (!timeout) {//定时器标记
   >             timeout = setTimeout(() => {
   >                 timeout = null;
   >                 func.apply(context, args)
   >             }, wait)
   >         }
   >     }
   > }
   > ```