import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './assets/style/main.scss'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
