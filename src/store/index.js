import Vue from 'vue'
import Vuex from 'vuex'
import ax from 'axios'
import router from './../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API: 'http://localhost:3000' 
  },
  mutations: {
  },
  actions: {
    async login(ctx, cred) {
      let resp = await ax.post(`${ctx.state.API}/auth/login`, {
        username: cred.username,
        password: cred.password
      });
      
      sessionStorage.setItem('token', resp.data.token);
      sessionStorage.setItem('userkey', resp.data.userkey);
      router.push('/flow')
    }
  },
  modules: {
  }
})
