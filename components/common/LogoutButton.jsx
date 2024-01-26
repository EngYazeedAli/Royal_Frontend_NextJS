

import { PowerOff } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

function LogoutButton() {
  const router = useRouter();

  const onLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    sessionStorage.removeItem("session");
    router.push("/");
    router.reload();
  };
  return (
    <div className="logout-button" onClick={onLogout}>
      <PowerOff size={20} />
      Logout
    </div>
  );
}

export default LogoutButton;
