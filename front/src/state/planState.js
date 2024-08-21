import { atom } from "recoil";

export const planList = atom({
  key: "planList",
  default: [],
  dangerouslyAllowMutability: true,
});
