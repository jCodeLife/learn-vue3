import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)
const vm = app.mount('#app')

console.log(`vm.name === vm.$data.name :  ${vm.name === vm.$data.name}`);

vm.age = 12
console.log(vm.$data);//Proxy {name: "Tom"}
console.log(vm.$data.age);//undefined

console.log(vm.add);



