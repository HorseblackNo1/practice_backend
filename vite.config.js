import { defineConfig,loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";


// https://vitejs.dev/config/
export default defineConfig(({mode,command}) => {
  const env = loadEnv(mode, process.cwd());
  console.log("env=>",env)
  return {
    define: {
      __APP_ENV__: env.APP_ENV
    },
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"), //路径别名
      },
    },
    // css:{
    //   /* CSS 预处理器 */
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@import "src/styles/variables.scss";`
    //     }
    //   }
    // },
    server: {
      host: "127.0.0.1",
      port: 8080,
      open: true,
    },
  };
});
