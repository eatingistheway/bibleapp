// test/test-utils.js
import { mount } from "@vue/test-utils";
import { vuetify } from "./setup/vuetify";
import { createStore } from "vuex";

// Create a simple transition stub
const transitionStub = {
  name: "v-fade-transition",
  template: "<div><slot></slot></div>",
};

export function createVuetifyWrapper(component, options = {}) {
  const store = createStore({
    state: options.state || {},
    mutations: options.mutations || {},
    actions: options.actions || {},
    getters: options.getters || {},
  });

  return mount(component, {
    global: {
      plugins: [[store]],
      stubs: {
        transition: false,
        "v-fade-transition": transitionStub,
        "v-expand-transition": false,
      },
    },
    vuetify, // Use the single vuetify instance
    ...options,
  });
}
