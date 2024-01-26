import warningDialogState from "@/atoms/warning-dialog";
import WarningDialog from "@/components/common/WarningDialog";
import React from "react";
import { useRecoilState } from "recoil";

function useWarningDialog() {
  const [props, setProps] = useRecoilState(warningDialogState);

  return {
    ...props,
    setProps,
    openWarningDialog: ({
      title,
      content,
      onConfirm,
      onCancel,
      withCancel,
      confirmLabel,
    }) => {
      setProps({
        isOpened: true,
        title: title ?? "Warning",
        content: content ?? "Are you sure?",
        onConfirm:
          onConfirm ??
          (() =>
            setProps({
              isOpened: false,
              title: "",
              content: "",
              onConfirm: () => {},
              onCancel: undefined,
              confirmLabel: "",
              withCancel: false,
            })),
        onCancel:
          onCancel ??
          (() =>
            setProps({
              isOpened: false,
              title: "",
              content: "",
              onConfirm: () => {},
              onCancel: undefined,
              confirmLabel: "",
              withCancel: false,
            })),
        confirmLabel: confirmLabel,
        withCancel: withCancel ?? false,
      });
    },
    closeWarningDialog: () =>
      setProps({
        isOpened: false,
        title: "",
        content: "",
        onConfirm: () => {},
        onCancel: undefined,
        confirmLabel: "",
        withCancel: false,
      }),
    WarningDialog: () => <WarningDialog {...props} />,
  };
}

export default useWarningDialog;
