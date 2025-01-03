import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Table,
  Badge,
  InputGroup,
  FormControl,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { FaSearch, FaEdit } from "react-icons/fa";
import Footer from "./Footer";
import { getAllOrderAPI, updateOrderstatusAPI } from "../../../src/api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderItemId, setSelectedOrderItemId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const itemsPerPage = 10;

  const statusColors = {
    PENDING: "warning",
    PROCESSING: "primary",
    SHIPPED: "info",
    DELIVERED: "success",
    CANCELLED: "danger",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getAllOrderAPI();
        if (response.success) {
          const formattedOrders = response.data.map((order) => ({
            orderItemId: order.id,
            name: order.Customer.name,
            mobile: order.Customer.email,
            product: order.Product.name,
            price: order.Product.price.toFixed(2),
            quantity: order.quantity,
            totalAmount: order.Order.final_amount,
            status: order.Order.status,
            date: new Date(order.createdAt).toLocaleDateString(),
          }));
          setOrders(formattedOrders);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditClick = (orderItemId, currentStatus) => {
    console.log(orderItemId, "orderItemId");
    setSelectedOrderItemId(orderItemId);
    setNewStatus(currentStatus);
    setShowModal(true);
  };

  const handleStatusChange = (status) => {
    setNewStatus(status);
  };

  const handleUpdateStatus = async () => {
    console.log("Selected Order Item ID:", selectedOrderItemId);
    console.log("New Status:", newStatus);

    if (!selectedOrderItemId || !newStatus) {
      console.error("Missing order item ID or status");
      return;
    }

    try {
      const response = await updateOrderstatusAPI(orderItemId, {
        status: newStatus,
      });

      if (response.success) {
        console.log("Status updated successfully");

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderItemId === selectedOrderItemId
              ? { ...order, status: newStatus }
              : order
          )
        );
        setShowModal(false);
      } else {
        console.error("Failed to update status:", response.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="container bg-white">
      <h2 className="text-left mb-4">Orders Management</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "100%" }} className="d-flex">
          <FormControl
            type="text"
            placeholder="Search by customer name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control-lg form-control-sm w-75 w-md-50"
          />
          <InputGroup.Text className="order-1 order-md-0">
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="table-responsive">
          <Table bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.mobile}</td>
                  <td>{order.product}</td>
                  <td>{order.price}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                    <Badge bg={statusColors[order.status] || "secondary"}>
                      {order.status}
                    </Badge>
                    <FaEdit
                      onClick={() =>
                        handleEditClick(order.orderItemId, order.status)
                      }
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    />
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Modal for editing order status */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown onSelect={handleStatusChange}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {newStatus || "Select Status"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {[
                "PENDING",
                "PROCESSING",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED",
              ].map((status) => (
                <Dropdown.Item key={status} eventKey={status}>
                  {status}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateStatus}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ marginTop: "60vh" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Orders;
