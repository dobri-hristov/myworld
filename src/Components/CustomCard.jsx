import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomCard = ({ place, text, link, children, btnText }) => {
  return (
    <Card className="p-0 border-0 w-75 text-center mx-auto">
      <Card.Header as="h5" className="bg-info">
        {place}
      </Card.Header>
      <Card.Body>
        <Card.Text>{text}</Card.Text>
        {children}
        <Card.Link as={Link} to={link}>
          <Button variant="info">{btnText}</Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
