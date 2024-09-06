import { atom } from "recoil";

export const planList = atom({
  key: "planList",
  default: [],
  dangerouslyAllowMutability: true,
});

export const planTitleState = atom({
  key: "planTitle",
  default: "",
});

export const planPhotoAccordianState = atom({
  key: "planPhotoAccordian",
  default: 0,
});

export const planPhotoAccordianItemState = atom({
  key: "planPhotoAccordianItem",
  default: 0,
});

export const mapDisplayPlansState = atom({
  key: "mapDisplayPlans",
  default: [],
  dangerouslyAllowMutability: true,
});
