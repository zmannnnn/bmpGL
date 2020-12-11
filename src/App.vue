<template>
  <div id="app">
     <BMapGL />
     <!-- <BMapGLLib /> -->
  </div>
</template>

<script>
import BMapGL from './views/BMapGL.vue'
// import BMapGLLib from './views/BMapGLLib.vue'
export default {
  name: 'App',
  components: {
    BMapGL,
    // BMapGLLib
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
  border: 0;
  outline: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>