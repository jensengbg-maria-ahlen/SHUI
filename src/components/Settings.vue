<template>
  <section id="settings" v-if="!isHidden">
    <img src="@/assets/top.png" alt="top-logo" @click="isHidden = !isHidden" />
    <div class="setting">
      <div class="streams">
        <h2>streams</h2>
        <div class="hashtags">
          <div class="hashtag" v-for="tag in allTags" :key="tag">
            <h5>{{ tag }}</h5>
            <div @click="removeFlow(tag)">
              <img src="./../assets/X.png" alt="removeTag" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="inputStreams">
          <input
            type="text"
            class="streamInput"
            placeholder="#add_a_tag_to_follow"
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
      isHidden: false,
      tag: "",
    };
  },
  computed: {
    allTags() {
      return this.$store.getters["filterTags"];
    },
  },
  methods: {
    removeFlow(index) {
      this.$store.dispatch("removeTagFromUser", index);
      this.$store.dispatch("fetchAllFlows");
      this.$store.dispatch("fetchUserTag");
    },
    showFlow() {
      this.$store.dispatch("addTagToUser", { tags: this.tag });
      this.$store.dispatch("fetchAllFlows");
      this.$store.dispatch("fetchUserTag");
    },
    deleteMe() {
      this.$store.dispatch("checkState");
      this.$store.dispatch("deleteUser");
    },
  },
  beforeMount() {
    this.$store.dispatch("fetchUserTag");
  },
};
</script>

<style lang="scss">
</style>
