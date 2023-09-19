import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { API_URL } from "../ApplicationContant";
import { Link } from "react-router-dom";

function AllStudents() {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  const fetchStudent = () => {
    fetch(`${API_URL}/students `, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setStudents(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStudent();
  }, [message]);

  const deleteStudent = (stdId) => {
    const url = `http://localhost:8080/api/students/${stdId}`;
    // "http://localhost:8080/api/students" + "/" + stdId
    fetch(url, {
      method: "Delete",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>All Students</h1>
          {message && <Alert variant={"success"}>{message}</Alert>}

          <Table striped>
            <thead>
              <tr>
                <th>Student Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students &&
                students.map((std) => {
                  return (
                    <tr key={std.stdId}>
                      <td>{std.stdId}</td>
                      <td>{std.firstName}</td>
                      <td>{std.lastName}</td>
                      <td>{std.email}</td>
                      <td>{std.address}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => deleteStudent(std.stdId)}
                        >
                          Delete
                        </Button>{" "}
                        <Link to={`/update/${std.stdId}`}>
                          <Button variant="info"> Update</Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AllStudents;
