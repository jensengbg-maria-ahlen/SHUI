import Vue from 'vue'
import Vuex from 'vuex'
import ax from 'axios'
import router from './../router'
//import CryptoJS from 'crypto-js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API: 'http://localhost:3000',
    allFlows: [],
    allTags: [],
    errorMessage: '',
    showNewMsg: false,
    showAllFlow: true,
    showSettings: false
  },
  mutations: {
    allFlows(state, flow) {
      state.allFlows = flow
    },

    allTags(state, tags) {
      state.allTags = tags
    },

    showAllFlow(state) {
      state.showAllFlow = !state.showAllFlow
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
        router.push('/login')
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
      let user = sessionStorage.getItem('token')

      if (user) {
        let resp = await ax.get(`${ctx.state.API}/auth/isloggedin`, {
          headers: {
            'authorization': `Bearer ${user}`
          }
        })

        if (resp.data.loggedIn === false) {
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('userkey')
          router.push('/login')
        } else {
          ctx.commit('showSettings')
        }
      } else {
        console.log('user not logged in')
      }
    },

    async fetchAllFlows(ctx) {
      try {
        let data = await ax.get(`${ctx.state.API}/flow`, {
          headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        })
        ctx.commit('allFlows', data.data)
        //ctx.dispatch('decryptFlow', data.data)
      } catch (error) {
        console.log(error)
      }
    },


    /*
    async decryptFlow(ctx, flows) {
      let decryptedFlow = flows.map(value => {
        console.log('value: ', value)
        let decryptedinfo = CryptoJS.AES.decrypt(value.info, sessionStorage.getItem('userkey')).toString(CryptoJS.enc.Utf8)

        value = { ...value, info: decryptedinfo }
        console.log(`decryptedinfo: '${decryptedinfo}'`)

        return value
      });

      console.log('decryptedflow', decryptedFlow)
      ctx.commit('allFlows', decryptedFlow)
    },
*/
    async addFlow(ctx, info) {
      await ax.post(`${ctx.state.API}/flow/create`, info, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      ctx.dispatch('fetchAllFlows')
    },

    async deleteUser(ctx) {
      try {
        await ax.delete(`${ctx.state.API}/users/delete`, {
          headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        })
        router.push('/removed')
        sessionStorage.clear()
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    filterTags(ctx) {
      let allFlows = ctx.allFlows

      let tagsArray = allFlows.map(tag => {
        let newTag = tag.tags
        return newTag
      });

      const mergeArray = [].concat.apply([], tagsArray)
      let removedDuplicates = [...new Set(mergeArray)]

      return removedDuplicates
    }
  }
})
