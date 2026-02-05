import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

export default function Location(props) {
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
  const title = city && stateCode ? `${city}, ${stateCode}` : city || stateCode || "N/A";

  // Safely extract weather data with fallbacks
  const condition = locationData?.weather?.condition ?? "N/A";
  const tempC = locationData?.weather?.temperature;
  const tempHiC = locationData?.weather?.hi_temperature;
  const tempLoC = locationData?.weather?.low_temperature;

  // Safely calculate derived values
  const cloudCoverage = locationData?.weather?.cloudCoverage ?? "N/A";
  const windSpeedMps = locationData?.weather?.windSpeed ?? 0;
  const windSpeed = windSpeedMps !== "N/A" ? (windSpeedMps * 2.237) : "N/A";
  const precipitationMm = locationData?.weather?.precipitation ?? 0;
  const precipitation = precipitationMm !== "N/A" ? (precipitationMm / 25.4) : "N/A";

  // Safely convert temperatures
  const tempF = celsiusToFahrenheit(tempC);
  const tempHiF = celsiusToFahrenheit(tempHiC);
  const tempLoF = celsiusToFahrenheit(tempLoC);
  const displayTempF = tempF !== null ? tempF.toFixed(1) : "N/A";
  const displayTempHiF = tempHiF !== null ? tempHiF.toFixed(1) : "N/A";
  const displayTempLoF = tempLoF !== null ? tempLoF.toFixed(1) : "N/A";
  
  return (
    <Card
      className="container mt-2"
      style={{ width: "400px" }}
    >
      <Card.Title className="mt-4 text-center">
        {title}
      </Card.Title >
      <Card.Body>
        <div>
          <Card.Text className="text-center" style={{marginTop: "-5px"}}>
            {condition}
          </Card.Text>
        </div>
        <div className="mt-2 text-center" >
          <Card.Text>{displayTempF}°F</Card.Text>
        </div>
        <div className="mt-2 text-center" >
          <Card.Text>
            High: {displayTempHiF}°F
          </Card.Text>
        </div>
        <div className="mt-2 text-center" >
          <Card.Text>
            Low: {displayTempLoF}°F
          </Card.Text>
        </div>
        <div className="d-flex justify-content-around mt-5 gap-2" style={{fontSize: '9px'}}>
          <Card.Text>
            Cloud Coverage: {cloudCoverage}%
          </Card.Text>
          <Card.Text>
            Wind: {windSpeed.toFixed(1)} mph
          </Card.Text>
          <Card.Text>
            Precipitation: {precipitation.toFixed(2)} in
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}