import { useState } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";

function AddressForm() {
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [stateCode, setStateCode] = useState("");

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

  return (
    <>
      <Form>
        <Form.Label>House Number</Form.Label>
        <div className="mt-2">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="House number"
              value={number}
              required
              onChange={(e) => setCity(e.target.value)}
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
              onChange={(e) => setCity(e.target.value)}
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
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="zip"
              value={zip}
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
      </Form>
    </>
  );
}

export default AddressForm;
