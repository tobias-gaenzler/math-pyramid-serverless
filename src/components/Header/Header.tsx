import React from "react";
import "./Header.css";
import {
  Box,
  AppBar,
  Toolbar,
  CssBaseline
} from "@mui/material";

type Props = {};
const Header: React.FC<Props> = () => {
  return (
    <Box className="header" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <CssBaseline />
        <Toolbar className="header-toolbar">
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
