import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

// Import UIkit css and Js
import UIcss from 'uikit/dist/css/uikit.min.css';
import Icons from 'uikit/dist/js/uikit-icons.min.js';
import UIkit from 'uikit/dist/js/uikit.min.js'

window.UIkit  = require('uikit');
Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(UIcss);
UIkit.use(Icons);

new Vue({
  render: h => h(App),
}).$mount('#app')
