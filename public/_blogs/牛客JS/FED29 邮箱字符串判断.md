# FED29 邮箱字符串判断

## 描述

判断输入是否是正确的邮箱格式

### 输入描述：

邮箱字符串

### 输出描述：

true表示格式正确

## 题解

```js
function isAvailableEmail(sEmail) {
    const reg=/^([\w+\.])+@\w+([.]\w+)+$/;
    return reg.test(sEmail);
}
```

## 知识点提示

[正则表达式 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions)