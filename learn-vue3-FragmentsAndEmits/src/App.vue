<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <Fragments></Fragments>
  <Emits @click="onClick"></Emits>
</template>

<script>
import Emits from './components/Emits.vue'
import Fragments from './components/Fragments.vue'
import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    HelloWorld,
    Fragments,
    Emits,
  },
  methods:{
    onClick(){
      console.log('clicked!!!!!')
    }
  }
}
</script>
