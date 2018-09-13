import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Navbar from './components/navbar'
import VueResource from 'vue-resource'


Vue.use(BootstrapVue);
Vue.component('navbar',Navbar);
Vue.use(VueResource);

new Vue({
  http: {
    root: '/root',
    headers: {
      Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  }
});



new Vue({
  el: '#app',
  render: h => h(App),

});
