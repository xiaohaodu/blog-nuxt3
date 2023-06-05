# FED23 DOM节点查找

## 描述

查找两个节点的最近的一个共同父节点，可以包括节点自身

### 输入描述：

oNode1 和 oNode2 在同一文档中，且不会为相同的节点

```js
function commonParentNode(oNode1, oNode2) {
   let current = oNode1.parentNode || null
   
   while(current && !current.contains(oNode2)) {
       current = current.parentNode
   }
   
   return current
}
```

### 知识点

# Node.contains()

[`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 接口的 **contains()** 方法返回一个布尔值，表示一个节点是否是给定节点的后代，即该节点本身、其直接子节点（[`childNodes`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes)）、子节点的直接子节点等。