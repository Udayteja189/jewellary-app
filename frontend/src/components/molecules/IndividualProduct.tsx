import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../Home";
import { Grid, Stack, Button, IconButton, Typography } from "@mui/material";
import Icon from "../atoms/Icon";
import { selectProducts } from "../../redux/actions/ProductActions";

const IndividualProduct = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );
  console.log(param);
  const product = products.filter((p) => p.index === param.id)[0];
  const handleItemAddedToCart = (id: string) => {
    console.log("added to cart");
    dispatch(selectProducts(id));
  };
  const {
    liked,
    addedToCart,
    image,
    category,
    index,
    originalPrice,
    discountPrice,
  } = product;
  console.log(product);
  return (
    <>
      <Stack
        display="flex"
        alignItems="center"
        justifySelf="center"
        sx={{ height: "50px", width: "100%", backgroundColor: "lightblue" }}
      >
        <Typography variant="h4">Vinayaka Jewellery Works</Typography>
      </Stack>
      <Grid
        display="flex"
        flexDirection="row"
        alignItems="center"
        marginBottom="30px"
        gap="40px"
        marginLeft="40px"
      >
        <Icon
          key={index}
          alt={`image ${index}`}
          src={image}
          style={{ height: "400px" }}
        />
        <Stack display="flex" flexDirection="column" m="10px" gap="20px">
          <h3>
            <span style={{ textDecoration: "line-through" }}>
              ₹{originalPrice}
            </span>{" "}
            ₹{discountPrice}
          </h3>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#416D19",
              "&:hover": { backgroundColor: "#87A922" },
              width: "150px",
            }}
          >
            Buy Now
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF9F00",
              "&:hover": { backgroundColor: "#FF9F00" },
              width: "150px",
            }}
            onClick={() => handleItemAddedToCart?.(index)}
          >
            Add to Cart
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default IndividualProduct;
