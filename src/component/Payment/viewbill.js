import React, { useEffect, useState } from "react";

import Nav from "../Nav";
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

function Viewbill() {
  let amount = localStorage.getItem("totalPrice")
  console.log(amount)
  const [payment,setPayment]=useState([])
  useEffect(()=>{
    let userId = localStorage.getItem("userId")
    
    axios.get(`http://localhost:8084/payment//getbill/${userId}`)
    .then((response)=>{
      setPayment(response.data)
    }).catch((err)=>{
      console.log(err.message);
  })
  },[])
  return (
    <div>
      <Nav></Nav>
      <br></br>
      <TableContainer>
        <Table sx={{ maxWidth: 850 }} align="center">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Payment Id</StyledTableCell>
              <StyledTableCell align="center">Total Amount</StyledTableCell>
              <StyledTableCell align="center">Payment Type</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
           {payment.map((p)=>(
              <StyledTableRow key={p.paymentId}>
                <StyledTableCell align="center">{p.paymentId}</StyledTableCell>
                <StyledTableCell align="center">{amount}</StyledTableCell>
                <StyledTableCell align="center">{p.type}</StyledTableCell>
                <StyledTableCell align="center">{p.date}</StyledTableCell>
              </StyledTableRow>
           ))}
          </TableBody>
        </Table>
        <br></br>
        <div className="text-center">
        <Button>
                <a href="/products" class="btn btn-danger">
                  Cancel
                </a>
              </Button>
              
              </div>
      </TableContainer>
      
    </div>
  );
}

export default Viewbill;
