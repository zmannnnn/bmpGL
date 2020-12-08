<template>
  <div class="home">
    <div id="container" class="allmap"></div>
  </div>
</template>

<script>
import { BMPGL } from "@/bmpgl.js"
export default {
  name: "home",
  data() {
    return {
      ak: "LnP4INwY2AY2VSZFwcRMbNhPxUeBB7sA", // 这里就是百度地图密钥
      myMap: null
    };
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
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
