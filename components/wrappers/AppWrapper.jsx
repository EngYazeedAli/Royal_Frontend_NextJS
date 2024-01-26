import { Poppins } from "next/font/google";

import React from "react";
import useLoading from "@/hooks/use-loading";
import useWarningDialog from "@/hooks/use-warning-dialog";

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '700'] });

function AppWrapper({
  children,
}) {
  const { Loading } = useLoading();
  const { WarningDialog } = useWarningDialog();
  return (
    <div className={poppins.className}>
      <Loading />
      <WarningDialog />
      {children}
    </div>
  );
}

export default AppWrapper;
