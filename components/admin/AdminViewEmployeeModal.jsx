import { Modal, Form, Button } from "react-bootstrap";

const AdminViewEmployeeModal = ({
    viewedEmployee,
    setViewedEmployee,
  }) => {
    return (
      <Modal
          show={!!viewedEmployee}
          onHide={() => setViewedEmployee(undefined)}
        >
          <Modal.Header style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Modal.Title>View Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Form.Group
              className="mb-3"
              controlId="viewedEmployeeForm.first_nameInput"
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Doe"
                value={viewedEmployee?.first_name}
                disabled
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="viewedEmployeeForm.EmailInput"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="john@email.com"
                value={viewedEmployee?.email}
                disabled
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="viewedEmployeeForm.last_nameInput"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="john"
                value={viewedEmployee?.last_name}
                disabled
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Button
              variant="secondary"
              onClick={() => setViewedEmployee(undefined)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }

export default AdminViewEmployeeModal;