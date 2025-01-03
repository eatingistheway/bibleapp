// test/BibleBook.spec.js
import { describe, it, expect, vi } from "vitest";
import { createVuetifyWrapper } from "./test-utils";
import BibleBook from "../src/components/BibleBook.vue";

vi.mock("vue-gtag-next");

describe("BibleBook.vue", () => {
  const state = {
    mainView: true,
    books: [
      {
        name: "Genesis",
        chapters: 50,
        abbrev: "Gen",
      },
    ],
  };

  it("calls getVerses when chapter is clicked", async () => {
    const getVerses = vi.fn();

    const wrapper = createVuetifyWrapper(BibleBook, {
      state,
      actions: { getVerses },
      mutations: {
        CHAPTER_SELECTED: vi.fn(),
      },
    });

    await wrapper.find(".v-expansion-panel-title").trigger("click");
    await wrapper.vm.$nextTick();

    const firstChapterButton = wrapper.find(".chapter_card");
    await firstChapterButton.trigger("click");

    expect(getVerses).toHaveBeenCalledWith(
      expect.objectContaining({
        state: expect.any(Object),
      }),
      {
        bookName: "Genesis",
        chapterNum: 1,
      }
    );
  });
});
