import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";
import { FaSearch, FaEdit } from "react-icons/fa";
import {
  addProductAPI,
  getAllproductsAPI,
  getAllcategoriesAPI,
  getAllSubcategoryByCategoryIdAPI,
} from "../../../src/api/api";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    category_id: "",
    subcategory_id: "",
    description: "",
    stock: "",
    Weight: "",
    shipping: "",
    packaging: "",
    making_Charges: "",
    making_charges_type: "percentage", // Default value for making charges type
    type: "",
    GstPercentage: "",
  });
  const navigate = useNavigate();

  // Fetch products
  const fetchProducts = async () => {
    try {
      const productsData = await getAllproductsAPI({});
      setProducts(productsData?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllcategoriesAPI({});
      if (categoriesData?.data) {
        setCategories(
          categoriesData.data.map((category) => ({
            value: category.id,
            label: category.name,
          }))
        );
      } else {
        console.error("Invalid categories response format:", categoriesData);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch subcategories based on selected category
  const fetchSubcategories = async (categoryId) => {
    try {
      const subcategoriesData = await getAllSubcategoryByCategoryIdAPI(
        categoryId
      );
      setSubcategories(
        subcategoriesData?.data.map((subcategory) => ({
          value: subcategory.id,
          label: subcategory.name,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Add product
  const handleAddProduct = async (product) => {
    try {
      await addProductAPI(product);
      fetchProducts(); // Refetch the products list after adding
      setShowModal(false);
      setProductData({
        name: "",
        category_id: "",
        subcategory_id: "",
        description: "",
        stock: "",
        Weight: "",
        shipping: "",
        packaging: "",
        making_Charges: "",
        making_charges_type: "percentage", // Reset default value
        type: "",
        GstPercentage: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Modal Handlers
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setProductData({
      ...productData,
      category_id: categoryId,
      subcategory_id: "",
    });
    fetchSubcategories(categoryId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct(productData);
  };

  return (
    <div className="container bg-white">
      <h2 className="my-4">Product Management</h2>

      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex align-items-center position-relative w-50">
          <Form.Control
            type="text"
            placeholder="Search by product name"
            className="w-100 pe-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="position-absolute end-0 me-3 text-muted" />
        </div>
        <Button variant="primary" onClick={handleShowModal}>
          <i className="fa fa-plus"></i> Add Product
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Price</th>
            <th>Making Charges</th>
            <th>Packaging</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/productDetails/${product.id}`)}
                >
                  {product.name}
                </td>
                <td>{product.Weight}</td>
                <td>{product.category?.name}</td>
                <td>{product.subcategory?.name}</td>
                <td>{product.price}</td>
                <td>{product.making_Charges}</td>
                <td>{product.packaging}</td>
                <td>
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none"
                    onClick={handleShowModal}
                  >
                    <FaEdit size={20} className="text-primary" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add Product Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter product name"
                value={productData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category_id"
                value={productData.category_id}
                onChange={handleCategoryChange}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subcategory</Form.Label>
              <Form.Select
                name="subcategory_id"
                value={productData.subcategory_id}
                onChange={handleInputChange}
              >
                <option value="">Select subcategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.value} value={subcategory.value}>
                    {subcategory.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* New Making Charges Type Field */}
            <Form.Group className="mb-3">
              <Form.Label>Making Charges Type</Form.Label>
              <Form.Select
                name="making_charges_type"
                value={productData.making_charges_type}
                onChange={handleInputChange}
              >
                <option value="percentage">Percentage</option>
                <option value="per_gram">Per Gram</option>
              </Form.Select>
            </Form.Group>

            {/* Other fields */}
            {[
              "Weight",
              "description",
              "stock",
              "shipping",
              "packaging",
              "making_Charges",
              "type",
              "GstPercentage",
            ].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>{field}</Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  placeholder={`Enter ${field}`}
                  value={productData[field]}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}

            <Button variant="primary" type="submit" className="w-100">
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Footer />
    </div>
  );
};

export default AddProductForm;
