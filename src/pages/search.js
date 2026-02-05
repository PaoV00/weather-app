import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import SearchForm from "../components/weather/searchForm";
import MainCard from "../components/cards/mainCard";

function Search() {
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();
  const handleLocationSearch = async (payload) => {
    try {
      const response = await fetch(
        `http://localhost:8181/api/location?city=${encodeURIComponent(payload.city)}&stateCode=${encodeURIComponent(payload.stateCode)}&countryCode=${encodeURIComponent(payload.countryCode)}`,
        {
          method: "GET",
        },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setLocationData(data);
      setWeatherData(data.weather);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  // Hardcode for now
  const userId = 1;

  const handleAddLocation = async () => {
    console.log("Adding location to favorites:", locationData);
  try {
    const response = await fetch(`http://localhost:8181/api/user/${userId}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locationId: locationData.locationId }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    navigate("/");
  } catch(error) {
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
              <Button variant="secondary" onClick={handleAddLocation}>
                Add Location
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Search;
