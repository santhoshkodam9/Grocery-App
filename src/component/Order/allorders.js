import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";
import "./order.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { tableCellClasses } from "@mui/material/TableCell";
import UpgradeSharpIcon from "@mui/icons-material/UpgradeSharp";
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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

function ViewOrder() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
const [open, setOpen] = useState(false);
  const [prop, setProp] = useState([]);
  const handleUpdateButton = () => {
    setShowConfirmDialog(true);
    
  };
  
  
  const handleNoButtonClick = () => {
    setShowConfirmDialog(false);
    window.location.href = "/allorders";
  };
  const handleYesButtonClick = () => {
    setShowConfirmDialog(false);
    window.location.href = "/updatestatus";
  };
  
  useEffect(() => {
    console.log(prop)
    try {
      axios.get("http://localhost:8084/orders/viewOrder").then((res) => {
        setProp(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
  const handleUpdate = () => {
    window.location.href = "/updatestatus";
  };
  return (
    <div>
      <Nav></Nav>
      <br></br>

      <TableContainer>
        <Table sx={{ maxWidth: 850 }} align="center">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">OrderId</StyledTableCell>
              <StyledTableCell align="center">Payment</StyledTableCell>
              <StyledTableCell align="center">Order Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {prop
              ? prop.map((p) => (
                  <StyledTableRow key={p.orderId}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {p.orderId}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {p.payment.type}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {p.orderDate}
                    </StyledTableCell>
                    <StyledTableCell align="center">{p.status}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        onClick={handleUpdateButton}
                        disabled={p.status == "DELIVERED"}
                      >
                        Update
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : null}
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
      <Dialog
          open={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
        >
                  <DialogTitle>Confirmation</DialogTitle>       {" "}
          <DialogContent>Are you sure you want to Update Status?</DialogContent>       {" "}
          <DialogActions>
                     {" "}
            <Button variant="secondary" onClick={handleNoButtonClick}>
                          No          {" "}
            </Button>
                     
            <Button onClick={handleYesButtonClick}>        Yes       </Button> 
             {" "}
          </DialogActions>
           {" "}
        </Dialog>
    </div>
  );
}

export default ViewOrder;
