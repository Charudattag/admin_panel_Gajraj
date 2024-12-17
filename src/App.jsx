import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/common.scss";
import ScrollToTop from "./Component/ScrollToTop/ScrollToTop";
const Login = lazy(() => import("./screens/login/Login"));
const Layout = lazy(() => import("./Component/Layout/Layout"));
const Dashboard = lazy(() => import("./screens/Dashboard/Dashboard"));
const Overview = lazy(() => import("./screens/Overview/Overview"));
const Product = lazy(() => import("./screens/Otherpages/Product"));
const SubCategories = lazy(() => import("./screens/Otherpages/SubCategories"));
const Category = lazy(() => import("./screens/Otherpages/Category"));
const Customer = lazy(() => import("./screens/Otherpages/Customer"));
const Banners = lazy(() => import("./screens/Otherpages/Banners"));
const Testimonials = lazy(() => import("./screens/Otherpages/Testomonials"));
const Orders = lazy(() => import("./screens/Otherpages/Orders"));
const ProductDetails = lazy(() =>
  import("./screens/Otherpages/ProductDetails")
);
const ProductRate = lazy(() => import("./screens/Otherpages/ProductRate"));

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="overview" element={<Overview />} />

            <Route path="product" element={<Product />} />
            <Route path="subcategories" element={<SubCategories />} />
            <Route path="category" element={<Category />} />
            <Route path="customer" element={<Customer />} />
            <Route path="banners" element={<Banners />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="orders" element={<Orders />} />
            <Route path="productDetails/:id" element={<ProductDetails />} />
            <Route path="productRate" element={<ProductRate />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
