import Vue from 'vue'
import Vuex from 'vuex'
import ax from 'axios'
import router from './../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API: 'http://localhost:3000',
    errorMessage: '' 
  },
  mutations: {
    displayError(state, error) {
      state.errorMessage = error
    }
  },
  actions: {
    async register(ctx, cred) {
      let resp = await ax.post(`${ctx.state.API}/users/create`, {
        username: cred.username,
        password: cred.password
      });
      console.log(resp)
    },

    async login(ctx, cred) {
      try {
        let resp = await ax.post(`${ctx.state.API}/auth/login`, {
          username: cred.username,
          password: cred.password
        });
        console.log(resp)
        
        sessionStorage.setItem('token', resp.data.token);
        sessionStorage.setItem('userkey', resp.data.userkey);
        router.push('/flow')
      } catch (error) {
        console.log(error)
        ctx.commit('displayError', 'Användarnamn eller lösenord är felaktigt')
      }
      
    },

    async checkState() {
      if(sessionStorage.getItem('userkey') === null) {
        alert('Fel användarnamn eller lösenord')
      }
    }
  },
  modules: {
  }
})
