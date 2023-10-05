import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import "./all.css";
import ProductCard from "./productcard";
import ProductByCategory from "./productByCategory";
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
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
function ViewAllProducts() {
  const [showForm, setShowForm] = useState(false);
  const cardStyle = {
    display: "flex",
    height: "550px",
  };
  const handleAddButton = () => {
    window.location.href = "/addproduct";
  };

  const handleCancel = () => {
    window.location.href = "/viewproducts";
  };

  const [prop, setProp] = useState([]);
  const [category, setCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleViewProduct = (category) => {
   console.log("category",category)
    axios
      .get(`http://localhost:8084/product/` + category)
      .then((res) => {
        if (res.data == null) {
          alert("no data");
        }
        setProp(res.data);
        setShowForm(true);
        setSidebarOpen(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    try {
      axios.get("http://localhost:8084/product/getallproducts").then((res) => {
        setProp(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
  const products = selectedCategory
    ? prop.filter((a) => prop.category === selectedCategory)
    : prop;
  return (
    <div>
      <Nav />
      <div className="m-auto">
        <br />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          // height={300}
        >
          <Button
            className="text-center"
            color="primary"
            style={{ marginLeft: "1070px" }}
            startIcon={<AddIcon />}
            onClick={handleAddButton}
          >
            Add Product
          </Button>
        </Box>
        <div className="parent-container">
          <div class="sidebar">
            <List style={{ color: "white" }}>
              <MenuItem
                value="VEGETABLES"
                onClick={() => handleViewProduct("VEGETABLES")}
              >
                Vegetables
              </MenuItem>
              <MenuItem value="FRUITS" onClick={() => handleViewProduct("FRUITS")}>
                Fruits
              </MenuItem>
              <MenuItem value="GRAINS" onClick={() => handleViewProduct("GRAINS")}>
                Grains
              </MenuItem>
              <MenuItem value="OTHER" onClick={() => handleViewProduct("OTHER")}>
                Other
              </MenuItem>
              <MenuItem value="DAIRY" onClick={() => handleViewProduct("DAIRY")}>
                Dairy
              </MenuItem>
              <MenuItem value="MEAT" onClick={() => handleViewProduct("MEAT")}>
                Meat
              </MenuItem>
              <MenuItem value="SEAFOOD" onClick={() => handleViewProduct("SEAFOOD")}>
                Seafood
              </MenuItem>
              
              <Button
                color="error"
                startIcon={<CancelPresentationIcon />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </List>
          </div>
        </div>

        <div>
          {showForm ? (
            <div className="product-list" style={{ marginLeft: "250px" }}>
              {prop.map((a) => (
                <ProductCard key={a.productId} product={a} />
              ))}
            </div>
          ) : (
            <div className="product-list" style={{ marginLeft: "250px" }}>
              {products.map((a) => (
                <ProductCard key={a.productId} product={a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ViewAllProducts;
