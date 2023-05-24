import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ title, show, hide, children }) => {
  return (
    <Modal show={show} onHide={hide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
