import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
// import { Button, Select } from 'element-ui';

Vue.config.productionTip = false
Vue.use(ElementUI);

// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
