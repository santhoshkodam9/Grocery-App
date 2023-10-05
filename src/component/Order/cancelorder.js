import React from "react";
import Nav from "../Nav";
import { useState,useEffect } from "react";
import "../Product/all.css"
import axios from "axios"
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
function CancelOrder() {

    const [orderId, setOrderId] = useState("");
    const handleCancel = () => {
      axios.delete(`http://localhost:8084/orders/cancelOrder/${orderId}`)
      .then((res)=>{
        console.log(res.data)
        alert("order cancel")
      })
      .catch((err)=>{
        console.log(err)
      })
    };

    return(
        <div>
        <Nav />
        <div className='con'>
      <h5 style={{ color: "rgb(15, 30, 74)" }}>Cancel order</h5>
      <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-imageurl-textfield"
            label="order Id"
            value={orderId}
            onChange={(e)=>setOrderId(e.target.value)}
            // placeholder="1234 5678 9012 3456"
          />
        </FormControl>
        <br></br>
        <div className="text-center">
        <Button
              variant="contained"
              style={{ textDecoration: "none", color: "white" }}
            >
              <a
                href="/viewordersbyusername"
                style={{ textDecoration: "none", color: "white" }}
                onClick={handleCancel}
              >
                Submit
              </a>
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="error">
              <a
                href="/viewordersbyusername"
                style={{ textDecoration: "none", color: "white" }}
              >
                Cancel
              </a>
            </Button>
            </div>
        </div>
        {/* <div className=""></div>
      <div className="card mx-auto mt-3" id="placeorder">
      <div className="card-header text-center">
                    <h6 className="card-title">Cancel Order</h6>
                </div>
          <div className="maincontainer">
            <form >
              <h3>Cancel Order</h3>
              <div className="row mb-3">
                <label className="col-3 col-form-label">Order ID</label>
                <div className="col-9">
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="form-control"
                    placeholder="Enter order Id" required
                  />
                </div>
              </div>
             
              <button><a href="/" class="btn btn-danger">Cancel</a></button>&nbsp;&nbsp;
              <button
                  type="submit"
                  onClick={handleCancel}
                  className="btn btn-primary mr 2"
                >
                  Submit
                </button>
            </form>
            </div>
            </div> */}
           </div>
           
    );
}

export default CancelOrder;

