import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import Stack from "@mui/material/Stack";

import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Button, ButtonGroup } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
const ProductCard = ({ product }) => {
    const [open, setOpen] = useState(false);
  const handleUpdateSuccess = () => {
    setOpen(true);
  };
  const handleOKClick = () => {
    setOpen(false);
    window.location.href = "/viewproducts";
  };
  const handleDelete = async (e) => {
    console.log("confirm delete of ", product.productName);

    try {
      await axios.delete(
        `http://localhost:8084/product/delete/${product.productId}`
      );

      console.log("Product has been deleted");
    
    handleUpdateSuccess();
    } catch (err) {
      console.error(err);
      alert("error");
    }
  };
  const con = {
    margin: "10px",
  };
  const getUrl = (id) => {
    return "/updateproduct/" + id;
  };
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const navigate = useNavigate();
  const handleCancelButtonClick = () => {
    setShowConfirmDialog(true);
  };

  const handleYesButtonClick = () => {
    setShowConfirmDialog(false);
    handleDelete();
  };

  const handleNoButtonClick = () => {
    setShowConfirmDialog(false);
  };
  return (
    <div>
      <br></br>
      <div
        class="container"
        style={{
          width: "250px",
          height: "350px",
          fontstyle: "italic",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gridGap: "20px",
        }}
      >
        <div class="card-deck">
          <div class="card text-center">
            <div class="card-block">
              <br></br>
              <h5
                class="card-title"
                style={{ fontFamily: "Arial", fontSize: "18px" }}
              >
                {product.productName}
              </h5>
              <img
                src={product.imageUrl}
                class="card-img"
                style={{ width: "150px" }}
                alt="..."
              />
              <p class="card-text" style={{ fontStyle: "italic" }}>
                {product.description}
              </p>
              <p class="card-text">{product.price}</p>
            </div>
            <br></br>
            <Stack direction="row" spacing={7}>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                size="small"
                color="error"
                style={con}
                onClick={handleCancelButtonClick}
              >
                Delete
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                color="success"
                endIcon={<EditIcon />}
                size="small"
                style={con}
              >
                <Link to={getUrl(product.productId)} style={{textDecoration:'none',color:'white'}}>Edit</Link>
              </Button>
            </Stack>
          </div>
        </div>
      </div>
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
      >
                <DialogTitle>Confirmation</DialogTitle>       {" "}
        <DialogContent>Are you sure you want to Delete?</DialogContent>       {" "}
        <DialogActions>
                   {" "}
          <Button variant="secondary" onClick={handleNoButtonClick}>
                        No          {" "}
          </Button>
                   {" "}
          <Button onClick={handleYesButtonClick}>        Yes       </Button>   {" "}
        </DialogActions>
         {" "}
      </Dialog>
      <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Product Deleted Successfully</DialogTitle>
            <DialogContent>
              <p>Your product has been successfully deleted.</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOKClick} to="/viewproducts">
                OK
              </Button>
            </DialogActions>
          </Dialog>
    </div>
  );
};
export default ProductCard;