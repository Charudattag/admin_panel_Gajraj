import React, { useState } from "react";
import { Table, Form, Button, Modal, Pagination } from "react-bootstrap";
import { FaSearch, FaEdit } from "react-icons/fa";
import Product from "../../assets/product.jpg";
import Bangals from "../../assets/Bengals.jpg";
import Footer from "./Footer";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri";

const AddSubcategooryForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setimageModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Sample subcategory data
  const subcategories = [
    {
      id: 1,
      name: "Diamond Ring",
      description: "native crystalline carbon",
      category: "Diamond",
    },
    {
      id: 2,
      name: "Diamond Bengals",
      description: "native crystalline carbon",
      category: "Gold",
    },
    // Add more sample data here
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter subcategories based on search term
  const filteredSubcategories = subcategories.filter((subcategory) =>
    subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <h2 className="my-4">SubCategories Management</h2>

      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex align-items-center position-relative w-50">
          <Form.Control
            type="text"
            placeholder="Search by Subcategory name"
            className="w-100 pe-5"
            value={searchTerm}
            onChange={handleSearchChange} // Add search functionality
          />
          <FaSearch className="position-absolute end-0 me-3 text-muted" />
        </div>
        <Button variant="primary" onClick={handleShowModal}>
          <i className="fa fa-plus"></i> Add Subcategory
        </Button>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Categories</th>

              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubcategories.length > 0 ? (
              filteredSubcategories.map((subcategory, index) => (
                <tr key={subcategory.id}>
                  <td>{index + 1}</td>
                  <td>{subcategory.name}</td>
                  <td>{subcategory.description}</td>
                  <td>{subcategory.category}</td>

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

      {/* Modal for adding subcategory */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add SubCategories</Modal.Title>
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

      {/* Modal for editing image */}
      {/* <Modal show={imageModal} onHide={handleimageCloseModal} centered>
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
      </Modal> */}

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

export default AddSubcategooryForm;
