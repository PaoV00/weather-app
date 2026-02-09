import { React, useEffect, useState, useRef } from "react";
import MainCard from "../components/cards/mainCard";
import LocationList from "../components/weather/locationList";
import { apiFetch } from "../components/auth/apiFetch";
import { useAuthState } from "../components/auth/authState";
import { useSelector } from "react-redux";

function Home() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [listOfLocationsId, setListOfLocationsId] = useState([]);
  const { isAuthenticated } = useAuthState();
  const user = useSelector((state) => state.user.user);

  console.log("current redux user state:", user);

  //hard code for now
  const city = "Saint Paul";
  const stateCode = "MN";
  const intervalRef = useRef(null);

  // Fetching 1 location data
  const fetchLocationData = async () => {
    try {
      console.log("Fetching location data...");
      const response = await fetch(
        `http://localhost:8181/api/location/search?city=${encodeURIComponent(city)}&stateCode=${encodeURIComponent(stateCode)}`,
        {
          method: "GET",
        },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setLocation(data);
      setWeatherData(data.weatherDto);
      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching location data:", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Call to user service to fetch favorite list (list of locationIds)
  const fetchListOfLocations = async () => {
    try {
      console.log("Fetching list of locations...");
      const userId = user.userId;

      if (!userId) return;

      const data = await apiFetch(`/api/user/${userId}/favorites`);
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
    if (isAuthenticated) {
      fetchListOfLocations();
    }

    // Set up interval to fetch every minute (5 min)
    intervalRef.current = setInterval(fetchLocationData, 300000);
    // Cleanup function to clear interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAuthenticated]);

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
        {isAuthenticated ? (
          <div>
            <LocationList locationIds={listOfLocationsId} />
          </div>
        ) : (
          <p className="text-muted">
            Please log in to see and manage your saved locations.
          </p>
        )}
      </div>
    </div>
  );
}
export default Home;
