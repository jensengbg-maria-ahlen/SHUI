<template>
  <section id="flow">
    <header>
      <img src="@/assets/top.png" alt="top-logo" @click="isHidden = !isHidden">
      <Settings v-if="!isHidden"/>
    </header>
    <NewMessage v-if="showNewMsg"/>
    <FlowMsg v-for="flow in allFlows" :key="flow.id" :flow="flow" />
    <div class="create">
      <img src="@/assets/create.png" alt="create button" @click="toggleNewMsg()">
    </div>
  </section>
</template>

<script>
import Settings from './../components/Settings'
import NewMessage from './../components/NewMessage'
import FlowMsg from './../components/FlowMsg'
export default {
  name: "Flow",
  components: {
    Settings,
    FlowMsg,
    NewMessage
  },
  data() {
    return {
      isHidden: true
    }
  },
  computed: {
    showNewMsg() {
      return this.$store.state.showNewMsg
    },
    showAllFlow() {
      return this.$store.state.hideAllFlow
    },
    allFlows() {
      return this.$store.state.allFlows
    }
  },
  methods: {
    toggleNewMsg() {
      this.$store.commit('toggleNewMsg')
      this.$store.commit('showAllFlow')
    }
  },
  beforeMount() {
    this.$store.dispatch('fetchAllFlows')
  }
};
</script>

<style lang="scss">
</style>
