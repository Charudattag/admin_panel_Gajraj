import { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaUsers,
  FaHistory,
  FaBuilding,
  FaHandshake,
  FaPhone,
  FaCode,
  FaRegFileAlt,
  FaMoneyBillWave,
  FaTasks,
  FaServicestack,
  FaBars,
  FaProductHunt,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";
import { MdInsights } from "react-icons/md";
import { TbTopologyFullHierarchy } from "react-icons/tb";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdOutlineHistory } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";

import "./Sidebar.scss";

const menuItems = [
  {
    header: "Home",
    links: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: FaHome,
      },
      {
        label: "MasterRate",
        path: "/productRate",
        icon: FaMoneyBillWave,
      },
    ],
  },
  {
    header: "About Gajraj",
    links: [
      {
        label: "Orders",
        path: "/orders",
        icon: FaHistory,
      },
      {
        label: "Products",
        path: "/product",
        icon: FaProductHunt,
      },
      {
        label: "Customers",
        path: "/customer",
        icon: FaUsers,
      },

      {
        label: "Categories",
        path: "/category",
        icon: FaRegFileAlt,
      },
      {
        label: "SubCategories",
        path: "/subcategories",
        icon: FaClipboardList,
      },
    ],
  },
  {
    header: "Other Pages",
    links: [
      {
        label: "Testimonials",
        path: "/testimonials",
        icon: FaHandshake,
      },
      {
        label: "Banners",
        path: "/banners",
        icon: FaBuilding,
      },
      {
        label: "Contact Us",
        path: "/ContactUs",
        icon: FaPhone,
      },
      {
        label: "PromoCode",
        path: "/DeveloperServices",
        icon: FaCode,
      },
      {
        label: "Logout",
        path: "/",
        icon: FaSignOutAlt,
      },
      // {
      //   label: "Investor Services",
      //   path: "/InvestorServices",
      //   icon: FaMoneyBillWave,
      // },
      // {
      //   label: "Other Services",
      //   path: "/OtherServices",
      //   icon: FaTasks,
      // },
      // {
      //   label: "Our Services",
      //   path: "/OurServices",
      //   icon: FaServicestack,
      // },
      // {
      //   label: "Trusted Globally",
      //   path: "/TrustedGlobally",
      //   icon: VscWorkspaceTrusted,
      // },
      // {
      //   label: "Quantum Inshight",
      //   path: "/QuantumInshight",
      //   icon: MdInsights,
      // },
      // {
      //   label: "Our Completed Projects",
      //   path: "/OurCompletedProjects",
      //   icon: TbTopologyFullHierarchy,
      // },
      // {
      //   label: "JobDetails",
      //   path: "/JobDetails",
      //   icon: BiMessageRoundedDetail,
      // },
      // {
      //   label: "QuantumHistory",
      //   path: "/QuantumHistory",
      //   icon: MdOutlineHistory,
      // },
      // {
      //   label: "Our People",
      //   path: "/OurPeople",
      //   icon: FaPeopleGroup,
      // },
      // {
      //   label: "Social Responsibility",
      //   path: "/SocialResponsibility",
      //   icon: IoShareSocialSharp,
      // },
      // {
      //   label: "Category Master",
      //   path: "/CategoryMaster",
      //   icon: IoShareSocialSharp,
      // },
      // {
      //   label: "ProjectType Master ",
      //   path: "/ProjectTypeMaster",
      //   icon: IoShareSocialSharp,
      // },
      // {
      //   label: "Location Master ",
      //   path: "/LocationMaster",
      //   icon: IoShareSocialSharp,
      // },
      // {
      //   label: "City Master ",
      //   path: "/CityMaster",
      //   icon: IoShareSocialSharp,
      // },
      // {
      //   label: "Service Master ",
      //   path: "/ServiceMaster",
      //   icon: IoShareSocialSharp,
      // },
      // {
      //   label: "Year Master ",
      //   path: "/YearMaster",
      //   icon: IoShareSocialSharp,
      // },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation(); // Get current location
  const [isMinimized, setIsMinimized] = useState(false); // Minimize state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
  const sidebarRef = useRef(null); // Reference for sidebar

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized); // Toggle minimize state
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu state
  };

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false); // Close mobile menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  // Close the sidebar on page navigation in mobile
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false); // Close mobile menu when navigating
    }
  }, [location]);

  return (
    <div>
      {/* Mobile menu toggle button positioned at top-left */}
      <div
        className="mobile-menu-toggle d-lg-none"
        onClick={toggleMobileMenu}
        style={{ position: "fixed", top: "15px", left: "15px", zIndex: 102 }}
      >
        <FaBars />
      </div>

      {/* Sidebar with minimize and mobile support */}
      <div
        className={`sidebar bg-white ${isMinimized ? "minimized" : ""} ${
          isMobileMenuOpen ? "open" : ""
        }`}
        ref={sidebarRef}
      >
        <div className="minimize-button" onClick={toggleSidebar}>
          {/* <FaBars /> */}
        </div>

        {menuItems.map((section, idx) => (
          <div className="sidebar-section" key={idx}>
            <p className="sidebar-header">{!isMinimized && section.header}</p>
            <ul className="list-unstyled">
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link
                    to={link.path}
                    className={`sidebar-link ${
                      location.pathname === link.path ? "active" : ""
                    }`}
                  >
                    <link.icon className="me-2 icon" />
                    {!isMinimized && link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
