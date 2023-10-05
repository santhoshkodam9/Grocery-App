// import React from "react";
// import { Link } from "react-router-dom";
// import "../App.css";
// function Nav() {
//   const userLoginStatus = localStorage.getItem("status");
//   const userRole = localStorage.getItem("role");
//   const userName = localStorage.getItem("userName");

//   const navStyle = {
//     color: "white",
//     textDecoration: "none",
//   };
//   return (
//     <div className="nav">
//       <nav>
//         <h5>E-GROCERY</h5>
        
//         {!userLoginStatus && (
//           <ul className="nav-links">
//             <li>
//               <Link style={navStyle} to="/">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link style={navStyle} to="/login">
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link style={navStyle} to="/register">
//                 Register
//               </Link>
//             </li>
//           </ul>
//         )}
//         {userRole === "CUSTOMER" ? (
//           <ul className="customer">
            
//             <li>
//               <Link style={navStyle} to="/products">
//                 Products
//               </Link>
//             </li>
//             <li>
//               <Link style={navStyle} to="/cart">
//                 Cart
//               </Link>
//             </li>
//             <li>
//               <Link style={navStyle} to="/wishlist">
//                 Wishlist
//               </Link>
//             </li>

//             <li>
//               <Link style={navStyle} to="/viewordersbyusername">
//                 Orders
//               </Link>
//             </li>

//             <li>
//               <Link style={navStyle} to="/logout">
//                 Logout
//               </Link>
//             </li>
//           </ul>
//         ) : null}
//         {userRole === "ADMIN" ? (
//           <ul className="admin">
//             <li>
//               <Link style={navStyle} to="/viewproducts">
//                 Products
//               </Link>
//             </li>
            
            
//             <li>
//               <Link style={navStyle} to="/allorders">
//                 Orders
//               </Link>
//             </li>

//             <li>
//               <Link style={navStyle} to="/logout">
//                 Logout
//               </Link>
//             </li>
          
//           </ul>
//         ) : null}
//       </nav>
//     </div>
//   );
// }
// export default Nav;
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const navStyle = {
  backgroundColor: "black", // Set your desired background color
  color: "white", // Set your desired text color
  padding: "1rem", // Set your desired padding
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const navLinksStyle = {
  display: "flex",
  listStyleType: "none",
  margin: 0,
  padding: 0,
};

const linkStyle = {
  color: "white", // Set your desired link color
  textDecoration: "none",
  margin: "0 1rem", // Set your desired link margin
  transition: "color 0.3s ease-in-out", // Add transition for smooth hover effect
  cursor: "pointer", // Add cursor pointer for hover effect
  ":hover": { // Define hover styles
    color: "red", // Set your desired link color on hover
    backgroundColor:"red"
  },
};


function Nav() {
  const userLoginStatus = localStorage.getItem("status");
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  return (
    <div style={navStyle}>
      <h5>E-GROCERY</h5>
      {!userLoginStatus && (
        <ul style={navLinksStyle}>
          <li>
            <Link style={linkStyle}  to="/">
              Home
            </Link>
          </li>
          <li>
            <Link style={linkStyle} to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link style={linkStyle} to="/register">
              Register
            </Link>
          </li>
        </ul>
      )}
      {userRole === "CUSTOMER" ? (
        <ul style={navLinksStyle}>
          <li>
            <Link style={linkStyle} to="/products">
              Products
            </Link>
          </li>
          <li>
            <Link style={linkStyle} to="/cart">
              Cart
            </Link>
          </li>
          <li>
            <Link style={linkStyle} to="/wishlist">
              Wishlist
            </Link>
          </li>
          <li>
            <Link style={linkStyle} to="/viewordersbyusername">
              Orders
            </Link>
          </li>
          <li>
            <Link style={linkStyle} to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      ) : null}
      {userRole === "ADMIN" ? (
        <ul style={navLinksStyle}>
          {/* <li>
            <Link style={linkStyle} to="/viewproducts">
              Products
            </Link>
          </li> */}
          <li>
            <Link style={linkStyle} to="/allorders">
              Orders
            </Link>
          </li>
          <li>
            <Link style={linkStyle} to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default Nav;
