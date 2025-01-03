// vitest.config.js
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    deps: {
      inline: [/vuetify/],
    },
    coverage: {
      reporter: ["text", "json", "html"],
    },
    root: ".",
  },
});
