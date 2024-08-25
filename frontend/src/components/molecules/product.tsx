import { Button, Grid, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import Icon from "../atoms/Icon";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  removeSelectedProducts,
  removeSelectedWishlist,
  selectProducts,
  selectWishlist,
} from "../../redux/actions/ProductActions";
import { toast } from "sonner";

interface ProductProps {
  index: string;
  src: string;
  alt: string;
  style: React.CSSProperties;
  handleWishList?: (id: string) => void;
  handleItemAddedToCart?: (id: string) => void;
  originalPrice: string;
  discountPrice: string;
  wishlisted?: boolean;
  addedToCart?: boolean;
}

const Product = ({
  index,
  src,
  alt,
  style,
  handleWishList,
  handleItemAddedToCart,
  discountPrice,
  originalPrice,
  wishlisted,
  addedToCart,
}: ProductProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [liked, setLiked] = useState<boolean>(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleLike = (id: string) => {
    setLiked((value) => !value);
    handleWishList?.(id);
    toast.success("Item added to wishlist", { duration: 1000 });
    dispatch(selectWishlist(id));
  };

  const handleParticularProduct = (id: string) => {
    navigate(`product/${id}`);
  };

  const handleAddToCart = (id: string) => {
    handleItemAddedToCart?.(id);
    toast.success("Item added to Cart", { duration: 1000 });
    dispatch(selectProducts(id));
  };

  const handleDelete = (id: string) => {
    const currentPath = window.location.pathname;
    if (currentPath.match("/wishlist")) {
      toast.info("Item removed from wishlist", { duration: 1000 });
      dispatch(removeSelectedWishlist(id));
    } else if (currentPath.match("/cart")) {
      toast.info("Item removed from cart", { duration: 1000 });
      dispatch(removeSelectedProducts(id));
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
        src={src}
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
        {!wishlisted && (
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
        {(wishlisted || addedToCart) && (
          <IconButton onClick={() => handleDelete(index)}>
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      {!addedToCart && hovered && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF9F00",
            "&:hover": { backgroundColor: "#FF9F00" },
            width: "150px",
          }}
          onClick={() => handleAddToCart(index)}
        >
          Add to Cart
        </Button>
      )}
    </Grid>
  );
};

export default Product;
