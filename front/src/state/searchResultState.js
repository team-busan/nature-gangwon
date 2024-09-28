import { atom } from "recoil";

export const searchResultListState = atom({
  key: "searchResultListState",
  default: [],
});

export const searchResultTypeState = atom({
  key: "searchResultTypeState",
  default: "",
});

export const searchResultSigunguCodeState = atom({
  key: "searchResultSigunguCodeState",
  default: "",
});

export const searchResultDisplayNumState = atom({
  key: "searchResultDisplayNumState",
  default: 50,
});

export const searchResultPageState = atom({
  key: "searchResultPageState",
  default: 1,
});
