<template>
    <piechart @click="handClick" :data="state.data" :x="200" :y="200" :r="200"></piechart>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup(){
        const state = reactive({
            data:[
                {name:'大专',count:200,color:"red"},
                {name:'本科',count:300,color:'pink'},
                {name:'硕士',count:100,color:'deeppink'},
                {name:'博士',count:50,color:'blue'}
            ]
        });
        function handClick(){
            state.data.push({name:'其他',count:20,color:'orange'})
        }
        return{state,handClick}
    }
}
</script>