import { React, useEffect, useState, useRef } from "react";
import { Card } from "react-bootstrap";
import MainCard from "../components/cards/mainCard";

function Home() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const city = "Duluth";
  const intervalRef = useRef(null);

  const fetchLocationData = async () => {
    try {
      console.log("Fetching location data...");
      const response = await fetch(
        `http://localhost:8181/api/location/city/${city}`,
        {
          method: "GET",
        },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setLocation(data);
      setWeatherData(data.weather);
      setLastUpdated(new Date());
      setIsLoading(false);
      console.log("Location data fetched:", data);
    } catch (err) {
      console.error("Error fetching location data:", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="mt-5">
        <hr />
        <h3>My Locations</h3>
        <p>List of saved locations will appear here.</p>
      </div>
    </div>
  );
}
export default Home;
