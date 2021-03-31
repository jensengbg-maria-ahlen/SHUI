<template>
  <div class="whatsHappening">
      <div class="comment">
        <div>
          <span class="date"> {{flow.date}}</span>
          <p class="whatsGoingOn"> {{flow.info}} </p>
        </div>
        <h6 class="author">- {{flow.username}}</h6>
      </div>
      <div class="tags">
        <h4 v-for="tag in flow.tags" :key="tag.index">{{tag}}</h4>
      </div>
  </div>
</template>

<script>
export default {
    name: 'FlowMsg',
    props: {
      flow: Object
    }
}
</script>

<style>

</style>