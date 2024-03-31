import {
  Button,
  Grid,
  IconButton,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import Icon from "../atoms/Icon";
import ImageList from "../../gallery.json";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  index: string;
  src: string;
  alt: string;
  style: React.CSSProperties;
  handleWishList?: (id: string) => void;
  handleItemAddedToCart?: (id: string) => void;
  originalPrice: string;
  discountPrice: string;
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
}: ProductProps) => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("1");
  const [liked, setLiked] = useState<boolean>(false);
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  console.log("original price is " + originalPrice);
  const handleLike = (id: string) => {
    setLiked((value) => !value);
    console.log("id in product page is" + id);
    handleWishList?.(id);
  };

  const handleParticularProduct = (id: string) => {
    console.log("clicked a particular product");
    navigate(`product/${id}`);
  };

  return (
    <Grid
      display="flex"
      flexDirection="column"
      width="300px"
      alignItems="center"
      marginBottom="30px"
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
              style={{ height: "40px", width: "40px" }}
            />
          ) : (
            <Icon
              key={index}
              src="./images/normal.png"
              alt="not-liked"
              style={{ height: "40px", width: "40px" }}
            />
          )}
        </IconButton>
      </Stack>
    </Grid>
  );
};

export default Product;
