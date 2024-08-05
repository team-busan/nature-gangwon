import { atom } from "recoil"; // 리액트 트리 전체에서 공유할 수 있는 상태 관리임

export const userState = atom({
  key: "userState", // 고유한 식별자
  default: null, // 초기 상태 값
});