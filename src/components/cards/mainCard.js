import { Card } from "react-bootstrap";

function MainCard(props) {
  // Function converting Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => {
    if (celsius === null || celsius === undefined) return null;
    return (celsius * 9) / 5 + 32;
  };

  const title = [
    props.location.address.city,
    props.location.address.stateCode,
  ].join(", ");
  const condition = props.location?.weather?.condition;
  const tempC = props.location?.weather?.temperature;
  const tempHiC = props.location?.weather?.hi_temperature;
  const tempLoC = props.location?.weather?.low_temperature;
  const cloudCoverage = props.location?.weather?.cloudCoverage;
  const windSpeed = props.location?.weather?.windSpeed * 2.237; // Convert m/s to mph
  const precipitation = props.location?.weather?.precipitation / 25.4; // Convert mm to inches

  const tempF = celsiusToFahrenheit(tempC);
  const tempHiF = celsiusToFahrenheit(tempHiC);
  const tempLoF = celsiusToFahrenheit(tempLoC);
  const displayTempF = tempF !== null ? tempF.toFixed(1) : "N/A";
  const displayTempHiF = tempHiF !== null ? tempHiF.toFixed(1) : "N/A";
  const displayTempLoF = tempLoF !== null ? tempLoF.toFixed(1) : "N/A";

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
