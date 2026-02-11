import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import SearchForm from "../components/forms/searchForm";
import MainCard from "../components/cards/mainCard";
import { apiFetch } from "../components/auth/apiFetch";
import { useSelector } from "react-redux";
import { useAuthState } from "../components/auth/authState";

function Search() {
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { isAuthenticated } = useAuthState();

  //call to location service to grab a location
  const handleLocationSearch = async (payload) => {
    try {
      const response = await fetch(
        `http://localhost:8181/api/location/lookup?city=${encodeURIComponent(payload.city)}&stateCode=${encodeURIComponent(payload.stateCode)}&countryCode=${encodeURIComponent("US")}`,
        {
          method: "POST",
        },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setLocationData(data);
      setWeatherData(data.weatherDto);
      console.log("Fetched location data:", data);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleAddLocation = async () => {
    console.log("Adding location to favorites:", locationData);
    try {
      const userId = user.userId;

      await apiFetch(`/api/user/${userId}/favorites`, {
        method: "POST",
        body: JSON.stringify({ locationId: locationData.locationId }),
      });

      navigate("/");
    } catch (error) {
      console.error("Error adding location to favorites:", error);
    }
  };

  return (
    <div>
      <SearchForm onSubmit={handleLocationSearch} />

      {locationData && (
        <div className="mt-4">
          <MainCard location={locationData} weather={weatherData} />
          <Row className="mt-4 justify-content-center">
            <Col xs={12} md="auto">
              {isAuthenticated ? (
                <Button variant="secondary" onClick={handleAddLocation}>
                  Add Location
                </Button>
              ) : null}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Search;
