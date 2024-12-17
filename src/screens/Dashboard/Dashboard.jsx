import React from "react";
import "./Dashboard.scss";
import { Table, Button, Pagination, Badge } from "react-bootstrap";
import Footer from "../Otherpages/Footer";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        {/* Total Orders */}
        <div className="col-xl-4 col-lg-6 ">
          <div className="card l-bg-cherry overflow-hidden">
            <div className="card-statistic-3 p-4 ">
              <div className="card-icon card-icon-large ">
                <i className="fas fa-shopping-bag"></i>{" "}
                {/* Shopping Bag Icon */}
              </div>
              <div className="mb-4">
                <h5 className="card-title mb-0">Total Orders</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">3,243</h2>{" "}
                  {/* Example value */}
                </div>
                <div className="col-4 text-right">
                  {/* <span>
                    12.5% <i className="fa fa-arrow-up"></i>
                  </span> */}
                </div>
              </div>
              {/* <div className="progress mt-1" style={{ height: "8px" }}>
                <div
                  className="progress-bar l-bg-cyan"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="col-xl-4 col-lg-6">
          <div className="card l-bg-blue-dark overflow-hidden">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-users"></i> {/* Users Icon */}
              </div>
              <div className="mb-4">
                <h5 className="card-title mb-0">Total Customers</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">15.07k</h2>{" "}
                  {/* Example value */}
                </div>
                <div className="col-4 text-right">
                  {/* <span>
                    9.23% <i className="fa fa-arrow-up"></i>
                  </span> */}
                </div>
              </div>
              {/* <div className="progress mt-1" style={{ height: "8px" }}>
                <div
                  className="progress-bar l-bg-green"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="col-xl-4 col-lg-6">
          <div className="card l-bg-green-dark overflow-hidden">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-box"></i> {/* Box Icon for Products */}
              </div>
              <div className="mb-4">
                <h5 className="card-title mb-0">Total Products</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">1,200</h2>{" "}
                  {/* Example value */}
                </div>
                <div className="col-4 text-right">
                  {/* <span>
                    5% <i className="fa fa-arrow-up"></i>
                  </span> */}
                </div>
              </div>
              {/* <div className="progress mt-1" style={{ height: "8px" }}>
                <div
                  className="progress-bar l-bg-orange"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Total Categories */}
        <div className="col-xl-4 col-lg-6">
          <div className="card l-bg-orange-dark overflow-hidden">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-tags"></i> {/* Tag Icon for Categories */}
              </div>
              <div className="mb-1">
                <h5 className="card-title mb-0">Total Categories</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">50</h2>{" "}
                  {/* Example value */}
                </div>
                <div className="col-4 text-right">
                  {/* <span>
                    3% <i className="fa fa-arrow-up"></i>
                  </span> */}
                </div>
              </div>
              {/* <div className="progress mt-1" style={{ height: "8px" }}>
                <div
                  className="progress-bar l-bg-cyan"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Total Subcategories */}
        <div className="col-xl-4 col-lg-6">
          <div className="card l-bg-green overflow-hidden">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-th-large"></i>{" "}
                {/* Thumbnails Icon for Subcategories */}
              </div>
              <div className="mb-1">
                <h5 className="card-title mb-0">Total Subcategories</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0">200</h2>{" "}
                  {/* Example value */}
                </div>
                <div className="col-4 text-right">
                  {/* <span>
                    7% <i className="fa fa-arrow-up"></i>
                  </span> */}
                </div>
              </div>
              {/* <div className="progress mt-1" style={{ height: "8px" }}>
                <div
                  className="progress-bar l-bg-orange"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Today's Rate */}
        <div className="col-xl-4 col-lg-6 ">
          <div className="card l-bg-orange overflow-hidden">
            <div className="card-statistic-3 p-4">
              <div className="card-icon card-icon-large">
                <i className="fas fa-percentage"></i>{" "}
                {/* Percentage Icon for Rate */}
              </div>
              <div className="mb-1">
                <h5 className="card-title mb-0">Today's Rate</h5>
              </div>
              <div className="row align-items-center mb-2 d-flex">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0"> ₹ 36000</h2>{" "}
                  {/* Example rate */}
                </div>
                <div className="col-4 text-right">
                  {/* <span>
                    1% <i className="fa fa-arrow-up"></i>
                  </span> */}
                </div>
              </div>
              {/* <div className="progress mt-1" style={{ height: "8px" }}>
                <div
                  className="progress-bar l-bg-cyan"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Last 5 Orders Table */}
      <div className="row mt-1">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Orders</h5>
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Mob</th>
                      <th>Customer Name</th>
                      <th>Product</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Example rows */}
                    <tr>
                      <td>1</td>
                      <td>1234567890</td>
                      <td>John Doe</td>
                      <td>Gold Necklace</td>
                      <td>
                        <Badge bg="success">Active</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>9876543210</td>
                      <td>Jane Smith</td>
                      <td>Silver Ring</td>
                      <td>
                        <Badge bg="danger">Inactive</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>5555555555</td>
                      <td>Mark Johnson</td>
                      <td>Diamond Earrings</td>
                      <td>
                        <Badge bg="success">Active</Badge>
                      </td>
                    </tr>
                    {/* Repeat for other rows */}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="pagination mt-4 text-center">
                <Pagination>
                  <Pagination.Item active>{1}</Pagination.Item>
                  <Pagination.Item>{2}</Pagination.Item>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "40vh" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
