import React, { useState } from "react";

import Nav from "../Nav";
import "./all.css"
function DeleteProduct(props) {
  const [productId, setProductId] = useState(props.data);
  console.log(props.data);
  return (
    <div>
      <Nav />
      </div>
  );
}
export default DeleteProduct;