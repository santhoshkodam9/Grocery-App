import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import "./all.css";
import CustomerCard from "./customercard";
import Category from "./category";
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
import API from "../constants/api.json";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
function ViewAllProducts() {
  const handleViewProduct = (category) => {
    
    axios
      .get(API.customerCategory + category)
      .then((res) => {
        if (res.data == null) {
          alert("no data");
        }
        setProp(res.data);
        setShowForm(true);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const [prop, setProp] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState("");
  const handleCancel = () => {
    window.location.href = "/products";
  };
  const [showForm, setShowForm] = useState("");
  useEffect(() => {
    try {
      axios.get("http://localhost:8084/product/getallproducts").then((res) => {
        setProp(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);


  const filterProducts = selectedCategory
    ? prop.filter((a) => a.category === selectedCategory)
    : prop;

  return (
    <div>
      <Nav />
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
      <div>
        {showForm ? (
          <div className="product-list" style={{ marginLeft: "250px" }}>
            {prop.map((a) => (
              <CustomerCard key={a.productId} product={a} />
            ))}
          </div>
        ):
        <div className="product-list" style={{marginLeft:'250px'}}>
        {filterProducts.map((a) => (
          <CustomerCard key={a.productId} product={a} />
        ))}
      </div>
        }
      </div>

      {/* <div>
        <Category setSelectedCategory={setSelectedCategory} />
      </div> */}
      
    </div>
  );
}
export default ViewAllProducts;
