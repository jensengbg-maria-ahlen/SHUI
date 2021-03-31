<template>
  <div id="app">
    <header>
      <img src="@/assets/top.png" alt="top-logo" @click="checkState">
      <Settings v-if="showSettings"/>
    </header>
    <router-view/>
  </div>
</template>

<script>
import Settings from './components/Settings'
export default {
  components: {
    Settings
  },
  computed: {
    showSettings() {
      return this.$store.state.showSettings
    }
  },
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
