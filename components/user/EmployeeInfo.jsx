import { Mail, User } from "lucide-react";
import { Card } from "react-bootstrap";
import styles from "@/styles/employee/id.module.css";

const EmployeeInfo = (
    {
      employee
    }) => {
    return (
      <section>
          <Card>
            <Card.Header style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>Employee</Card.Header>
            <Card.Body className={styles.info} style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
              <div className={styles.infoWrapper}>
                <strong>Full Name: </strong>
                {employee?.first_name} {employee?.last_name}
              </div>
              <hr />
              <div className={styles.infoWrapper}>
                <strong>Email: </strong>
                {employee?.email}
              </div>
            </Card.Body>
          </Card>
        </section>
    )
  }

export default EmployeeInfo