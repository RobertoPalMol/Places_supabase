import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";


const app = createApp(App)


app.use(createVuestic)
app.use(router)
app.mount('#app')



