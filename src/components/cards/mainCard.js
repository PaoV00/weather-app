import { Card } from "react-bootstrap";

function MainCard(props) {
  return (
    <Card
      className="container mt-2"
      style={{ width: "800px", height: "600px" }}
    >
        <Card.Title>{props.location.name}</Card.Title>
      <Card.Body>
        
      </Card.Body>
    </Card>
  );
}
export default MainCard;
