import React, { useState } from "react";
import axios from "axios";
import "./delivery.css";
import Nav from "../Nav";
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
import { Snackbar, SnackbarContent } from "@mui/material";
import { green } from "@mui/material/colors";
function AddDeliverySlot() {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryDateError,setDeliveryDateError]=useState("")
  const [deliveryTimeError,setDeliveryTimeError]=useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const[errors,setErrors]=useState("")
  const [formErrors, setFormErrors] = useState({});
const handleInput=(e,setState,setErrorState)=>{
  setState(e.target.value);
  setErrorState("");
}
  const addDelivery =async (e) => {
    e.preventDefault();
    if (!deliveryDate) {
      setDeliveryDateError( "Please Select DeliveryDate");
    }else{
      setDeliveryDateError("")
    }
    if (!deliveryTime) {
      setDeliveryTimeError( "Please Select DeliveryTime");
    }else{
      setDeliveryTimeError("")
    }
   
    
      const user = { deliveryDate, deliveryTime };
      axios
        .post("http://localhost:8084/delivery/add", user)
        .then((resp) => {
          setOpenSnackbar(true);
          window.location.href="/payment"
        })
        .catch((error) => {
          //alert(error.message);
        });
    
  };

  return (
    <div>
      <Nav />
      <div className="con">
        <h5 style={{ color: "rgb(15, 30, 74)" }}>BOOK DELIVERY SLOT</h5>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-imageurl-textfield"
            value={deliveryDate}
            onChange={(e)=>
            handleInput(e,setDeliveryDate,setDeliveryDateError)}
            type="date"
            error={Boolean(deliveryDateError)}
            helperText={deliveryDateError}
          />
          
        </FormControl>
        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
          <InputLabel id="category-select-label">Time Slot</InputLabel>
          <Select
            className="select-control"
            labelId="category-select-label"
            id="category-select"
            value={deliveryTime}
            onChange={(e)=>
            handleInput(e,setDeliveryTime,setDeliveryTimeError)}
            error={Boolean(deliveryTimeError)}
            helperText={deliveryTimeError}
            label="Time Slot"
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="0">Morning(9am-12pm)</MenuItem>
            <MenuItem value="1">Afternoon(12pm-3pm)</MenuItem>
            <MenuItem value="2">Evening(3pm-6pm)</MenuItem>
          </Select>
          {errors.deliveryTime && (
            <p className="text-danger">{errors.deliveryTime}</p>
          )}
        </FormControl>
        <br></br>
        <div className="text-center">
          <Button variant="contained" color="error">
            <a
              href="/placeorder"
              style={{ textDecoration: "none", color: "white" }}
            >
              Cancel
            </a>
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained" onClick={addDelivery}>
            Book
          </Button>
        </div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <SnackbarContent
            style={{ backgroundColor: green[600] }}
            message="Delivery slot added successful"
          />
        </Snackbar>
      </div>
    </div>
  );
}
export default AddDeliverySlot;
