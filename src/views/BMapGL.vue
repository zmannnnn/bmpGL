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