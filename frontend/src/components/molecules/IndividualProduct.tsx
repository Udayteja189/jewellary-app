import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../organisms/Home";
import { Grid, Stack, Button, Typography } from "@mui/material";
import Icon from "../atoms/Icon";
import { selectProducts } from "../../redux/actions/ProductActions";
import { toast } from "sonner";

const IndividualProduct = () => {

  const param = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );

  const product = products.filter((p) => p.index === param.id)[0];

  const handleItemAddedToCart = (id: string) => {
    toast.success("Item added to cart",{duration:1000})
    dispatch(selectProducts(id));
  };
  const {
    image,
    index,
    originalPrice,
    discountPrice,
  } = product;
  return (
    <>
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
            <del>
              ₹{originalPrice}
            </del>{" "}
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
