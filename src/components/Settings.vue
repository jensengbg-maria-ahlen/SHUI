<template>
  <section id="settings">
    <img src="@/assets/top.png" alt="top-logo" @click="checkState" />
    <div class="setting">
      <div class="streams">
        <h2>streams</h2>
        <div class="hashtags">
          <h5></h5>
          <img src="./../assets/X.png" alt="removeTag" />
        </div>
      </div>
      <div>
        <div class="inputStreams">
          <input type="text" class="streamInput" placeholder="#smooth_criminal"/>
          <button class="addBtn"><img src="./../assets/add.png" alt="addTag"></button>
        </div>
        <button class="removeBtn" @click="deleteMe()">Shit, they're onto me!</button>
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
  },
  methods: {
    checkState() {
      this.$store.dispatch("checkState");
    },
    deleteMe() {
      this.$store.dispatch('checkState')
      this.$store.dispatch("deleteUser");
    }
  },
};
</script>

<style lang="scss">
</style>
