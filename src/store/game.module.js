import Vue from "vue";
import { GamesService } from "@/common/api.service";
import { FETCH_GAME, FETCH_HOME_PERFORMANCE, FETCH_AWAY_PERFORMANCE,
  FETCH_GAME_EVENTS, GAME_RESET_STATE } from "./actions.type";
import { RESET_STATE, SET_HOME_PERFORMANCE, SET_AWAY_PERFORMANCE,
  SET_GAME_EVENTS, SET_GAME  } from "./mutations.type";

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
    awayCumulativePoints : 0,
    homeGameInfo: "",
    awayGameInfo: ""
  },
  home_performance: null,
  away_performance: null,
  game_events: null
};

export const state = { ...initialState };

const getters = {
  game(state) {
    return state.game;
  },
  homePerformance(state) {
    return state.home_performance;
  },
  awayPerformance(state) {
    return state.away_performance;
  },
  gameEvents(state) {
    return state.game_events;
  }
};


export const actions = {
  async [FETCH_GAME](context, gamePk, prevGame) {
    // avoid extronuous network call if game exists
    if (prevGame !== undefined) {
      return context.commit(SET_GAME, prevGame);
    }
    const { data } = await GamesService.get(gamePk);
    context.commit(SET_GAME, data.game);
    return data;
  },
  async [FETCH_HOME_PERFORMANCE](context, metadata) {
    const { data } = await GamesService.fetch(metadata);
    context.commit(SET_HOME_PERFORMANCE, data);
    return data;
  },
  async [FETCH_AWAY_PERFORMANCE](context, metadata) {
    const { data } = await GamesService.fetch(metadata);
    context.commit(SET_AWAY_PERFORMANCE, data);
    return data;
  },
  async [FETCH_GAME_EVENTS](context, metadata) {
    const { data } = await GamesService.fetch(metadata);
    context.commit(SET_GAME_EVENTS, data);
    return data;
  },
  [GAME_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_GAME](state, data) {
    state.game = data;
  },
  [SET_HOME_PERFORMANCE](state, data) {
    state.home_performance = data;
  },
  [SET_AWAY_PERFORMANCE](state, data) {
    state.away_performance = data;
  },
  [SET_GAME_EVENTS](state, data) {
    state.game_events = data;
  },
  [RESET_STATE]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
