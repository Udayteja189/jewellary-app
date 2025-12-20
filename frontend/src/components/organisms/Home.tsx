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
import React, {useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Product from "../molecules/Products";
import { Product as ProductType } from "../../types/Product";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, setProducts, setProductsInCart, setWishListed } from "../../redux/actions/ProductActions";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "../../types/hooks";
import { RootState } from "../../redux/store";
import { WishlistItems } from "../../types/wishlist";
import { CartItems } from "../../types/cart";
// import { useDropzone } from "react-dropzone"; // removed (not used)

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
  const [isMediumOrSmaller, setIsMediumOrSmaller] = useState(false);

  // const onDrop = useCallback((acceptedFiles: File[]) => {
  //   // handle dropped files (unused in header)
  //   console.log(acceptedFiles);
  // }, []);

  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

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
  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );

  const wishlistedProducts = useSelector(
    (state: RootState) => state.wishlistProducts.products
  );

  const productsInCart = useSelector(
    (state: RootState) => state.cartProducts.products
  );

  const dispatch = useDispatch();
  const productsCount = products ? products.length : 0;

  const {user:username,token: userAuthToken} = useAppSelector((state) => state.auth);

  const fetchJson = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
  };

  const loadProducts = async () => {
  const data = await fetchJson("http://localhost:8080/v1/products");
  dispatch(setProducts(data));
};

const loadWishlist = async () => {
  const data: WishlistItems[] = await fetchJson(
    `http://localhost:8080/v1/products/wishlisted?username=${username}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuthToken}`,
      },
    }
  );

  const productsOnly = data.map(item => item.product);

  dispatch(setWishListed(productsOnly));
};

const loadCart = async () => {
  const data:CartItems[] = await fetchJson(
    `http://localhost:8080/v1/products/cart?username=${username}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuthToken}`,
      },
    }
  );

  const productsOnly = data.map(item => item.product);
  dispatch(setProductsInCart(productsOnly));
};



  // load products from API on mount and populate redux store
  useEffect(() => {
  if (productsCount > 0) {
    console.debug("Products already in store — skipping API fetch");
    return;
  }

  const init = async () => {
    try {
      await Promise.all([
        loadProducts(),
        loadWishlist(),
        loadCart(),
      ]);
    } catch (error) {
      console.error("Failed to initialize data", error);
    }
  };
  console.log("Redux cart updated:", productsInCart);

  init();
}, [productsCount, loadCart, loadWishlist, dispatch, productsInCart]);


  const [searchValue, setSearchValue] = useState<string>("");

  const handleProfileImg = () => {
    // <div {...getRootProps()}>
    //     <input {...getInputProps()} />
    //     {
    //       isDragActive ?
    //         <p>Drop the files here ...</p> :
    //         <button>Drag 'n' drop some files here, or click to select files </button>
    //     }
    //   </div>
    console.log("Account icon clicked");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleMenuItems = (key: string) => {
    switch (
      key //Wishlists", "My Cart", "Account
    ) {
      case "Wishlists":
        navigate("/wishlist");
        break;
      case "My Cart":
        navigate("/cart");
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
            key="Company-Logo-Name"
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
          <Stack display="flex" flexDirection="row" key="right-nav-items">
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
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard" // can try with outlined
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Grid display="flex" alignItems="center" gap="20px">
                <IconButton onClick={handleProfileImg}>
                  <AccountCircle sx={{ height: "30px", width: "30px" }} />
                </IconButton>
                <IconButton onClick={() => navigate("/wishlist")}>
                  <Badge badgeContent={wishlistedProducts.length} color="primary">
                    <FavoriteBorderIcon
                      sx={{ height: "30px", width: "30px" }}
                    />
                  </Badge>
                </IconButton>
                <IconButton onClick={handleCart} disableRipple>
                  <Badge badgeContent={productsInCart.length} color="primary">
                    <ShoppingCartIcon sx={{ height: "30px", width: "30px" }} />
                  </Badge>
                </IconButton>
              </Grid>
            </Stack>
          ) : (
            <Stack />
          )}
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
          ? products.map((p:ProductType) => (
                <Product
                  key={p.id}
                  index={p.id}
                  image={p.image}
                  alt={`Image ${p.id}`}
                  style={{ height: "200px" }}
                  originalPrice={p.originalPrice}
                  discountPrice={p.discountPrice}
                  name={p.name}
                />
              ))
          : products
                .filter((img: { category: string}) => img.category.includes(searchValue))
                .map((p: ProductType) => (
                  <Product
                    key={p.id}
                    index={p.id}
                    image={p.image}
                    alt={`Image ${p.id}`}
                    style={{ height: "200px" }}
                    originalPrice={p.originalPrice}
                    discountPrice={p.discountPrice}
                  />
                ))}
      </Stack>
    </div>
  );
};

export default Home;
