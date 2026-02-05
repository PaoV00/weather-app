import { React, useEffect, useState, useRef } from "react";
<<<<<<< HEAD
=======
import { Card } from "react-bootstrap";
>>>>>>> 717e4389bc361bcebb66f31f7dd196f5cdddca6b
import MainCard from "../components/cards/mainCard";
import LocationList from "../components/weather/locationList";

function Home() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
<<<<<<< HEAD
  const [listOfLocationsId, setListOfLocationsId] = useState([]);
=======
>>>>>>> 717e4389bc361bcebb66f31f7dd196f5cdddca6b

  //hard code for now
  const city = "Duluth";
<<<<<<< HEAD
  const stateCode = "MN";
  const countryCode = "US";
  const intervalRef = useRef(null);

  // Fetching 1 location data
=======
  const intervalRef = useRef(null);

>>>>>>> 717e4389bc361bcebb66f31f7dd196f5cdddca6b
  const fetchLocationData = async () => {
    try {
      console.log("Fetching location data...");
      const response = await fetch(
<<<<<<< HEAD
        `http://localhost:8181/api/location?city=${encodeURIComponent(city)}&stateCode=${encodeURIComponent(stateCode)}&countryCode=${encodeURIComponent(countryCode)}`,
=======
        `http://localhost:8181/api/location/city/${city}`,
>>>>>>> 717e4389bc361bcebb66f31f7dd196f5cdddca6b
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
<<<<<<< HEAD
=======
      console.log("Location data fetched:", data);
>>>>>>> 717e4389bc361bcebb66f31f7dd196f5cdddca6b
    } catch (err) {
      console.error("Error fetching location data:", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD

  // Hardcode for now
  const userId = 1;
  const fetchListOfLocations = async () => {
    try {
      console.log("Fetching list of locations...");
      const response = await fetch(`http://localhost:8181/api/user/${userId}/favorites`, {
        method: "GET",
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setListOfLocationsId(data);
      setIsLoading(false);
    } catch (err) {
    console.error("Error fetching list of locations:", err);
    setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };


  // Fetching locations data every 5 minutes
  useEffect(() => {
    fetchLocationData();
    fetchListOfLocations();

    // Set up interval to fetch every minute (5 min)
    intervalRef.current = setInterval(fetchLocationData, 300000);
=======
  useEffect(() => {
    fetchLocationData();

    // Set up interval to fetch every minute (1 min)
    intervalRef.current = setInterval(fetchLocationData, 60000);
>>>>>>> 717e4389bc361bcebb66f31f7dd196f5cdddca6b
    // Cleanup function to clear interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  console.log("Location data:", location);
  console.log("Location list IDs:", listOfLocationsId);

  if (isLoading) {
    return <p>Loading location...</p>;
  }

  return (
    <div>
      <MainCard location={location} weather={weatherData} />

      <div className="mt-5">
        <hr />
        <h3>My Locations</h3>
<<<<<<< HEAD
        <LocationList locationIds={listOfLocationsId} />
=======
        <p>List of saved locations will appear here.</p>
>>>>>>> 717e4389bc361bcebb66f31f7dd196f5cdddca6b
      </div>
    </div>
  );
}
export default Home;
