import Vue from 'vue'
import Vuex from 'vuex'
import ax from 'axios'
import router from './../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API: 'http://localhost:3000',
    allFlows: [],
    errorMessage: '',
    showNewMsg: false,
    showSettings: false
  },
  mutations: {
    allFlows(state, flow) {
      state.allFlows = flow
    },

    toggleNewMsg(state) {
      state.showNewMsg = !state.showNewMsg
    },

    displayError(state, error) {
      state.errorMessage = error
    },

    showSettings(state) {
      state.showSettings = !state.showSettings
    }
  },
  actions: {
    async register(ctx, cred) {
      try {
        await ax.post(`${ctx.state.API}/users/create`, {
          username: cred.username,
          password: cred.password
        });
      } catch (error) {
        ctx.commit('displayError', 'Användarnamnet är upptaget')
      }
    },

    async login(ctx, cred) {
      try {
        let resp = await ax.post(`${ctx.state.API}/auth/login`, {
          username: cred.username,
          password: cred.password
        });
        
        sessionStorage.setItem('token', resp.data.token);
        sessionStorage.setItem('userkey', resp.data.userkey);
        router.push('/flow')
      } catch (error) {
        ctx.commit('displayError', 'Användarnamn eller lösenord är felaktigt')
      }
    },

    async checkState(ctx) {
        let resp = await ax.get(`${ctx.state.API}/auth/isloggedin`, {
          headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        })
        console.log(resp.data)

        if(resp.data.loggedIn === false) {
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('userkey')
          router.push('/login')
        } else {
          ctx.commit('showSettings')
        }
    },

    async fetchAllFlows(ctx) {
      try {
        let data = await ax.get(`${ctx.state.API}/flow`)
        ctx.commit('allFlows', data.data)
      } catch (error) {
        console.log(error)
      }
    },

    async addFlow(ctx, info) {
      await ax.post(`${ctx.state.API}/flow/create`, info, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      ctx.dispatch('fetchAllFlows')
    },

    async deleteUser(ctx) {
        router.push('/removed')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userkey')
      try {
       await ax.delete(`${ctx.state.API}/users/delete`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
       })
        ctx.dispatch('fetchAllFlows')
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
