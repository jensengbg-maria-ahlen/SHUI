<template>
  <div id="app">
    <header>
      <img src="@/assets/top.png" alt="top-logo">
    </header>
    <router-view/>
  </div>
</template>

<script>

export default {
  methods: {
    checkState() {
      this.$store.dispatch('checkState')
    }
  },
  beforeMount() {
    this.$store.dispatch('checkState')
  }
}
 
</script>


<style lang="scss">
  @import "./scss/main";
</style>
