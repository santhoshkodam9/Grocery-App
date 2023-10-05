import React from "react";
import { useState, useEffect } from "react";
import Nav from "../Nav";
// import "./order.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import axios from "axios";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PlaceOrder=()=> {
  const [addresses,setAddresses]=useState([])
  const [error,setError]=useState(null);
  const [addressId,setAddressId]=useState("")
  const handleAddressDelete =async (address)=>{
    console.log(address)
  
    try{
        await axios.delete(`http://localhost:8084/address/delete/${address.addressId}`)
        alert("deleted")
    }
    catch(err){
        console.error(err)
    }
  }
  useEffect (()=>{
      const userId = localStorage.getItem('userId');
      axios.get(`http://localhost:8084/address/getaddress/${userId}`)
      .then(response =>{
        setAddresses(response.data)
        setError(null)
      })
      .catch(error =>{
        setAddresses([])
        setError(error.response.data.message)
      })
    },[])
  
  return (
    <div>
      <Nav />
      <br></br>
      
      <TableContainer>
  <Table sx={{ maxWidth: 850 }} align="center">
    <TableHead>
      <StyledTableRow>
        <StyledTableCell align="center">Address Id</StyledTableCell>
        <StyledTableCell align="center">Address</StyledTableCell>
        <StyledTableCell align="center">Action</StyledTableCell>
      </StyledTableRow>
    </TableHead>
    <TableBody>
      {addresses.length > 0 ? (
        addresses.map(address => (
          <StyledTableRow key={address.id}>
            <StyledTableCell align="center">{address.addressId}</StyledTableCell>
            <StyledTableCell>
              <p>
                {address.housenumber}, {address.street}, {address.landmark}, {address.district}, {address.state}, {address.pin}
              </p>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Button variant="contained" >
                <a href="/deliveryslots" style={{ textDecoration: 'none',color:'white' }} onClick={()=>localStorage.setItem("addressId",address.addressId)}>
                  Use
                </a>
              </Button>
              <Button variant="contained" color="error">
                <a onClick={()=>handleAddressDelete(address)} style={{ textDecoration: 'none',color:'white' }}>
                  Delete
                </a>
              </Button>
            </StyledTableCell>
          </StyledTableRow>
        ))
      ) : (
        <StyledTableRow>
          <StyledTableCell colSpan={2} align="center">
            <p>No addresses found</p>
          </StyledTableCell>
        </StyledTableRow>
      )}
    </TableBody>
  </Table>
  <br />
  <div className="text-center">
    <Button>
      <a href="/cart" class="btn btn-danger">
        Cancel
      </a>
    </Button>
    &nbsp;&nbsp;
    <Button variant="contained">
      <a href="/orderform" style={{ textDecoration: 'none', color: 'white' }}>
        New Address
      </a>
    </Button>
  </div>
</TableContainer>

      
    </div>
  );
}

export default PlaceOrder;
