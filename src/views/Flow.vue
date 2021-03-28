<template>
  <section id="flow">
    <NewMessage />
    <FlowMsg />
    <img src="@/assets/create.png" alt="create button">
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
  }
};
</script>

<style lang="scss">
</style>
