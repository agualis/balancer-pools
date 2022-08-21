import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.postcss'
import router from './router'
import { VueQueryPlugin } from "vue-query";

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
