import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Modal,
  Button,
  Table,
  Badge,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri";
import Footer from "./Footer";

function Orders() {
  const [projects, setProjects] = useState([
    {
      name: "Rutvik Patil",
      mobile: "9511225460",
      product: "Diamond Rings",
      status: "Placed",
      date: "2024-12-10",
    },
    {
      name: "Suraj Suryawanshi",
      mobile: "7387627510",
      product: "Diamond Necklace",
      status: "Canceled",
      date: "2024-12-08",
    },
    {
      name: "Prathamesh Patil",
      mobile: "9876543210",
      product: "Gold Ring",
      status: "Placed",
      date: "2024-12-05",
    },
    {
      name: "Pratik Gaikwad",
      mobile: "9087654321",
      product: "Gold Necklace",
      status: "Canceled",
      date: "2024-12-01",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtered projects based on search query
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container bg-white ">
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

      <div className="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Product</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr key={index}>
                <td>{project.name}</td>
                <td>{project.mobile}</td>
                <td>{project.product}</td>
                <td>
                  <Badge
                    bg={
                      project.status.toLowerCase() === "canceled"
                        ? "danger"
                        : "success"
                    }
                  >
                    {project.status}
                  </Badge>
                </td>
                <td>{project.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination Controls */}
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
      <div style={{ marginTop: "60vh" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Orders;
