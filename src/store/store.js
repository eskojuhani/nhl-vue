import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import _ from 'underscore';

Vue.use(Vuex);

//import schedules_json from "./schedules.json";

//const todo_url = 'https://jsonplaceholder.typicode.com/todos'
const todo_url = 'https://nhl-data.herokuapp.com/api/table'
//const todo_url = 'http://localhost:8008/api/table'

var options = {
  "content-type": "application/json",
  "table": "NHLGame",
  "where": "[{'detailedState = ': 'Scheduled'}]"
}

export default new Vuex.Store({
  state: {
    totalTvCount: 10, // The TV inventory
    isLarryHappy: true,
    isJennyHappy: true,
    games: []
  },

  getters: {
    // Check if both Larry and Jenny are happy
    happyStaff: state => {
      return state.isLarryHappy && state.isJennyHappy
    },

  },

  mutations: {
    // Jenny
    removeTv(state, amount) {
      state.totalTvCount -= amount
    },
    games(state, data) {
      window.console.log("store.getData mutations")
      state.games = data
    }
  },

  actions: {
    // Larry
    removeTv(context, amount) {
      // If we enough TVs, ask Jenny to remove it
      if(context.state.totalTvCount >= amount) {
        // If we enough TVs, ask Jenny to remove it
        context.commit('removeTv', amount)
      }
    },
    getGames(context) {
      window.console.log("store.actions getGames called", options)

      /*options = {
          'content-type: application/json',
          'table: NHLGame',
          'where: [{"detailedState = ":"Scheduled"}]'
      }*/
      axios.get(todo_url, { 'headers' : options } )
      .then((response) => {
        context.commit('games', _.uniq(response.data, 'gamePk'))
      });
    }
  }
});
