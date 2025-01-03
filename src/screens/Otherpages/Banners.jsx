import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Table } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import Footer from "./Footer";
import {
  addBannerAPI,
  getAllBannerAPI,
  updateBannerAPI,
  deleteBannerAPI,
  uploadImageAPI, // Add the API function to handle image uploads
  toggleBannerStatusApi, // Import toggleBannerStatusApi
} from "../../../src/api/api";
import { Link } from "react-router-dom";

function Banners() {
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false); // State for image upload modal
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    text: "",
    link: "",
  });
  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for the selected image

  const fetchBanners = useCallback(async () => {
    try {
      const bannersData = await getAllBannerAPI();
      if (bannersData?.data) {
        setBanners(bannersData.data);
      } else {
        console.error("Invalid banners response format:", bannersData);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setFormData({
      title: "",
      subTitle: "",
      text: "",
      link: "",
    });
    setSelectedBannerId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBanner = async () => {
    if (
      !formData.title ||
      !formData.subTitle ||
      !formData.text ||
      !formData.link
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await addBannerAPI(formData);
      if (response?.status === 201) {
        fetchBanners();
        handleCloseModal();
        toast.success("Banner added successfully");
      }
    } catch (error) {
      console.error("Error adding banner:", error);
      toast.error("An error occurred while adding the banner");
    }
  };

  const handleEditBanner = (banner) => {
    setEditMode(true);
    setSelectedBannerId(banner.id);
    setFormData({
      title: banner.title,
      subTitle: banner.subTitle,
      text: banner.text,
      link: banner.link,
    });
    handleShowModal();
  };

  const handleUpdateBanner = async () => {
    if (
      !formData.title ||
      !formData.subTitle ||
      !formData.text ||
      !formData.link
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await updateBannerAPI({
        id: selectedBannerId,
        ...formData,
      });
      response?.success;

      fetchBanners();
      handleCloseModal();
      toast.success("Banner updated successfully");
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error("An error occurred while updating the banner");
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      const response = await deleteBannerAPI(id);
      if (response?.success) {
        toast.success("Banner deleted successfully");
        fetchBanners();
      } else {
        toast.error(response?.error || "Failed to delete banner");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("An error occurred while deleting the banner");
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Set the selected image
  };

  const handleUploadImage = async () => {
    if (!selectedImage) {
      toast.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("images", selectedImage);
    formData.append("bannerId", selectedBannerId);

    try {
      const response = await uploadImageAPI(formData);
      response?.success;

      setShowImageModal(false);
      fetchBanners();
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("An error occurred while uploading the image");
    }
  };

  // Handle toggle for is_active
  const handleToggleBannerStatus = async (id, currentStatus) => {
    try {
      const response = await toggleBannerStatusApi(id, currentStatus);
      if (response?.success) {
        fetchBanners();
        toast.success(
          `Banner status updated to ${currentStatus ? "inactive" : "active"}`
        );
      } else {
        toast.error("Failed to update banner status");
      }
    } catch (error) {
      console.error("Error toggling banner status:", error);
      toast.error("An error occurred while updating the banner status");
    }
  };

  return (
    <div className="container bg-white">
      <h2 className="text-left mb-4">Banner Management</h2>
      <Button
        variant="primary"
        onClick={handleShowModal}
        className="mb-3 d-flex gap-2"
        style={{ marginLeft: "85%" }}
      >
        <FaPlus />
        Add Banner
      </Button>

      <Table bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Link</th>
            <th>Text</th>
            <th>Status</th> {/* New Status Column */}
            <th>Modify Images</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner, index) => (
            <tr key={index}>
              <td>{banner.title}</td>
              <td>{banner.subTitle}</td>
              <td>{banner.text}</td>
              <td>{banner.link}</td>

              {/* Status Checkbox */}
              <td>
                <input
                  type="checkbox"
                  checked={banner.is_active}
                  onChange={() =>
                    handleToggleBannerStatus(banner.id, banner.is_active)
                  }
                />
              </td>

              <td>
                <Link to={`/bannerImage/${banner.id}`}>
                  <Button>Add Image</Button>
                </Link>
              </td>
              <td>
                <div className="d-flex gap-1">
                  <Button
                    variant="warning"
                    onClick={() => handleEditBanner(banner)}
                    className="me-2"
                    style={{ color: "#fff" }}
                  >
                    <RiEdit2Fill />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBanner(banner.id)}
                  >
                    <RiDeleteBin4Fill />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Banner Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Update Banner" : "Add New Banner"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subTitle" className="form-label">
              SubTitle
            </label>
            <input
              type="text"
              className="form-control"
              id="subTitle"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Text
            </label>
            <textarea
              className="form-control"
              id="text"
              name="text"
              rows="3"
              value={formData.text}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="link" className="form-label">
              Link
            </label>
            <input
              type="text"
              className="form-control"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {editMode ? (
            <Button variant="primary" onClick={handleUpdateBanner}>
              Update Banner
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAddBanner}>
              Add Banner
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Image Upload Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUploadImage}>
            Upload Image
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
}

export default Banners;
