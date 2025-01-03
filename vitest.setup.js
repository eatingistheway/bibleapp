// vitest.setup.js
import { config } from "@vue/test-utils";
import { vuetify } from "./test/setup/vuetify";
import { vi } from "vitest";

// Mock window.scrollTo
window.scrollTo = vi.fn();

// Global test configuration
config.global.plugins = [[vuetify]];
config.global.mocks = {
  $vuetify: vuetify,
};

// Stub out transitions globally
config.global.stubs = {
  transition: false,
  "v-fade-transition": false,
  "v-expand-transition": false,
};
