import { React, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import location from "../components/weather/location";
import MainCard from "../components/cards/mainCard";

function Home() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const city = "Duluth";
  const stateCode = "MN";
  useEffect(() => {
    console.log("Start fetch....");

    setIsLoading(true);
    fetch(`http://localhost:8181/api/location?${city}`, {
      method: "GET",
      header{
        
      }
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
  console.log("Location data:", location);

  if (isLoading) {
    return <p>Loading location...</p>;
  }

  return (
    <div>
      <MainCard location={location} />

      <h1>My Locations</h1>
      <p>List of saved locations will appear here.</p>
    </div>
  );
}
export default Home;
