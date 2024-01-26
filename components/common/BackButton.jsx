

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

function BackButton() {
  const router = useRouter();
  return (
    <div className="back-button" onClick={() => router.back()}>
      <ArrowLeft size={24} />
    </div>
  );
}

export default BackButton;
