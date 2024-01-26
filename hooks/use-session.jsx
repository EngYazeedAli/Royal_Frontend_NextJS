import React from "react";

function useSession() {
  return {
    session:
      typeof window !== "undefined"
        ? (JSON.parse(sessionStorage.getItem("session") || "{}"))
        : null,
    setSession: (session) => {
      if (session) {
        sessionStorage.setItem("session", JSON.stringify(session));
      } else {
        sessionStorage.removeItem("session");
      }
    },
    removeSession: () => {
      sessionStorage.removeItem("session");
    },
  };
}

export default useSession;
