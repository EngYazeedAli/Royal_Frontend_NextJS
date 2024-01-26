import loadingState from "@/atoms/loading";
import Loading from "@/components/common/Loading";
import React from "react";
import { useRecoilState } from "recoil";

function useLoading() {
  const [loading, setLoading] = useRecoilState(loadingState);

  return {
    loading,
    setLoading,
    Loading: () => (loading ? <Loading /> : null),
  };
}

export default useLoading;
