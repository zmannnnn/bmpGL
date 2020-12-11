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