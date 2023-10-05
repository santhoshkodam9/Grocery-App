
import React, {useState} from 'react'
import axios from "axios";
import Nav from "../Nav";
import "./order.css"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

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
function ViewOrderByStatus() {

  const [ status, setStatus ] = useState("");
  const [errors, setErrors] = useState({});
  const [ showForm, setShowForm ] = useState(false);
  const [ userData, setUserData ] = useState({});

  const handleFormSubmit =  (e) => {
  e.preventDefault();
  axios
  .get('http://localhost:8084/orders/viewOrderByStatus/'+status)
  .then((res) => {
console.log(res);
if (res.data == null) {
alert("No data found");
  }
setUserData(res.data);
 setShowForm(true);
})
.catch((err) => {
console.log(err);
});
};

    return(
        <div>
            <Nav></Nav>
            <br></br>
            <div className="con">
            <h5 style={{ color: "rgb(15, 30, 74)" }}>STATUS</h5>
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
            // value={category}
            // onChange={handleCategoryChange}
            label="Category"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="0">PLACED</MenuItem>
            <MenuItem value="1">SHIPPED</MenuItem>
            <MenuItem value="2">PICKED UP</MenuItem>
            <MenuItem value="3">ON THE WAY</MenuItem>
            <MenuItem value="4">DELIVERED</MenuItem>
            </Select>
            {errors.orderId && (
          <p className="text-danger">{errors.orderId}</p>
          )}
            </FormControl>
            <Button variant="contained" onClick={handleFormSubmit}>Search</Button>
            </div>
            {showForm &&(
//       <TableContainer>
//         <Table sx={{ maxWidth: 850 }} align="center">
//           <TableHead>
//             <StyledTableRow>
//               <StyledTableCell align="center">OrderId</StyledTableCell>
//               {/* <StyledTableCell align="center">User Name</StyledTableCell>
//               <StyledTableCell align="center">Total Amount</StyledTableCell> */}
//               <StyledTableCell align="center">Order Date</StyledTableCell>
//               <StyledTableCell align="center">Status</StyledTableCell>
//               <StyledTableCell align="center">Action</StyledTableCell>
//             </StyledTableRow>
//           </TableHead>
//           <TableBody>
         
//                <TableBody>
//                 {userData.map((data,index)=>{
//                   return (
// <StyledTableRow key={index}>  
// <StyledTableCell>{data.orderId}</StyledTableCell>
//                     <StyledTableCell>{data.orderDate}</StyledTableCell>
//                     <StyledTableCell>{data.status}</StyledTableCell>
//                     <StyledTableCell><Button  variant="contained" > <a href="/updatestatus" style={{textDecoration:'none',color:'white'}}>Update</a></Button>
//             </StyledTableCell>
//                     </StyledTableRow>
// );
//                 })}
//                </TableBody>
//                 </TableBody>
//               </Table>
//               </TableContainer>
<TableContainer>
  <Table sx={{ maxWidth: 850 }} align="center">
    <TableHead>
      <TableRow>
        <StyledTableCell>Order Id</StyledTableCell>
        <StyledTableCell>Order Date</StyledTableCell>
        <StyledTableCell>Status</StyledTableCell>
        {/* <StyledTableCell>Action</StyledTableCell> */}
      </TableRow>
    </TableHead>
    <TableBody>
      {userData.map((data,index)=>{
        return(
          <StyledTableRow key={index}>
            <StyledTableCell>{data.orderId}</StyledTableCell>
            <StyledTableCell>{data.orderDate}</StyledTableCell>
            <StyledTableCell>{data.status}</StyledTableCell>
            {/* <StyledTableCell><Button><a href="/updatestatus">Update</a></Button></StyledTableCell> */}
          </StyledTableRow>
        )
      }
      )}
    </TableBody>
  </Table>
</TableContainer>
            )}
        </div>
    );
}

export default ViewOrderByStatus;


