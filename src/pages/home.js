import { React } from 'react';
import { Card } from 'react-bootstrap';
import location from '../components/weather/location';

function Home() {
    return (
        <div className="Home">
            <h2>Welcome to the Weather App</h2>
            <Card >
                <Card.Body>
                    <Card.Text>
                        {location}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
export default Home;