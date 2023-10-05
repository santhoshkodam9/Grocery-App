import { useState } from "react";
import Nav from "../Nav";
import "./order.css";
import axios from "axios";

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
function OrderForm() {
  const [housenumber, setHousenumber] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");

  const userId = localStorage.getItem("userId");

  const [housenumberError, setHousenumberError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [stateError, setStateError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const regex = "/^d{6}$/";
  const handleInput = (e, setState, setErrorState) => {
    setState(e.target.value);
    setErrorState("");
  };
  //let user = localStorage.getItem("userId")
  const addaddress = async (e) => {
    e.preventDefault();
    if (!housenumber) {
      setHousenumberError("please enter Housenumber");
    } else {
      setHousenumberError("");
    }
    if (!street) {
      setStreetError("please enter Street");
    } else {
      setStreetError("");
    }
    if (!landmark) {
      setLandmarkError("please enter Landmark");
    } else {
      setLandmarkError("");
    }
    if (!district) {
      setDistrictError("please enter District");
    } else {
      setDistrictError("");
    }
    if (!state) {
      setStateError("please enter State");
    } else {
      setStateError("");
    }
    if (!pin) {
      setPincodeError("please enter Pincode");
    } else {
      setPincodeError("");
    }
    const address = {
      housenumber,
      street,
      state,
      pin,
      landmark,
      district,
    };
    console.log(address);
    axios
      .post("http://localhost:8084/address/addAddress/useAddress", {
        ...address,
        userId: userId,
      })
      .then((response) => {
        console.log(response.data);
        alert("added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Nav></Nav>
      <div className="con">
        <h5 style={{ color: "rgb(15, 30, 74)" }}>ADD ADDRESS</h5>

        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-houseNumber-textfield"
            label="HouseNumber"
            value={housenumber}
            fullWidth
            onChange={(e) =>
              handleInput(e, setHousenumber, setHousenumberError)
            }
            error={Boolean(housenumberError)}
            helperText={housenumberError}
          />
        </FormControl>
        <br></br>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-street-textfield"
            label="Street"
            value={street}
            onChange={(e) => handleInput(e, setStreet, setStreetError)}
            error={Boolean(streetError)}
            helperText={streetError}
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
          <TextField
            id="product-landmark-textfield"
            label="Landmark"
            value={landmark}
            onChange={(e) => handleInput(e, setLandmark, setLandmarkError)}
            error={Boolean(landmarkError)}
            helperText={landmarkError}
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
          <TextField
            id="product-district-textfield"
            label="District"
            value={district}
            onChange={(e) => handleInput(e, setDistrict, setDistrictError)}
            error={Boolean(districtError)}
            helperText={districtError}
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
          <TextField
            id="product-state-textfield"
            label="State"
            type="text"
            value={state}
            onChange={(e) => handleInput(e, setState, setStateError)}
            error={Boolean(stateError)}
            helperText={stateError}
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
          <TextField
            id="product-pincode-textfield"
            label="Pincode"
            value={pin}
            onChange={(e) => handleInput(e, setPin, setPincodeError)}
            error={Boolean(pincodeError)}
            helperText={pincodeError}
            fullWidth
          />
        </FormControl>
        <br></br>
        <div className="text-center">
          <Button>
            <a href="/placeorder" class="btn btn-danger">
              Cancel
            </a>
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" type="submit" onClick={addaddress}>
            Add Address
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
