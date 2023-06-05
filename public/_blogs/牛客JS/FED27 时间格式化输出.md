# FED27 时间格式化输出

## 描述

按所给的时间格式输出指定的时间
格式说明
对于 2014.09.05 13:14:20
yyyy: 年份，2014
yy: 年份，14
MM: 月份，补满两位，09
M: 月份, 9
dd: 日期，补满两位，05
d: 日期, 5
HH: 24制小时，补满两位，13
H: 24制小时，13
hh: 12制小时，补满两位，01
h: 12制小时，1
mm: 分钟，补满两位，14
m: 分钟，14
ss: 秒，补满两位，20
s: 秒，20
w: 星期，为 ['日', '一', '二', '三', '四', '五', '六'] 中的某一个，本 demo 结果为 五

## 示例1

输入：

```js
formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w')
```

输出：

```js
2014-09-05 13:14:20 星期五
```

### 题解

摘自  [题解 | #时间格式化输出#_牛客博客 (nowcoder.net)](https://blog.nowcoder.net/n/232fcd5e8de1420dbf7ec374c9cc3bb0?f=comment)

```js
function formatDate(date, format) {
  let formatArr = [];
  format.replace(/\w+|:|\s|-|星期/g, function (text) {
    text && formatArr.push(text)
  })
  const weekday = ['日', '一', '二', '三', '四', '五', '六'];
  const map = {
    'yyyy': date.getFullYear(),
    'yy': date.getFullYear() % 100,
    'MM': date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
    'M': date.getMonth() + 1,
    'dd': date.getDate() >= 10 ? date.getDate() : "0" + date.getDate(),
    'd': date.getDate(),
    'HH': date.getHours() >= 10 ? date.getHours() : "0" + date.getHours(),
    'H': date.getHours(),
    'hh': (date.getHours() % 12) >= 10 ? (date.getHours() % 12) : "0" + (date.getHours() % 12),
    'h': (date.getHours() % 12),
    'mm': date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes(),
    'm': date.getMinutes(),
    'ss': date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds(),
    's': date.getSeconds(),
    'w': weekday[date.getDay()]
  };

  return formatArr.map(item => {
    if (map[item]) {
      return map[item]
    }
    return item
  }).join("")
}
```

