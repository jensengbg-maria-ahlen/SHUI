<template>
  <section id="login">
    <div class="logo">
      <img src="@/assets/Subtract.png" alt="logo" />
      <h1>SHUI</h1>
      <h3>FLOW FREELY</h3>
    </div>
    <section class="LoginCredentials">
      <div class="inputFieldsForLogin">
        <input type="text" placeholder="Användarnamn" />
        <input type="password" placeholder="Lösenord" />
      </div>
      <button id="loginBtn" @click="login()">Logga in</button>
    </section>
  </section>
</template>

<script>
export default {
  name: "Login",
  methods: {
    login() {
      this.$router.push("/flow");
    },
  },
};
</script>

<style lang="scss">
</style>
