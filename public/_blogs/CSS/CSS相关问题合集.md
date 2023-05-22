# CSS相关问题合集



* transition 和animation 的区别

  > Animation 和transition 大部分属性是相同的，他们都是随时间改变元素的属性值，他们
  > 的主要区别是transition 需要触发一个事件才能改变属性，而animation 不需要触发任何
  > 事件的情况下才会随时间改变属性值，并且transition 为2 帧，从from .... to，而animation
  > 可以一帧一帧的。

* 关于JS 动画和css3 动画的差异性

  > 渲染线程分为main thread 和compositor thread，如果css 动画只改变transform 和opacity，这时整个CSS 动画得以在compositor thread 完成（而JS 动画则会在main thread 执行，然后出发compositor thread 进行下一步操作），特别注意的是如果改变transform 和opacity是不会影响布局，也不需要重绘
  > **区别：**
  >
  > 1. 功能涵盖面，JS 比CSS 大
  > 2. 实现/重构难度不一，CSS3 比JS 更加简单，性能跳优方向固定
  > 3. 对帧速表现不好的低版本浏览器，css3 可以做到自然降级
  > 4. css 动画有天然事件支持
  > 5. css3 有兼容性问题

* 块元素与行元素

  > * 块元素：独占一行，并且有自动填满父元素，可以设置margin 和pading 以及高度和宽度
  > * 行元素：不会独占一行，width 和height 会失效，并且在垂直方向的padding 和margin会失效。

* box-sizing的语法和基本用处

  > * 在 [CSS 盒子模型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)的默认定义里，你对一个元素所设置的 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 与 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 只会应用到这个元素的内容区。如果这个元素有任何的 [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) 或 [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) ，绘制到屏幕上时的盒子宽度和高度会加上设置的边框和内边距值。这意味着当你调整一个元素的宽度和高度时需要时刻注意到这个元素的边框和内边距。当我们实现响应式布局时，这个特点尤其烦人。
  >
  > * box-sizing 属性可以被用来调整这些表现：
  >
  >   - `content-box` 是默认值。如果你设置一个元素的宽为 100px，那么这个元素的内容区会有 100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
  >   - `border-box` 告诉浏览器：你想要设置的边框和内边距的值是包含在 width 内的。也就是说，如果你将一个元素的 width 设为 100px，那么这 100px 会包含它的 border 和 padding，内容区的实际宽度是 width 减去 (border + padding) 的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。
  >
  > * `content-box`
  >
  >   默认值，标准盒子模型。[`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 与 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 只包括内容的宽和高，不包括边框（border），内边距（padding），外边距（margin）。注意：内边距、边框和外边距都在这个盒子的外部。比如说，`.box {width: 350px; border: 10px solid black;}` 在浏览器中的渲染的实际宽度将是 370px。
  >
  >   尺寸计算公式：
  >
  >   - `width` = 内容的宽度
  >   - `height` = 内容的高度
  >
  >   宽度和高度的计算值都不包含内容的边框（border）和内边距（padding）。
  >
  > * `border-box`
  >
  >   [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 和 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 属性包括内容，内边距和边框，但不包括外边距。这是当文档处于 Quirks 模式 时 Internet Explorer 使用的[盒模型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)。注意，填充和边框将在盒子内 , 例如， `.box {width: 350px; border: 10px solid black;}` 导致在浏览器中呈现的宽度为 350px 的盒子。内容框不能为负，并且被分配到 0，使得不可能使用 border-box 使元素消失。
  >
  >   尺寸计算公式：
  >
  >   - `width` = border + padding + 内容的宽度
  >   - `height` = border + padding + 内容的高度

* 使元素消失的方法有哪些？

  > 1. opacity：0，该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定
  >   一些事件，如click 事件，那么点击该区域，也能触发点击事件的
  > 2. visibility：hidden，该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已
  >   经绑定的事件
  > 3. display：none，把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元
  >   素删除掉。