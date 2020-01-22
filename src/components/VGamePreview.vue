<template>
    <RwvGameMeta isPreview
    :key="game.gamePk"
    :game="game"
    :homeGameInfo="homeGameInfo"
    :awayGameInfo="awayGameInfo"
    :selectedGamePre.sync="selectedGamePre"
    />
</template>

<script>
import RwvGameMeta from "./GameMeta";

export default {
  name: "RwvGamePreview",
  components: {
    RwvGameMeta
  },
  data() {
    return {
      selectedGamePre: null
    };
  },
  props: {
    game: { type: Object, required: true },
    homeGameInfo: { type: String, required: false },
    awayGameInfo: { type: String, required: false },
    selectedGame: { type: Object, required: false }
  },
  computed: {
  },
  watch: {
    selectedGamePre(newValue) {
      window.console.log("RwvGamePreview.watch selectedGamePre:", newValue.homeTeamName);
      this.$emit("update:selectedGame", newValue);
    },
    homeGameInfo(newValue) {
      window.console.log("RwvGamePreview.watch homeGameInfo:", newValue);
    }
  }
};
</script>
