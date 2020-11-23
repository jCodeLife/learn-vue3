<template>
  <button @click="change">
    {{ state.count }}
  </button>
</template>
<script>
import { reactive } from "vue";
export default {
  setup() {
    // const obj = {
    //   count: 0,
    // };
    // const state = reactive(obj);
    // function change(){
    //     // ++state.count
    //     ++obj.count;
    //     console.log(obj);
    //     console.log(state);
    // }
    // return { state,change};


    // const state = reactive({
    //     a:{
    //         b:{
    //             c:{name:'c'}
    //         }
    //     }
    // });    
    // console.log(state);  
    // console.log(state.a);
    // console.log(state.a.b);  
    // console.log(state.a.b.c);  



    const state = reactive(0);  
    console.log(state)
    return { state };  

  },
};
</script>