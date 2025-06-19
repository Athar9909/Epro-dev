import { atom } from "recoil";

export const userSelectProfile = atom({
  key: "userSelectProfile",
  default: "",
});

export const userIdentityVerify = atom({
  key: "userIdentityVerify",
  default: "",
});
export const userTypeState = atom({
  key: "userTypeState",
  default: "buyer", // or 'vendor'
});
