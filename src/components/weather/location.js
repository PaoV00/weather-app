import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import classes from './location.module.css';

export default function Location(props) {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  const title = [
    props.address.city,
    props.address.stateCode,
    props.address.countryCode,
  ]
    .filter(Boolean)
    .join(", ");

  // Hardcoded for now
  const city = "Duluth";
  const stateCode = "MN";
  const countryCode = "US";

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8181/api/location?${city}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setLocation(data);
        setWeatherData(data.weather);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading location...</p>;
  }
  return (
    <Card className="container mt-2">
      <Card.Body className={classes.content}>
        <Card.Title className={classes.title}>{title}</Card.Title>
        <div>
            
        </div>
      </Card.Body>
    </Card>
  );
}
