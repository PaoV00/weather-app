import { Card, Button } from "react-bootstrap";
import { apiFetch } from "../components/auth/apiFetch";
import { useSelector } from "react-redux";
import AddressForm from "../components/forms/addressForm";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [ipLocation, setIpLocation] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.address === null) {
      fetch("https://ipapi.co/json")
        .then((resp) => resp.json())
        .then((data) => {
          setIpLocation(data);
        })
        .catch((err) => console.error("IP fetch failed:", err));
    }
  }, [user]);

  const handleSetAddress = async (payload) => {
    try {
      const userId = user.userId;

      const updatedUser = await apiFetch(`/api/user/${userId}/address`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      // Update Redux immediately
      dispatch(setUser(updatedUser));

      navigate("/");
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <div className="d-flex justify-content-center align-items-center">
        <Card style={{ width: "28rem" }} className="shadow c">
          <Card.Body>
            <Card.Title className="text-center mb-4">
              Set Address to change current location
            </Card.Title>
            <AddressForm
              onSubmit={handleSetAddress}
              initialAddress={
                user?.address ??
                (ipLocation && {
                  number: "",
                  street: "",
                  city: ipLocation.city,
                  stateCode: ipLocation.region_code,
                  zip: "",
                })
              }
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
