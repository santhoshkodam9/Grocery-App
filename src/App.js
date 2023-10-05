import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/signupandsignin/Register";
import Login from "./component/signupandsignin/login";
import Addproduct from "./component/Product/addproduct";
import Viewproducts from "./component/Product/viewproducts";
import DeleteProduct from "./component/Product/deleteproduct";
import UpdateProduct from "./component/Product/updateproduct";
import CustomerList from "./component/Product/customerlist";
import Logout from "./component/signupandsignin/logout";
import Home from "./component/Home";
import Resetpassword from "./component/signupandsignin/resetpassword";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateStatus from "./component/Order/updatestatus";
import ViewOrderByStatus from "./component/Order/vieworderbystatus";
import AddressByUserId from "./component/Order/addressbyuserId";
import CancelOrder from "./component/Order/cancelorder";
import AddressForm from "./component/Order/addressForm";
import AddDeliverySlot from "./component/Delivery/bookdeliveryslot";
import Paybill from "./component/Payment/paybill";
import Cardform from "./component/Payment/cardform";
import Upiform from "./component/Payment/upiform";
import Viewbill from "./component/Payment/viewbill";
import ViewOrder from "./component/Order/vieworder";
import Allorders from "./component/Order/allorders";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import Cart from "./component/Cart/cart";
import Wishlist from "./component/Cart/wishlist";
import ForgotPassword from "./component/signupandsignin/forgotpassword";
import ViewOrderByUsername from "./component/Order/vieworderbyusername";
import DeleteAddress from "./component/Order/deleteaddress"

const App = () => {
const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const handleClick = (item) => {
    const foundItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (foundItem) {
      foundItem.quantity++;
      setCartItems([...cartItems]);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    toast.success(`${item.name} added to cart!`);
  };

  const handleWishlist = (item) => {
    const foundItem = wishlistItems.find(
      (wishlistItem) => wishlistItem.id === item.id
    );
    if (!foundItem) {
      setWishlistItems([...wishlistItems, item]);
      toast.success(`${item.name} added to wishlist!`);
    } else {
      toast.error(`${item.name} is already in wishlist!`);
    }
  };

  return (
    <Router>
       {" "}
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addproduct" element={<Addproduct />} />
            <Route path="/viewproducts" element={<Viewproducts />} />
            <Route path="/deleteproduct" element={<DeleteProduct />} />
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="/products" element={<CustomerList />} />
            <Route path="/updatestatus" element={<UpdateStatus />} />
            <Route path="/viewbystatus" element={<ViewOrderByStatus />} />
            <Route path="/placeorder" element={<AddressByUserId />} />
            <Route path="/cancelorder" element={<CancelOrder />} />
            <Route path="/orderform" element={<AddressForm />} />
            <Route path="/deliveryslots" element={<AddDeliverySlot />} />
            <Route path="/payment" element={<Paybill />} />
            <Route path="/card" element={<Cardform />} />
            <Route path="/upi" element={<Upiform />} />
            <Route path="/viewbill" element={<Viewbill />} />
        <Route path="/viewordersbyusername" element={<ViewOrderByUsername />} />
         <Route path="/allorders" element={<Allorders />} />   {" "}
       <Route path="/deleteaddress" element={<DeleteAddress/>}/>
         <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              handleClick={handleClick}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
              handleWishlist={handleWishlist}
            />
          }
          />
         {" "}
      </Routes>
    </Router>
  );
};

export default App;

// import logo from './logo.svg';
// import './App.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Register from './component/signupandsignin/Register';
// import Login from './component/signupandsignin/login';
// import Addproduct from "./component/Product/addproduct";
// import Viewproducts from "./component/Product/viewproducts";
// import DeleteProduct from "./component/Product/deleteproduct";
// import UpdateProduct from "./component/Product/updateproduct";
// import CustomerList from "./component/Product/customerlist";
// import Logout from "./component/signupandsignin/logout";
// import Home from './component/Home';
// import "bootstrap/dist/css/bootstrap.min.css";
// import UpdateStatus from './component/Order/updatestatus';
// import ViewOrderByStatus from './component/Order/vieworderbystatus';
// import PlaceOrder from './component/Order/placeorder';
// import CancelOrder from './component/Order/cancelorder';
// import OrderForm from './component/Order/orderform';
// import AddDeliverySlot from './component/Delivery/bookdeliveryslot';
// import Paybill from './component/Payment/paybill';
// import Cardform from "./component/Payment/cardform";
// import Upiform from "./component/Payment/upiform";
// import Viewbill from './component/Payment/viewbill';
// import Cart from "./component/Cart/cart";
// import ViewAllProducts from './component/Product/customerlist';
// import ViewOrder from './component/Order/vieworder';
// import Allorders from './component/Order/allorders';
// function App() {
//   return (
// <Router>
//   <Routes>
//     <Route path="/" element={<Home/>}/>
//     <Route path="/login" element={<Login/>}/>
//     <Route path="/logout" element={<Logout/>}/>
//     <Route path="/register" element={<Register/>}/>
//     <Route path="/addproduct" element={<Addproduct/>}/>
//     <Route path='/viewproducts' element={<Viewproducts/>}/>
//     <Route path="/deleteproduct" element={<DeleteProduct/>}/>
//     <Route path="/updateproduct/:id" element={<UpdateProduct/>}/>
//     <Route path='/products' element={<CustomerList/>}/>
//     <Route path='/updatestatus' element={<UpdateStatus/>}/>
//     <Route path='/viewbystatus' element={<ViewOrderByStatus/>}/>
//     <Route path='/placeorder' element={<PlaceOrder/>}/>
//     <Route path='/cancelorder' element={<CancelOrder/>}/>
//     <Route path='/orderform' element={<OrderForm/>}/>
//     <Route path='/deliveryslots' element={<AddDeliverySlot/>}/>
//     <Route path='/payment' element={<Paybill/>}/>
//     <Route path='/card' element={<Cardform/>}/>
//     <Route path='/upi' element={<Upiform/>}/>
//     <Route path='/viewbill' element={<Viewbill/>}/>
//     <Route path='/cart' element={<Cart/>}/>
//     <Route path='/vieworders' element={<ViewOrder/>}/>
//     <Route path='/allorders' element={<Allorders/>}/>
//   </Routes>
// </Router>
//   );
// }

// export default App;
