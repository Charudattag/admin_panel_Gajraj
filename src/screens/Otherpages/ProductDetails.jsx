import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Card,
  Image,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaRupeeSign, FaWeight } from "react-icons/fa";
import Footer from "./Footer";
import { getProductByIdAPI } from "../../../src/api/api";

const ProductDetails = () => {
  const [product, setProduct] = useState(null); // Product details state
  const [editedProduct, setEditedProduct] = useState(null); // Edited product state
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  // Fetch product data when the component loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductByIdAPI(id); // Call the API
        if (response.success) {
          setProduct(response.data); // Update product state
          setEditedProduct(response.data); // Initialize editedProduct
        } else {
          setError(response.message || "Failed to fetch product.");
        }
      } catch (err) {
        setError("An error occurred while fetching the product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setEditedProduct({ ...product }); // Reset changes
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

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading product details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4 text-center">
        <p className="text-danger">{error}</p>
        <Button variant="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-2">
      <Card
        className="shadow-sm border-0"
        style={{
          background: "linear-gradient(to right, #ffffff, #f8f9fa)",
          borderRadius: "15px",
        }}
      >
        <Card.Body>
          <Row className="align-items-center">
            <Col xs={12} className="text-end mb-3">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/product")}
              >
                Back
              </span>
            </Col>

            <Col xs={12} md={6}>
              <h1 className="fw-bold mb-3" style={{ color: "#CB9B06" }}>
                {product.name}
              </h1>
              <div className="mb-3">
                <span className="text-success fw-bold  fs-4">Price: </span>
                <span className="text-black  fs-5">
                  <FaRupeeSign />
                  {product.price.toFixed(2)}
                </span>
              </div>

              <div className="mb-3">
                <span className="text-success  fw-bold  fs-4">Weight: </span>
                <span className="text-black fs-5">{product.Weight}g</span>
              </div>
              <div className="mb-3">
                <span className="text-success  fw-bold  fs-4">Category: </span>
                <span className="text-black  fs-5">
                  {product.category.name}
                </span>
              </div>
              <div className="mb-3">
                <span className="text-success fw-bold  fs-4">
                  MakingCharges:{" "}
                </span>
                <span className="text-black fw-bold fs-5">
                  {product.making_Charges}
                </span>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <div className="container">
                <div className="mb-3">
                  <span className="text-success fw-bold fs-4">
                    SubCategory:{" "}
                  </span>
                  <span className="text-black fs-5">
                    {product.subcategory.name}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-success fw-bold  fs-4">Shipping: </span>
                  <span className="text-black  fs-5">
                    <i>
                      <FaRupeeSign />
                    </i>
                    {product.shipping}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-success fw-bold  fs-4">
                    Packaging:{" "}
                  </span>
                  <span className="text-black  fs-5">
                    <i>
                      <FaRupeeSign />
                    </i>
                    {product.packaging}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <h4 className="text-black">Details</h4>
              <h5 className="type" style={{ color: "#CB9B06" }}>
                {product.type}
              </h5>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <h4 className="text-muted">Images</h4>
              <div className="d-flex gap-3 flex-wrap">
                {product.ProductImages.length > 0 ? (
                  product.ProductImages.map((image, index) => (
                    <Image
                      key={index}
                      src={`http://localhost:8000/uploads/${image.image}`}
                      alt={`Product Thumbnail ${index + 1}`}
                      thumbnail
                      style={{ width: "150px", height: "150px" }}
                    />
                  ))
                ) : (
                  <p className="text-muted">No images available</p>
                )}
              </div>
            </Col>
            <Col xs={12} className="mt-4 text-end">
              <FaEdit
                className="text-warning"
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
                onClick={handleOpenModal}
              />
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
                name="Weight"
                value={editedProduct.Weight}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editedProduct.description}
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
