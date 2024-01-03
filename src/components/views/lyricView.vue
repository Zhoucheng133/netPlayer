<template>
  <div class="bg">
    <a-button @click="hideLyric">关闭</a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    hideLyric(){
      this.$emit("hideLyric")
    }
  },
}
</script>

<style scoped>
.bg{
  background-color: #fff;
}
</style>