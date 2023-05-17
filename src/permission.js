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

  document.title = "123123123";
  if (hasToken) {
    if (to.path == "/login") {
      next();
      NProgress.done();
    } else {
      // 判断权限
      console.log("判断权限");
      let _useUserStore = useUserStore();
      console.log(_useUserStore.userInfo);
      let hasRoles =
        _useUserStore.userInfo.roles && _useUserStore.userInfo.roles.length > 0;
      // hasRoles = ''
      console.log("hasRoles=>", hasRoles);
      if (hasRoles) {
        next();
      } else {
        // next()
        // console.log("asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfadf")

        try {
          await _useUserStore.getUserInfo();
          console.log("asyncRoutes=>", asyncRoutes);
          let accessRoutes = asyncRoutes;
          for (let x of accessRoutes) {
            console.log("x=>", x);
            router.addRoute(x);
          }
          _useUserStore.makupRouters();
          //   let obj = {
          //     path: "page",
          //     component: () => import("@/views/permission/page"),
          //     name: "PagePermission",
          //     meta: {
          //       title: "Page Permission",
          //       roles: ["admin"], // or you can only set roles in sub nav
          //     },
          //   };
          //   router.addRoute('home',obj)
          return next({ ...to, replace: true });
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
