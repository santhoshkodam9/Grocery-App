import React from "react";
import { useState } from "react";
import axios from "axios";
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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
function Card() {
  const [name, setName] = useState("");
  const [cno, setCno] = useState("");
  const [cvv, setCvv] = useState("");
  const [expdate, setExpdate] = useState("");

  const [error, setError] = useState(false);
  const [showConfirmDialog,setShowConfirmDialog]=useState(false)
  const [open,setOpen]=useState(false)
  const handlePaySuccess=()=>{
    setOpen(true)
  }
  const handlePayButton=()=>{
    setShowConfirmDialog(true)
  }
  const handleNoButtonClick=()=>{
    setShowConfirmDialog(false)
    window.location.href="/card"
  }
  const handleYesButtonClick=()=>{
    setShowConfirmDialog(false)
    handlePaySuccess()
  }
  const handleOKClick=()=>{
    window.location.href="/viewbill"
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.length == 0 ||
      cno.length == 0 ||
      cvv.length == 0 ||
      expdate.length == 0
    ) {
      setError(true);
    }
    console.log(name, cno, cvv, expdate);
  };

  const payload = {
    name: name,
    cno: cno,
    cvv: cvv,
    expdate: expdate,
  };

  axios
    .post("http://localhost:8084/Payment/payBill", payload)
    .then((resp) => alert("Payment Successfull"));

  return (
    <div>
      <Nav />
      <div className="con">
        <h5 style={{ color: "rgb(15, 30, 74)" }}>PAY BILL</h5>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField id="product-imageurl-textfield" label="Card Holder Name" />
        </FormControl>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-imageurl-textfield"
            label="Card Number"
            placeholder="1234 5678 9012 3456"
          />
        </FormControl>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-imageurl-textfield"
            label="CVV"
            placeholder="123"
          />
        </FormControl>
        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
          <InputLabel id="category-select-label">Exp_year</InputLabel>
          <Select
            className="select-control"
            labelId="category-select-label"
            id="category-select"
            // value={category}
            // onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2026">2026</MenuItem>
            <MenuItem value="2027">2027</MenuItem>
            <MenuItem value="2028">2028</MenuItem>
            <MenuItem value="2029">2029</MenuItem>
            <MenuItem value="2030">2030</MenuItem>
            <MenuItem value="2031">2031</MenuItem>
            <MenuItem value="2032">2032</MenuItem>
            <MenuItem value="2033">2033</MenuItem>
            <MenuItem value="2034">2034</MenuItem>
            <MenuItem value="2035">2035</MenuItem>
            <MenuItem value="2036">2036</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
          <InputLabel id="category-select-label">Exp_month</InputLabel>
          <Select
            className="select-control"
            labelId="category-select-label"
            id="category-select"
            // value={category}
            // onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="9">9</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="11">11</MenuItem>
            <MenuItem value="12">12</MenuItem>
          </Select>
          <br></br>
          <div className="text-center">
            <Button
              variant="contained"
              style={{ textDecoration: "none", color: "white" }}
              onClick={handlePayButton}
            >
              Pay
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="error">
              <a
                href="/payment"
                style={{ textDecoration: "none", color: "white" }}
              >
                Cancel
              </a>
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained">
              <a
                href="/viewbill"
                style={{ textDecoration: "none", color: "white" }}
              >
                View Bill
              </a>
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </FormControl>
      </div>
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
      >
                <DialogTitle>Confirmation</DialogTitle>       {" "}
        <DialogContent>Are you sure you want to Continue?</DialogContent>       {" "}
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
            <DialogTitle>Order placed Successfully</DialogTitle>
            <DialogContent>
              <p>Your order has been successfully placed.</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOKClick} >
                OK
              </Button>
            </DialogActions>
          </Dialog>
    </div>
    
  );
}

export default Card;
