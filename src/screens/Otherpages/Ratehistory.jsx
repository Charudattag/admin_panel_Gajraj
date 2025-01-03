import React, { useState, useEffect } from "react";
import { getAllratehistoryAPI } from "../../../src/api/api";
import { Table, Pagination, Dropdown, Row, Col } from "react-bootstrap";

const Ratehistory = () => {
  const [rateHistory, setRateHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchRateHistory = async () => {
    try {
      const rateHistoryData = await getAllratehistoryAPI({});
      setRateHistory(rateHistoryData?.data || []);
    } catch (error) {
      console.error("Error fetching rate history:", error);
    }
  };

  useEffect(() => {
    fetchRateHistory();
  }, []);

  const totalItems = rateHistory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentPageClamped = Math.min(Math.max(currentPage, 1), totalPages);

  const indexOfLastItem = currentPageClamped * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rateHistory.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white container">
      <div className="container">
        <h1>Rate History</h1>

        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Gold</th>
              <th>Silver</th>
              <th>Effective Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{item.Gold}</td>
                  <td>{item.Silver}</td>
                  <td>{item.rateDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No rate history available
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Row className="mt-5">
          <Col md={4}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-items-per-page">
                Items per page: {itemsPerPage}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {[10, 20, 30].map((items) => (
                  <Dropdown.Item
                    key={items}
                    onClick={() => handleItemsPerPageChange(items)}
                  >
                    {items}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col md={8} className="text-right">
            <Pagination className="justify-content-end">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPageClamped - 1)}
                disabled={currentPageClamped === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPageClamped}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPageClamped + 1)}
                disabled={currentPageClamped === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Ratehistory;
