import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: "/",
      component: () => import("@/components/HelloWorld")
    },
    {
      name: "NHL",
      path: "/nhl",
      component: () => import("@/components/GameList"),
      children: [
        {
          path: "nhl/:gamePk",
          name: "game",
          component: () => import("@/components/Game")
        }
      ]
    }
  ]
});
