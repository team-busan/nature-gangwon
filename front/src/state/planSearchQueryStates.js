import { atom } from "recoil";

export const searchQueryState = atom({
  key: "searchQueryState",
  default: "",
});

export const contentTypeState = atom({
  key: "contentTypeState",
  default: "",
});

export const sigunguCodeState = atom({
  key: "sigunguCodeState",
  default: "",
});

export const pageState = atom({
  key: "pageState",
  default: 1,
});

export const isScrollState = atom({
  key: "isScrollState",
  default: false,
});
