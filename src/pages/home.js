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
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [listOfLocationsId, setListOfLocationsId] = useState([]);
  const intervalRef = useRef(null);
  const { isAuthenticated } = useAuthState();
  const user = useSelector((state) => state.user.user);
  const [iPLocation, setIPLocation] = useState(null);

  console.log("current redux user state:", user);

  useEffect(() => {
    setIsLoading(true);
    getIPLocation();
    
  },[]);

  const getIPLocation = () => {
    const resp = fetch(`https://ipapi.co/json`)
    .then((resp) => resp.json())
    .then((data) => {
      setIPLocation(data);
      setIsLoading(false);
    })
  }

  // Fetching 1 location data
  const fetchLocationData = async () => {
    try {
      const city = user !== null ? (user.address !== null ? user.address.city : iPLocation.city) : iPLocation.city;
      const stateCode = user !== null ? (user.address !== null ? user.address.stateCode : iPLocation.region_code) : iPLocation.region_code;
      const countryCode = "US";
      console.log("Fetching location data...");
      const response = await fetch(
        `http://localhost:8181/api/location/lookup?city=${encodeURIComponent(city)}&stateCode=${encodeURIComponent(stateCode)}&countryCode=${encodeURIComponent(countryCode)}`,
        {
          method: "POST",
        },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setLocation(data);
      setWeatherData(data.weatherDto);
      setLastUpdated(new Date());

    } catch (err) {
      console.error("Error fetching location data:", err);
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
      
    } catch (err) {
      console.error("Error fetching list of locations:", err);
      
    } finally {
      
    }
  };

  // Fetching locations data every 5 minutes
  useEffect(() => {
    console.log("IPLocation: ", iPLocation);
    if(!isLoading){
      fetchLocationData();
    }
    
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
  }, [isAuthenticated, isLoading]);

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
