<template>
  <div>
    <div class="game">
      {{ game }}
    </div>
  </div>
</template>

<script>
//import { mapState, mapGetters, mapActions } from 'vuex'
import store from "@/store";
import { FETCH_GAME } from "@/store/actions.type";

export default {
  mounted() {
  },
  name: 'Game',
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_GAME, to.params.gamePk),
    ]).then(() => {
      next();
    });
  }
}
</script>

<style scoped>
</style>
