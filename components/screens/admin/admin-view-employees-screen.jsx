import React from "react";
import styles from "@/styles/admin/view-employees.module.css";
import { useQuery } from "@tanstack/react-query";
import useLoading from "@/hooks/use-loading";
import useWarningDialog from "@/hooks/use-warning-dialog";
import Table from "react-bootstrap/Table";
import useSession from "@/hooks/use-session";
import { Info } from "lucide-react";
import { Card } from "react-bootstrap";
import AdminViewEmployeeModal from "@/components/admin/AdminViewEmployeeModal";

function AdminViewEmployeesScreen() {
  const { setLoading } = useLoading();
  const { openWarningDialog } = useWarningDialog();
  const { session } = useSession();

  const [viewedEmployee, setViewedEmployee] = React.useState();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "view-employees"],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/users",
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
  });

  const onView = React.useCallback(
    (id) => {
      setViewedEmployee(data?.find((employee) => employee._id === id));
    },
    [data]
  );

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  React.useEffect(() => {
    if (error) {
      openWarningDialog({
        title: "Error",
        content: error.message,
      });
    }
  }, [error, openWarningDialog]);

  return (
    <section className={styles.main}>
      {/* <Card>
        <Card.Body>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              color: "#6c757d",
            }}
          >
            <Info size={20} />
            <p
              style={{
                margin: 0,
              }}
            >
              {"Click on row to view employee's information"}
            </p>
          </div>
        </Card.Body>
      </Card> */}
      {!isLoading &&
        !error &&
        (data?.length < 1 ? (
          <p>No Employees Yet</p>
        ) : (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((employee, index) => (
                <tr
                  key={index}
                  // onClick={() => onView(employee._id)}
                  // className={styles.tr}
                >
                  <td>{index + 1}</td>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ))}
      {/* -------------------------- */}
      <AdminViewEmployeeModal viewedEmployee={viewedEmployee} setViewedEmployee={setViewedEmployee} />
      {/* -------------------------- */}
    </section>
  );
}

export default AdminViewEmployeesScreen;