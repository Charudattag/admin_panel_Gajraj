import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Card,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaRupeeSign } from "react-icons/fa";
import Footer from "./Footer";

// Import images
import Image1 from "../../assets/Ring.jpg";
import Image2 from "../../assets/Bengals.jpg";
import Image3 from "../../assets/earings.jpg";
import Image4 from "../../assets/mangalsutra_1.jpg";

const ProductDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({
    name: "Diamond Ring",
    price: "23.12",
    weight: "500g",
    details:
      'A "diamond ring" refers to a ring featuring a single diamond as the centerpiece, typically set in a simple band, with the focus solely on the diamond itself; often called a "solitaire" ring, signifying its solitary diamond design.',
    images: [Image1, Image2, Image3, Image4],
  });
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const navigate = useNavigate();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setEditedProduct({ ...product });
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    setProduct({ ...editedProduct });
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <Container className="mt-4">
      <Card
        className="shadow-sm border-0"
        style={{
          background: "linear-gradient(to right, #ffffff, #f8f9fa)",
          borderRadius: "15px",
        }}
      >
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              {/* Back button */}
              <span
                style={{
                  cursor: "pointer",

                  float: "right",
                }}
                onClick={() => navigate("/product")}
              >
                Back
              </span>
              <h2 className="fw-bold mb-3 mt-5">
                {product.name}
                <FaEdit
                  className="float-end text-warning"
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  onClick={handleOpenModal}
                />
              </h2>
              <div className="mb-3">
                <span className="text-muted fs-5">Price: </span>
                <span className="text-success fw-bold fs-4">
                  <FaRupeeSign />
                  {product.price}
                </span>
              </div>
              <div className="mb-3">
                <h5 className="text-muted">Weight</h5>
                <span className="text-danger fw-bold fs-5">
                  {product.weight}
                </span>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h4 className="text-muted">Details</h4>
              <p className="text-dark">{product.details}</p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h4 className="text-muted">Images</h4>
              <div className="d-flex gap-3">
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Product Thumbnail ${index + 1}`}
                    thumbnail
                    style={{ width: "150px", height: "150px" }}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                name="weight"
                value={editedProduct.weight}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="details"
                value={editedProduct.details}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            style={{ borderRadius: "20px" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveChanges}
            style={{ borderRadius: "20px" }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </Container>
  );
};

export default ProductDetails;
