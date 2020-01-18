<template>
  <div v-on:click="gameSelected(game)" class="entity-box">
    <div class="field-date">{{ game.gameDate | date }}</div>
    <div class="field-name">{{ game.homeTeamName }} </div>
    <div class="field-name">{{ 'vs' }}</div>
    <div class="field-name">{{ game.awayTeamName }}</div>
    <div v-if="game.homeGameInfo">
      <span>{{game.homeGameInfo}}</span>
    </div>
    <div v-if="game.awayGameInfo">
      <span>{{game.awayGameInfo}}</span>
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
    selectedGamePre: { type: Object, required: false }
  },
  computed: {
  },
  methods: {
    gameSelected: function (game) {
      window.console.log("selectGame called", game.homeTeamName)
      this.$emit("update:selectedGamePre", game);
    }
  }
};
</script>
