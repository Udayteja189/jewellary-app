import {
  TextField,
  Icon as MuiIcon,
  Stack,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ImageList from "../gallery.json";
import Icon from "./atoms/Icon";
import Product from "./molecules/product";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSelectedProducts,
  selectProducts,
} from "../redux/actions/ProductActions";

export interface ProductProps {
  index: string;
  image: string;
  category: string;
  liked: boolean;
  addedToCart: boolean;
  originalPrice: string;
  discountPrice: string;
}

export interface RootState {
  allProducts: {
    products: ProductProps[];
  };
}

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );
  // console.log(products);
  const productsInCart = products.filter((p)=>p.addedToCart === true)
  console.log(productsInCart)
  const [value, setValue] = useState<number>(productsInCart.length);
  const [searchValue, setSearchValue] = useState<string>("");
  const [imgList, setImgList] =
    useState<
      {
        image: string;
        index: string;
        category: string;
        liked: boolean;
        addedToCart: boolean;
      }[]
    >(ImageList);

  const handleLogin = () => {
    console.log("Account icon clicked");
  };

  const handleCart = () => {
    console.log("cart icon clicked");
    navigate("Cart");
  };

  const handleItemAddedToCart = (id: string) => {
    console.log("added to cart");
    dispatch(selectProducts(id));
  };

  const handleWishList = (id: string) => {
    console.log("id is " + id);
    setImgList((prevImageList) =>
      prevImageList.map((img) =>
        img.index === id ? { ...img, liked: !img.liked } : img
      )
    );
  };

  return (
    <div>
      <Grid
        sx={{ height: "50px", width: "100%", backgroundColor: "lightblue" }}
        display="flex"
        justifyContent="space-between"
        marginBottom="40px"
      >
        <Stack display="flex" alignItems="center"></Stack>
        <Stack display="flex" flexDirection="row">
          <Icon
            src="./images/ganeshLogo.png"
            alt="ganeshLogo"
            style={{ height: "50px", width: "50px" }}
          />
          <Typography variant="h4">Vinayaka Jewellery Works</Typography>
        </Stack>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap="30px"
        >
          <TextField
            id="input-with-icon-textfield"
            label="search by category"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ marginTop: "0px", p: "0" }}
                >
                  <IconButton onClick={() => setValue((value) => value + 1)}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard" // can try with outlined
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Grid display="flex" alignItems="center" gap="20px">
            <IconButton onClick={handleLogin}>
              <AccountCircle sx={{ height: "30px", width: "30px" }} />
            </IconButton>
            <IconButton onClick={() => navigate("/wishlist")}>
              <FavoriteBorderIcon sx={{ height: "30px", width: "30px" }} />
            </IconButton>
            <IconButton onClick={handleCart}>
              <Badge
                badgeContent={value}
                color="primary"
                sx={{ m: "0 20px 0 0px" }}
              >
                <ShoppingCartIcon sx={{ height: "30px", width: "30px" }} />
              </Badge>
            </IconButton>
          </Grid>
        </Stack>
      </Grid>
      <Stack
        display="flex"
        flexDirection="row"
        width="100%"
        flexWrap="wrap"
        flexGrow="initial"
      >
        {searchValue === ""
          ? products.map((image) => (
              <Product
                key={image.index}
                index={image.index}
                src={image.image}
                alt={`Image ${image.index}`}
                style={{ height: "200px" }}
                originalPrice={image.originalPrice}
                discountPrice={image.discountPrice}
                handleWishList={() => handleWishList(image.index)}
                handleItemAddedToCart={() => handleItemAddedToCart(image.index)}
              />
            ))
          : products
              .filter((img) => img.category.includes(searchValue))
              .map((image) => (
                <Product
                  key={image.index}
                  index={image.index}
                  src={image.image}
                  alt={`Image ${image.index}`}
                  style={{ height: "200px" }}
                  originalPrice={image.originalPrice}
                  discountPrice={image.discountPrice}
                  handleWishList={() => handleWishList(image.index)}
                />
              ))}
      </Stack>
    </div>
  );
};

export default Home;
