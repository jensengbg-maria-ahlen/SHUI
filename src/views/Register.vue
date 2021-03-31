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
         <input type="text" placeholder="Användarnamn" v-model="username" />
        <div v-show="submitted && !username" class="missingCred">Du måste fylla i användarnamn</div>
        <input type="password" placeholder="Lösenord" v-model="password"/>
        <div v-show="submitted && !password" class="missingCred">Du måste fylla i lösenord</div>
      </div>
      <button id="registerBtn" type="submit">Registrera</button>
      <h3 @click="goTo()">Har du redan ett konto</h3>
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
      submitted: false
    };
  },
  methods: {
    register() {
      this.submitted = true
      this.$store.dispatch('register', { username: this.username, password: this.password })
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
