<template>
  <section id="newMessage">
    <textarea class="commentInput" type="text" v-model="info"></textarea>
    <input type="text" class="tagInput" placeholder="#position, #viktigt" v-model="tags">
    <button class="publishBtn" @click="publish()">Publicera</button>
  </section>
</template>

<script>
export default {
    name: 'NewMessage',
    data() {
      return {
        info: '',
        tags: ''
      }
    },
    methods: {
      publish() {
        let tagsArray = this.tags.split(', ')
        this.$store.dispatch('addFlow', {info: this.info, tags: tagsArray})
        this.$store.commit('showNewMsg')
      }
    }
}
</script>

<style>

</style>