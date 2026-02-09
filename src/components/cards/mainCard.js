import { Card } from "react-bootstrap";

function MainCard(props) {
  // Function converting Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => {
    if (celsius === null || celsius === undefined) return null;
    return (celsius * 9) / 5 + 32;
  };

  // Safely build title
  const city = props.location?.address?.city;
  const stateCode = props.location?.address?.stateCode;
  const title = city && stateCode 
    ? `${city}, ${stateCode}`
    : city || stateCode || "N/A";

  // Safely extract weather data with fallbacks
  const condition = props.location?.weatherDto?.condition ?? "N/A";
  const tempC = props.weather?.temperature;
  const tempHiC = props.weather?.hi_temperature;
  const tempLoC = props.weather?.low_temperature;
  
  // Safely calculate derived values
  const cloudCoverage = props.weather?.cloudCoverage ?? "N/A";
  
  const windSpeedMps = props.weather?.windSpeed ?? 0;
  const windSpeed = windSpeedMps !== "N/A" ? (windSpeedMps * 2.237) : "N/A";
  
  const precipitationMm = props.weather?.precipitation ?? 0;
  const precipitation = precipitationMm !== "N/A" ? (precipitationMm / 25.4) : "N/A";

  // Safely convert temperatures
  const tempF = celsiusToFahrenheit(tempC);
  const tempHiF = celsiusToFahrenheit(tempHiC);
  const tempLoF = celsiusToFahrenheit(tempLoC);

  const displayTempF = tempF !== null ? tempF.toFixed(0) : "N/A";
  const displayTempHiF = tempHiF !== null ? tempHiF.toFixed(0) : "N/A";
  const displayTempLoF = tempLoF !== null ? tempLoF.toFixed(0) : "N/A";

  return (
    <Card
      className="container mt-2"
      style={{ width: "800px", height: "600px" }}
    >
      <Card.Title className="m-5 text-center" style={{ fontSize: '40px' }}>
        {title}
      </Card.Title>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Text className="text-center" style={{ fontSize: '30px' }}>
            {condition}
          </Card.Text>
        </div>
        <div className="text-center" style={{ fontSize: '100px' }}>
          <Card.Text>{displayTempF}°F</Card.Text>
        </div>
        <div className="text-center" style={{ fontSize: '30px' }}>
          <Card.Text>
            High: {displayTempHiF}°F
          </Card.Text>
        </div>
        <div className="text-center" style={{ fontSize: '30px' }}>
          <Card.Text>
            Low: {displayTempLoF}°F
          </Card.Text>
        </div>
        <div className="d-flex justify-content-around mt-4" style={{ fontSize: '15px' }}>
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
export default MainCard;