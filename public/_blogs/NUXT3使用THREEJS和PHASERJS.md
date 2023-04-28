# <center>在NUXT3中使用THREEJS和PHASERJS</center>
最开始的时候我这样引入不做任何处理
```html
//直接在.vue文件中使用setup
<script setup>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
</script>
```
最开始时正常运行和构建,后来换了个node环境（可能是这个吧），就突然不能用了
具体错误显示<br/>`import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 和import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";导入失败，链接不对`（当然不是具体的报错信息了，当时没记录，简单来说就是这个意思）<br/>
具体处理就是在nuxt.config.ts文件中添加构建配置
```js
//nuxt.config.ts
build: {
        transpile: ["three"],
    },
```
当使用一些类似`import * as ?? from "name"`这种第三方库时，应该将它们添加到transplie数组中，以便它可以作为Babel的依赖项包含在内，让Babel处理他（注意，不是类似的引入而是可以直接引入的不需要这样处理，否则可能会出错）
（这种错误应该是编译时使用的commonjs或者es6 import导入的处理问题，如果使用的es6、es7等高版本语法的包，不需要也不可以进行Babel编译，会出错（例如Phaser3，亲测会出错😵‍💫😵‍💫））
<br/>
在查资料时我查到了相当多的作为插件引入的内容，当处理完这个错误之后，，顺便将该库作为plugins引入nuxt

```js
//plugins/three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use([THREE, OrbitControls, RGBELoader])
})
//nuxt.config.js
  plugins: [
        { src: "~/plugins/three" },
    ],
```
这里我不太懂，应该是全局引入，但是还是要在使用时再引入一遍才会正常工作，不能直接使用。
<br/>
同时项目中还是使用了phaser做一些小游戏demo，所以这时候我还想把phaser也放在plugins目录，出现了刷新页面就会有`HTMLVideoElement is not defined`的错误，离开游戏相关路由也还是报这个错，去掉引入就可以；