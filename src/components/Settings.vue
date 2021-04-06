<template>
  <section id="settings">
    <img src="@/assets/top.png" alt="top-logo" @click="checkState" />
    <div class="setting">
      <div class="streams">
        <h2>streams</h2>
        <div class="hashtags" v-for="flow in allFlows" :key="flow.id">
          <div class="hashtag" v-for="tag in flow.tags" :key="tag.index">
            <h5>{{ tag }}</h5>
            <img src="./../assets/X.png" alt="removeTag" />
          </div>
        </div>
      </div>
      <div>
        <div class="inputStreams">
          <input
            type="text"
            class="streamInput"
            placeholder="#smooth_criminal"
          />
          <button class="addBtn">
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
  computed: {
    showSettings() {
      return this.$store.state.showSettings;
    },
    allFlows() {
      return this.$store.state.allFlows;
    },
  },
  methods: {
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
