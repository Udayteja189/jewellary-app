import { Button, Grid, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import Icon from "../atoms/Icon";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { removeSelectedProducts, removeSelectedWishlist, selectWishlist } from "../../redux/actions/ProductActions";

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
    dispatch(selectWishlist(id));
  };

  const handleParticularProduct = (id: string) => {
    navigate(`product/${id}`);
  };

  const handleDelete = (id:string) => {
     const currentPath = window.location.pathname;
     console.log(currentPath)
     if(currentPath.match("/wishlist")){
        dispatch(removeSelectedWishlist(id))
     }else if(currentPath.match("/cart")){
        dispatch(removeSelectedProducts(id))
     }
  }


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
          <span style={{ textDecoration: "line-through" }}>
            ₹{originalPrice}
          </span>{" "}
          ₹{discountPrice}
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
        {
          (wishlisted || addedToCart) && (
            <IconButton onClick={() => handleDelete(index)}>
              <DeleteIcon />
            </IconButton>
          )
        }
      </Stack>
      {!addedToCart && hovered && (
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
      )}
    </Grid>
  );
};

export default Product;
