import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Weather from './weather';

export default function Location(props) {
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Hardcoded for now
    const city = "New York";
    const stateCode = "NY";
    const countryCode = "US";

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:8181/api/location/${city}/${stateCode}/${countryCode}`,{
                method: 'GET',
            })
            .then((response) => response.json())
            .then((data) => {
                setLocation(data);
                setIsLoading(false);
            });
        },[]);

    if (isLoading) {
        return <p>Loading location...</p>;
    }
    return (
        <Card className="container mt-2">
            <Card.Body>
                <Card.Title>{location.name}</Card.Title>
                <Card.Text>Country: {location.country}</Card.Text>
                <Card.Text>Region: {location.region}</Card.Text>
                <Card.Text>Weather: {location.weather}</Card.Text>
            </Card.Body>
        </Card>
    );
}