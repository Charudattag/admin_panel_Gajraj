import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";
import { FaSearch, FaEdit } from "react-icons/fa";
import {
  addProductAPI,
  getAllproductsAPI,
  getAllcategoriesAPI,
  getAllSubcategoryByCategoryIdAPI,
  updateProductAPI,
} from "../../../src/api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    id: "",
    name: "",
    category_id: "",
    subcategory_id: "",
    description: "",
    stock: "",
    Weight: "",
    shipping: "",
    packaging: "",
    making_Charges: "",
    making_charges_type: "percentage",
    type: "",
    GstPercentage: "",
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await getAllproductsAPI({});
      setProducts(response?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await getAllcategoriesAPI({});
      if (response?.data) {
        setCategories(
          response.data.map((category) => ({
            value: category.id,
            label: category.name,
          }))
        );
      } else {
        console.error("Invalid categories response format:", response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch subcategories by category ID
  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await getAllSubcategoryByCategoryIdAPI(categoryId);
      setSubcategories(
        response?.data.map((subcategory) => ({
          value: subcategory.id,
          label: subcategory.name,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Add or update product
  const handleAddOrUpdateProduct = async () => {
    try {
      console.log("Product data to be sent:", productData);

      if (isEdit) {
        if (!productData.id) {
          console.error("Product ID is missing. Cannot update product.");
          toast.error("Product ID is missing. Please try again.");
          return;
        }

        await updateProductAPI(productData);
        toast.success("Product updated successfully!");
      } else {
        await addProductAPI(productData);
        toast.success("Product added successfully!");
      }

      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error(
        isEdit ? "Error updating product:" : "Error adding product:",
        error
      );
      toast.error(
        isEdit
          ? "Error updating product. Please try again."
          : "Error adding product. Please try again."
      );
    }
  };

  // Reset form data
  const resetForm = () => {
    setProductData({
      id: "",
      name: "",
      category_id: "",
      subcategory_id: "",
      description: "",
      stock: "",
      Weight: "",
      shipping: "",
      packaging: "",
      making_Charges: "",
      making_charges_type: "percentage",
      type: "",
      GstPercentage: "",
    });
    setIsEdit(false);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Handle modal open
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setProductData((prevData) => ({
      ...prevData,
      category_id: categoryId,
      subcategory_id: "",
    }));
    fetchSubcategories(categoryId);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddOrUpdateProduct(productData);
  };

  const handleEditProduct = (id) => {
    console.log("Editing product with ID:", id);

    const product = products.find((product) => product.id === id);

    setIsEdit(true);
    setShowModal(true);

    if (product) {
      setProductData({
        id: id,
        name: product.name,
        category_id: product.category_id,
        subcategory_id: product.subcategory_id,
        description: product.description,
        stock: product.stock,
        Weight: product.Weight,
        shipping: product.shipping,
        packaging: product.packaging,
        making_Charges: product.making_Charges,
        making_charges_type: product.making_charges_type,
        type: product.type,
        GstPercentage: product.GstPercentage,
      });
    } else {
      console.error("Product not found");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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

            <th>Price</th>

            <th>Actions</th>
            <th>Image</th>
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
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/productDetails/${product.id}`)}
                >
                  {product.Weight}
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/productDetails/${product.id}`)}
                >
                  {product.category?.name}
                </td>

                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/productDetails/${product.id}`)}
                >
                  {product.price}
                </td>

                <td>
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <FaEdit size={20} className="text-primary" />
                  </Button>
                </td>
                <td>
                  <Link to={`/addproductImage/${product.id}`}>
                    <Button>Add Image</Button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">
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

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={productData.type}
                onChange={handleInputChange}
              >
                <option value="">Select type</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
              </Form.Select>
            </Form.Group>

            {[
              "Weight",
              "description",
              "stock",
              "shipping",
              "packaging",
              "making_Charges",
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

            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddProductForm;
