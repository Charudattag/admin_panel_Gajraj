import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Table } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin4Fill, RiEdit2Fill } from "react-icons/ri";
import Footer from "./Footer";

function Banners() {
  const [projects, setProjects] = useState([
    {
      title: "Banner 1",
      image: "src/assets/Banner 1.jpg",
      link: "Link A",

      images: [{ file: null, url: "src/assets/Banner 1.jpg" }],
    },
    {
      title: "Banner 2",
      image: "src/assets/Banner 2.jpg",
      link: "Link B",

      images: [{ file: null, url: "src/assets/Banner 2.jpg" }],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    image: "",

    link: "",
    images: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const fileInputRefs = useRef([]);

  // Pagination logic
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const currentProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for project modal
  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProject({ ...newProject, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleAddOrUpdateProject = () => {
    if (selectedProjectIndex !== null) {
      const updatedProjects = projects.map((proj, index) =>
        index === selectedProjectIndex ? newProject : proj
      );
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, newProject]);
    }
    setNewProject({
      title: "",
      image: "",

      link: "",
      images: [],
    });
    setSelectedProjectIndex(null);
    setShowModal(false);
  };

  const handleEditProject = (index) => {
    setNewProject(projects[index]);
    setSelectedProjectIndex(index);
    setShowModal(true);
  };

  const handleDeleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  // Handlers for image modal
  const handleFileInputTrigger = (imageIndex) => {
    if (fileInputRefs.current[imageIndex]) {
      fileInputRefs.current[imageIndex].click();
    }
  };

  const handleImageUpdate = (imageIndex, event) => {
    const file = event.target.files[0];
    const updatedImage = { file: file, url: URL.createObjectURL(file) };

    const updatedProjects = projects.map((proj, index) =>
      index === selectedProjectIndex
        ? {
            ...proj,
            images: proj.images.map((img, i) =>
              i === imageIndex ? updatedImage : img
            ),
          }
        : proj
    );
    setProjects(updatedProjects);
  };

  const handleDeleteImage = (imageIndex) => {
    const updatedProjects = projects.map((proj, index) =>
      index === selectedProjectIndex
        ? { ...proj, images: proj.images.filter((_, i) => i !== imageIndex) }
        : proj
    );
    setProjects(updatedProjects);
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    const newImage = { file: file, url: URL.createObjectURL(file) };

    const updatedProjects = projects.map((proj, index) =>
      index === selectedProjectIndex
        ? { ...proj, images: [...proj.images, newImage] }
        : proj
    );
    setProjects(updatedProjects);
  };

  return (
    <div className="container bg-white">
      <h2 className="text-left mb-4">Banner Management</h2>
      <Button
        variant="primary"
        onClick={() => {
          setShowModal(true);
          setSelectedProjectIndex(null);
        }}
        className="mb-3 d-flex gap-2"
        style={{ marginLeft: "85%" }}
      >
        <FaPlus />
        Add Banners
      </Button>

      <Table bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>image</th>
            <th>Link</th>
            <th>Images</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project, index) => (
            <tr key={index}>
              <td>{project.title}</td>
              <td>
                <img
                  src={project.image}
                  alt={project.title}
                  className="img-fluid"
                  style={{ maxWidth: 100 }}
                />
              </td>

              <td>{project.link}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => {
                    setShowImageModal(true);
                    setSelectedProjectIndex(index);
                  }}
                  style={{ color: "#fff" }}
                >
                  Manage Images
                </Button>
              </td>
              <td>
                <div className="d-flex gap-1">
                  <Button
                    variant="warning"
                    onClick={() => handleEditProject(index)}
                    className="me-2"
                    style={{ color: "#fff" }}
                  >
                    <RiEdit2Fill />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProject(index)}
                  >
                    <RiDeleteBin4Fill />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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

      {/* Project Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedProjectIndex !== null
              ? "Update Project"
              : "Add New Project"}
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
              value={newProject.title}
              onChange={handleProjectInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="link" className="form-label">
              Link
            </label>
            <textarea
              className="form-control"
              id="link"
              name="link"
              rows="3"
              value={newProject.link}
              onChange={handleProjectInputChange}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateProject}>
            {selectedProjectIndex !== null ? "Update" : "Add"} Banner
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Image Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
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
              {projects[selectedProjectIndex]?.images.map(
                (image, imageIndex) => (
                  <tr key={imageIndex}>
                    <td>
                      <img
                        src={image.url}
                        alt={`Project Image ${imageIndex + 1}`}
                        className="img-fluid"
                        style={{ maxWidth: 100 }}
                      />
                    </td>
                    <td>
                      <input
                        ref={(el) => {
                          if (!fileInputRefs.current[imageIndex]) {
                            fileInputRefs.current[imageIndex] = el;
                          }
                        }}
                        type="file"
                        className="d-none"
                        accept="image/*"
                        onChange={(e) => handleImageUpdate(imageIndex, e)}
                      />
                      <Button
                        variant="warning"
                        onClick={() => handleFileInputTrigger(imageIndex)}
                        className="mt-2"
                        style={{ color: "#fff" }}
                      >
                        <RiEdit2Fill />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteImage(imageIndex)}
                      >
                        <RiDeleteBin4Fill />
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>

          {/* Add New Image */}
          <div className="mt-3 d-flex flex-column">
            <label htmlFor="newImage" className="form-label">
              Add New Image
            </label>
            <input
              type="file"
              className="form-control d-none"
              id="newImage"
              accept="image/*"
              onChange={handleAddImage}
              ref={fileInputRefs}
            />
            <Button
              variant="success"
              className="mt-2"
              onClick={() => fileInputRefs.current.click()}
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
}

export default Banners;
