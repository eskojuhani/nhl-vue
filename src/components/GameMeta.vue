<template>
  <div v-on:click="gameSelected(game)" class="entity-box game-meta">
    <div class="field-date">{{ game.gameDate | date }}</div>
    <div class="field-name">{{ game.homeTeamName }} </div>
    <div class="field-name">{{ 'vs' }}</div>
    <div class="field-name">{{ game.awayTeamName }}</div>
    <div v-if="homeGameInfo">
      <span>{{homeGameInfo}}</span>
    </div>
    <div v-if="awayGameInfo">
      <span>{{awayGameInfo}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "RwvGameMeta",
  components: {
  },
  props: {
    game: { type: Object, required: true },
    homeGameInfo: { type: String, required: false },
    awayGameInfo: { type: String, required: false },
    selectedGamePre: { type: Object, required: false }
  },
  computed: {
  },
  methods: {
    gameSelected: function (game) {
      window.console.log("GameMeta.selectGame called", game.homeTeamName)
      this.$emit("update:selectedGamePre", game);
    }
  }
};
</script>

<style>
.game-meta {
  height: 140px;
}
</style>
