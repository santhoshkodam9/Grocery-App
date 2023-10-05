import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import "./order.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Button } from "@mui/material";

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

function ViewOrderByUsername() {
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    console.log(userId);

    axios
      .get(`http://localhost:8084/orders/getorder/${userId}`)
      .then((response) => {
        setOrders(response.data);
        let paymentId = orders[0].payment.paymentId;
        response.data.forEach((order) => {
          axios
            .get(`http://localhost:8084/payment/${paymentId}`)
            .then((paymentResponse) => {
              // Update the payment type in the order object
              const updatedOrder = {
                ...order,
                paymentType: paymentResponse.data.paymentType,
              };
              // Update the orders state with the updated order object
              setOrders((prevOrders) =>
                prevOrders.map((prevOrder) =>
                  prevOrder.orderId === order.orderId ? updatedOrder : prevOrder
                )
              );
            })
            .catch((err) => {
              console.log(err.message);
            });
          let addressId = orders[0].address.addressId;
          axios
            .get(`http://localhost:8084/address/${addressId}`)
            .then((addressResponse) => {
              // Update the address in the order object
              const updatedOrder = { ...order, address: addressResponse.data };
              // Update the orders state with the updated order object
              setOrders((prevOrders) =>
                prevOrders.map((prevOrder) =>
                  prevOrder.orderId === order.orderId ? updatedOrder : prevOrder
                )
              );
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch("/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  console.log("Order details", orders);
  console.log("Address details", address);
  return (
    <div>
      <Nav />
      <br></br>
      <TableContainer>
        <Table sx={{ maxWidth: 1000 }} align="center">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">OrderId</StyledTableCell>
              <StyledTableCell align="center">Payment Type</StyledTableCell>
              <StyledTableCell align="center">Deliver To</StyledTableCell>
              <StyledTableCell align="center">Order Date</StyledTableCell>

              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order.orderId}>
                <StyledTableCell align="center">
                  {order.orderId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {order.payment.type}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {order.address.housenumber},{order.address.street},
                  {order.address.landmark},{order.address.district},
                  {order.address.state},{order.address.pin}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {order.orderDate}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button color="error" variant="contained">
                    <a
                      href="/cancelorder"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Cancel
                    </a>
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <br></br>
        <div className="text-center">
          <Button>
            <a href="/products" className="btn btn-danger">
              Cancel
            </a>
          </Button>
        </div>
      </TableContainer>
    </div>
  );
}
export default ViewOrderByUsername;
