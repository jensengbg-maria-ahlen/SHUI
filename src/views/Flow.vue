<template>
  <section id="flow">
    <NewMessage v-if="showNewMsg"/>
    <FlowMsg v-for="flow in allFlows" :key="flow.id" :flow="flow"/>
    <div class="create">
      <img src="@/assets/create.png" alt="create button" @click="toggleNewMsg()">
    </div>
  </section>
</template>

<script>
import NewMessage from './../components/NewMessage'
import FlowMsg from './../components/FlowMsg'
export default {
  name: "Flow",
  components: {
    FlowMsg,
    NewMessage
  },
  computed: {
    showNewMsg() {
      return this.$store.state.showNewMsg
    },
    allFlows() {
      return this.$store.state.allFlows
    }
  },
  methods: {
    toggleNewMsg() {
      this.$store.commit('toggleNewMsg')
    }
  },
  beforeMount() {
    this.$store.dispatch('fetchAllFlows')
  }
};
</script>

<style lang="scss">
</style>
