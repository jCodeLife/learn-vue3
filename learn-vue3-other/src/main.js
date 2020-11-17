import { createApp, h } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)
    .component('comp', { render: () => h('div', 'i am comp!!!') })
    .mount('#app')
