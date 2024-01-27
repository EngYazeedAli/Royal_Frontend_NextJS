import BackButton from "@/components/common/BackButton";
import LogoutButton from "@/components/common/LogoutButton";
import EmployeeIdScreen from "@/components/screens/user/employee-id-screen";
import React from "react";

function _({id}) {
  return (
    <>
    <br />
    <br />
      <EmployeeIdScreen id={id} />
      <LogoutButton />
      <BackButton />
    </>
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

        if (data.role !== "user") {
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
        