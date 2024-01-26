import React from "react";
import styles from "@/styles/admin/id.module.css";
import LogoutButton from "@/components/common/LogoutButton";
import { List } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import AdminViewEmployeesScreen from "@/components/screens/admin/admin-view-employees-screen";

function _({ id }) {
  return (
    <main className={styles.main}>
    <br />
    <br />
      <h1>
        <span>
          <List size={38} />
        </span>
        Employees List
      </h1>
      <br />
      <AdminViewEmployeesScreen id={id} />
      <LogoutButton />
      <BackButton />
    </main>
  );
}

export default _;

export const getServerSideProps = async (ctx) => {
    try {
        const token = ctx.req.cookies.token;
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