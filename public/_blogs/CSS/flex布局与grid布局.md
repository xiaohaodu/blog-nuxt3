# flex布局与grid布局

1. flex布局

   <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=988812159&bvid=BV1A44y1Z7Bp&cid=927483369&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

   1. flex容器基础概念

      > display:flex;
      >
      > flex有主轴和交叉轴，默认分别是左—>右和上—>下
      >
      > > min-content,max-content
      >
      > flex$\begin{cases}flex-direction &row,column... \\ flex-basis &50px\\ flex-grow &1\\ flex-shrink &1\\flex\\align-items\\justify-content\\flex-warp\\align-content\\order&1\end{cases}$
      >
      > * flex-direction：指定flex盒子主轴方向设置
      > * flex-basis：指定子元素宽度
      > * flex-grow：指定flex空间剩余的宽度的子元素分配策略，平均分配/倍数分配，指定flex元素的扩张规则
      > * flex-shrink：指定flex元素的收缩规则
      > * flex：flex-grow,flex-shrink,flex-basis的简写
      > * align-items：设置flex容器交叉轴对齐
      > * justify-content：设置flex容器主轴对齐（space-between靠墙,space-around中间是两边空的二倍,space-evenly均空）
      > * flex-warp：控制flex容器元素换行
      > * align-content：控制flex容器多行对齐
      > * order：控制flex元素的显示顺序
      >
      > > 补充：align-self会对齐当前 grid 或 flex 行中的元素，并覆盖已有的align-items的值。

   2. 哔哩哔哩导航栏实战

      > 略

2. grid布局

  <iframe src="//player.bilibili.com/player.html?aid=606009016&bvid=BV1w84y1r7X8&cid=917055229&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

  * display:grid;

  * grid-template-columns:repeat(12,50px);    (fr单位,类似比例分配)    指定列宽    repeat(auto-fill，50px)  repeat(auto-fill，minmax(50px,1fr)) 

    > 函数 **minmax()** 定义了一个长宽范围的闭区间，它与CSS 网格布局一起使用

  * grid-template-rows：50px 100px 200px;      指定行高，可以覆盖默认行高

  * grid-auto-rows：指定默认行高

  * grid-row-gap：控制行的缝隙

  * grid-columns-gap：控制列的缝隙

  * gap：行的缝隙，列的缝隙

  * grid-colum-start,grid-column-end——>grid-column:1 / 2;(跨度是1的话可以简写，只写开头)（1开始，2结束）   合并单元格  （行的类似）

  * <hr/>

  * grid-area:header;为元素取名字

  * grid-template-areas："header header","footer footer";