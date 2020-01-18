import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";
import { default as format } from "date-fns/format";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = '123'; //`Token ${JwtService.getToken()}`;
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, config) {
    return Vue.axios.get(resource, config)
      .catch(error => {
        throw new Error(`[RWV] ApiService ${error}`);
      });
  },

  /*
  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
  */
  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const GamesService = {
  query(type, params) {
    return ApiService.query("games" + (type === "feed" ? "/feed" : ""), {
      params: params
    });
  },
  get(params) {
    var gameDate = format(new Date(params.selectedDate), "yyyy-MM-dd")
    var headers = {
      "content-type": "application/json",
      "table": "NHLGame",
      "where": JSON.stringify([{"gameDate = ": gameDate }]),
      "order": "gamePk",
    }
    return ApiService.get("table", { headers: headers})
      .then((data) => {
        return data
      });
  },
  fetch(headers) {
    return ApiService.get("table", { headers: headers})
      .then((data) => {
        return data
      });
  },
  /*
  get(slug) {
    return ApiService.get("games", slug);
  },
  */
  create(params) {
    return ApiService.post("games", { game: params });
  },
  update(slug, params) {
    return ApiService.update("games", slug, { game: params });
  },
  destroy(slug) {
    return ApiService.delete(`games/${slug}`);
  }
};
