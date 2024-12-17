import React, { useState } from "react";
import { Table, Form, Button, Modal, Pagination } from "react-bootstrap";
import { FaSearch, FaEdit } from "react-icons/fa";
import Product from "../../assets/product.jpg";
import Bangals from "../../assets/Bengals.jpg";
import Footer from "./Footer";

const AddSubcategooryForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setimageModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Sample customer data
  const subcategories = [
    {
      id: 1,
      name: "Swarup Gadale",
      Mobile: "7387627510",
      email: "person1@gmail.com",
      address: "Pune",
    },
    {
      id: 2,
      name: " Prathamesh",
      Mobile: "9511225460",
      email: "person2@gmail.com",
      address: "Mumbai",
    },
    // Add more sample data here
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter subcategories based on search term
  const filteredSubcategories = subcategories.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleimageShowModal = () => setimageModal(true);
  const handleimageCloseModal = () => setimageModal(false);

  const handleEditImage = (productId) => {
    // Navigate to the edit image page or handle routing logic
    console.log("Navigate to Edit Image page for product ID:", productId);
  };

  return (
    <div className="container bg-white">
      <h2 className="my-4">Customers Management</h2>

      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex align-items-center position-relative w-50">
          <Form.Control
            type="text"
            placeholder="Search by customer name"
            className="w-100 pe-5"
            value={searchTerm}
            onChange={handleSearchChange} // Add search functionality
          />
          <FaSearch className="position-absolute end-0 me-3 text-muted" />
        </div>
        <Button variant="primary" onClick={handleShowModal}>
          <i className="fa fa-plus"></i> Add Customer
        </Button>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubcategories.length > 0 ? (
              filteredSubcategories.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.Mobile}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No subcategories found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Form.Select aria-label="Select limit" className="w-auto">
          <option value={10}>10 </option>
          <option value={20}>20 </option>
          <option value={50}>50 </option>
        </Form.Select>

        <Pagination>
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
        </Pagination>
      </div>

      {/* Modal for adding customer */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Customers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" placeholder="Enter Mobile" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter Email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>address</Form.Label>
              <Form.Control type="text" placeholder="Enter Address" />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="button" variant="primary" className="ms-2">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing image */}
      <Modal show={imageModal} onHide={handleimageCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Description" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option value="">Select category</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Accessories">Accessories</option>
                <option value="Diamond">Diamond</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="button" variant="primary" className="ms-2">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <div style={{ marginTop: "80vh" }}>
        <Footer />
      </div>
    </div>
  );
};

export default AddSubcategooryForm;
