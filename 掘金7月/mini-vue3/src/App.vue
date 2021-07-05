<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <h1>{{name}}</h1>

  <h1>{{age}}</h1>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      name: 'Alice'
    }
  },
  mounted(){
    console.log(`组件挂载了,修改name属性~`);
    this.name = 'Tom';
  }
}
</script>
