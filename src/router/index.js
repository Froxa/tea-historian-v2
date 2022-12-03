import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        getAuth(),
        (user) => {
          unsubscribe();
          resolve(user);
        },
        reject
      );
    });
  };

  Router.beforeEach(async (to, from, next) => {
    // check if user needs to be logged in
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // user does need to be logged in

      if (await getCurrentUser()) {
        // user is logged in - OK
        next();
      } else {
        // user isnt logged in - REDIRECT TO "/login"
        next("/login/");
      }
    } else {
      // user doesnt need to be logged in

      if (to.name == "login" && (await getCurrentUser())) {
        // route is "login" and user is logged in - REDIRECT TO "/"
        next("/");
      } else {
        // continue normally
        next();
      }
    }
  });

  return Router;
});
