import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Stack, Button, Typography } from "@mui/material";
import Icon from "../atoms/Icon";
import { addProductToCart } from "../../redux/actions/ProductActions";
import { toast } from "sonner";
import { Product as ProductType } from "../../types/Product";
import { useAppSelector } from "../../types/hooks";

export interface RootState {
  [x: string]: any;
  allProducts: {
    products: ProductType[];
  };
}

const IndividualProduct = () => {

  const param = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );

  const productsInCart = useSelector(
      (state: RootState) => state.cartProducts.products
    );

  const {user:username,token: userAuthToken} = useAppSelector((state) => state.auth);

  const [product, setProduct] = React.useState<ProductType | undefined>(undefined);

    const handleItemAddedToCart = async (id: string) => {
    toast.success("Item added to cart",{duration:1000})
    const response = await fetch(`http://localhost:8080/v1/products/cart/${id}?username=${username}`,{
        method: 'POST',
         headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
    console.log("Response from adding to cart", response)
    const productToAdd = response.json().then(data => {
        return data.product;
    })
    dispatch(addProductToCart(productToAdd));
    console.log("after dispatch event - products in cart:", productsInCart);
  };

  useEffect(() => {
    console.log("Products in IndividualProduct:", param.id);
    console.log("All Products:", products);
  
    const selectedProduct = products?.find(
      (p) => String(p.id) === String(param.id)
    );

    setProduct(selectedProduct);
  }, [products, param.id,productsInCart,handleItemAddedToCart]);

  



  if (!product) {
    return (
      <Stack sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Product not found or still loading.</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/home')}>Back to Home</Button>
      </Stack>
    );
  }

  const { image, id, originalPrice, discountPrice } = product;
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
          <Button onClick={()=>navigate("/home")}>Home</Button>
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
          key={id}
          alt={`image ${id}`}
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
            onClick={() => handleItemAddedToCart?.(id)}
          >
            Add to Cart
          </Button>
        </Stack>
      </Grid>
    </>
  );
};

export default IndividualProduct;
