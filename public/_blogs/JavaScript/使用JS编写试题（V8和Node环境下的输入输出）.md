# 使用JS编写试题（V8和Node环境下的输入输出）

#### 1. 在V8引擎下输入输出

​	可以直接用readline()方法接收输入，而且可以接受多行的输入，readline（）方法每执行一次就会识别一次输入的数据所以可以进行多行输入

```js
/*多行输入*/
let arr = readline().split(' ');
let num = readline();


/*单行输入*/
while(line=readline()){
    let lines = line.split(' ');
    let a = parseInt(lines[0]);
    let b = parseInt(lines[1]);
    print(a+b);
}
```

#### 2. 在node环境下输入输出

​	在node环境下是利用了process（进程对象），process是一个Global全局对象，可以在任何地方使用，无需require，而且process有两个属性可以获取到输入输出流。

1. process.stdout属性返回一个对象，表示标准输出
2. process.stdin返回一个对象，表示标准输入

```js
let readline = require('readline');
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});
rl.on('line', (line)=>{
    let tokens = line.split(' ');
    console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
});
```

