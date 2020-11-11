<template>
  <button @click="modalsOpen = true">弹出框按钮</button>
  <teleport to='body'>
    <div v-if="modalsOpen" class="modals">
      <div>
          <p>这是一个弹出框，并且是被传送到body上</p>
          <button @click="modalsOpen = false">关闭</button>
      </div>      
    </div>
  </teleport>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Modals",
  setup() {
    let modalsOpen = ref(false);
    return { modalsOpen };
  },
};
</script>

<style scoped>
.modals{
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.modals div{
    border-radius: 4px;
    width: 300px;
    height: 100px;
    background-color:#fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: .9em;
    color:  rgba(0, 0, 0, .9);
}
button{
    padding: 5px;
}
</style>