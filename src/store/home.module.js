import { GamesService } from "@/common/api.service";
import { FETCH_GAMES } from "./actions.type";
import { FETCH_START, FETCH_GAMES_END } from "./mutations.type";
import _ from 'underscore'

const state = {
  games: [],
  isLoading: true,
  gamesCount: 0
};

const getters = {
  gamesCount(state) {
    return state.gamesCount;
  },
  games(state) {
    return state.games;
  },
  isLoading(state) {
    return state.isLoading;
  }
};

const actions = {
  [FETCH_GAMES]({ commit }, params) {
    commit(FETCH_START);
    return GamesService.get(params.filters)
      .then(({ data }) => {
        commit(FETCH_GAMES_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_GAMES_END](state, data) {
    state.games = _.uniq(data, "gamePk");
    state.gamesCount = state.games.length;
    state.isLoading = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
