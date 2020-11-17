# 

## 一、Global API改为应用程序实例调用

Vue2中很多全局API会改变vue的行为，全局的API会导致一些问题：
1. Vue2没有app的概念，new Vue()得到的根实例作为app，这样所有创建的根实例app都是共享相同的全局配置，这在测试时会污染其他测试用例，导致测试困难
2. 全局配置也导致没有办法在单页面创建不同全局配置的多个app实例

Vue3使用createApp函数返回应用程序实例app，由这个app实例暴露一系列的全局API。

例如：Vue.component的变更

```javascript
import { createApp, h } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)
    .component('comp', { render: () => h('div', 'i am comp!!!') })
    .mount('#app')
```

可以看到Vue.component变成app.component的形式

Vue3中类似的变更还有：

1. Vue.directive变更为app.directive
2. Vue.mixin变更为app.mixin
3. Vue.use变更为app.use
4. Vue.config变更为app.config
5. Vue.config.ignoredElements变更为app.config.ignoredElements

[^]: 注意：Vue.config.productionTip和Vue.filter被移除





