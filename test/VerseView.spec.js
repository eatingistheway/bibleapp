// test/VerseView.spec.js
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createVuetifyWrapper } from "./test-utils";
import VerseView from "../src/components/VerseView.vue";

describe("VerseView.vue", () => {
  const state = {
    buttonVisible: true,
    isChapter: true,
    sections: [
      {
        title: "Genesis 1",
        verses: [{ ref: "1:1", text: "In the beginning..." }],
      },
    ],
  };

  const mutations = {
    RELOAD_PAGE: vi.fn(),
  };

  it("renders verse content correctly", () => {
    const wrapper = createVuetifyWrapper(VerseView, {
      state,
      mutations,
    });

    expect(wrapper.text()).toContain("Genesis 1");
    expect(wrapper.text()).toContain("In the beginning...");
  });

  it("calls reloadPage when return button is clicked", async () => {
    const wrapper = createVuetifyWrapper(VerseView, {
      state,
      mutations,
    });

    await wrapper.find(".return_button").trigger("click");
    expect(mutations.RELOAD_PAGE).toHaveBeenCalled();
  });
});
