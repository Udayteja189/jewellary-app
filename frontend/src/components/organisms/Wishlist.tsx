import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Home";
import Product from "../molecules/product";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {

  const navigate = useNavigate();

  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );
  console.log("products in wishlisted");
  console.log(products)
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
        const { image, index, originalPrice, discountPrice,liked } = p;
        return (
          p.liked && (
            <Product
              src={image}
              index={index}
              alt={`Image ${index}`}
              style={{ height: "200px" }}
              originalPrice={originalPrice}
              discountPrice={discountPrice}
              wishlisted={liked}
            />
          )
        );
      })}
      </Stack>
    </div>
  );
};
export default Wishlist;
