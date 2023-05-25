# Symbol（具有唯一性）

1. Symbol函数接受**一个可选参数**，方便代码的阅读和后期调试
2. 用**Object.getOwnPropertyNames(),Object.keys()或者for...in等方法**无法显示Symbol属性名
3. **Object.getOwnPropertySymbols()方法**返回包含所有Symbol属性的**数组**
4. Symbol函数**不能**使用**new**，因为是**基础数据类型**
5. **Symbol.for()**创建**共享**Symbol，如果已存在，直接返回有的Symbol
6. Symbol函数创建的原始值都是**唯一**的
7. **Symbol.keyFor()**返回已登记Symbol有关的键
8. **Reflect.ownKeys()**可以读取包含Symbol属性的所有key值