import Vue from "vue";
import { GamesService } from "@/common/api.service";
import { FETCH_GAME, GAME_RESET_STATE } from "./actions.type";
import { RESET_STATE, SET_GAME } from "./mutations.type";

const initialState = {
  game: {
    gameDate : "",
    gamePk : 0,
    detailedState : "",
    overtime : 0,
    homeTeamName : "",
    homeTeamScore : 0,
    awayTeamName : "",
    awayTeamScore : 0,
    homePerformancePercentage : 0,
    awayPerformancePercentage : 0,
    homeCumulativePoints : 0,
    awayCumulativePoints : 0
  }
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_GAME](context, gamePk, prevGame) {
    window.console.log("game.module actions.FETCH_GAME", gamePk)
    // avoid extronuous network call if game exists
    if (prevGame !== undefined) {
      return context.commit(SET_GAME, prevGame);
    }
    const { data } = await GamesService.get(gamePk);
    context.commit(SET_GAME, data.game);
    return data;
  },
  [GAME_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_GAME](state, game) {
    state.game = game;
  },
  [RESET_STATE]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

const getters = {
  game(state) {
    return state.game;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
