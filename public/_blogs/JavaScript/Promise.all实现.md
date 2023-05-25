# Promise.all实现

> **Promise.resolve(value)**方法返回一个以给定值解析后的 Promise 对象。
>
> 1. 如果这个值是一个 promise，那么将返回这个 promise；
> 2. 如果这个值是 thenable（即带有 then 方法），返回的 promise 会“跟随”这个 thenable 的对象，采用它的最终状态；否则返回的 promise 将以此值完成。此函数将类 promise 对象的多层嵌套展平。

```js
Promise.all=(promises)=>{
  return new Promise((resolve,reject)=>{
    let result=[];
    let index=0;
    let len=promises.length;
    if(len===0){
      resolve(result)
    }
    for(let i=0;i<len;i++){
      Promise.resolve(promises[i]).then(data=>{
        reslut[i]=data;
        index++;
        if(index===len){	//因为Promise是异步执行，所以要判断是否全部处理完成
          resolve(result);
        }
      }).catch(err=>{
        reject(err);
      })
    }
  })
}
```

