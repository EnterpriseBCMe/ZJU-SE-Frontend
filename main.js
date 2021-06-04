import Vue from 'vue'
import App from './App'
import store from './common/store.js'
import util from './common/ssx_util' 			// Util Functions

// Mounted Util Functions
Vue.prototype.$util = util

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
