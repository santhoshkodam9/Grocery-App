import React, { useState } from "react";
import "./all.css";
import axios from "axios";
import ProductCard from "./productcard";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import {
  FormControl,
  Select,
  MenuItem,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";

function ProductByCategory() {
  // const [category, setCategory] = useState("");
  // const [prop, setProp] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const cardStyle = {
  //   display: "flex",
  //   height: "550px",
  // };
  // const handleAddButton = () => {
  //   window.location.href = "/addproduct";
  // };

  // const handleCancel = () => {
  //   window.location.href = "/viewproducts";
  // };

  // const handleViewProduct = (e) => {
  //   e.preventDefault();
  //   axios
  //     .get(`http://localhost:8084/product/` + category)
  //     .then((res) => {
  //       if (res.data == null) {
  //         alert("no data");
  //       }
  //       setProp(res.data);
  //       setShowForm(true);
  //       setSidebarOpen(false);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  // const handleSidebarOpen = () => {
  //   setSidebarOpen(true);
  // };

  // const handleSidebarClose = () => {
  //   setSidebarOpen(false);
  // };

  // return (
  //   <div className="m-auto">
  //     <br />
  //     <Box
  //     display="flex"
  //     justifyContent="center"
  //     alignItems="center"
  //    // height={300}
  //   >
  //     <Button
  //       className="text-center"
  //       color="primary"
  //       startIcon={<AddIcon />}
  //       onClick={handleAddButton}
       
  //     >
  //       Add Product
  //     </Button>
  //     </Box>
  //     <br />
  //     <br />
  //     <Box
  //     display="flex"
  //     justifyContent="center"
  //     alignItems="center"
  //    // height={300}
  //   >
  //     {/* <Button
  //       color="primary"
  //       startIcon={<SearchIcon />}
  //       onClick={handleSidebarOpen}
  //     >
  //       Filter By Category
  //     </Button> */}
  //     </Box>
  //     <Drawer anchor="left" open={sidebarOpen} onClose={handleSidebarClose}>
  //       <List>
  //         <ListItem>
  //           <ListItemText primary="Select Category" />
  //         </ListItem>
  //         <MenuItem value="VEGETABLES" onClick={() => setCategory("VEGETABLES")}>
  //           Vegetables
  //         </MenuItem>
  //         <MenuItem value="FRUITS" onClick={() => setCategory("FRUITS")}>
  //           Fruits
  //         </MenuItem>
  //         <MenuItem value="GRAINS" onClick={() => setCategory("GRAINS")}>
  //           Grains
  //         </MenuItem>
  //         <MenuItem value="OTHER" onClick={() => setCategory("OTHER")}>
  //           Other
  //         </MenuItem>
  //         <MenuItem value="DAIRY" onClick={() => setCategory("DAIRY")}>
  //           Dairy
  //         </MenuItem>
  //         <MenuItem value="MEAT" onClick={() => setCategory("MEAT")}>
  //           Meat
  //         </MenuItem>
  //         <MenuItem value="SEAFOOD" onClick={() => setCategory("SEAFOOD")}>
  //           Seafood
  //         </MenuItem>
  //         <Button
  //           color="primary"
  //           startIcon={<SearchIcon />}
  //           onClick={handleViewProduct}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           color="error"
  //           startIcon={<CancelPresentationIcon />}
  //           onClick={handleCancel}
  //         >
  //           Cancel
  //         </Button>
  //       </List>
  //     </Drawer>
  //     {showForm && (
  //       <div className="product-list" style={cardStyle}>
  //         {prop.map((a) => (
  //           <ProductCard key={a.productId} product={a} />
  //         ))}
  //       </div>
  //     )}
  //     </div>
      
     
  //         );
                       }
                            export default ProductByCategory;


// import React, { useState } from "react";
// import "./all.css";
// import axios from "axios";
// import ProductCard from "./productcard";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
// import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import {
//   FormControl,
//   Select,
//   MenuItem,
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";

// function ProductByCategory() {
//   const [category, setCategory] = useState("");
//   const [prop, setProp] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const cardStyle = {
//     display: "flex",
//     height: "550px",
//   };

//   const handleAddButton = () => {
//     window.location.href = "/addproduct";
//   };

//   const handleCancel = () => {
//     window.location.href = "/viewproducts";
//   };

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleViewProduct = (e) => {
//     e.preventDefault();
//     axios
//       .get(`http://localhost:8084/product/` + category)
//       .then((res) => {
//         if (res.data == null) {
//           alert("no data");
//         }
//         setProp(res.data);
//         setShowForm(true);
//         setDrawerOpen(false);
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   };

//   return (
//     <div className="m-auto">
//       <br></br>
//       <Button onClick={handleDrawerToggle}>Open Sidebar</Button>
//       <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
//         <List>
//           <ListItem button onClick={() => setCategory("")}>
//             <ListItemText primary="All Categories" />
//           </ListItem>
//           <ListItem button onClick={() => setCategory("VEGETABLES")}>
//             <ListItemText primary="Vegetables" />
//           </ListItem>
//           <ListItem button onClick={() => setCategory("FRUITS")}>
//             <ListItemText primary="Fruits" />
//           </ListItem>
//           <ListItem button onClick={() => setCategory("GRAINS")}>
//             <ListItemText primary="Grains" />
//           </ListItem>
//           <ListItem button onClick={() => setCategory("OTHER")}>
//             <ListItemText primary="Other" />
//           </ListItem>
//           <ListItem button onClick={() => setCategory("DAIRY")}>
//             <ListItemText primary="Dairy" />
//           </ListItem>
//           <ListItem button onClick={() => setCategory("MEAT")}>
//             <ListItemText primary="Meat" />
//           </ListItem>
//           <ListItem button onClick={() => setCategory("SEAFOOD")}>
//             <ListItemText primary="Seafood" />
//           </ListItem>
//         </List>
//       </Drawer>
//       <form id="product" className="m-auto">
//         <FormControl
//           label
//           variant="standard"
//           size="sm"
//           style={{ marginLeft: "770px", width: "300px" }}
//         >
//           <Select
//             name="category"
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <MenuItem value="">Select Category</MenuItem>
//             <MenuItem value="VEGETABLES">VEGETABLES</MenuItem>
//             <MenuItem value="FRUITS">FRUITS</MenuItem>
//             <MenuItem value="GRAINS">GRAINS</MenuItem>
//             <MenuItem value="OTHER">OTHER</MenuItem>
//             </Select>
//             </FormControl>
//             </form>
//             </div>
//             );
//             }
//             export default ProductByCategory;
            


// import React, { useState } from "react";
// import "./all.css";
// import axios from "axios";
// import ProductCard from "./productcard";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
// import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import { FormControl, Select, MenuItem, Button } from "@mui/material";
// function ProductByCategory() {
//   const [category, setCategory] = useState("");
//   const [prop, setProp] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const cardStyle = {
//     display: "flex",
//     height: "550px",
//   };
//   const handleAddButton = () => {
//     window.location.href = "/addproduct";
//   };

//   const handleCancel = () => {
//     window.location.href = "/viewproducts";
//   };
//   const handleViewProduct = (e) => {
//     e.preventDefault();
//     axios
//       .get(`http://localhost:8084/product/` + category)
//       .then((res) => {
//         if (res.data == null) {
//           alert("no data");
//         }
//         setProp(res.data);
//         setShowForm(true);
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   };
//   return (
//     <div className="m-auto">
//       <br></br>
//       <form id="product" className="m-auto">
//         <FormControl
//           label
//           variant="standard"
//           size="sm"
//           style={{ marginLeft: "770px", width: "300px" }}
//         >
//           <Select
//             name="category"
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <MenuItem value="">Select Category</MenuItem>
//             <MenuItem value="VEGETABLES">VEGETABLES</MenuItem>
//             <MenuItem value="FRUITS">FRUITS</MenuItem>
//             <MenuItem value="GRAINS">GRAINS</MenuItem>
//             <MenuItem value="OTHER">OTHER</MenuItem>
//             <MenuItem value="DAIRY">DAIRY</MenuItem>
//             <MenuItem value="MEAT">MEAT</MenuItem>
//             <MenuItem value="SEAFOOD">SEA FOOD</MenuItem>
//           </Select>
//         </FormControl>
//         <Button
//           color="primary"
//           startIcon={<SearchIcon />}
//           onClick={handleViewProduct}
//         ></Button>
//         <Button
//           color="error"
//           startIcon={<CancelPresentationIcon />}
//           onClick={handleCancel}
//         ></Button>

//         <Button
//           className="text-center"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={handleAddButton}
//         ></Button>
//       </form>
//       {showForm && (
//         <div className="product-list" style={cardStyle}>
//           {prop.map((a) => (
//             <ProductCard key={a.productId} product={a} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// export default ProductByCategory;
