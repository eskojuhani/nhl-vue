<template>
  <div class="game-preview">
    <RwvGameMeta isPreview :game="game" />
      <p/>
  </div>
</template>

<script>
import RwvGameMeta from "./GameMeta";

export default {
  name: "RwvGamePreview",
  components: {
    RwvGameMeta
  },
  props: {
    game: { type: Object, required: true }
  },
  computed: {
  }
};
</script>
