import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import useLoading from "@/hooks/use-loading";
import { useRouter } from "next/router";
import React from "react";
import useWarningDialog from "@/hooks/use-warning-dialog";
import { useMutation } from "@tanstack/react-query";
import useSession from "@/hooks/use-session";
import style from "@/styles/index.module.css";
import EmployeeTab from "@/components/login/EmployeeTab";
import AdminTab from "@/components/login/AdminTab";

export default function _() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [tab, setTab] = React.useState("user");

  const { setLoading } = useLoading();
  const { session, setSession } = useSession();
  const router = useRouter();
  const { openWarningDialog, closeWarningDialog } = useWarningDialog();

  const {
    mutateAsync: login,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      const res = await fetch(process.env.SERVER_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      return res.json();
    },
  });

  const onAdminSubmit = React.useCallback(async () => {
    if (!email || !password) {
      openWarningDialog({
        title: "Warning",
        content: "Please enter email and password",
      });
      return;
    }
    setLoading(true);
    const data = await login();
    if (error || data?.detail) {
      openWarningDialog({
        title: "Warning",
        content: error?.detail || data?.detail,
      });
      setLoading(false);
      return;
    }
    if (!data?.token) {
      console.log({ data });
      openWarningDialog({
        title: "Warning",
        content: "Login failed",
      });
      setLoading(false);
      return;
    }
    if (data?.role !== "admin") {
      openWarningDialog({
        title: "Warning",
        content: "You are not admin",
      });
      setLoading(false);
      return;
    }
    document.cookie = `token=${data.token}`;
    setSession({
      token: data.token,
      role: data.role,
      id: data.user_info?._id,
    });
    setLoading(false);
    router.push("/admin/" + data.user_info?._id);
    return;
  }, [
    email,
    password,
    error,
    login,
    openWarningDialog,
    setLoading,
    setSession,
    router,
  ]);

  const onEmployeeSubmit = React.useCallback(async () => {
    if (!email || !password) {
      openWarningDialog({
        title: "Warning",
        content: "Please enter email and password",
      });
      return;
    }
    setLoading(true);
    const data = await login();
    if (error || data?.detail) {
      openWarningDialog({
        title: "Warning",
        content: error?.detail || data?.detail,
      });
      setLoading(false);
      return;
    }
    if (!data?.token) {
      console.log({ data });
      openWarningDialog({
        title: "Warning",
        content: "Login failed",
      });
      setLoading(false);
      return;
    }
    if (data?.role !== "user") {
      openWarningDialog({
        title: "Warning",
        content: "You are not user",
      });
      setLoading(false);
      return;
    }
    document.cookie = `token=${data.token}; path=/;`;
    setSession({
      token: data.token,
      role: data.role,
      id: data.user_info?._id,
    });
    setLoading(false);
    return router.push("/user/" + data.user_info?._id);
  }, [
    email,
    password,
    error,
    login,
    openWarningDialog,
    setLoading,
    setSession,
    router,
  ]);

  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Enter") {
        if (tab === "admin") {
          onAdminSubmit();
        } else {
          onEmployeeSubmit();
        }
      }
    };
    addEventListener("keydown", onKeyDown);

    return () => {
      removeEventListener("keydown", onKeyDown);
    };
  }, [tab, onAdminSubmit, onEmployeeSubmit]);

  const checkSession = React.useCallback(async () => {
    setLoading(true);
    // get token from cookies and validate it
    if (session?.token && session?.role && session?.id) {
      try {
        const token = session?.token;

        const res = await fetch(
          process.env.SERVER_URL + "/validate-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );
        const data = await res.json();
        if (!data.error && data.role && data.user_id) {
          setLoading(false);
          if (data.role === "admin") {
            return router.push("/admin/" + data.user_id);
          } else if (data.role === "user") {
            return router.push("/user/" + data.user_id);
          }
        }
      } catch (error) {
        setLoading(false);
      }
    }
    setLoading(false);
  }, [session, setLoading, router]);

  React.useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  React.useEffect(() => {
    checkSession();
  }, []);

  return (
    <main className={style.main}>
      <h1
        style={{
          fontSize: "30px",
        }}
      >
        Attendance Management System
      </h1>
      <br />
      <section>
        <br />
        {tab === "admin" ? (
          <AdminTab
            // submitBtnRef={submitBtnRef}
            onAdminSubmit={onAdminSubmit}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        ) : (
          <EmployeeTab
            // submitBtnRef={submitBtnRef}
            onEmployeeSubmit={onEmployeeSubmit}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        )}
        <p style={{
          width: '100%',
          textAlign: 'start',
          marginTop: '10px',
        }}>Enter your email and password to login.</p>
        <p style={{
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
          onClick={() => {
            if (tab === "admin") {
              setTab("user");
            } else {
              setTab("admin");
            }
          }}
        >
          Sign in as an {tab === "admin" ? "user" : "admin"}{" "}
        </p>
      </section>
    </main>
  );
}
