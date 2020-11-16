<template>
  <button @click="$emit('click')">点我</button>
</template>
<script>
export default {
    emits:['click']
};
</script>