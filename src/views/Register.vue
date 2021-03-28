<template>
  <section id="register">
    <div class="logo">
      <img src="@/assets/Subtract.png" alt="logo" />
      <h1>SHUI</h1>
      <h3>FLOW FREELY</h3>
    </div>
    <form class="LoginCredentials" @register.prevent="register">
      <div class="inputFieldsForLogin">
         <input type="text" placeholder="Användarnamn" v-model="username" />
        <div v-show="submitted && !username" class="missingCred">Du måste fylla i användarnamn</div>
        <input type="password" placeholder="Lösenord" v-model="password"/>
        <div v-show="submitted && !password" class="missingCred">Du måste fylla i lösenord</div>
      </div>
      <button id="registerBtn" type="register">Registrera</button>
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
      if(this.username >= 0 && this.password >= 0) {
        this.submitted = false
      }
      this.submitted = true
    },
    goTo() {
       this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss">
</style>
