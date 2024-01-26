import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#00000060",
        zIndex: 99999,
        backdropFilter: "blur(5px)",
      }}
    >
      <Card
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#444"
        }}
      >
        <Card.Body>
          <Spinner animation="grow" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Loading;
