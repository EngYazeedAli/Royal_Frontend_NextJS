import { Modal, Form, Button } from "react-bootstrap";

const EmployeeIdModels = (
    {
      isReasonDialogOpen,
      setIsReasonDialogOpen,
      setReason,
      onCheckInReasonSubmitted,
      onCheckOutReasonSubmitted,
      reasonType,
      reasoningQuesion
    }) => {
    return (
      <>
        <Modal
          show={isReasonDialogOpen && reasonType === "check-in"}
          onHide={() => setIsReasonDialogOpen(false)}
        >
          <Modal.Body style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Form.Text>{reasoningQuesion}</Form.Text>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex. I'm sick (optional)"
                autoFocus
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Button
              variant="secondary"
              onClick={() => {
                setReason("");
                onCheckInReasonSubmitted();
                setIsReasonDialogOpen(false);
              }}
            >
              No reason
            </Button>
            <Button variant="primary" onClick={onCheckInReasonSubmitted}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ------------------- */}
        <Modal
          show={isReasonDialogOpen && reasonType === "check-out"}
          onHide={() => setIsReasonDialogOpen(false)}
        >
          <Modal.Body style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Form.Text>{reasoningQuesion}</Form.Text>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex. I'm sick (optional)"
                autoFocus
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{
            backgroundColor: "#444",
            color: "#ddd"
          }}>
            <Button
              variant="secondary"
              onClick={() => {
                setReason("");
                onCheckOutReasonSubmitted();
                setIsReasonDialogOpen(false);
              }}
            >
              No reason
            </Button>
            <Button variant="primary" onClick={onCheckOutReasonSubmitted}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

export default EmployeeIdModels