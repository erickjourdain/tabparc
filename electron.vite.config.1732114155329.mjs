// electron.vite.config.ts
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { resolve } from "path";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@main": resolve("src/main"),
        "@controller": resolve("src/main/database/controller"),
        "@entity": resolve("src/main/database/entity"),
        "@apptypes": resolve("src/preload/types")
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@main": resolve("src/main")
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@apptypes": resolve("src/preload/types")
      }
      /*[
        {
          find: '@renderer',
          replacement: fileURLToPath(new URL('./src/renderer/src', import.meta.url))
        },
        {
          find: '@preload',
          replacement: fileURLToPath(new URL('./src/preload', import.meta.url))
        }
      ]
      */
    },
    plugins: [
      TanStackRouterVite({
        routesDirectory: resolve("src/renderer/src/routes"),
        quoteStyle: "single"
      }),
      react()
    ]
  }
});
export {
  electron_vite_config_default as default
};
