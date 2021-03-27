<template>
  <div id="app">
    <header>
      <img src="@/assets/top.png" alt="top-logo" @click="showSettings">
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    showSettings() {
      
    }
  }
}
 
</script>


<style lang="scss">
  @import "./scss/main";
</style>
