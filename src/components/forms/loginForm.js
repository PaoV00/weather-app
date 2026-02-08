import { Button, Card } from 'react-bootstrap';
import { useKeycloak } from '@react-keycloak/web';

function Login() {
  const { keycloak } = useKeycloak();

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: '28rem' }} className="shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            Authentication
          </Card.Title>

          <Button
            variant="primary"
            className="w-100 mb-3"
            onClick={() => keycloak.login()}
          >
            Login
          </Button>

          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={() =>
              keycloak.register({
                redirectUri: window.location.origin,
              })
            }
          >
            Register
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
