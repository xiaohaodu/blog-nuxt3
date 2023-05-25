# Array.isArray和instanceof

### Array.isArray

- 如果参数是数组一定返回true，否则一定返回false，在判断对象是否为数组时，采用`Array.isArray` 更加可靠

### instanceof

- 众所周知，`instanceof` 的工作原理是判断右边参数的原型是否在左边参数的原型链上

### 对比

- Array.isArray

```js
//  Array.prototype 也是一个数组。
Array.isArray(Array.prototype);	// true

// 原型对象指向数组原型的对象也可以被分辨
Array.isArray({ __proto__: Array.prototype });	// false

// isArray可以跨iframe工作
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

Array.isArray(arr);  // true
```

- instanceof

```js
// 不能正确判断 Array.prototype
Array.prototype instanceof Array	// false

// 可以被刻意误导
{ __proto__: Array.prototype } instanceof Array // true

// 不能跨iframe 工作
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

arr instanceof Array;	// false
```

转载文章：[(4条消息) Array.isArray 跟 instanceof 的差异_array instanceof_tanleiDD的博客-CSDN博客](https://blog.csdn.net/TL18382950497/article/details/114314930)