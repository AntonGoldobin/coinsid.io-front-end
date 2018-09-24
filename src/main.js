import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Navbar from './components/navbar'
import VueResource from 'vue-resource'
import Router from 'vue-router'


Vue.use(Router);


Vue.use(BootstrapVue);
Vue.component('navbar',Navbar);
Vue.use(VueResource);


 new Router({
  routes: [
    {
      path: '/login',
      name: 'Authentication',
      component: Navbar
    }
  ]
});

new Vue({
  el: '#app',
  render: h => h(App),

});
