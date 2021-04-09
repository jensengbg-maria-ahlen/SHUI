<template>
  <section id="newMessage">
    <textarea class="commentInput" type="text" v-model="info"></textarea>
    <input type="text" class="tagInput" placeholder="#position, #viktigt" v-model="tags">
    <div class="errorMessage">{{errorMsg}}</div>
    <button class="publishBtn" @click="publish()">Publicera</button>
  </section>
</template>

<script>
export default {
    name: 'NewMessage',
    data() {
      return {
        info: '',
        tags: '',
        errorMsg: ''
      }
    },
    methods: {
      publish() {
        if(this.info <= 0) {
          this.errorMsg = 'Kan inte publicera tomt meddelande'

        } else if (this.tags <= 0) {
          this.errorMsg = 'Kan inte publicera utan hashtag'

        } else {
          let tagsArray = this.tags.split(', ')
          this.$store.dispatch('addFlow', {info: this.info, tags: tagsArray})
          this.$store.commit('showNewMsg')
        }       
      }
    }
}
</script>

<style>

</style>