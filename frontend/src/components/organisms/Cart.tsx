import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Product from "../molecules/Products";
import { Product as ProductType } from "../../types/Product";

import {
  Button,
  Grid,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResponsiveIcon = styled("img")(({ theme }) => ({
  height: "50px",
  width: "50px",
  mixBlendMode: "multiply",
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem", // Adjust font size for small screens
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem", // Adjust font size for medium screens
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "2rem", // Adjust font size for large screens
  },
}));

const Cart = () => {
  const products = useSelector((state: RootState) =>
      state.cartProducts.products);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  useEffect(() => {
  }, [products]);
  return (
    <>
      <Stack
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: isSmallScreen ? "auto" : "50px",
          width: "100%",
          backgroundColor: "lightblue",
          padding: isSmallScreen ? "10px" : "0",
        }}
      >
        <Grid
          display="flex"
          alignItems="center"
          justifySelf={isSmallScreen ? "center" : "flex-start"}
          position="relative"
          left={isSmallScreen ? "0" : "35%"}
          textAlign={isSmallScreen ? "center" : "left"}
        >
          <ResponsiveIcon src="./images/ganeshLogo.png" alt="ganeshLogo" />
          <ResponsiveTypography variant="h4">
            Vinayaka Jewellery Works
          </ResponsiveTypography>
        </Grid>
        <Grid
          display="flex"
          justifyContent={isSmallScreen ? "center" : "flex-end"}
        >
          <Button onClick={() => navigate("/home")}>Home</Button>
        </Grid>
      </Stack>
      <Stack
        display="flex"
        flexDirection="row"
        width="100%"
        flexWrap="wrap"
        flexGrow="initial"
      >
        {products.map((p:ProductType) => {
          const { image, id, originalPrice, discountPrice } = p;
          return (
              <Product
                key={id}
                image={image}
                index={id}
                alt={`Image ${id}`}
                style={{ height: "200px" }}
                originalPrice={originalPrice}
                discountPrice={discountPrice}
                pageType="CART"
              />
            );
        })}
      </Stack>
    </>
  );
};

export default Cart;
