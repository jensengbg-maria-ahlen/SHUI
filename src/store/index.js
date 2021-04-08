import Vue from 'vue'
import Vuex from 'vuex'
import ax from 'axios'
import router from './../router'
import CryptoJS from 'crypto-js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API: 'http://localhost:3000',
    allFlows: [],
    allTags: [],
    errorMessage: '',
    showNewMsg: false
  },
  mutations: {
    allFlows(state, flow) {
      state.allFlows = flow
    },

    allTags(state, tags) {
      state.allTags = tags
    },

    showNewMsg(state) {
      state.showNewMsg = !state.showNewMsg
    },

    displayError(state, error) {
      state.errorMessage = error
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

    //check if token is valid
    async checkState(ctx) {
      let token = sessionStorage.getItem('token')

      if (token) {
        let resp = await ax.get(`${ctx.state.API}/auth/isloggedin`, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        })

        if (resp.data.loggedIn === false) {
          sessionStorage.clear()
          router.push('/login')
        } 
      } else {
        sessionStorage.clear()
        router.push('/')
      }
    },

    
    async fetchAllFlows(ctx) {
      try {
        let data = await ax.get(`${ctx.state.API}/flow`, {
          headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        })  
        ctx.dispatch('decryptFlow', data.data)
      } catch (error) {
        console.log(error)
      }
    },


    async decryptFlow(ctx, flows) {
      let flowInfo = flows.map(value => {
        let decryptedText = CryptoJS.AES.decrypt(value.info, sessionStorage.getItem('userkey')).toString(CryptoJS.enc.Utf8)
        value.info = decryptedText 
        return value
      })

      ctx.commit('allFlows', flowInfo)      
    },


    async addFlow(ctx, info) {
      await ax.post(`${ctx.state.API}/flow/create`, info, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      ctx.dispatch('fetchAllFlows')
    },


    async fetchUserTag(ctx) {
      let allTags = await ax.get(`${ctx.state.API}/tags/`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      ctx.commit('allTags', allTags.data )
    },


    async addTagToUser(ctx, tags) {
      await ax.post(`${ctx.state.API}/tags/addtag`, tags, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
    },


    async removeTagFromUser(ctx, tags) {
      await ax.post(`${ctx.state.API}/tags/removeTag`, {tags: [tags]}, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
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
    //merge array if several arrays and remove all duplicates of #tags
    filterTags(ctx) {
      let allFlows = ctx.allTags
      const mergeArray = [].concat.apply([], allFlows)
      
      let removedDuplicates = [...new Set(mergeArray)]
      return removedDuplicates
    }
  }
})
