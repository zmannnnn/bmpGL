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

### 异步的js文件（创建一个引入的bmpgl_lib.js文件）
```
const ak = 'LnP4INwY2AY2VSZFwcRMbNhPxUeBB7sA'
/**
 * 异步加载百度地图
 * @returns {Promise}
 * @constructor
 */
function loadBaiDuMap() {
  return new Promise(function (resolve, reject) {
    try {
      console.log('BMap is defined:', BMapGL === undefined || BMapGL)
      resolve(BMapGL)
    } catch (err) {
      window.init = function () {
        resolve(BMapGL)
      }
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `http://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=init`
      script.onerror = reject
      document.body.appendChild(script)
    }
  })
}
export { loadBaiDuMap }
/**
 * 选择性加载，如果不需要就把下面的这部分删掉
 * 异步加载百度地图,以及绘制工具
 * @returns {Promise}
 * @constructor
 */
function loadBaiDuDrawMap() {
  return loadBaiDuMap().then(BMapGL => {
    let loaded = false
    try {
      loaded = (BMapGLLib && BMapGLLib.DrawingManager)
    } catch (err) {
      loaded = false
    }
    if (!loaded) {
      console.log('BMapLib.DrawingManager loading!')
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'http://mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.js'
      document.body.appendChild(script)
      let link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'http://mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.css'
      document.body.appendChild(link)
    } else {
      console.log('BMapLib.DrawingManager is loaded!')
    }
    return BMapGL
  })
}
export { loadBaiDuDrawMap }
```
### 引入和使用

```
<template>
  <div class="home">
    <!--创建地图容器-->
    <div id="containerGL" class="allmap"></div>
  </div>
</template>

<script>
import { loadBaiDuMap } from "@/bmpgl_lib.js"
export default {
  name: "home",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      // 传入密钥获取地图回调。
      loadBaiDuMap().then((BMapGL) => {
        // 创建地图实例
        let map = new BMapGL.Map("containerGL");
        // 添加比例尺控件
        map.addControl(
          new BMapGL.ScaleControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT,
            offset: new BMapGL.Size(10, 10),
          })
        );
        // 添加缩放控件
        map.addControl(
          new BMapGL.ZoomControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            offset: new BMapGL.Size(10, 10),
          })
        )
         // 保存地图
        this.map = map
        // 创建点坐标 axios => res 获取的初始化定位坐标
        const point = new BMapGL.Point(114.031761, 22.542826)
        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(point, 19)
        //开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true)
        map.setHeading(64.5)
        map.setTilt(73)
        // 保存数据
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