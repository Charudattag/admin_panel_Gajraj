import React, { useState } from "react";
import { Table, Form, Button, Modal, Pagination, Badge } from "react-bootstrap";
import { FaSearch, FaEdit } from "react-icons/fa";
import Product from "../../assets/product.jpg";
import Bangals from "../../assets/Bengals.jpg";
import Footer from "./Footer";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri";

const AddCategoryForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setimageModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  // Sample categories list (you can replace this with actual data)
  const categories = [
    {
      id: 1,
      name: "Diamond Ring",
      description:
        "Native crystalline carbon that is the hardest known mineral",
      status: "isActive",
    },
    {
      id: 2,
      name: "Diamond Bengals",
      description:
        "Native crystalline carbon that is the hardest known mineral",
      status: "isActive",
    },
    {
      id: 3,
      name: "Gold Necklace",
      description: "A beautiful gold necklace",
      status: "isActive",
    },
    // Add more categories as needed
  ];

  // Filter categories based on search query
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleimageShowModal = () => setimageModal(true);
  const handleimageCloseModal = () => setimageModal(false);

  const handleEditImage = (productId) => {
    // Navigate to the edit image page or handle routing logic
    console.log("Navigate to Edit Image page for product ID:", productId);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query when the user types
  };

  return (
    <div className="container bg-white">
      <h2 className="my-4">Category Management</h2>

      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex align-items-center position-relative w-50">
          <Form.Control
            type="text"
            placeholder="Search by Category name"
            className="w-100 pe-5"
            value={searchQuery} // Bind search query to the input
            onChange={handleSearchChange} // Handle search query change
          />
          <FaSearch className="position-absolute end-0 me-3 text-muted" />
        </div>
        <Button variant="primary" onClick={handleShowModal}>
          <i className="fa fa-plus"></i> Add Category
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Status</th>
            {/* <th>Actions</th> */}
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <p>{category.description}</p>
                </td>
                <td>
                  <Badge bg="success">{category.status}</Badge>
                </td>
                {/* <td>
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none"
                    // onClick={() => handleEditImage(1)}
                  >
                    <FaEdit
                      size={20}
                      className="text-primary"
                      onClick={handleimageShowModal}
                    />
                  </Button>
                </td> */}
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      setimageModal(true);
                      setSelectedProjectIndex(index);
                    }}
                    style={{ color: "#fff" }}
                  >
                    Manage Images
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

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

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter category name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Description" />
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

      {/* Image modal */}
      <Modal show={imageModal} onHide={handleimageCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered>
            <thead>
              <tr>
                <th>Image</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* Example static data for demo */}
              <tr>
                <td>
                  <img
                    src={Product}
                    alt="Demo Image"
                    className="img-fluid"
                    style={{ maxWidth: 100 }}
                  />
                </td>
                <td>
                  <Button
                    variant="warning"
                    // onClick={() => alert("Edit action for this image")}
                    className="mt-2"
                    style={{ color: "#fff" }}
                  >
                    <RiEdit2Fill />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => alert("Delete action for this image")}
                  >
                    <RiDeleteBin4Fill />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>

          {/* Add New Image */}
          <div className="mt-3 d-flex flex-column">
            <label htmlFor="newImage" className="form-label">
              Add New Image
            </label>
            <Button
              variant="success"
              className="mt-2"
              // onClick={() => alert("Add New Image action triggered")}
            >
              <FaPlus /> Add Image
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <div style={{ marginTop: "80vh" }}>
        <Footer />
      </div>
    </div>
  );
};

export default AddCategoryForm;
