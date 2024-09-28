import { atom } from "recoil";

export const prevPlanState = atom({
  key: "prevPlanState",
  default: [],
  dangerouslyAllowMutability: true,
});

export const prevPlanTitleState = atom({
  key: "prevPlanTitleState",
  default: "",
});

export const prevMapDisplayPlansState = atom({
  key: "prevMapDisplayPlansState",
  default: [],
});
