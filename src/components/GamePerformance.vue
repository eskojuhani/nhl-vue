<template>
  <div v-if="performance" class="entity-list">
    <div v-for="(item, index) in performance" v-bind:key="index" class="entity-box game-performance">
      <div>{{ item.gameDate }}</div>
      <div>{{ item.location }}</div>
      <div>{{ item.performance }}</div>
      <div>{{ item.gameMovingAvg3 }}</div>
      <div>{{ item.gameMovingAvg10 }}</div>
      <div>{{ item.outcome }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GamePerformance',
  props: {
    performance: { type: Array, required: false }
  }
}
</script>

<style>
.game-performance {
  height: 100%;
}
</style>
