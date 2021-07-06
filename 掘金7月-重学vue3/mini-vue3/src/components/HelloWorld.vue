<template>
  <h1>{{ count }}</h1>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      count: 0
    }
  },
  watch:{
    count(val){
      console.log('执行了监听器count');
    }
  },
  mounted(){
    this.count ++
  }
};
</script>
