import { useState } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";

function SearchForm({ locationData, onSubmit }) {
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const countryCode = "US";

  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      city: city,
      stateCode: stateCode,
      countryCode: countryCode,
    };
    onSubmit(payload);
  }

  
return (
    <div className="mb-4">
      <Form onSubmit={handleSubmit}>
        {/* One line row */}
        <Row className="align-items-end g-2 justify-content-center">
          {/* City */}
          <Col xs={12} md={6}>
            <Form.Label className="fw-bold">City</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter city"
                aria-label="City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </InputGroup>
          </Col>

          {/* State */}
          <Col xs={12} md={3}>
            <Form.Label className="fw-bold">State</Form.Label>
            <Form.Select
              aria-label="Select State"
              value={stateCode}
              required
              onChange={(e) => setStateCode(e.target.value)}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* Button */}
          <Col xs={12} md="auto">
            <Button type="submit" variant="primary" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}


export default SearchForm;
