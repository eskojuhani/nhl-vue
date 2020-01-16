<template>
  <div class="game-meta">
    <div class="info">
      {{ game.homeTeamName + " vs " +  game.awayTeamName }}
    </div>
  </div>
</template>

<script>

export default {
  name: "RwvGameMeta",
  components: {
  },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  computed: {
  },
  methods: {
  }
};
</script>
