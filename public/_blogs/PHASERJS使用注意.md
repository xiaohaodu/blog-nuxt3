#<center>PHASER使用注意</center>
- 导入小图片时要配置vite或者webpack，避免当图片大小小于阈值时，被编译为base64，phaser处理不了base64格式