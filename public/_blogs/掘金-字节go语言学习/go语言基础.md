# go语言基础

1. go语言特性

   > 1. 高性能、高并发
   >
   >
   > 1. 语法简单、学习曲线平缓
   > 2. 丰富的标准库
   > 3. 完善的工具链
   > 4. 静态链接
   > 5. 快速编译
   > 6. 跨平台（甚至树莓派等都可以使用）
   > 7. 垃圾回收


2. go语言基础语法

   > ```go
   > package main
   >
   > import {
   >   "fmt"
   > }
   >
   > func main(){
   >   fmt.Println("hello world")
   > }
   > ```
   >
   > 编译运行：go run main.go；
   >
   > 或者编译：go build main.go   再运行：./main；

   > 基础语法：变量；
   >
   > ​	var声明变量，自动推到类型；
   >
   > ​	:=来声明；
   >
   > if 后面没有括号，语法块必须有大括号；
   >
   > go中只有for循环；
   >
   > go的switch-case分支结构不需要break，可以使用更多的变量，更加强大；
   >
   > go的数组长度是固定的，go中常用切片来代替数组，切片可append来添加内容，并且可以自动扩容；
   >
   > go中map数据结构使用很多，可以读取可以删除，注意map是无序的，遍历输出是无序的
   >
   > go函数原生支持返回多个值；
   >
   > go支持指针，相比c/c++作用非常有限，多使用于对传入的参数进行修改，函数的默认传入是复制传入，一般函数参数分为指针和非指针两种；
   >
   > go的结构体，结构体的函数可以构造类成员函数；
   >
   > go的错误处理只有error一种，函数可以把错误作为返回值返回，同样调用时，也需要多参数接收；
   >
   > go的字符串处理：在标准库“strings”包中存在很多相关函数；
   >
   > go的字符串格式化：在标准库“fmt”包中有很多字符串标准化方法，类似c语言%格式化，但方便很多；
   >
   > go的json处理：在标准库“encoding/json”包，保证结构体的每一个变量首字母为大写，用json.Marsha()来序列化——》数组，string()来转换序列化后的内容，可以在结构体配置序列化的变量名字，同样json包可以进行反序列化；
   >
   > go的时间处理：在标准库“time”中有时间处理相关函数，时间格式化要用具体的一个特殊时间，可以查文档；
   >
   > go的数字解析：在标准库“strconv”中有数字解析相关函数；
   >
   > go的进程信息：在“os”和“os/exec”包中包含处理进程信息的函数；

3. go语言简单实例

   > 1. 猜谜游戏-生成随机数
   >
   >    要点：使用随机数时每次要设置不同的随机数种子，一般使用时间戳，否则每次生成的随机数都相同
   >
   > 2. 猜谜游戏-读取用户输入
   >
   >    读取一行输入——>去掉读取的换行符——>转换成数字
   >
   > 3. 猜谜游戏-实现游戏循环
   >
   >    练习go基础语法
   >
   > 4. 在线词典实现
   >
   >    > 抓包，取得翻译 https://fanyi.caiyunapp.com
   >    >
   >    > 代码生成 https://curlconverter.com/#go
   >    >
   >    > 生成代码解读（创建请求，设置请求头，发起请求，读取响应）
   >    >
   >    > 生成request body
   >    >
   >    > 解析response body （代码生成——>https://oktools.net/json2go）
   >    >
   >    > 打印结果 （源代码：https://hi-hi.cn/go）
   >    >
   >    > 完善代码 
   >
   > 5. SOCKS5代理介绍
   >
   >    > 原理
   >    >
   >    > TCP echo server：注意此处有go的子线程知识（实现接收什么，返回什么，完成tcpserver搭建）nc命令来启动服务
   >    >
   >    > 协议auth阶段（完成鉴权配置）
   >    >
   >    > 协议请求阶段（实现ip和端口正常获取，获取浏览器的发送请求，向浏览器返回回包）
   >    >
   >    > 协议relay阶段（真正和服务器ip建立TCP连接，建立和浏览器的双向数据转发）

