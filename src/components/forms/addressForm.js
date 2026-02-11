import { useState, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";


function AddressForm({ onSubmit, initialAddress }) {
  const [number, setNumber] = useState(initialAddress?.number || "");
  const [street, setStreet] = useState(initialAddress?.street || "");
  const [city, setCity] = useState(initialAddress?.city || "");
  const [zip, setZip] = useState(initialAddress?.zip || "");
  const [stateCode, setStateCode] = useState(initialAddress?.stateCode || "");

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

  useEffect(() => {
    setNumber(initialAddress?.number || "");
    setStreet(initialAddress?.street || "");
    setCity(initialAddress?.city || "");
    setZip(initialAddress?.zip || "");
    setStateCode(initialAddress?.stateCode || "");
  }, [initialAddress]);

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      number: number,
      street: street,
      city: city,
      zip: zip,
      stateCode: stateCode,
      countryCode: "US",
    };
    onSubmit(payload);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Label>House Number</Form.Label>
        <div className="mt-2">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="House number"
              value={number}
              required
              onChange={(e) => setNumber(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="mt-2 mb-2">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Street"
              value={street}
              required
              onChange={(e) => setStreet(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="mt-2 mb-2">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="mt-2 mb-2">
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
        </div>
        <div className="mt-2 mb-2">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="zip"
              value={zip}
              required
              onChange={(e) => setZip(e.target.value)}
            />
          </InputGroup>
        </div>
        <div>
          <Button type="submit" variant="primary" className="w-100 mb-3">
            Set Address
          </Button>
        </div>
      </Form>
    </>
  );
}

export default AddressForm;
