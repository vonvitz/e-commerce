import React from "react";

const UserView = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
  });

  function handleChange(e) {
    const { firstName, value } = e.target;
  }
  return (
    <>
      <Form onSubmit={(e) => registerUser(e)}>
        <h1 className="my-5 text-center">Register</h1>

        {/* Two way data binding */}
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mobile No:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter 11 Digit Mobile No"
            value={mobileNo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Conditional Rendering for the submit button based on the isActive state */}
        {/* Conditional Rendering is displaying elements depending on the conditions we have set */}
        {isActive ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button variant="danger" type="submit" disabled>
            Submit
          </Button>
        )}
      </Form>
    </>
  );
};

export default UserView;
