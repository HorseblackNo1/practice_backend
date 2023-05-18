import router from "./router";

import { asyncRoutes, routes } from "./router";

import { getToken } from "@/utils/auth";

import { useUserStore } from "@/stores";

import { showToast } from "./utils/pageInteractive";

import { userLogin } from "@/api/user";

// import store from './store'

import NProgress from "nprogress";
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const hasToken = useUserStore().token;

  // document.title = "123123123"; // 设置pageTitle
  if (hasToken) {
    if (to.path == "/login") {
      next();
      NProgress.done();
    } else {
      // 判断权限
      console.log("判断权限");
      let _useUserStore = useUserStore();
      let hasRoles =
        _useUserStore.userInfo.roles && _useUserStore.userInfo.roles.length > 0;
      // console.log(router.hasRoute("Permission"))
     
      if (hasRoles) {
        next()
      } else {
        try {
          await _useUserStore.getUserInfo();
          let accessRoutes = asyncRoutes;
          for (let x of accessRoutes) {
            router.addRoute(x);
          }
          _useUserStore.makupRouters();

          // next({ ...to, replace: true });
          next({ path:to.path, replace: true })
        } catch (e) {
          showToast({ type: "error", text: `err` });
        }
      }
    }
  } else {
    if (to.path == "/login") {
      next();
      NProgress.done();
    } else {
      //   console.log("dddddddd");
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
