import React from "react";
import styles from "@/styles/admin/id.module.css";
import LogoutButton from "@/components/common/LogoutButton";
import { Settings } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import AdminIdScreen from "@/components/screens/admin/admin-id-screen";

function _({ id }) {
  return (
    <div className={styles.main}>
    <br />
    <br />
      <h1>
        <span>
          <Settings size={38} />
        </span>
        Admin
      </h1>
      <br />
      <AdminIdScreen id={id} />
      <LogoutButton />
      <BackButton />
    </div>
  );
}

export default _;

export const getServerSideProps = async (ctx) => {
    try {
        const token = ctx.req.cookies.token;
        const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/validate-token",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        }
        );
        const data = await res.json();
        if (data.error) {
            return {
                redirect: {
                destination: "/",
                permanent: false,
                },
            };
        }

        if (data.role !== "admin") {
            return {
                redirect: {
                destination: "/",
                permanent: false,
                },
            };
        }
    }
    catch (error) {
        return {
            redirect: {
            destination: "/",
            permanent: false,
            },
        };
    }

    return {
        props: {
            id: ctx.query.id,
        },
    };
}