<template>
  <section id="settings">
    <img src="@/assets/top.png" alt="top-logo" @click="checkState" />
    <div class="setting">
      <div class="streams">
        <h2>streams</h2>
        <div class="hashtags" >
          <div class="hashtag" v-for="tag in allTags" :key="tag.index" >
            <h5>{{tag}}</h5>
            <div @click="removeFlow(tag)"><img src="./../assets/X.png" alt="removeTag" /></div>
          </div>
        </div>
      </div>
      <div>
        <div class="inputStreams">
          <input
            type="text"
            class="streamInput"
            placeholder="#add_a_tag"
            v-model="tag"
          />
          <button class="addBtn" @click="showFlow()">
            <img src="./../assets/add.png" alt="addTag" />
          </button>
        </div>
        <button class="removeBtn" @click="deleteMe()">
          Shit, they're onto me!
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      tag: ''
    }
  },
  computed: {
    showSettings() {
      return this.$store.state.showSettings;
    },
    allTags() {
      return this.$store.getters['filterTags'];
    },
  },
  methods: {
    removeFlow(index) {
      this.$store.dispatch('removeTagFromUser', index)
    },
    showFlow() {
      this.$store.dispatch('addTagToUser', {tags: this.tag})
    },
    checkState() {
      this.$store.dispatch("checkState");
    },
    deleteMe() {
      this.$store.dispatch("checkState");
      this.$store.dispatch("deleteUser");
    },
  },
  beforeMount() {
    this.$store.dispatch("fetchAllFlows");
  },
};
</script>

<style lang="scss">
</style>
