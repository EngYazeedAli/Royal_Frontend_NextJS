import { Lock, User } from "lucide-react";
import { Button, Form, InputGroup } from "react-bootstrap";

const EmployeeTab = ({
  onEmployeeSubmit,
  setEmail,
  setPassword,
}) => {
  return (
    <>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          placeholder="eg: employee@email.com"
          aria-label="Email"
          aria-describedby="basic-addon1"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <br />
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          placeholder="eg: ********"
          aria-label="Password"
          type="password"
          aria-describedby="basic-addon1"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <br />
      <Button onClick={onEmployeeSubmit}>Submit</Button>
    </>
  );
};

export default EmployeeTab;
