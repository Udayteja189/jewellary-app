import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import Icon from "./atoms/Icon";
import ImageList from "../gallery.json";
import { useSelector } from "react-redux";
import { RootState } from "./Home";

const Wishlist = () => {
  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );
  // console.log(products);
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
        {ImageList.filter((img) => img.liked).map((image) => (
          <Grid>
            <Icon
              src={image.image}
              alt={`Image ${image.index}`}
              style={{ height: "200px" }}
            />
          </Grid>
        ))}
      </Stack>
    </div>
  );
};
export default Wishlist;
