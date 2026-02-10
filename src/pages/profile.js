import { Card, Button } from "react-bootstrap";
import { apiFetch } from "../components/auth/apiFetch";
import { useSelector } from "react-redux";
import AddressForm from "../components/forms/addressForm";

function Profile() {

  const user = useSelector((state) => state.user.user);

  const handleSetAddress = async (payload) => {
    try {
      const userId = user.userId;
      await apiFetch(`/api/user/${userId}/address`, {
        method: "PATCH",
        body: JSON.stringify({ payload }),
      });
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div>
      <Card style={{ width: "28rem" }} className="shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4">Address</Card.Title>
          <AddressForm />
          <Button
            variant="primary"
            className="w-100 mb-3"
            onClick={() => ""}
          >
            Set Address
          </Button>
          
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
