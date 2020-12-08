# bmpgl

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 异步的js文件（创建一个引入的bmpGL.js文件）
```
export function BMPGL(ak) {
  return new Promise(function(resolve, reject) {
    window.init = function() {
      // eslint-disable-next-line
      resolve(BMapGL)
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `http://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=init`
    script.onerror = reject
    document.head.appendChild(script)
  })
}
```
### 引入和使用

```
<template>
  <div class="home">
  <!--创建地图容器-->
    <div id="container" class="allmap"></div>
  </div>
</template>

<script>
import { BMPGL } from "@/bmpgl.js"
export default {
  name: "home",
  data() {
    return {
      ak: "XXXXXXXXX", // 百度的地图密钥
      myMap: null
    };
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      // 传入密钥获取地图回调。
      BMPGL(this.ak).then((BMapGL) => {
        // 创建地图实例
        let map = new BMapGL.Map("container");
        // 创建点坐标 axios => res 获取的初始化定位坐标
        let point = new BMapGL.Point(114.031761, 22.542826)
        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(point, 19)
        //开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true)
        map.setHeading(64.5)
        map.setTilt(73)
        // 保存数据
        // this.myMap = map
      })
      .catch((err)=>{
        console.log(err)
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.allmap {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
}
</style>

```