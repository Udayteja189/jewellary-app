import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Home";
import Product from "./molecules/product";
import { Stack, Typography } from "@mui/material";

const Cart = () => {
  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );
  //   console.log(products);
  return (
    <div>
      <Stack
        display="flex"
        alignItems="center"
        justifySelf="center"
        sx={{ height: "50px", width: "100%", backgroundColor: "lightblue" }}
      >
        <Typography variant="h4">Vinayaka Jewellery Works</Typography>
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
            />
          )
        );
      })}
    </Stack>
    </div>
  );
};

export default Cart;
