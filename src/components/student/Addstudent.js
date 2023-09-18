import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert, Button, Form } from "react-bootstrap";

function Addstudent() {
  const [student, setStudents] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const [result, setResult] = useState({
    user: "",
    isSuccess: false,
    isError: false,
    erros: [],
  });

  //destructuring
  const { firstName, lastName, email, address } = student;
  const { user, isSuccess, isError, errors } = result;

  const handleFirstName = (e) => {
    const value = e.target.value;

    setStudents({ ...student, firstName: value });
  };

  const handleLastName = (e) => {
    const value = e.target.value;
    setStudents({ ...student, lastName: value });
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setStudents({ ...student, email: value });
  };

  const handleAddress = (e) => {
    const value = e.target.value;
    setStudents({ ...student, address: value });
  };

  const handleClick = () => {
    fetch("http://localhost:8080/api/students", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.email && data.stdId) {
          setResult({ ...result, user: data.email, isSuccess: true });
          setStudents({
            ...student,
            firstName: "",
            lastName: "",
            email: "",
            address: "",
          });
        }
        if (data.status === 400) {
          setResult({ ...result, isError: true, errors: data.error });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {isSuccess && (
            <Alert variant={"success"}>
              Student with email: {user} added successfully
            </Alert>
          )}

          {isError &&
            errors.map((err) => (
              <Alert key={err} variant={"danger"}>
                {err}
              </Alert>
            ))}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="your first name"
                onChange={handleFirstName}
                value={firstName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="your last name"
                onChange={handleLastName}
                value={lastName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="your email"
                onChange={handleEmail}
                value={email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="your address"
                onChange={handleAddress}
                value={address}
              />
            </Form.Group>
          </Form>
          <Button variant="outline-primary" onClick={handleClick}>
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Addstudent;
