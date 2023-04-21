import React, { useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FilterBAndWIcon from "@mui/icons-material/FilterBAndW";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useGallleryContext } from "../contexts/galleryContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const searchInputRef = useRef("");
  const { mode, changeMode, user, logOut, SearchImages } = useGallleryContext();
  const onChange = (e) => {
    SearchImages(searchInputRef.current.value);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <FilterBAndWIcon sx={{ display: { md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            GALLERY
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              inputRef={searchInputRef}
              onChange={onChange}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {user === "" ? (
            <Button href="login" color="inherit">
              Login
            </Button>
          ) : (
            <Button href="login" onClick={logOut} color="inherit">
              Logout
            </Button>
          )}
          <Tooltip title={`Enable ${mode === "light" ? "dark" : "light"} mode`}>
            <IconButton onClick={changeMode} sx={{ color: "white" }}>
              {mode === "dark" ? (
                <LightModeIcon fontSize="inherit" />
              ) : (
                <DarkModeIcon fontSize="inherit" />
              )}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
