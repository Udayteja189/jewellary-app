import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Home";
import Product from "../molecules/product";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );

  const navigate = useNavigate();
  return (
    <div>
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ height: "50px", width: "100%", backgroundColor: "lightblue" }}
      >
        <Grid 
          display="flex"
          alignItems="center"
          justifySelf="center"
          position="relative"
          left="35%"
        >
        <Typography variant="h4">Vinayaka Jewellery Works</Typography>
        </Grid>
        <Grid
          display="flex"
          justifyContent="end"
        >
          <Button onClick={()=>navigate("/")}>Home</Button>
        </Grid>
      </Stack>
      <Stack
        display="flex"
        flexDirection="row"
        width="100%"
        flexWrap="wrap"
        flexGrow="initial"
      >
      {products.map((p) => {
        const { image, index, originalPrice, discountPrice } = p;
        return (
          p.addedToCart && (
            <Product
              src={image}
              index={index}
              alt={`Image ${index}`}
              style={{ height: "200px" }}
              originalPrice={originalPrice}
              discountPrice={discountPrice}
              addedToCart={p.addedToCart}
            />
          )
        );
      })}
    </Stack>
    </div>
  );
};

export default Cart;
