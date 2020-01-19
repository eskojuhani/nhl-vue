<template>
    <RwvGameMeta isPreview
    :game="game"
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
    selectedGame: { type: Object, required: false }
  },
  computed: {
  },
  watch: {
    selectedGamePre(newValue) {
      window.console.log("RwvGamePreview.watch selectedGamePre:", newValue.homeTeamName);
      this.$emit("update:selectedGame", newValue);
    }
  }
};
</script>
