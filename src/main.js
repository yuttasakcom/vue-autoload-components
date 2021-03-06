import Vue from 'vue'
import App from './App.vue'

import upperFirst from "lodash/upperFirst"
import camelCase from "lodash/camelCase"
import last from "lodash/last"

Vue.config.productionTip = false

let requireComponent = require.context("./components", false, /[\w-]+\.vue$/)
requireComponent.keys().forEach(filename => {
  let componentConfig = requireComponent(filename)
  let componentName = upperFirst(
    camelCase(filename.replace(/^\.\//, "").replace(/\.\w+$/, ""))
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})

requireComponent = require.context("./components", true, /(\w+\/)(\w+\.vue)$/)
requireComponent.keys().forEach(filename => {
  let componentConfig = requireComponent(filename)
  let newFilename = last(filename.split("/"))
  let componentName = upperFirst(
    camelCase(newFilename.replace(/^\.\//, "").replace(/\.\w+$/, ""))
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})

new Vue({
  render: h => h(App)
}).$mount('#app')
