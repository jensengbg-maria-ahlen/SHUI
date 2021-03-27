<template>
  <section id="landing">
    <div class="logo">
      <img src="@/assets/Subtract.png" alt="logo">
      <h1>SHUI</h1>
      <h3>FLOW FREELY</h3>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Landing',
  mounted() {
    setTimeout(() => {
      this.$router.replace("/register");
    }, 4000);
  },
}
</script>

<style lang="scss">

</style>