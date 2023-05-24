# this

在绝大多数情况下，函数的调用方式决定了`this`的值（运行时绑定）。

`this`不能在执行期间被赋值，并且在每次函数被调用时`this`的值也可能不同。

ES5引入了bind方法来设置函数的`this`值，而不用考虑函数是如何被调用的。

ES2015引入了箭头函数，箭头函数不提供自身的`this`绑定（`this`的值将保持为闭合词法上下文的值，箭头函数的this不会被改变）

### 值

当前执行上下文（global、function或eval）的一个属性，在非严格模式下，总是指向一个对象，在严格模式下可以是任意值

### 全局上下文

无论是否在严格模式下，在全局执行环境下（在任何函数体外部）`this`都指向全局对象（在浏览器中，window对象是全局对象；在Node中，globalThis是全局对象）

### 函数上下文

在函数内部，`this`的值取决于函数被调用的方式

因为下面的代码不在严格模式下，且 `this` 的值不是由该调用设置的，所以 `this` 的值默认指向全局对象，浏览器中就是 `window`。

```js
function f1(){
  return this;
}
//在浏览器中：
f1() === window;   //在浏览器中，全局对象是 window

//在 Node 中：
f1() === globalThis;
```

然而，在严格模式下，如果进入执行环境时没有设置 `this` 的值，`this` 会保持为 `undefined`，如下：

```js
function f2(){
  "use strict"; // 这里是严格模式
  return this;
}

f2() === undefined; // true
```

如果想要把`this`的值从一个环境传到另一个，就要用`call`和`apply`方法

### 类上下文

`this`在类中的表现与在函数中类似，因为类本质上也是函数，但也有一些区别和注意事项

在类的构造函数中，`this`是一个常规对象。类中所有非静态的方法都会被添加到`this`的原型中：

```js
class Example {
  constructor() {
    const proto = Object.getPrototypeOf(this);
    console.log(Object.getOwnPropertyNames(proto));
  }
  first(){}
  second(){}
  static third(){}
}

new Example(); // ['constructor', 'first', 'second']
```

### 派生类

不像基类的构造函数，派生类的构造函数没有初始的`this`绑定。在构造函数中调用`super()`会生成一个`this`绑定，并相当于执行如下代码，Base为基类：

`this = new Base()`

派生类不能在调用 `super()` 之前返回，除非其构造函数返回的是一个对象，或者根本没有构造函数。（即派生类一定要调用`super()`）





