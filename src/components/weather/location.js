import { useEffect, useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Location(props) {
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  function handleOpenDelete(e) {
    setShowConfirm(true);
  }

  function handleCancel() {
    setShowConfirm(false);
  }

  //Hard code for nowwwwwwwwwwwwwwwwww
  const userId = 1;

  function handleDelete() {
    console.log("Deleting location:", props.id);
    fetch(
      `http://localhost:8181/api/user/${userId}/favorites/${props.id}`,
      {
        method: "DELETE",
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove location");
        }
        setShowConfirm(false);
        navigate(0);
      })
      .catch((error) => {
        console.error("Error removing location:", error);
      });
  }

  useEffect(() => {
    fetch(`http://localhost:8181/api/location/${props.id}`)
      .then((response) => response.json())
      .then((data) => {
        setLocationData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  // Function converting Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => {
    if (celsius === null || celsius === undefined) return null;
    return (celsius * 9) / 5 + 32;
  };

  // Safely build title
  const city = locationData?.address?.city;
  const stateCode = locationData?.address?.stateCode;
  const title =
    city && stateCode ? `${city}, ${stateCode}` : city || stateCode || "N/A";

  // Safely extract weather data with fallbacks
  const condition = locationData?.weatherDto?.condition ?? "N/A";
  const tempC = locationData?.weatherDto?.temperature;
  const tempHiC = locationData?.weatherDto?.hi_temperature;
  const tempLoC = locationData?.weatherDto?.low_temperature;

  // Safely calculate derived values
  const cloudCoverage = locationData?.weatherDto?.cloudCoverage ?? "N/A";
  const windSpeedMps = locationData?.weatherDto?.windSpeed ?? 0;
  const windSpeed = windSpeedMps !== "N/A" ? windSpeedMps * 2.237 : "N/A";
  const precipitationMm = locationData?.weatherDto?.precipitation ?? 0;
  const precipitation =
    precipitationMm !== "N/A" ? precipitationMm / 25.4 : "N/A";

  // Safely convert temperatures
  const tempF = celsiusToFahrenheit(tempC);
  const tempHiF = celsiusToFahrenheit(tempHiC);
  const tempLoF = celsiusToFahrenheit(tempLoC);
  const displayTempF = tempF !== null ? tempF.toFixed(1) : "N/A";
  const displayTempHiF = tempHiF !== null ? tempHiF.toFixed(1) : "N/A";
  const displayTempLoF = tempLoF !== null ? tempLoF.toFixed(1) : "N/A";

  return (
    <div>
      <Card className="container mt-2" style={{ width: "400px" }}>
        {/* Red X button, top right corner */}
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            aria-label="Delete vehicle"
            title="Delete vehicle"
            onClick={handleOpenDelete}
          >
            X
          </button>
        </div>
        <Card.Title className="mt-4 text-center">{title}</Card.Title>
        <Card.Body>
          <div>
            <Card.Text className="text-center" style={{ marginTop: "-5px" }}>
              {condition}
            </Card.Text>
          </div>
          <div className="mt-2 text-center">
            <Card.Text>{displayTempF}°F</Card.Text>
          </div>
          <div className="mt-2 text-center">
            <Card.Text>High: {displayTempHiF}°F</Card.Text>
          </div>
          <div className="mt-2 text-center">
            <Card.Text>Low: {displayTempLoF}°F</Card.Text>
          </div>
          <div
            className="d-flex justify-content-around mt-5 gap-2"
            style={{ fontSize: "9px" }}
          >
            <Card.Text>Cloud Coverage: {cloudCoverage}%</Card.Text>
            <Card.Text>Wind: {windSpeed.toFixed(1)} mph</Card.Text>
            <Card.Text>Precipitation: {precipitation.toFixed(2)} in</Card.Text>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showConfirm} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this location?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
