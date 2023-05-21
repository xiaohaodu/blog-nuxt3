# v-model原理

## 延伸面试题

### MVC与MVVM有什么区别⭐⭐⭐⭐⭐

- MVVM 和 MVC都是一种设计思想。
- MVVM 与 MVC 最大的区别就是：它实现了View和Model的自动同步
  - 当Model属性改变时，不用手动操作Dom元素去改变View的显示。
  - 而改变属性后，该属性对应View的显示会自动改变

### 阐述一下你所理解的MVVM响应式原理⭐⭐⭐⭐⭐

- vue是采用数据劫持配合发布者-订阅者的模式的方式
  - 通过**Object.defineProperty()来劫持各个属性的getter和setter**，
  - 在数据变动时，发布消息给依赖收集器（dep中的subs），去通知（notify）观察者，做出对应的回调函数，更新视图
- MVVM作为绑定的入口，整合Observer,Compile和Watcher三者
  - 通过Observer来监听model数据变化，
  - 通过Compile来解析编译模板指令，
  - 最终利用Watcher搭起Observer，Compile之间的通信桥路，
  - 达到**数据变化Observer）=>视图更新**；**视图交互变化=>数据model变更**的双向绑定效果。

#### 1. vue2响应式原理

```js
// 订阅器模型
let Dep = {
    clientList: {},  // 容器
    // 添加订阅
    listen: function (key, fn) {
        // 短路表达式  fn:附送消息
        (this.clientList[key] || (this.clientList[key] = [])).push(fn);
    },
    // 发布
    trigger: function () {
        let key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (let i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }
}
// 数据劫持
let dataHi = function ({ data, tag, datakey, selector }) {
    let value = '',el = document.querySelector(selector);
    Object.defineProperty(data, datakey, {
        // 取值
        get: function () {
            console.log("取值")
            return value;
        },
        set: function (val) {
            console.log("设置值")
            value = val;
            // 发布
            Dep.trigger(tag, val)
        }
    })
    // 订阅
    Dep.listen(tag, function(text){
        el.innerHTML = text
    })
}
```

应用

```js
<div id="app">
        订阅视图-1：<span class="box-1"></span>
        订阅视图-2：<span class="box-2"></span>
</div>
<script src="index.js"></script>
let obj = {}
       dataHi({
           data: obj,
           tag: 'view-1',
           datakey: 'one',
           selector: '.box-1'
       })
       dataHi({
           data: obj,
           tag: 'view-2',
           datakey: 'two',
           selector: '.box-2'
       })
       // 1. 初始化赋值 一次
       obj.one = '这是视图一'
       obj.two = '这是视图二'
       // 2. 劫持数据，更新者负责重新渲染 N次

       // 响应式
       // 1. 数据联动(双向绑定)
       // 2. 需要捕获到修改
```



#### 2. Vue3响应式原理

* 同样也是发布订阅模式结合数据劫持

1. 初始化阶段： 初始化阶段通过组件初始化方法形成对应的**proxy**对象，然后形成一个负责渲染的effect。
2. get依赖收集阶段：通过解析template，替换真实data属性，来触发get,然后通过**stack**方法，通过proxy对象和key形成对应的deps，将负责渲染的effect存入deps。（这个过程还有其他的effect，比如watchEffect存入deps中 ）。
3. set派发更新阶段：当我们 this[key] = value 改变属性的时候，首先通过**trigger**方法，通过proxy对象和key找到对应的deps，然后给deps分类分成computedRunners和effect,然后依次执行，如果需要**调度**的，直接放入调度。

```js
 // 1. Object.defineProperty => Proxy()
// Vue2.x data中的属性做了遍历 + 递归, 给每一个属性设置getter, setter
// data中预定义属性做出响应式

// 2. Proxy()
// 2.1 监听是针对一整个对象(完全代理所有属性)
// 2.2 在目标对象之前假设一层拦截 => 外界访问该对象，必须通过这层拦截
// 响应式重要特征 => 需要捕获到修改，做出对应的反应
let obj = {
  name: '小明',
  age: 18
}
const p = new Proxy(obj, {
  // target => 源数据
  // 查
  get(target, propName){
    console.log(`读取了P的${propName}属性`)
    return target[propName]
    // return Reflect.get(target, propName)
  },
  // 改 + 增
  set(target, propName, value){
    console.log(`修改了P的${propName}属性，值为${value}`)
    target[propName] = value
  },
  // 删
  deleteProperty(target, propName){
    console.log(`删除了P的${propName}属性`)
    return delete target[propName] // 真，假
  }
})
```

参考文章：[MVC与MVVM模式的区别 - 掘金 (juejin.cn)](https://juejin.cn/post/7110885291946147876)

参考视频：[前端面试题-Vue2响应式实现二_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1GM411w7dS?p=12&vd_source=02b21d5bf774f3efae74a24620164a0a)