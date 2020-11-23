<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <Reactive></Reactive>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Reactive from './components/Reactive.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,Reactive
  }
}
</script>
