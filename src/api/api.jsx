import axios from "axios";

// Base URL for the API
const BASE_URL = "http://localhost:8000/api";
// const WEBSITE_URL = "https://api.trekpanda.in/api";

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Utility Functions
export const getToken = () => localStorage.getItem("authToken");

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logoutAPI = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
};

// Generalized API Request Function
const apiRequest = async (endpoint, data = null, method = "post") => {
  try {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await api.request({
      url: endpoint,
      method,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Authentication APIs
export const loginAPI = async (payload) => {
  const data = await apiRequest("/user/login", payload);
  if (data?.token) {
    localStorage.setItem("user", JSON.stringify(data.userDetails));
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const registerUserAPI = (userData) =>
  apiRequest("/users/register", userData);

// Add banner
export const addBannerAPI = (userData) =>
  apiRequest("/banner/addBanner", userData, "post");

export const addRateAPI = (userData) =>
  apiRequest("/productrate/addRate", userData, "post");

export const getlatestAllRatesAPI = (payload) =>
  apiRequest("/productrate/getAllRates", payload, "get");

export const updateRatesAPI = ({ id, ...data }) =>
  apiRequest(`/productrate/updateRate/${id}`, data, "post");

export const addProductAPI = (userData) =>
  apiRequest(`/product/addProduct`, userData, "post");

export const getAllproductsAPI = (payload) =>
  apiRequest("/product/getallproducts", payload, "get");

export const updateProductAPI = ({ id, ...data }) =>
  apiRequest(`/productrate/updateRate/${id}`, data, "post");

export const getAllcategoriesAPI = (payload) =>
  apiRequest("/category/getAllCategories", payload, "get");

export const getAllSubcategoriesAPI = (payload) =>
  apiRequest("/subcategory/getAllSubcategories", payload, "get");

export const getAllSubcategoryByCategoryIdAPI = (id) =>
  apiRequest(`/subcategory/getAllSubcategoryByCategoryId/${id}`, null, "get");

// export const getUserByUserId = (id) =>
//   apiRequest(`/users/getUserByUserId/${id}`, null, "get");

// export const updateUserAPI = (userData) =>
//   apiRequest("/users/updateProfile", userData);

// // Money APIs
// export const addMoneyAPI = (userData) =>
//   apiRequest("/money/addMoney", userData);

// export const getMoneyByIdAPI = (mobile) =>
//   apiRequest(`/money/getMoneyByMobile/${mobile}`, null, "get");

// export const deleteMoneyAPI = (id) =>
//   apiRequest(`/money/deleteentry/${id}`, null);

// // Project APIs
// export const addProjectAPI = (userData) =>
//   apiRequest("/projects/addProject", userData);

// export const getProjectsAPI = (payload) =>
//   apiRequest("/projects/getallproject", payload, "get");

// export const getProjectById = (id) =>
//   apiRequest(`/projects/getprojectbyid/${id}`, null, "get");

// // Vehicle APIs
// export const addVehicleAPI = (userData) =>
//   apiRequest("/vehicle/addVehicle", userData);

// export const getVehicleAPI = (payload) =>
//   apiRequest("/vehicle/getallVehicle", payload, "get");

// export const getVehicleById = (id) =>
//   apiRequest(`/vehicle/getvehiclebyid/${id}`, null, "get");

// export const updateFuelLogAPI = (id, updatedData) =>
//   apiRequest(`/fuellog/updateFuelLog/${id}`, updatedData);

// export const getFuelLogsAPI = (payload) =>
//   apiRequest(`/fuellog/getallFulllog`, payload, "get");

// export const deleteFuelLogAPI = (id) =>
//   apiRequest(`/fuellog/deletefuellog/${id}`, null);

// // Lead APIs
