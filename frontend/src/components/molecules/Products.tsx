import { Button, Grid, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import Icon from "../atoms/Icon";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  addProductToCart,
  addToWishlist,
  removeProductFromCart,
  removeSelectedWishlist,
} from "../../redux/actions/ProductActions";
import { toast } from "sonner";
import { useAppSelector } from "../../types/hooks";

interface ProductCardProps {
  index: string;
  image: string;
  alt: string;
  style: React.CSSProperties;
  handleWishList?: (id: string) => void;
  handleItemAddedToCart?: (id: string) => void;
  originalPrice: string;
  discountPrice: string;
  wishlisted?: boolean;
  addedToCart?: boolean;
  name?: string;
  pageType?: string;
}

const Product = ({
  index,
  image,
  alt,
  style,
  handleWishList,
  handleItemAddedToCart,
  discountPrice,
  originalPrice,
  wishlisted,
  addedToCart,
  pageType,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [liked, setLiked] = useState<boolean>(false);
  const [hovered, setHovered] = useState(false);
  const [addedToCartState, setAddedToCartState] = useState<boolean>(addedToCart || false);
  const [wishlistedState, setWishlistedState] = useState<boolean>(wishlisted || false);

  const {user:username,token: userAuthToken} = useAppSelector((state) => state.auth);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleLike = async (id: string) => {
    // setWishlistedState(true);
    // setLiked((value) => !value);
    const response = await fetch(`http://localhost:8080/v1/products/wishlist/${id}?username=${username}`,{
            method: 'POST',
             headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userAuthToken}`,
            },
    });
    console.log("Response from adding to wishlist", response)
    const json = await response.json();
    const wishlisted = json.product;
    dispatch(addToWishlist(wishlisted));
    toast.success("Item added to wishlist", { duration: 1000 });
  };

  const handleParticularProduct = (id: string) => {
    console.log("Individual product clicked:", id);
    navigate(`/product/${id}`);
  };

  const handleAddToCart = async(id: string) => {
    setAddedToCartState(true);
    handleItemAddedToCart?.(id);
    const response = await fetch(`http://localhost:8080/v1/products/cart/${id}?username=${username}`,{
            method: 'POST',
             headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userAuthToken}`,
            },
          });
    console.log("Response from adding to cart", response)
    toast.success("Item added to Cart", { duration: 1000 });
    const json = await response.json();
    const productToAdd = json.product;
    dispatch(addProductToCart(productToAdd));
  };

  const handleDelete = (id: string) => {
    const currentPath = window.location.pathname;
    if (currentPath.match("/wishlist")) {
      toast.info("Item removed from wishlist", { duration: 1000 });
      dispatch(removeSelectedWishlist(id));
    } else if (currentPath.match("/cart")) {
      toast.info("Item removed from cart", { duration: 1000 });
      dispatch(removeProductFromCart(id));
    }
  };

  return (
    <Grid
      display="flex"
      flexDirection="column"
      width="300px"
      alignItems="center"
      margin="20px 30px"
      sx={{
        "&:hover": {
          backgroundColor: "#FEF3E2",
          transform: "scale(1.05)",
          border: "2px solid black",
          padding: "10px",
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon
        key={index}
        alt={alt}
        src={image}
        style={style}
        onClick={() => handleParticularProduct(index)}
      />
      <Stack
        display="flex"
        flexDirection="row"
        m="10px"
        gap="20px"
        alignItems="center"
      >
        <h3>
          <del>₹{originalPrice}</del> ₹{discountPrice}
        </h3>
        {!wishlistedState && (
          <IconButton
            style={{ height: "40px", width: "40px" }}
            onClick={() => handleLike(index)}
            sx={{ alignContent: "center" }}
          >
            {liked ? (
              <Icon
                key={index}
                src="./images/liked.png"
                alt="not-liked"
                style={{ height: "30px", width: "30px" }}
              />
            ) : (
              <Icon
                key={index}
                src="./images/normal.png"
                alt="not-liked"
                style={{ height: "30px", width: "30px" }}
              />
            )}
          </IconButton>
        )}
        {(wishlistedState || addedToCartState) && (
          <IconButton onClick={() => handleDelete(index)}>
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      {!addedToCartState && hovered && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF9F00",
            "&:hover": { backgroundColor: "#FF9F00" },
            width: "150px",
          }}
          onClick={() => handleAddToCart(index)}
        >
          {pageType === "CART" ? "Buy Now" : "Add to Cart"}
        </Button>
      )}
    </Grid>
  );
};

export default Product;
