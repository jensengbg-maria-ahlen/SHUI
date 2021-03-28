<template>
  <section id="login">
    <div class="logo">
      <img src="@/assets/Subtract.png" alt="logo" />
      <h1>SHUI</h1>
      <h3>FLOW FREELY</h3>
    </div>
    <form class="LoginCredentials" @submit.prevent="login">
      <div class="inputFieldsForLogin">
        <div class="errorMessage">{{displayError}}</div>
        <input type="text" placeholder="Användarnamn" v-model="username" />
        <div v-show="submitted && !username" class="missingCred">Du måste fylla i användarnamn</div>
        <input type="password" placeholder="Lösenord" v-model="password"/>
        <div v-show="submitted && !password" class="missingCred">Du måste fylla i lösenord</div>
      </div>
      <button id="loginBtn" type="submit">Logga in</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      submitted: false
    };
  },
  methods: {
    login() {
      this.submitted = true
      this.$store.dispatch('login', { username: this.username, password: this.password })
    },
  },
  computed: {
    displayError() {
      return this.$store.state.errorMessage
    }
  }
};
</script>

<style lang="scss">
</style>
