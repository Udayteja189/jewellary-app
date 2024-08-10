import {
  TextField,
  Stack,
  Grid,
  IconButton,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Icon from "../atoms/Icon";
import Product from "../molecules/product";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import {
  selectProducts,
  selectWishlist,
} from "../../redux/actions/ProductActions";

export interface ProductProps {
  index: string;
  image: string;
  category: string;
  liked: boolean;
  addedToCart: boolean;
  originalPrice: string;
  discountPrice: string;
}

export interface RootState {
  allProducts: {
    products: ProductProps[];
  };
}

const StyledNavGrid = styled(Grid)(({ theme }) => ({
  height: "80px",
  width: "100%",
  backgroundColor: "lightblue",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "40px",
  alignItems: "center",
}));

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

const Home = () => {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmallUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [isMediumOrSmaller, setIsMediumOrSmaller] = useState(false);

  const pages = ["Wishlists", "My Cart", "Account"];

  const [anchorElNav, setAnchorElNav] =
    React.useState<null | HTMLElement>(null);

  useEffect(() => {
    setIsMediumOrSmaller(!isMediumUp); // true if viewport is medium or smaller
  }, [isMediumUp]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );
  
  const handleItemAddedToCart = (id: string) => {
    dispatch(selectProducts(id));
  };

  const [value, setValue] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleLogin = () => {
    console.log("Account icon clicked");
  };

  const handleCart = () => {
    navigate("cart");
  };

  useEffect(() => {
    const productsInCart = products.filter((p) => p.addedToCart === true);
    setValue(productsInCart.length);
  }, [products])


  const handleWishList = (id: string) => {
    console.log("wishlisted id is " + id);
    dispatch(selectWishlist(id));
  };

  const handleMenuItems = (key: string) => {
    switch (
      key //Wishlists", "My Cart", "Account
    ) {
      case "Wishlists":
        navigate("wishlist");
        break;
      case "My Cart":
        navigate("cart");
        break;
      case "Account":
        console.log("Account menu items clicked");
        break;
    }
  };

  return (
    <div>
      <StyledNavGrid>
        <>
          <Stack
            display="flex"
            alignItems="center"
            justifyContent="center"
            m="0 5vh"
          >
            {isMediumOrSmaller && (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Stack onClick={() => handleMenuItems(page)}>
                        <Typography textAlign="center">{page}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Stack>
          <Stack display="flex" flexDirection="row">
            <ResponsiveIcon
              src="./images/ganeshLogo.png"
              alt="ganeshLogo"
              // to mix img-background withbackground color
              style={{
                height: "50px",
                width: "50px",
                mixBlendMode: "multiply",
              }}
            />
            <ResponsiveTypography>
              Vinayaka Jewellery Works
            </ResponsiveTypography>
          </Stack>
          {!isMediumOrSmaller ? (
            <Stack
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              gap="30px"
            >
              <TextField
                id="input-with-icon-textfield"
                label="search by category"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ marginTop: "0px", p: "0" }}
                    >
                      <IconButton
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard" // can try with outlined
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Grid display="flex" alignItems="center" gap="20px">
                <IconButton onClick={handleLogin}>
                  <AccountCircle sx={{ height: "30px", width: "30px" }} />
                </IconButton>
                <IconButton onClick={() => navigate("/wishlist")}>
                  <FavoriteBorderIcon sx={{ height: "30px", width: "30px" }} />
                </IconButton>
                <IconButton onClick={handleCart} disableRipple>
                  <Badge
                    badgeContent={value}
                    color="primary"
                    sx={{ m: "0 20px 0 0px" }}
                  >
                    <ShoppingCartIcon sx={{ height: "30px", width: "30px" }} />
                  </Badge>
                </IconButton>
              </Grid>
            </Stack>
          ) : <Stack/>}
        </>
      </StyledNavGrid>
      <Stack
        display="flex"
        flexDirection="row"
        width="100%"
        flexWrap="wrap"
        flexGrow="initial"
        justifyContent="center"
      >
        {searchValue === ""
          ? products.map((image) => (
              <Product
                key={image.index}
                index={image.index}
                src={image.image}
                alt={`Image ${image.index}`}
                style={{ height: "200px" }}
                originalPrice={image.originalPrice}
                discountPrice={image.discountPrice}
                handleWishList={() => handleWishList(image.index)}
                handleItemAddedToCart={() => handleItemAddedToCart(image.index)}
              />
            ))
          : products
              .filter((img) => img.category.includes(searchValue))
              .map((image) => (
                <Product
                  key={image.index}
                  index={image.index}
                  src={image.image}
                  alt={`Image ${image.index}`}
                  style={{ height: "200px" }}
                  originalPrice={image.originalPrice}
                  discountPrice={image.discountPrice}
                  handleWishList={() => handleWishList(image.index)}
                  handleItemAddedToCart={() =>
                    handleItemAddedToCart(image.index)
                  }
                />
              ))}
      </Stack>
    </div>
  );
};

export default Home;
