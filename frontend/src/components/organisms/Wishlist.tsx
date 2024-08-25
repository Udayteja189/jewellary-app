import { Button, Grid, Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import {  useSelector } from "react-redux";
import { RootState } from "./Home";
import Product from "../molecules/product";
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

const Wishlist = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );


  return (
    <>
      <Stack
      display="flex"
      flexDirection={isSmallScreen ? 'column' : 'row'}
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: isSmallScreen ? 'auto' : '50px', width: '100%', backgroundColor: 'lightblue', padding: isSmallScreen ? '10px' : '0' }}
    >
      <Grid
        display="flex"
        alignItems="center"
        justifySelf={isSmallScreen ? 'center' : 'flex-start'}
        position="relative"
        left={isSmallScreen ? '0' : '35%'}
        textAlign={isSmallScreen ? 'center' : 'left'}
      
      >
        <ResponsiveIcon
          src="./images/ganeshLogo.png"
          alt="ganeshLogo"
        />
        <ResponsiveTypography variant="h4">
          Vinayaka Jewellery Works
        </ResponsiveTypography>
      </Grid>
      <Grid display="flex" justifyContent={isSmallScreen ? 'center' : 'flex-end'}>
        <Button onClick={() => navigate("/")}>Home</Button>
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
          const { image, index, originalPrice, discountPrice, liked } = p;
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
    </>
  );
};
export default Wishlist;
