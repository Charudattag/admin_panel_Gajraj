import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal, Pagination } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Footer from "./Footer";
import { getAllCustomerAPI } from "../../../src/api/api";

const AddCustomerForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setimageModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getAllCustomerAPI();
        setCustomers(response.data);
      } catch (err) {
        setError("Failed to fetch customer data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleimageShowModal = () => setimageModal(true);
  const handleimageCloseModal = () => setimageModal(false);

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
            onChange={handleSearchChange}
          />
          <FaSearch className="position-absolute end-0 me-3 text-muted" />
        </div>
        {/* <Button variant="primary" onClick={handleShowModal}>
          <i className="fa fa-plus"></i> Add Customer
        </Button> */}
      </div>

      <div className="table-responsive">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-danger">{error}</div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>{index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.mobile}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
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
              <Form.Label>Address</Form.Label>
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

      <div style={{ marginTop: "80vh" }}>
        <Footer />
      </div>
    </div>
  );
};

export default AddCustomerForm;
