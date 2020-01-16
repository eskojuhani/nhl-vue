<template>
  <div>
    <div v-if="isLoading" class="game-preview">Loading games...</div>
    <div v-else>
      <div v-if="games.length === 0" class="game-preview">
        No games are here... yet.
      </div>
      <div v-for="(group, gameDate) in dayGroups" v-bind:key="gameDate">
        <h2>{{ gameDate | date }}</h2>
        <RwvGamePreview
          v-for="game in gamesSorted(group)"
          :game="game"
          :key="game.gamePk"
        />
      </div>
      <!--div>
        <RwvGamePreview
          v-for="(game, index) in games"
          :game="game"
          :key="index"
        />
      </div-->
      <VPagination :pages="pages" :currentPage.sync="currentPage" />
    </div>
  </div>
</template>

<script>
import { mapGetters /*, mapActions*/ } from 'vuex'
import _ from 'underscore'
import RwvGamePreview from "./VGamePreview";
import VPagination from "./VPagination";
import { FETCH_GAMES } from "../store/actions.type";

export default {
  name: 'GameList',
  components: {
    RwvGamePreview,
    VPagination
  },
  props: {
    itemsPerPage: {
      type: Number,
      required: false,
      default: 6
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    dayGroups() {
      return _.groupBy(this.games, 'gameDate')
    },
    listConfig() {
      const filters = {
        offset: (this.currentPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage
      };
      return {
        filters
      };
    },
    pages() {
      if (this.isLoading || this.gamesCount <= this.itemsPerPage) {
        return [];
      }
      return [
        ...Array(Math.ceil(this.gamesCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["gamesCount", "isLoading", "games"])
  },
  watch: {
    currentPage(newValue) {
      window.console.log("GameList.watch.currentPage", newValue)
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchGames();
    }
  },
  mounted() {
    window.console.log("GameList.mounted")
    this.fetchGames();
  },
  methods: {
    /*
    ...mapActions(['removeTv', 'getGames']),
    buyTv() {
      //this.$store.dispatch('removeTv', 1)
      this.removeTv(1) // Remove 1 TV
    },
    buyTwoTvs() {
      //this.$store.dispatch('removeTv', 2)
      this.removeTv(2) // Remove 1 TV
    },
    */
    fetchGames() {
      window.console.log("fetchGames")
      this.$store.dispatch(FETCH_GAMES, this.listConfig);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    },
    gamesSorted(dayGroup) {
      return _.sortBy(dayGroup, "homeTeamName")
    },
  }
}
</script>

<style scoped>
.todolist {
  list-style-type:none
}
</style>
