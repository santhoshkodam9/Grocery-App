import React, { useState } from "react";
import axios from "axios";
import Nav from "../Nav";
import "./all.css";
import Stack from "@mui/material/Stack";
import API from "../constants/api.json"
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
// Define the Fruit enum
const FRUITS = {
  GRAPE: "Grape",
  BANANA: "Banana",
  POMOGRANATE: "pomogranate",
  APPLE: "apple",
  DRAGONFRUIT: "dragonfruit",
  WATERMELON: "watermelon",
  PINEAPPLE: "pineapple",
  MANGO: "mango",
  PAPAYA: "papaya",
};
const MEAT = {
  CHICKEN: "chicken",
  CHICKENBONELESS: "chickenboneless",
  MUTTON: "mutton",
};
const VEGETABLES = {
  TOMATO: "tamoto",
  ONION: "onion",
  CABBAGE: "cabbage",
  GARLIC: "garlic",
  BEETROOT: "beetroot",
  BEANS: "beans",
  CARROT: "carrot",
  POTATO: "potato",
  LADYFINGER: "ladyfinger",
  LEMON: "lemon",
  CAULIFLOWER: "cauliflower",
  CHILLI: "chilli",
  CAPSICUM: "capsicum",
};
const SEAFOOD = {
  FISH: "fish",
  DRYFISH: "dryfish",
  PRAWNS: "prawns",
};
const DAIRY = {
  MILK: "milk",
  BREAD: "bread",
  OATS: "oats",
  BUTTER: "butter",
  CHEESE: "cheese",
  PANEER: "paneer",
  MILKMAID: "milkmaid",
};
const GRAINS = {
  RICE: "rice",
  BROWNRICE: "brownrice",
  MILLET: "millet",
  CORN: "corn",
};
const initialFruits = [
  { value: FRUITS.GRAPE, label: "Grape" },
  { value: FRUITS.BANANA, label: "Banana" },
  { value: FRUITS.POMOGRANATE, label: "Pomogranate" },
  { value: FRUITS.APPLE, label: "Apple" },
  { value: FRUITS.DRAGONFRUIT, label: "Dragonfruit" },
  { value: FRUITS.WATERMELON, label: "Watermelon" },
  { value: FRUITS.PINEAPPLE, label: "Pineapple" },
  { value: FRUITS.MANGO, label: "Mango" },
  { value: FRUITS.PAPAYA, label: "Papaya" },
];
const initialMeat = [
  { value: MEAT.CHICKEN, label: "Chicken" },
  { value: MEAT.CHICKENBONELESS, label: "Chicken Boneless" },
  { value: MEAT.MUTTON, label: "Mutton" },
];
const initialVegetables = [
  { value: VEGETABLES.TOMATO, label: "Tomato" },
  { value: VEGETABLES.ONION, label: "Onion" },
  { value: VEGETABLES.CABBAGE, label: "Cabagge" },
  { value: VEGETABLES.GARLIC, label: "Garlic" },
  { value: VEGETABLES.BEANS, label: "Beans" },
  { value: VEGETABLES.BEETROOT, label: "Beetroot" },
  { value: VEGETABLES.CAPSICUM, label: "Capsicum" },
  { value: VEGETABLES.CARROT, label: "Carrot" },
  { value: VEGETABLES.CAULIFLOWER, label: "Cauliflower" },
  { value: VEGETABLES.CHILLI, label: "Chilli" },
  { value: VEGETABLES.LADYFINGER, label: "Lady Finger" },
  { value: VEGETABLES.LEMON, label: "Lemon" },
  { value: VEGETABLES.POTATO, label: "Potato" },
];
const initialSeafood = [
  { value: SEAFOOD.DRYFISH, label: "Dry Fish" },
  { value: SEAFOOD.FISH, label: "Fish" },
  { value: SEAFOOD.PRAWNS, label: "Prawns" },
];
const initialDairy = [
  { value: DAIRY.BREAD, label: "Bread" },
  { value: DAIRY.BUTTER, label: "Butter" },
  { value: DAIRY.CHEESE, label: "Cheese" },
  { value: DAIRY.MILK, label: "Milk" },
  { value: DAIRY.MILKMAID, label: "Milkmaid" },
  { value: DAIRY.OATS, label: "Oats" },
  { value: DAIRY.PANEER, label: "Paneer" },
];
const initialGrains = [
  { value: GRAINS.BROWNRICE, label: "Brown rice" },
  { value: GRAINS.CORN, label: "Corn" },
  { value: GRAINS.MILLET, label: "Millet" },
  { value: GRAINS.RICE, label: "Rice" },
];
const Product = () => {
  function handleCategoryChange(event) {
    setCategory(event.target.value);
    if (event.target.value === "FRUITS") {
      setOptions(initialFruits);
    } else if (event.target.value === "MEAT") {
      setOptions(initialMeat);
    } else if (event.target.value === "VEGETABLES") {
      setOptions(initialVegetables);
    } else if (event.target.value === "SEAFOOD") {
      setOptions(initialSeafood);
    } else if (event.target.value === "DAIRY") {
      setOptions(initialDairy);
    } else if (event.target.value === "GRAINS") {
      setOptions(initialGrains);
    }
  }

  function handleOptionChange(event) {
    setProductName(event.target.value);
  }
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const[stockQuantity,setStockQuantity]=useState("");
  const[stockQuantityError,setStockQuantityError]=useState("")
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [categoryError,setCategoryError] = useState("");
  const [productNameError,setProductNameError] =useState("")
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [open, setOpen] = useState(false);
  const handleUpdateSuccess = () => {
    setOpen(true);
  };
  const handleInput = (e, setState, setErrorState) => {
    setState(e.target.value);
    setErrorState("");
  };
  const handleOKClick = () => {
    setOpen(false);
    window.location.href = "/viewproducts";
  };
  function isValidUrl(imageUrl) {
    try {
      new URL(imageUrl);
      return true;
    } catch (error) {
      return false;
    }
  }
  const addProduct = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryError("please select category");
    } else {
      setCategoryError("");
    }
    if (!description) {
      setDescriptionError("please enter description");
    } else {
      setDescriptionError("");
    }
    if (isNaN(price) || Number(price) <= 0 || !price) {
      setPriceError("please enter price in digits");
    } else {
      setPriceError("");
    }
    if (!isValidUrl(imageUrl) || !imageUrl) {
      setImageUrlError("please enter valid url");
    } else {
      setImageUrlError("");
    }
   if(!stockQuantity){
    setStockQuantityError("please enter stock")
   }else{
    setStockQuantityError("");
   }

    const product = {
      productName,
      description,
      imageUrl,
      price,
      category,
      stockQuantity,
    };
    axios
      .post(API.add, product)
      .then((response) => {
        console.log(response.data);
        // alert("Product added successfully");
        handleUpdateSuccess();
      })
      .catch((error) => {
        console.log(error);
        // alert("error occured");
      });
  };
  return (
    <div>
      <Nav />
      <div className="con">
        <h5 style={{ color: "rgb(15, 30, 74)" }}>ADD PRODUCT</h5>
        <FormControl
          className="form-control"
          variant="outlined"
          size="sl"
          margin="normal"
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            className="select-control"
            labelId="category-select-label"
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="FRUITS">Fruits</MenuItem>
            <MenuItem value="MEAT">Meat</MenuItem>
            <MenuItem value="VEGETABLES">Vegetable</MenuItem>
            <MenuItem value="SEAFOOD">Sea Food</MenuItem>
            <MenuItem value="DAIRY">Dairy</MenuItem>
            <MenuItem value="GRAINS">Grains</MenuItem>
            <MenuItem value="OTHER">Other</MenuItem>
          </Select>
          {errors.category && <p className="text-danger">{errors.category}</p>}
        </FormControl>
        <br></br>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <InputLabel id="product-name-label">Name</InputLabel>
          {options.length > 0 ? (
            <Select
              className="select-control"
              labelId="product-name-label"
              id="product-name-select"
              value={productName}
              onChange={handleOptionChange}
              label="Name"
            >
              <MenuItem value="">Select Option</MenuItem>
              {options.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <TextField
              id="product-name-textfield"
              label="Name"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
          )}
          {errors.productName && (
            <p className="text-danger" style={{ fontSize: "10px" }}>
              {errors.productName}
            </p>
          )}
        </FormControl>
        <br></br>
        <FormControl
          variant="outlined"
          size="sm"
          margin="normal"
          className="form-control"
        >
          <TextField
            id="product-description-textfield"
            label="Description"
            value={description}
            onChange={(e) =>
              handleInput(e, setDescription, setDescriptionError)
            }
            fullWidth
            error={Boolean(descriptionError)}
            helperText={descriptionError}
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
            id="product-price-textfield"
            label="Price"
            value={price}
            onChange={(e) => handleInput(e, setPrice, setPriceError)}
            fullWidth
            error={Boolean(priceError)}
            helperText={priceError}
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
            id="product-imageurl-textfield"
            label="Image"
            value={imageUrl}
            onChange={(e) => handleInput(e, setImageUrl, setImageUrlError)}
            fullWidth
            error={Boolean(imageUrlError)}
            helperText={imageUrlError}
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
            id="product-price-textfield"
            label="Stock-Quantity"
            value={stockQuantity}
            onChange={(e) => handleInput(e, setStockQuantity, setStockQuantityError)}
            fullWidth
            error={Boolean(stockQuantityError)}
            helperText={stockQuantityError}
          />
        </FormControl>
        <br></br>
        <Stack direction="row" spacing={7}>
          <Button
            variant="contained"
            size="large"
            color="error"
            style={{ width: "200px" }}
          >
            <a href="/viewproducts" style={{textDecoration:'none',color:'white'}}>Cancel</a>
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ width: "200px" }}
            onClick={addProduct}
          >
            Submit
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Product Added Successfully</DialogTitle>
            <DialogContent>
              <p>Your product has been added successfully.</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOKClick} to="/viewproducts">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      </div>
    </div>
  );
};

export default Product;