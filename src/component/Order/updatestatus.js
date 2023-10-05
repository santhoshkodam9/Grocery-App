import React, { useState } from "react";
import Nav from "../Nav";
import "./order.css";
import axios from "axios";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
function UpdateStatus() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [open,setOpen]=useState(false);
  const handleOKClick = () => {
    window.location.href = "/allorders";
  };
  const handleUpdateStatus = (event) => {
    event.preventDefault();
setOpen(true)
    let updatestatus = { status: parseInt(status.status) };
    axios
      .put(`http://localhost:8084/orders/updateStatus/${orderId}`, updatestatus)
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Nav />
      <div className="con">
        <h5 style={{ color: "rgb(15, 30, 74)" }}>UPDATE STATUS</h5>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-imageurl-textfield"
            label="Order Id"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </FormControl>
        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
          <InputLabel id="category-select-label">Status</InputLabel>
          <Select
            className="select-control"
            labelId="category-select-label"
            id="category-select"
            onChange={(e) => setStatus({ status: e.target.value })}
            label="Status"
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="0">PLACED</MenuItem>
            <MenuItem value="1">SHIPPED</MenuItem>
            <MenuItem value="2">ON THE WAY</MenuItem>
            <MenuItem value="3">PICKED UP</MenuItem>
            <MenuItem value="4">DELIVERED</MenuItem>
          </Select>
        </FormControl>
        <div className="text-center">
          <Button
            variant="contained"
            style={{ textDecoration: "none", color: "white" }}
            onClick={handleUpdateStatus}
          >
            Update
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="error">
            <a
              href="/allorders"
              style={{ textDecoration: "none", color: "white" }}
            >
              Cancel
            </a>
          </Button>
        </div>
       
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Order Status Updated Successfully</DialogTitle>
          <DialogContent>
            <p>Your Order status has been successfully updated.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOKClick} to="/viewproducts">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default UpdateStatus;
