import React, { useState } from "react";
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

import { Snackbar, SnackbarContent } from "@mui/material";

import { green } from "@mui/material/colors";
import createorder from '../Order/createorder';
const Paybill = () => {
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [cno, setCno] = useState("");
  const [cvv, setCvv] = useState("");
  const [exp_month, setExpMonth] = useState("");
  const [exp_year, setExpYear] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [type, setType] = useState("");
  const userId = localStorage.getItem("userId");
  const [idError, setIdError] = useState("");
  const [pinError, setPinError] = useState("");
  const [nameError, setNameError] = useState("");
  const [cnoError, setCnoError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [expMonthError, setExpMonthError] = useState("");
  const [expYearError, setExpYearError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleInput = (e, setState, setErrorState) => {
    setState(e.target.value);
    setErrorState("");
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];

    if (!id) {
      setIdError("Please Enter UPI ID");
    } else {
      setIdError("");
    }
    // if (!amount) {
    //   setAmountError("Please Enter Amount");
    // } else {
    //   setAmountError("");
    // }
    if (!pin) {
      setPinError("Please Enter UPI PIN");
    } else {
      setPinError("");
    }
    if (!name) {
      setNameError("Please Enter Name");
    } else {
      setNameError("");
    }
    if (!cno) {
      setCnoError("Please Enter Card No");
    } else {
      setCnoError("");
    }
    if (!cvv) {
      setCvvError("Please Enter CVV");
    } else {
      setCvvError("");
    }
    if (!exp_month) {
      setExpMonthError("Please Enter Exp Month");
    } else {
      setExpMonthError("");
    }
    if (!exp_year) {
      setExpYearError("Please Select Exp Year");
    } else {
      setExpYearError("");
    }

    const payment = {
      amount: amount,
      date: new Date(),
      type: paymentType,
    };
    var s = localStorage.getItem("totalAmountToPay")
    console.log(s)
    const obj={...payment,
      userId: userId}
    console.log(obj,"object data");
    console.log("Payment Details", payment);

    axios
      .post("http://localhost:8084/payment/pay", {
        ...payment,
        userId: userId,
      })
      .then((resp) => {
        console.log(resp, "payment response");
        setOpenSnackbar(true);
        const order={
        
          orderDate: new Date(),
          status:0,
           addressId: localStorage.getItem("addressId"),
          userId:localStorage.getItem("userId"),
           paymentId:resp.data.paymentId
            }
            console.log("addressId:----",localStorage.getItem("addressId"))

        alert("Payment Successfull");
        axios.post("http://localhost:8084/orders/createOrder",order).then((res)=>{
          console.log("order created.....",res);
        }).catch(error=>console.log(error));
       
       window.location.href = "/viewbill";
      })
      .catch((error) => {
        console.log(error, "catch block");
      });
      
  };

  const renderPaymentForm = () => {
    switch (paymentType) {
      case "0":
        return (
          <div>
            <div className="con">
              <h5 style={{ color: "rgb(15, 30, 74)" }}> Pay Using Cash</h5>
              <FormControl
                variant="outlined"
                value="0"
                size="sm"
                margin="normal"
                className="form-control"
              >
                <TextField
                  label="Amount"
                  value={localStorage.getItem("totalAmountToPay")}
                  fullWidth
                  // onChange={(e) => handleInput(e, setAmount, setAmountError)}
                  error={Boolean(amountError)}
                  helperText={amountError}
                  // onChange={handleAmountChange}
                />
              </FormControl>
              <br></br>

              <div className="text-center">
                {" "}
                <Button>
                  {" "}
                  <a href="/payment" className="btn btn-danger">
                    {" "}
                    Cancel{" "}
                  </a>{" "}
                </Button>
                &nbsp;&nbsp;{" "}
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Pay{" "}
                </Button>{" "}
              </div>
            </div>
          </div>
        );

      case "1":
        return (
          <div>
            <div className="con">
              <h5 style={{ color: "rgb(15, 30, 74)" }}> Pay Using UPI</h5>
              <FormControl
                variant="outlined"
                value="1"
                size="sm"
                margin="normal"
                className="form-control"
              >
                <TextField
                  label="Amount"
                  value={localStorage.getItem("totalAmountToPay")}
                  
                  error={Boolean(amountError)}
                  helperText={amountError}
                  fullWidth
                  //onChange={handleAmountChange}
                />
              </FormControl>
              <br></br>
              <FormControl
                variant="outlined"
                size="sm"
                margin="normal"
                className="form-control"
              >
                {" "}
                <TextField
                  id="product-street-textfield"
                  label="Upi_Id"
                  value={id}
                  onChange={(e) => handleInput(e, setId, setIdError)}
                  error={Boolean(idError)}
                  helperText={idError}
                  fullWidth
                />{" "}
              </FormControl>
              <br></br>
              <FormControl
                variant="outlined"
                size="sm"
                margin="normal"
                className="form-control"
              >
                {" "}
                <TextField
                  id="product-street-textfield"
                  label="Upi_Pin"
                  value={pin}
                  onChange={(e) => handleInput(e, setPin, setPinError)}
                  error={Boolean(pinError)}
                  helperText={pinError}
                />{" "}
              </FormControl>
              <br></br>
              <div className="text-center">
                {" "}
                <Button>
                  {" "}
                  <a href="/payment" className="btn btn-danger">
                    Cancel{" "}
                  </a>{" "}
                </Button>{" "}
                &nbsp;&nbsp;{" "}
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Pay{" "}
                </Button>{" "}
              </div>
            </div>
          </div>
        );

      case "2":
        return (
          <div>
            <div className="con">
              <h5 style={{ color: "rgb(15, 30, 74)" }}> Pay Using Card</h5>
              <FormControl
                variant="outlined"
                value="2"
                size="sm"
                margin="normal"
                className="form-control"
              >
                <TextField
                  label="Amount"
                  value={localStorage.getItem("totalPrice")}
                  error={Boolean(amountError)}
                  helperText={amountError}
                  fullWidth
                />
              </FormControl>
              <br></br>
              <FormControl
                variant="outlined"
                size="sm"
                margin="normal"
                className="form-control"
              >
                {" "}
                <TextField
                  id="product-street-textfield"
                  label="Card Holder Name"
                  value={name}
                  onChange={(e) => handleInput(e, setName, setNameError)}
                  error={Boolean(nameError)}
                  helperText={nameError}
                  fullWidth
                />{" "}
              </FormControl>
              <br></br>
              <FormControl
                variant="outlined"
                size="sm"
                margin="normal"
                className="form-control"
              >
                {" "}
                <TextField
                  id="product-street-textfield"
                  label="Card Number"
                  value={cno}
                  onChange={(e) => handleInput(e, setCno, setCnoError)}
                  error={Boolean(cnoError)}
                  helperText={cnoError}
                  fullWidth
                />{" "}
              </FormControl>
              <br></br>
              <FormControl
                variant="outlined"
                size="sm"
                margin="normal"
                className="form-control"
              >
                {" "}
                <TextField
                  id="product-street-textfield"
                  label="Enter CVV"
                  value={cvv}
                  onChange={(e) => handleInput(e, setCvv, setCvvError)}
                  error={Boolean(cvvError)}
                  helperText={cvvError}
                  fullWidth
                />{" "}
              </FormControl>
              <br></br>
              <FormControl
                className="form-control"
                variant="outlined"
                size="sl"
                margin="normal"
              >
                {" "}
                <InputLabel id="category-select-label">Exp_month</InputLabel>
                <Select
                  className="select-control"
                  labelId="category-select-label"
                  id="category-select"
                  label="Category"
                  value={exp_month}
                  onChange={(e) =>
                    handleInput(e, setExpMonth, setExpMonthError)
                  }
                  error={Boolean(expMonthError)}
                  helperText={expMonthError}
                  fullWidth
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
              </FormControl>
              <br></br>
              <FormControl
                className="form-control"
                variant="outlined"
                size="sl"
                margin="normal"
              >
                {" "}
                <InputLabel id="category-select-label">Exp_year</InputLabel>
                <Select
                  className="select-control"
                  labelId="category-select-label"
                  id="category-select"
                  label="Category"
                  value={exp_year}
                  onChange={(e) => handleInput(e, setExpYear, setExpYearError)}
                  error={Boolean(expYearError)}
                  helperText={expYearError}
                  fullWidth
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
              <br></br>
              <br></br>
              <div className="text-center">
                {" "}
                <Button>
                  {" "}
                  <a href="/payment" className="btn btn-danger">
                    Cancel{" "}
                  </a>{" "}
                </Button>
                &nbsp;&nbsp;{" "}
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Pay{" "}
                </Button>{" "}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="option_class text-center">
      <Nav></Nav>
      <br></br>
      <h2>Payment</h2>
      <label>
        <input
          type="radio"
          value="0"
          checked={paymentType === "0"}
          onChange={handlePaymentTypeChange}
        />
        Cash
      </label>
      &nbsp;&nbsp;
      <label>
        <input
          type="radio"
          value="1"
          checked={paymentType === "1"}
          onChange={handlePaymentTypeChange}
        />
        UPI
      </label>
      &nbsp;&nbsp;
      <label>
        <input
          type="radio"
          value="2"
          checked={paymentType === "2"}
          onChange={handlePaymentTypeChange}
        />
        Card
      </label>
      &nbsp;&nbsp;
      <br></br>
      <br></br>
      <div>{renderPaymentForm()}</div>
    </div>
  );
};
export default Paybill;

// import { Button } from "@mui/material";
// import React, { useState } from "react";
// import Nav from "../Nav";
// import CloseIcon from "@mui/icons-material/Close";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// function Paybill() {
//   const [open,setOpen]=useState(false)
//   const handleCancel = () => {
//     window.location.href="/placeorder"
//   }
//     const [showConfirmDialog,setShowConfirmDialog]=useState(false)
//     const handleCashSuccess=()=>{
//       setOpen(true)
//      // window.location.href="/viewbill"
//     }
//   const handleCashButton = ()=>{
//     setShowConfirmDialog(true);
//   }
//   const handleNoButtonClick =()=>{
//     setShowConfirmDialog(false)
//     window.location.href="/payment"
//   }
//   const handleYesButtonClick=()=>{
//     setShowConfirmDialog(false)
//     //alert("your order has been placed")
//     handleCashSuccess()
//   }
//   const handleOKClick =()=>{
//     window.location.href="/viewbill"
//   }
//   return (
//     <div>
//       <Nav></Nav>
//       <div className="card mx-auto mt-3" id="placeorder">
//         <div className="card-body">
//           <form>
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
//             <Button startIcon={<CloseIcon />} style={{ color: "black" }} onClick={handleCancel}>
//             </Button>
//             <div className="row mb-4">
//               <label className="col-3 col-form-label">Final Amount</label>
//               <div className="col-8">
//                 <input
//                   type="number"
//                   name="houseNumber"
//                   className="form-control"
//                   placeholder="Final Amount"
//                 />
//               </div>
//             </div>
//             <p className="text-center">Choose payment Method</p>
//             <br></br>
//             <div>
//               <Button variant="contained">
//                 <a
//                   href="/card"
//                   style={{ textDecoration: "none", color: "white" }}
//                 >
//                   Card
//                 </a>
//               </Button>
//               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//               <Button variant="contained" onClick={handleCashButton}>

//                   Cash

//               </Button>
//               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//               <Button variant="contained">
//                 <a
//                   href="/upi"
//                   style={{ textDecoration: "none", color: "white" }}
//                 >
//                   UPI
//                 </a>
//               </Button>
//               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             </div>

//           </form>
//         </div>
//       </div>
//       <Dialog
//         open={showConfirmDialog}
//         onClose={() => setShowConfirmDialog(false)}
//       >
//                 <DialogTitle>Confirmation</DialogTitle>       {" "}
//         <DialogContent>Are you sure you want to Confirm with Cash?</DialogContent>       {" "}
//         <DialogActions>
//                    {" "}
//           <Button variant="secondary" onClick={handleNoButtonClick}>
//                         No          {" "}
//           </Button>
//                    {" "}
//           <Button onClick={handleYesButtonClick}>        Yes       </Button>   {" "}
//         </DialogActions>
//          {" "}
//       </Dialog>
//       <Dialog open={open} onClose={() => setOpen(false)}>
//             <DialogTitle>Order placed Successfully</DialogTitle>
//             <DialogContent>
//               <p>Your order has been successfully placed.</p>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleOKClick} to="/viewproducts">
//                 OK
//               </Button>
//             </DialogActions>
//           </Dialog>
//     </div>
//   );
// }

// export default Paybill;
