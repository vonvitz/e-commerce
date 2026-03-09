import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  // For Change Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Password do not Match!",
        icon: "error",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Replace with your actual JWT token
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/users/update-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newPassword: password }),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Password Reset Successfully!",
          icon: "success",
        });
        setPassword("");
        setConfirmPassword("");
        setShowModal(false);
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: `${errorData}`,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "An error occurred. Please try again.",
        icon: "error",
      });

      console.error(error);
    }
  };

  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const profileImage =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFullName(`${data.user.firstName} ${data.user.lastName}`);
        setEmail(data.user.email);
        setContact(data.user.mobileNo);
        if (data.user.isAdmin) {
          setStatus("Admin");
        } else {
          setStatus("User");
        }
      });
  }, []);

  return (
    <>
      <Container>
        <div className="text-center display-1 mt-5">Profile</div>
        <Row className="mt-5">
          <Col lg={4} className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }} className="shadow">
              <Card.Img
                variant="top"
                src={profileImage}
                className="img-fluid rounded-circle mx-auto d-block mt-2"
                style={{ width: "150px" }}
              />
              <Card.Body>
                <Card.Title className="text-center">{fullName}</Card.Title>
                <Card.Text className="text-center">{status}</Card.Text>
                <Row className="justify-content-center">
                  <Col className="text-center">
                    <Button variant="primary">Follow</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card style={{ width: "80%" }} className="shadow">
              <Card.Body>
                <Col lg={9}>
                  <Card.Title>Full Name</Card.Title>
                  <Card.Text>{fullName}</Card.Text>
                  <Card.Title>Email</Card.Title>
                  <Card.Text>{email}</Card.Text>
                  <Card.Title>Contact</Card.Title>
                  <Card.Text>{contact}</Card.Text>
                  <Card.Title>Status</Card.Title>
                  <Card.Text>{status}</Card.Text>
                  <Button onClick={toggleModal}>Change Password</Button>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for changing password */}
      {/* <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleResetPassword}>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmNewPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={toggleModal} type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleResetPassword}>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmNewPassword" className="mt-2">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer className="mt-3">
              <Button variant="secondary" onClick={toggleModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfilePage;
