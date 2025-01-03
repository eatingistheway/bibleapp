// main.js
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import VueGtag from "vue-gtag-next";
import App from "./App.vue";
import store from "./store";

// Vuetify
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#304148",
        },
      },
    },
  },
});
const app = createApp(App);

// Configure Google Analytics
app.use(VueGtag, {
  property: {
    id: "UA-177240655-5",
  },
  isEnabled: true,
  useDebugger: process.env.NODE_ENV !== "production",
});

app.use(vuetify);
app.use(store);

app.mount("#app");
