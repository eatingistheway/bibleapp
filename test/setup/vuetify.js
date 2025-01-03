// test/setup/vuetify.js
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Create a single Vuetify instance to be used across all tests
export const vuetify = createVuetify({
  components,
  directives,
});
