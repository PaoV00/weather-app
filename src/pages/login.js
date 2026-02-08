import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      console.log('Login submitted:', {
        username: formData.username,
        password: formData.password,
      });
    } else {
      console.log('Register submitted:', formData);
    }
  };

  return (
    <div className="Login d-flex justify-content-center mt-5">
      <Card style={{ width: '28rem' }} className="shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            {isLogin ? 'Login' : 'Register'}
          </Card.Title>

          <Form onSubmit={handleSubmit}>
            {/* Username */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            {/* Register-only fields */}
            {!isLogin && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                  />
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit" className="w-100 mb-3">
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </Form>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Register"
                : 'Already have an account? Login'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
