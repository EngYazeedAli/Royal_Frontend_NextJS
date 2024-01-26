import { Modal, Form, Button } from "react-bootstrap";

const AdminManageEmployeesModals = ({
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    newEmployeeForm,
    setNewEmployeeForm,
    viewedEmployee,
    setViewedEmployee,
    editedEmployee,
    setEditedEmployee,
    onCreate,
    onEdit,
  }) => {
    return (
      <>
        <Modal
          show={isCreateDialogOpen}
          onHide={() => setIsCreateDialogOpen(false)}
        >
          <Modal.Header style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Modal.Title>New Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Form.Group
              className="mb-3"
              controlId="newEmployeeForm.first_nameInput"
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Doe"
                onChange={(e) =>
                  setNewEmployeeForm({
                    ...newEmployeeForm,
                    first_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="newEmployeeForm.last_nameInput"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Doe"
                onChange={(e) =>
                  setNewEmployeeForm({
                    ...newEmployeeForm,
                    last_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newEmployeeForm.EmailInput">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="john@email.com"
                onChange={(e) =>
                  setNewEmployeeForm({
                    ...newEmployeeForm,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="newEmployeeForm.PasswordInput"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setNewEmployeeForm({
                    ...newEmployeeForm,
                    password: e.target.value,
                  })
                }
              />
              <Form.Text id="newEmployeeForm.PasswordInputHelpBlock" muted>
                <p style={{
                  color: "gray"
                }}>
                  Password must be at least 8 characters long
                </p>
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Button
              variant="secondary"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                onCreate({
                  last_name: newEmployeeForm.last_name,
                  password: newEmployeeForm.password,
                  first_name: newEmployeeForm.first_name,
                  email: newEmployeeForm.email,
                })
              }
            >
              Create
            </Button>
          </Modal.Footer>
        </Modal>
        {/* -------------------------- */}
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
        {/* -------------------------- */}
        <Modal
          show={!!editedEmployee}
          onHide={() => setEditedEmployee(undefined)}
        >
          <Modal.Header style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Form.Group
              className="mb-3"
              controlId="editedEmployeeForm.first_nameInput"
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Doe"
                defaultValue={editedEmployee?.first_name}
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    first_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="editedEmployeeForm.EmailInput"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="john@email.com"
                defaultValue={editedEmployee?.email}
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="editedEmployeeForm.last_nameInput"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="john"
                defaultValue={editedEmployee?.last_name}
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    last_name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="editedEmployeeForm.PasswordInput"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    password: e.target.value,
                  })
                }
              />
              {/* <Form.Text id="editedEmployeeForm.PasswordInputHelpBlock" muted>
                {"Leave blank if you don't want to change the password"}
              </Form.Text> */}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Button
              variant="secondary"
              onClick={() => setEditedEmployee(undefined)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={onEdit}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

export default AdminManageEmployeesModals