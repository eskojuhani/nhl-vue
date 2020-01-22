<template>
  <div>
    <div class="entity-section entity-section-light">
      <div class="container">
        <div class="row row-centered">
          <div class="column-header">
            <span v-on:click="selectDate(-1)"><i class="fa fa-hand-o-left"></i></span>
              {{ selectedDate | date }}
            <span v-on:click="selectDate(1)"><i class="fa fa-hand-o-right"></i></span>
          </div>
        </div>
        <div class="row row-centered">
          <div class="col-md-12">
            <!--div v-if="isLoading" class="game-preview">Loading games...</div-->
            <RwvGamePreview
              v-for="game in games"
              :game="game"
              :homeGameInfo="game.homeGameInfo"
              :awayGameInfo="game.awayGameInfo"
              :key="game.gamePk"
              :selectedGame.sync="selectedGame"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedGame" class="entity-section entity-section-dark">
      <div class="container">
        <div class="row row-centered canvas-container">
            <GraphCanvas :gamekey="selectedGame.gamePk" :game="selectedGame" :home="homePerformance" :away="awayPerformance"></GraphCanvas>
        </div>
      </div>
    </div>
    <div v-if="gameEvents" class="entity-section entity-section-light">
      <div class="container">
        <div class="row row-centered">
          <div class="col-md-12">
            <div v-for="item in gameEvents" class="event-box" :key="item.id">
              <span>{{ item.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="entity-section entity-section-light">
      <div v-if="selectedGame" class="container">
        <div class="row row-centered">
          <div class="column-header">
              Performances
          </div>
        </div>
        <div class="row row-centered">
          <div class="col-md-6">
            <div>{{ selectedGame.homeTeamName }}</div>
          </div>
          <div class="col-md-6">
            <div>{{ selectedGame.awayTeamName }}</div>
          </div>
        </div>
        <div class="row row-centered">
          <div class="col-md-6">
            <GamePerformance :performance="homePerformance"></GamePerformance>
          </div>
          <div class="col-md-6">
            <GamePerformance :performance="awayPerformance"></GamePerformance>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Vue from 'vue'
import { mapGetters /*, mapActions*/ } from 'vuex'
import _ from 'underscore'
import RwvGamePreview from "./VGamePreview";
import GraphCanvas from "./GraphCanvas";
import GamePerformance from "./GamePerformance";

import {
  FETCH_GAMES, FETCH_HOME_PERFORMANCE,
  FETCH_AWAY_PERFORMANCE, FETCH_GAME_EVENTS
} from "../store/actions.type";
import {
  SET_GAME_EVENTS
} from "../store/mutations.type";

export default {
  name: 'GameList',
  components: {
    RwvGamePreview,
    GraphCanvas,
    GamePerformance
    //,VPagination
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
      currentPage: 1,
      selectedDate: new Date(),
      selectedGame: null,
      homeGameInfo: "",
      awayGameInfo: ""
    };
  },
  computed: {
    dayGroups() {
      return _.groupBy(this.games, 'gameDate')
    },
    listConfig() {
      const filters = {
        offset: (this.currentPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage,
        selectedDate : new Date()
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
    ...mapGetters(["gamesCount", "isLoading", "games", "homePerformance", "awayPerformance", "gameEvents"])
  },
  watch: {
    /*selectedDate(newValue) {
      window.console.log("GameList.watch.selectedDate", newValue)
      //this.fetchGames()
    },*/
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchGames();
    },
    selectedGame(newValue) {
      if (!newValue) {
        this.$store.commit(SET_GAME_EVENTS, null)
        return
      }
      this.fetchHomePerformance(newValue);
      this.fetchAwayPerformance(newValue);
      this.fetchGameEvents(newValue);
      this.selectedGame = Object.assign(newValue, {homeGameInfo: "", awayGameInfo: ""})
      //game.homeGameInfo = "";
      //game.awayGameInfo = "";
    },
    homePerformance(newValue) {
      this.updateHomeInfo(newValue)
    },
    awayPerformance(newValue) {
      this.updateAwayInfo(newValue)
    },
    /*
    gameEvents(newValue) {
      //window.console.log("gameEvents newValue:", newValue)
      //this.updateCanvas()
    }*/
  },
  mounted() {
    this.fetchGames();
  },
  methods: {
    selectDate(change) {
      this.listConfig.filters.selectedDate.setDate(this.listConfig.filters.selectedDate.getDate() + change)
      this.selectedDate = this.listConfig.filters.selectedDate
      //window.console.log("after", this.selectedDate, this.listConfig.filters.selectedDate)
      this.fetchGames()
    },
    fetchGames() {
      this.reset()
      this.$store.dispatch(FETCH_GAMES, this.listConfig);
    },

    reset() {
      this.selectedGame = null
    },

    fetchHomePerformance(game) {
      if (game) {
        var metadata = {"table": "vPerformanceMA",
          "where": JSON.stringify([{"team = ": game.homeTeamName}, {"gameDate < ": this.selectedDate}]),
          "order": "row_num desc"};

        this.$store.dispatch(FETCH_HOME_PERFORMANCE, metadata);
      }
    },
    fetchAwayPerformance(game) {
      if (game) {
        var metadata = {"table": "vPerformanceMA",
          "where": JSON.stringify([{"team = ": game.awayTeamName}, {"gameDate < ": this.selectedDate}]),
          "order": "row_num desc"};

        this.$store.dispatch(FETCH_AWAY_PERFORMANCE, metadata);
      }
    },
    fetchGameEvents(game) {
      if (game) {
        var metadata = {"table": "vGameEventsNHL",
          "where": JSON.stringify([{"gamePk = ": game.gamePk}])
        };

        this.$store.dispatch(FETCH_GAME_EVENTS, metadata);
      }
     },
     daysBetween(date1, date2) {
      var from = new Date(date1);
      var to = new Date(date2);
      var timeDiff = Math.abs(from.getTime() - to.getTime());
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    },
    updateHomeInfo: function (newValue) {
      if (this.selectedGame && newValue && newValue.length > 1) {
         var preGame = newValue[0];
         var days = this.daysBetween(this.selectedGame.gameDate, preGame.gameDate);

         if (days > 0) {
           var gameInfo = "H: " + preGame.location + (days-1) + preGame.outcome + ' ' + preGame.finalScore;
           this.selectedGame.homeGameInfo = gameInfo
           window.console.log("gameInfo:", gameInfo)
         }
       }
    },
    updateAwayInfo: function (newValue) {
      if (this.selectedGame && newValue && newValue.length > 1) {
         var preGame = newValue[0];
         var days = this.daysBetween(this.selectedGame.gameDate, preGame.gameDate);

         if (days > 0) {
           var gameInfo = "A: " + preGame.location + (days-1) + preGame.outcome + ' ' + preGame.finalScore;
           this.selectedGame.awayGameInfo = gameInfo
           window.console.log("gameInfo:", gameInfo)
         }
       }
    }
  }
}
</script>

<style>
.todolist {
  list-style-type:none
}
.canvas-container {
  display: block;
}
canvas {
  border: 1px solid #000;
}
</style>
