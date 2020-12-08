<template>
  <div id="app">
    <bmpGL />
  </div>
</template>

<script>
import bmpGL from './components/bmpGL.vue'

export default {
  name: 'App',
  components: {
    bmpGL
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
