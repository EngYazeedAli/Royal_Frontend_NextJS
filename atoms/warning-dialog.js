import { ReactNode } from "react";
import { atom } from "recoil";

const warningDialogState = atom({
  key: "warningDialogState",
  default: {
    isOpened: false,
    title: "",
    content: "",
    onConfirm: () => {},
  },
});

export default warningDialogState;
