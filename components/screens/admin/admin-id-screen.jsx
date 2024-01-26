import React from "react";
import { Card } from "react-bootstrap";
import { List, Settings2, Users } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/admin/id.module.css";

function AdminIdScreen({ id }) {
  return (
    <section>
      <Link href={`/admin/${id}/view-employees`}>
        <Card
          className={styles.card1}
          style={{
            textAlign: "center",
          }}
        >
          <Card.Body
            style={{
              padding: "40px",
              cursor: "pointer",
              display: "flex",
              gap: "20px",
              alignItems: "center"
            }}
          >
            <List size={80} />
            <br />
            <br />
            <Card.Title>
              <h3>Employees List</h3>
            </Card.Title>
          </Card.Body>
        </Card>
      </Link>
      {/* ---- */}
      <Link href={`/admin/${id}/manage-employees`}>
        <Card
          className={styles.card2}
          style={{
            textAlign: "center",
          }}
        >
          <Card.Body
            style={{
              padding: "40px",
              cursor: "pointer",
              display: "flex",
              gap: "20px",
              alignItems: "center"
            }}
          >
            <Settings2 size={80} />
            <br />
            <br />
            <Card.Title>
              <h3>Employees Management</h3>
            </Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </section>
  );
}

export default AdminIdScreen;
