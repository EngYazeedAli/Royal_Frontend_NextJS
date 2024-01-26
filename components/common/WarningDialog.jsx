

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function WarningDialog(props) {
  return (
    <Modal show={props.isOpened} onHide={props.onCancel}>
      <Modal.Header style={{
      backgroundColor: "#444",
      color: "#ddd"
    }}>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{
        backgroundColor: "#444",
        color: "#ddd"
      }}>{props.content}</Modal.Body>
      <Modal.Footer style={{
      backgroundColor: "#444",
      color: "#ddd"
    }}>
        <Button variant="primary" onClick={props.onConfirm}>
          {props.confirmLabel ?? "OK"}
        </Button>
        {props.withCancel && (
          <Button variant="secondary" onClick={props.onCancel}>
            Cancel
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default WarningDialog;
