import { Calendar, CheckCircle, DoorOpen, Info, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Button } from "react-bootstrap";
import styles from "@/styles/employee/id.module.css";

const EmployeeActions = ({
    id,
    checkData,
    onCheckIn,
    onCheckOut,
  }) => {
    return (
      <section className={styles.actions}>
          <div className={styles.wrapper}>
            <Button
              variant="primary"
              disabled={
                checkData?.attendance?.checked_in ||
                moment().isBefore(moment({ hour: 7, minute: 0 }))
              }
              onClick={onCheckIn}
            >
              <CheckCircle />
              Check In
            </Button>
            <p>
              Check-in starts from 07:00 AM, check-in
              after 08:30 AM is late.
            </p>
          </div>
          <div className={styles.wrapper}>
            <Button
              variant="danger"
              onClick={onCheckOut}
              disabled={
                checkData?.attendance?.checked_out ||
                !checkData?.attendance?.checked_in
              }
            >
              <DoorOpen />
              Check Out
            </Button>
            <p>
              Check-out at 04:00 PM.
            </p>
          </div>
          <div className={styles.wrapper}>
            <Link
              href={`/user/${id}/attendance`}
              style={{
                marginTop: "20px",
              }}
            >
              <Button
                variant="secondary"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  fontSize: "15px",
                }}
              >
                <Calendar />
                Attendance History
              </Button>
            </Link>
            <p
              style={{
                marginTop: "15px",
              }}
            >
              Click here to see your attendance history
            </p>
          </div>
        </section>
    )
  }

export default EmployeeActions