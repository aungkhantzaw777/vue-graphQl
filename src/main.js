import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import './utils/main.scss'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import locale from 'element-ui/lib/locale/lang/en'
// import { createProvider } from './vue-apollo'
import VueApollo from 'vue-apollo'
import { apolloClient } from './vue-apollo';
import "core-js/stable";
import "regenerator-runtime/runtime";

// bootsrap
Vue.use(BootstrapVue)

//font awesome
Vue.use(IconsPlugin)
library.add(faHatWizard)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

// ElementUi
Vue.use(ElementUI, { locale });

// grapyhql
Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  router,
  apolloProvider: apolloProvider,
  render: h => h(App)
}).$mount('#app')
