import { atom } from "recoil";

export const planList = atom({
  key: "planList",
  default: [],
  dangerouslyAllowMutability: true,
});

export const isWritingCommentState = atom({
  key: 'isWritingCommentState',
  default: false,
});

export const commentContents = atom({
  key : 'commentContent',
  default : "",
})

export const score = atom({
  key : 'rating',
  default : 0,
})

export const commentEdit = atom({
  key : 'edit',
  default : false,
})