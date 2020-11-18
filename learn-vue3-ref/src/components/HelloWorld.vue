<template>
  <h1>{{ msg }}</h1>
  <button @click="add">count is: {{ count }}</button>
</template>

<script>
import { ref } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
// let origin = 0; //原始值
// let count = ref(origin);
// console.log(count)
// console.log(count.constructor)
// // console.log(count.__proto__ ===count.constructor.prototype)
// function add() {
//   count.value++;
// }

// let origin = { val: 0 }; //引用值
// let count = ref(origin);
// console.log(count);
// console.log(count.constructor);
// function add() {
//   count.value.val++;
// }

//通过ref包装的结果，当原始数据改变时会触发界面更新吗？即原始数据和返回的响应式数据是否有关联？
// let origin = 0; //原始值
// let count = ref(origin);
// function add() {
//   origin++
//   console.log(count.value)
// }
// 发现：原始数据修改，并不会影响响应式数据，更不会触发界面UI的更新
// let origin = { val: 0 }; //引用值
// let count = ref(origin);
// function add() {
//   origin++
//   console.log(count.value.val)
// }
// 原始数据是对象，当原始对象数据修改时也不会影响响应式数据，更不会触发界面UI的更新

// let origin = 0; 
// let count = ref(origin);
// function add() {
//   count.value++
//   console.log(origin)
// }

    return { count, add };
  },
};
</script>
