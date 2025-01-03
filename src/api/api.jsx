import axios from "axios";

// Base URL for the API
const BASE_URL = "http://localhost:8000/api";
// const BASE_URL = "https://gajraj-backend-updated.onrender.com/api";
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

export const getAllBannerAPI = (payload) =>
  apiRequest("/banner/getAllBanners", payload, "get");

export const updateBannerAPI = ({ id, ...data }) =>
  apiRequest(`/banner/updateBanner/${id}`, data, "post");

export const updateProductImageAPI = (data) =>
  apiRequest(`/productimage/updateProductImage`, data, "post");

export const getByBannerIdAPI = (bannerId) =>
  apiRequest(`/productimage/getByBannerId/${bannerId}`, null, "get");

export const deleteBannerAPI = (id) =>
  apiRequest(`/banner/deleteBanner/${id}`, "post");

export const toggleBannerStatusApi = (id) =>
  apiRequest(`/banner/toggleBannerStatus/${id}`, "post");
export const deleteProductImageAPI = (id) =>
  apiRequest(`/productimage/deleteProductImage/${id}`, null, "delete");

export const uploadImageAPI = (userData) =>
  apiRequest("/productimage/addProductImages", userData, "post");

// All Rate API
export const addRateAPI = (userData) =>
  apiRequest("/productrate/addRate", userData, "post");

export const getAllratehistoryAPI = (payload) =>
  apiRequest("/productrate/getAllRates", payload, "get");

export const getlatestAllRatesAPI = (payload) =>
  apiRequest("/productrate/getAlllatest", payload, "get");

export const updateRatesAPI = ({ id, ...data }) =>
  apiRequest(`/productrate/updateRate/${id}`, data, "post");

//  ALL Product API
export const addProductAPI = (userData) =>
  apiRequest(`/product/addProduct`, userData, "post");

export const updateProductAPI = ({ id, ...data }) =>
  apiRequest(`/product/updatebyid/${id}`, data, "post");

export const getAllproductsAPI = (payload) =>
  apiRequest("/product/getallproducts", payload, "get");

// update rate api
export const updateProductRateAPI = ({ id, ...data }) =>
  apiRequest(`/product/updateRate/${id}`, data, "post");

export const getByproductIdAPI = (productId) =>
  apiRequest(`/productimage/getByProductId/${productId}`, null, "get");

export const getProductByIdAPI = (id) =>
  apiRequest(`/product/getProductById/${id}`, null, "get");

// all category API
export const addCategoryAPI = (userData) =>
  apiRequest(`/category/addCategory`, userData, "post");

export const updateCategoryAPI = ({ id, ...data }) =>
  apiRequest(`/category/updateCategory/${id}`, data, "post");

export const getAllcategoriesAPI = (payload) =>
  apiRequest("/category/getAllCategories", payload, "get");

// Subcategory API
export const getAllSubcategoriesAPI = (payload) =>
  apiRequest("/subcategory/getAllSubcategories", payload, "get");

export const getAllSubcategoryByCategoryIdAPI = (id) =>
  apiRequest(`/subcategory/getAllSubcategoryByCategoryId/${id}`, null, "get");

export const addSubcategopryAPI = (userData) =>
  apiRequest("/subcategory/addSubcategory", userData, "post");

export const updateSubcategoryAPI = ({ id, ...data }) =>
  apiRequest(`/subcategory/updateSubcategory/${id}`, data, "post");

export const addCustomerAPI = (userData) =>
  apiRequest(`/customer/createcustomer`, userData, "post");

export const getAllCustomerAPI = (payload) =>
  apiRequest("/customer/getallcustomers", payload, "get");

export const getAllOrderAPI = (payload) =>
  apiRequest("/orderitems/getAllOrderItems", payload, "get");

export const updateOrderstatusAPI = ({ orderItemId, ...data }) =>
  apiRequest(`/orderitems/updateOrderItemStatus/${orderItemId}`, data, "post");
