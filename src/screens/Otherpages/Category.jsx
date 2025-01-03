import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal, Pagination } from "react-bootstrap";
import { FaSearch, FaPlus, FaEdit } from "react-icons/fa";
import Footer from "./Footer";
import {
  addCategoryAPI,
  getAllcategoriesAPI,
  updateCategoryAPI,
} from "../../../src/api/api";
import { toast } from "react-toastify";

const AddCategoryForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: null,
    banner: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllcategoriesAPI({});
      if (categoriesData?.data) {
        setCategories(categoriesData.data);
      } else {
        console.error("Invalid categories response format:", categoriesData);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setNewCategory({
      name: "",
      description: "",
      image: null,
      banner: null,
    });
    setSelectedCategoryId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleAddCategory = async () => {
    if (!newCategory.name) {
      toast.error("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("description", newCategory.description);
    if (newCategory.image) formData.append("images", newCategory.image);
    if (newCategory.banner)
      formData.append("Category_Banner", newCategory.banner);

    try {
      const response = await addCategoryAPI(formData);
      if (response.success) {
        toast.success("Category added successfully");
        fetchCategories();
        handleCloseModal();
      } else {
        alert(response.error || "Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("An error occurred while adding the category");
    }
  };

  const handleEditCategory = (category) => {
    setEditMode(true);
    setSelectedCategoryId(category.id);
    setNewCategory({
      name: category.name,
      description: category.description,
      image: null,
      banner: null,
    });
    handleShowModal();
  };

  const handleUpdateCategory = async () => {
    if (!newCategory.name) {
      toast.error("Category name is required");
      return;
    }

    const updateData = {
      name: newCategory.name,
      description: newCategory.description,
      image: newCategory.image,
      banner: newCategory.banner,
    };

    try {
      const response = await updateCategoryAPI({
        id: selectedCategoryId,
        ...updateData,
      });
      if (response.success) {
        toast.success("Category updated successfully");
        fetchCategories();
        handleCloseModal();
      } else {
        alert(response.error || "Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("An error occurred while updating the category");
    }
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container bg-white">
      <h2 className="my-4">Category Management</h2>

      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex align-items-center position-relative w-50">
          <Form.Control
            type="text"
            placeholder="Search by Category name"
            className="w-100 pe-5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="position-absolute end-0 me-3 text-muted" />
        </div>
        <Button variant="primary" onClick={handleShowModal}>
          <FaPlus /> Add Category
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Banner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <tr key={category.id || index}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  {category.image ? (
                    <img
                      src={`http://localhost:8000/uploads/${category.image}`}
                      alt={""}
                      style={{ width: "50px", height: "auto" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <img
                    src={`http://localhost:8000/uploads/${category.Category_Banner}`}
                    alt={""}
                    style={{ width: "50px", height: "auto" }}
                  />
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEditCategory(category)}
                  >
                    <FaEdit /> Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Edit Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Banner</Form.Label>
              <Form.Control
                type="file"
                name="banner"
                onChange={handleFileChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                className="ms-2"
                onClick={editMode ? handleUpdateCategory : handleAddCategory}
              >
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Footer style={{ marginTop: "80vh" }} />
    </div>
  );
};

export default AddCategoryForm;
