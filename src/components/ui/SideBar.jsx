import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  ListItemButton,
  ListItemIcon,
  List,
  ListItemText,
  Divider,
  Link,
} from '@mui/material';
import { Calculate, MoveUp, GitHub } from '@mui/icons-material/';

import { UIContext } from '../../context/UIContext';

const menuItems = [
  {
    label: 'Calculadora',
    value: '/'
  },
  {
    label: 'Conversión',
    value: '/transform'
  },

]

export const SideBar = () => {
  const { isMenuOpen, toggleMenu } = useContext(UIContext);
  const navigate = useNavigate()
  return (
    <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
          {menuItems.map(({ value, label}, index) => (
            <ListItemButton 
              key={label}
              onClick={ () =>{
                navigate(value);
                toggleMenu()
              }}
            >
              <ListItemIcon>
                {index % 2 ? <MoveUp /> : <Calculate />}
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>

        <Divider />
        {/* * TODO: Social Media  */}

        <Link href="" underline="none">
          <ListItemButton>
            <ListItemIcon>
              <GitHub />
            </ListItemIcon>
            <ListItemText primary="GitHub" />
          </ListItemButton>
        </Link>
      </Box>
    </Drawer>
  );
};
