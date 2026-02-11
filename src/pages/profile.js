import { Card, Button } from "react-bootstrap";
import { apiFetch } from "../components/auth/apiFetch";
import { useSelector } from "react-redux";
import AddressForm from "../components/forms/addressForm";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleSetAddress = async (payload) => {
    try {
      console.log("Payload: ", payload);
      const userId = user.userId;
      await apiFetch(`/api/user/${userId}/address`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div>
      <Card style={{ width: "28rem" }} className="shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4">Address</Card.Title>
          <AddressForm onSubmit={handleSetAddress}/>
          
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
