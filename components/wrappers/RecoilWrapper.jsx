

import { RecoilRoot } from "recoil";

export default function RecoilWrapper({
  children,
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
