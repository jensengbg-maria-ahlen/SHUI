<template>
  <section id="register">
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
      <button id="registerBtn" @click="register()">Registrera</button>
      <h3 @click="goTo()">Har du redan ett konto</h3>
    </section>
  </section>
</template>

<script>
export default {
  name: "Register",
  methods: {
    register() {
      this.$router.push("/login");
    },
    goTo() {
       this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss">
</style>
