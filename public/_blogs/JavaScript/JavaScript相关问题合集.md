# JavaScript相关问题合集

* 异步加载JS的方法

  > * defer：只支持IE 如果您的脚本不会改变文档的内容，可将defer 属性加入到`<script>`标签中，以便加快处理文档的速度。因为浏览器知道它将能够安全地读取文档的剩余部分而不用执行脚本，它将推迟对脚本的解释，直到文档已经显示给用户为止。
  > * async，HTML5 属性仅适用于外部脚本，并且如果在IE 中，同时存在defer 和async，那么defer 的优先级比较高，脚本将在页面完成时执行。创建script 标签，插入到DOM 中

* eval 是做什么的?

  > 它的功能是将对应的字符串解析成JS 并执行，应该避免使用，因为非常消耗性能（2
  > 次，一次解析成JS，一次执行）