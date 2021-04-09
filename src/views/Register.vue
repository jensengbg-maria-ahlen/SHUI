<template>
  <section id="register">
    <div class="logo">
      <img src="@/assets/Subtract.png" alt="logo" />
      <h1>SHUI</h1>
      <h3>FLOW FREELY</h3>
    </div>
    <form class="LoginCredentials" @submit.prevent="register">
      <div class="inputFieldsForLogin">
        <div class="errorMessage">{{displayError}}</div>
        <input type="text" placeholder="Användarnamn" v-model="username" class="credentials"/>
        <input type="password" placeholder="Lösenord" v-model="password" class="credentials" />
        <div class="missingCred">{{missingUsername}}</div>
        <div class="missingCred">{{missingPassword}}</div>
      </div>
      <button id="registerBtn" type="submit">Registrera</button>
      <h3 @click="goTo()" class="alreadyRegister">Har du redan ett konto</h3>
    </form>
  </section>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      missingUsername: "",
      missingPassword: ""
    };
  },
  methods: {
    register() {
      if(this.username <= 0) {
        this.missingUsername = 'Du måste fylla i användarnamn'

      } else if(this.password <= 0) {
        this.missingPassword = 'Du måste fylla i lösenord'

      } else {
        this.$store.dispatch('register', { username: this.username, password: this.password })
      }
    },
    goTo() {
      this.$router.push("/login");
    }
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
