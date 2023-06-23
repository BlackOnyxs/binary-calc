import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { NavBar, SideBar } from '../ui'
import { Calculator } from '../../pages/Calculator';
import { Transform } from '../../pages/Transform';
import { Box } from '@mui/material'

export const Layout = () => {
  return (
    <Box sx={{ flexFlow: 1 }}>

    <NavBar />
    <SideBar />

    <Box 
      sx={{ padding: '10px 20px'}}
    >
        <Routes>
          <>
            <Route path='/' element={ <Calculator />}/>
            <Route path='/transform' element={ <Transform />}/>
          </>
        </Routes>
    </Box>
    </Box>
  )
}
