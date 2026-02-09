import { useState } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";

function addressForm() {
    const [title, setTitle] = useState("");
    const [condition, setCondition] = useState("");
    const [currTemp, setCurrTemp] = useState("");
    const [hiTemp, setHiTemp] = useState("");
    const [lowTemp, setLowTemp] = useState("");
    const [cloudCoverage, setCloudCoverage] = useState("");
    const [wind, setWind] = useState("");
    const [precipitation, setPrecipitation] = useState("");
}

export default addressForm;