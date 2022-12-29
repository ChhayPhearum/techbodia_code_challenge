import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import axios from 'axios'
import VueAxios from 'vue-axios'

// eslint-disable-next-line
/* eslint-disable */
createApp(App).use(VueAxios, axios).mount('#app')
