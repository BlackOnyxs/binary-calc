import { AppBar, Link, Toolbar, Typography, IconButton } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import { UIContext } from "../../context/UIContext";

export const NavBar = () => {
  const { toggleMenu } = useContext(UIContext );
  return (
    <AppBar>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={toggleMenu}>
          <MenuOutlined />
        </IconButton>
        <Link href="/" display="flex" alignItems="center" underline="none">
          <Typography variant="h6">Binary |</Typography>
          <Typography sx={{ ml: 0.5 }}>Calc</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
