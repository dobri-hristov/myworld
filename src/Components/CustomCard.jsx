import { Card, Button } from "react-bootstrap";

const CustomCard = ({ place, text, link, children }) => {
  return (
    <Card className="p-0 border-0 w-75 text-center mx-auto">
      <Card.Header as="h5" className="bg-info">
        {place}
      </Card.Header>
      <Card.Body>
        <Card.Text>{text}</Card.Text>
        {children}
        <Card.Link href={link}>
          <Button variant="info">learn more about {place}</Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
