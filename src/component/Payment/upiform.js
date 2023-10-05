import React from 'react'
import { useState } from 'react'
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
import Nav from '../Nav';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
function Upi() {
  const [id, setId]=useState('')
  const [pin, setPin]=useState('')
  const [error,setError] = useState(false)
  const[open,setOpen]=useState(false)
  const[showConfirmDialog,setShowConfirmDialog]=useState(false)
  const handlePaySuccess=()=>{
    setOpen(true)
  }
  const handleOKClick=()=>{
    window.location.href="/vieworders"
  }
const handlePayButton =()=>{
  setShowConfirmDialog(true)
}
const handleYesButtonClick=()=>{
  setShowConfirmDialog(false)
  handlePaySuccess()
}
const handleNoButtonClick=()=>{
  setShowConfirmDialog(false)
}
  const handleSubmit=(e)=>{

    e.preventDefault();
    if(id.length==0 || pin.length==0){
    setError(true)
    }
    console.log(id,pin)
    }
   
  return (
    <div>
      <Nav/>
      <div className='con'>
      <h5 style={{ color: "rgb(15, 30, 74)" }}>UPI PAYMENT</h5>
      <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-imageurl-textfield"
            label="UPI Id"
            // placeholder="1234 5678 9012 3456"
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
            label="UPI PIN"
           
          />
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
  )
}
export default Upi;

