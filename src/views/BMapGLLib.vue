<template>
  <div class="home">
    <!-- BMapGLLib 控件 -->
    <ul class="drawing-panel">
      <li class="bmap-btn bmap-marker" @click="draw('marker')" :style="{'background-position-y': actNav === 'marker' ? '-52px' : '0px'}"></li>
      <li class="bmap-btn bmap-polyline" @click="draw('polyline')" :style="{'background-position-y': actNav === 'polyline' ? '-52px' : '0px'}"></li>
      <li class="bmap-btn bmap-rectangle" @click="draw('rectangle')" :style="{'background-position-y': actNav === 'rectangle' ? '-52px' : '0px'}"></li>
      <li class="bmap-btn bmap-polygon" @click="draw('polygon')" :style="{'background-position-y': actNav === 'polygon' ? '-52px' : '0px'}"></li>
      <li class="bmap-btn bmap-circle" @click="draw('circle')" :style="{'background-position-y': actNav === 'circle' ? '-52px' : '0px'}"></li>
    </ul>
    <!-- 地图容器 -->
    <div id="containerGLLib" class="allmap"></div>
  </div>
</template>

<script>
import { loadBaiDuDrawMap } from "@/bmpgl_lib.js";
export default {
  name: "home",
  data() {
    return {
      map: null,
      actNav: "",
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 初始化地图
      loadBaiDuDrawMap().then((BMapGL) => {
        // 创建地图实例
        let map = new BMapGL.Map("containerGLLib");
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
        );
        // 保存地图
        this.map = map
        // 创建点坐标 axios => res 获取的初始化定位坐标
        const point = new BMapGL.Point(114.031761, 22.542826);
        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(point, 19);
        //开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true);
        map.setHeading(64.5);
        map.setTilt(73);
      });
    },
    draw(type) {
      this.actNav = type
      const styleOptions = {
        strokeColor: "#5E87DB", // 边线颜色
        fillColor: "#5E87DB", // 填充颜色。当参数为空时，圆形没有填充颜色
        strokeWeight: 2, // 边线宽度，以像素为单位
        strokeOpacity: 1, // 边线透明度，取值范围0-1
        fillOpacity: 0.2, // 填充透明度，取值范围0-1
      };
      const labelOptions = {
        borderRadius: "2px",
        background: "#FFFBCC",
        border: "1px solid #E1E1E1",
        color: "#703A04",
        fontSize: "12px",
        letterSpacing: "0",
        padding: "5px",
      };
      // 实例化鼠标绘制工具
      const drawingManager = new BMapGLLib.DrawingManager(this.map, {
        // isOpen: true,        // 是否开启绘制模式
        enableCalculate: false, // 绘制是否进行测距测面
        enableSorption: true, // 是否开启边界吸附功能
        sorptiondistance: 20, // 边界吸附距离
        rectangleOptions: styleOptions, // 矩形的样式
      });
      if (drawingManager.isOpen_ && drawingManager.getDrawingMode() === type) {
        drawingManager.close();
      } else {
        drawingManager.setDrawingMode(type);
        drawingManager.open();
      }
    },
  },
};
</script>
<style lang="scss">
// 隐藏版权信息
.BMap_cpyCtrl {
  display: none;
}
// 隐藏版权图标
.anchorBL img {
  display: none;
}
</style>
<style lang="scss" scoped>
.allmap {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
}
.change-map-type {
  position: absolute;
  right: 50px;
  bottom: 10px;
  z-index: 2;
}
ul li {
  list-style: none;
}
.info {
  z-index: 999;
  width: auto;
  min-width: 22rem;
  padding: 0.75rem 1.25rem;
  margin-left: 1.25rem;
  position: fixed;
  top: 1rem;
  background-color: #fff;
  border-radius: 0.25rem;
  font-size: 14px;
  color: #666;
  box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
}
.drawing-panel {
  z-index: 999;
  position: fixed;
  top: 20px;
  right: 20px;
  border-radius: 0.25rem;
  height: 47px;
  box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
}
.bmap-btn {
  border-right: 1px solid #d2d2d2;
  float: left;
  width: 64px;
  height: 100%;
  background-image: url(http://api.map.baidu.com/library/DrawingManager/1.4/src/bg_drawing_tool.png);
  cursor: pointer;
}
.drawing-panel .bmap-marker {
  background-position: -65px 0;
}
.drawing-panel .bmap-polyline {
  background-position: -195px 0;
}
.drawing-panel .bmap-rectangle {
  background-position: -325px 0;
}
.drawing-panel .bmap-polygon {
  background-position: -260px 0;
}
.drawing-panel .bmap-circle {
  background-position: -130px 0;
}
</style>
