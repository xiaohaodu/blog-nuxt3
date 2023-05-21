# this指向问题

1. 箭头函数

   > 箭头函数的this不会被改变
   >
   > 箭头函数的this是在创建它时外层this的指向
   >
   > * 创建箭头函数时，就已经确定了它的this指向
   > * 箭头函数内的this指向外层的this

2. new

   > 当使用new关键字调用函数时，函数中的this一定是JS创建的新对象
   >
   > 箭头函数不能当作构造函数，不能与new一起执行

3. bind

   > bind是指Function.prototype.bind()
   >
   > * 多次bind时只认第一次bind的值
   >
   > * 箭头函数中this不会被修改
   >
   > * ```js
   >   //bind和new同时使用的情况
   >   function func() {
   >     console.log(this, this.__proto__ === func.prototype)
   >   }
   >
   >   boundFunc = func.bind(1)
   >   new boundFunc() // Object true，口诀 2 优先
   >   ```
   >
   > * apply和call

4. apply和call

   > `apply()` 和 `call()` 的第一个参数都是 this，区别在于通过 apply 调用时实参是放到数组中的，而通过 call 调用时实参是逗号分隔的。
   >
   > - 箭头函数中的this不会被修改
   > - bind函数中的this不会被修改

5. object

   > function func() {
   >   console.log(this.x)
   > }
   > obj = { x: 1 }
   > obj.func = func
   > obj.func() // 1

6. 直接调用

   > 在函数不满足前面的场景，被直接调用时，this 将指向全局对象。在浏览器环境中全局对象是 Window，在 Node.js 环境中是 Global。
   >
   > ```js
   > //外层的outerFunc就起个迷惑目的
   > function outerFunc() {
   >   console.log(this) // { x: 1 }
   >   function func() {
   >     console.log(this) // Window
   >   }
   >   func()
   > }
   > outerFunc.bind({ x: 1 })()
   > ```

7. 不在函数里

   > 不在函数中的场景，可分为浏览器的 `<script />` 标签里，或 Node.js 的模块文件里。
   >
   > 1. 在 `<script />` 标签里，this 指向 Window。
   > 2. 在 Node.js 的模块文件里，this 指向 Module 的默认导出对象，也就是 module.exports。

# 做题复习

先背诵口诀再做题，“箭头函数、new、bind、apply 和 call、欧比届点（obj.）、直接调用、不在函数里”。

## 1. 下面代码执行后，func.count 值为多少？

```
function func(num) {
  this.count++
}

func.count = 0
func(1)

```

------

### 答案

func.count 值为 0。

按照口诀，`func()` 调用时属于第 6 类「直接调用」。在非严格模式下，`this` 指向全局对象。`this` 跟 func 一点关系都没有，所以 `func.count` 保持不变。so easy。

## 2. 以下箭头函数中 this 指向谁呢？

```
obj = {
  func() {
    const arrowFunc = () => {
      console.log(this._name)
    }

    return arrowFunc
  },

  _name: "obj",
}

obj.func()()

func = obj.func
func()()

obj.func.bind({ _name: "newObj" })()()

obj.func.bind()()()

obj.func.bind({ _name: "bindObj" }).apply({ _name: "applyObj" })()

```

### 答案

```
// obj
// undefined
// newObj
// undefined
// bindObj
```

参考文章[JS 中 this 指向问题 - 掘金 (juejin.cn)](https://juejin.cn/post/6946021671656488991)