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
        <input type="text" placeholder="Användarnamn" v-model="username" class="credentials" />
        <input type="password" placeholder="Lösenord" v-model="password" class="credentials" />
        <div class="missingCred">{{missingUsername}}</div>
        <div class="missingCred">{{missingPassword}}</div>
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
      missingUsername: "",
      missingPassword: ""
    };
  },
  methods: {
    login() {
      if(this.username <= 0) {
        this.missingUsername = 'Du måste fylla i användarnamn'

      } else if(this.password <= 0) {
        this.missingPassword = 'Du måste fylla i lösenord'

      } else {
        this.$store.dispatch('login', { username: this.username, password: this.password })
      }
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
