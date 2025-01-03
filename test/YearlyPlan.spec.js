// test/YearlyPlan.spec.js
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createVuetifyWrapper } from "./test-utils";
import YearlyPlan from "../src/components/YearlyPlan.vue";

vi.mock("vue-gtag-next");

describe("YearlyPlan.vue", () => {
  const state = {
    mainView: true,
    plan: {
      "01/01/2024": ["Genesis 1:1-10", "Exodus 1:1-10"],
    },
  };

  const actions = {
    getVerseList: vi.fn(),
  };

  const mutations = {
    PLAN_SELECTED: vi.fn(),
    SET_TODAYSREADING: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders reading plan entries", async () => {
    const wrapper = createVuetifyWrapper(YearlyPlan, {
      state,
      actions,
      mutations,
    });

    await wrapper.vm.$nextTick();
    const readings = wrapper.findAll(".row");
    expect(readings.length).toBeGreaterThan(0);
  });

  it("displays correct date format", async () => {
    const wrapper = createVuetifyWrapper(YearlyPlan, {
      state,
      actions,
      mutations,
    });

    await wrapper.vm.$nextTick();
    const dateHeader = wrapper.find(".date-header");
    expect(dateHeader.text()).toBe("January");
  });

  it("calls getVerseList when day is clicked", async () => {
    const wrapper = createVuetifyWrapper(YearlyPlan, {
      state,
      actions,
      mutations,
    });

    await wrapper.vm.$nextTick();
    await wrapper.find(".row").trigger("click");

    expect(actions.getVerseList).toHaveBeenCalled();
  });
});
