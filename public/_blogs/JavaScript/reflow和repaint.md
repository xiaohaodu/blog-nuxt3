#reflow和repaint

那么我们样式改变以后，画面就会改变，但是它们究竟会经历上面那些流程呢？

#### reflow 回流（重排）

当DOM树中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。

会导致回流的操作：

- 页面首次渲染
- 浏览器窗口大小发生改变
- 元素尺寸或位置发生改变
- 元素内容变化（文字数量或图片大小等等）
- 元素字体大小变化
- 添加或者删除可见的`DOM`元素
- 激活`CSS`伪类（例如：`:hover`）
- 查询某些属性或调用某些方法

一些常用且会导致回流的属性和方法：

- client族：`clientWidth`、`clientHeight`、`clientTop`、`clientLeft`
- offset族：`offsetWidth`、`offsetHeight`、`offsetTop`、`offsetLeft`
- scroll族：`scrollWidth`、`scrollHeight`、`scrollTop`、`scrollLeft`
- `scrollIntoView()`、`scrollIntoViewIfNeeded()`
- `getComputedStyle()`
- `getBoundingClientRect()`
- `scrollTo()`

### repaint 重绘

当页面中元素样式的改变并不影响它在文档流中的位置时（例如：`color`、`background-color`、`visibility`等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

### 比较

reflow的代价要比repaint的代价要大，因为reflow显然要进行上面所有步骤，而repaint因为位置没有变，自然会跳过 `update layout tree`这个步骤，因此如果一定要进行reflow操作时，有必要情况下要进行节流操作。

参考文章：[浏览器事件循环与渲染机制 - 掘金 (juejin.cn)](https://juejin.cn/post/7042675851497848869)