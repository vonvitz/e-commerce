import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Image,
  InputGroup,
} from "react-bootstrap";
import UserContext from "../../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import facebookCircleImage from "./facebook-circle.svg";

const RegisterPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Input fields state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isActive, setIsActive] = useState(false);

  // Validation state
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      registerUser(e);
    }
    setValidated(true);
  };

  const registerUser = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.table(data);
        if (data.message === "Registered Successfully") {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");

          Swal.fire({
            title: "Registered Successfully",
            icon: "success",
          });
          navigate("/login");
        } else if (data.error === "Email invalid") {
          Swal.fire({
            title: "Email is Invalid",
            icon: "warning",
          });
        } else if (data.error === "Mobile number invalid") {
          Swal.fire({
            title: "Mobile number invalid",
            icon: "warning",
            text: "Please Change!",
          });
        } else if (data.error === "Password must be at least 8 characters") {
          Swal.fire({
            title: "Password must be at least 8 characters",
            icon: "warning",
          });
        } else {
          Swal.fire({
            title: "Error In Saving",
            icon: "error",
          });
        }
      });
  };

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      mobileNo !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      mobileNo.length === 11 &&
      password === confirmPassword
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  return user.id !== null ? (
    <Navigate to="/products" />
  ) : (
    <Container>
      <h1 className="text-center display-1 mt-5 mb-5">Register</h1>
      <Row md={12} className="mt-5">
        <Col
          xs={6}
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Image
            src={facebookCircleImage}
            roundedCircle
            className="img-fluid"
            style={{ width: "500px", height: "500px" }}
          />
        </Col>
        <Col className="justify-content-center align-items-center mt-5" md={6}>
          <Card>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      isValid={validated && firstName !== ""}
                      isInvalid={validated && firstName === ""}
                    />
                    <Form.Control.Feedback type="valid">
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      First name is required.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      isValid={validated && lastName !== ""}
                      isInvalid={validated && lastName === ""}
                    />
                    <Form.Control.Feedback type="valid">
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Last name is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationCustomUsername"
                  >
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isValid={validated && /\S+@\S+\.\S+/.test(email)}
                        isInvalid={validated && !/\S+@\S+\.\S+/.test(email)}
                      />
                      <Form.Control.Feedback type="valid">
                        Looks good!
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email address.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Mobile No.</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      placeholder="Mobile No."
                      value={mobileNo}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,11}$/.test(value)) {
                          setMobileNo(value);
                        }
                      }}
                      isValid={validated && mobileNo.length === 11}
                      isInvalid={
                        validated &&
                        mobileNo.length !== 11 &&
                        mobileNo.length > 0
                      }
                    />
                    {validated && mobileNo.length === 11 && (
                      <Form.Control.Feedback type="valid">
                        Looks good!
                      </Form.Control.Feedback>
                    )}
                    {validated &&
                      (mobileNo.length !== 11 || mobileNo.length === 0) && (
                        <Form.Control.Feedback type="invalid">
                          {mobileNo.length === 0
                            ? "Mobile number is required."
                            : "Mobile number must be 11 digits."}
                        </Form.Control.Feedback>
                      )}
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isValid={validated && password.length >= 8}
                      isInvalid={validated && password.length < 8}
                    />
                    <Form.Control.Feedback type="valid">
                      Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 8 characters.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="validationCustom05">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      isValid={
                        validated &&
                        confirmPassword !== "" &&
                        confirmPassword === password
                      }
                      isInvalid={
                        validated &&
                        (confirmPassword !== password || confirmPassword === "")
                      }
                    />
                    {validated &&
                      confirmPassword !== "" &&
                      confirmPassword === password && (
                        <Form.Control.Feedback type="valid">
                          Password match!
                        </Form.Control.Feedback>
                      )}
                    {validated &&
                      (confirmPassword === "" ||
                        confirmPassword !== password) && (
                        <Form.Control.Feedback type="invalid">
                          {confirmPassword === ""
                            ? "Confirm Password cannot be empty."
                            : "Passwords do not match."}
                        </Form.Control.Feedback>
                      )}
                  </Form.Group>
                </Row>

                <Button type="submit">Register</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
