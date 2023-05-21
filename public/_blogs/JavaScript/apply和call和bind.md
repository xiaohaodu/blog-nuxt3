# apply和call和bind

`call`, `apply`, 和 `bind` 是 `JavaScript` 中常用的函数。它们的作用是在`函数调用时动态地改变函数的上下文`。具体来说，它们可以指定函数中的 `this` 指向哪个对象，以及传递参数给函数。

1. call

   > `call` 函数允许你在一个特定的上下文中调用一个函数。它的语法如下：
   >
   > ```js
   > function.call(context, arg1, arg2, ...)
   > ```
   >
   > 其中，`context` 是指定函数中的 `this` 关键字指向的对象，`arg1`, `arg2`, ... 是传递给函数的参数
   >
   > 例如：
   >
   > ```js
   > const obj = {
   >   name: 'Alice',
   >   greeting: function() {
   >     console.log(`Hello, my name is ${this.name}`);
   >   }
   > };
   > obj.greeting(); // 输出 "Hello, my name is Alice"
   > const person = {
   >   name: 'Bob'
   > };
   > obj.greeting.call(person); // 输出 "Hello, my name is Bob"
   > ```

2. apply

   > `apply` 函数与 `call` 函数类似，它也允许你在一个特定的上下文中调用一个函数。不同之处在于，apply 函数需要将参数作为数组传递。它的语法如下：
   >
   > ```js
   > function.apply(context, [argsArray])
   > ```
   >
   > 其中，`context` 是指定函数中的 `this` 关键字指向的对象，`argsArray` 是一个数组，其中包含要传递给函数的参数。
   >
   > 例如:
   >
   > ```js
   > const obj = {
   >   name: 'Alice',
   >   greeting: function(city, country) {
   >     console.log(`Hello, my name is ${this.name} and I am from ${city}, ${country}`);
   >   }
   > };
   > obj.greeting('New York', 'USA'); // 输出 "Hello, my name is Alice and I am from New York, USA"
   > const person = {
   >   name: 'Bob'
   > };
   > obj.greeting.apply(person, ['London', 'UK']); // 输出 "Hello, my name is Bob and I am from London, UK"
   > ```

3. bind

   > `bind` 函数与 `call` 和 `apply` 函数不同，它不会立即调用函数。相反，它`返回一个新函数`，该函数将绑定到指定的上下文，当该函数被调用时，它将以指定的上下文运行。它的语法如下：
   >
   > ```js
   > function.bind(thisArg, arg1, arg2, ...)
   > ```
   >
   > 其中，`thisArg` 是指定函数中的 `this` 关键字指向的对象，`arg1`, `arg2`, ... 是传递给函数的参数。与 call 和 apply 不同，`bind` 函数不会立即调用函数，而是返回一个新的函数，你可以将它存储在变量中，然后在需要时调用。
   >
   > 例如：
   >
   > ```js
   > const obj = {
   >   name: 'Alice',
   >   greeting: function(city, country) {
   >     console.log(`Hello, my name is ${this.name} and I am from ${city}, ${country}`);
   >   }
   > };
   > const person = {
   >   name: 'Bob'
   > };
   > const boundGreeting = obj.greeting.bind(person, 'London');
   > boundGreeting('UK'); // 输出 "Hello, my name is Bob and I am from London, UK"
   > ```

文章参考：[JavaScript中的call,apply,bind方法详解及简单实现 - 掘金 (juejin.cn)](https://juejin.cn/post/7207587475169476667)