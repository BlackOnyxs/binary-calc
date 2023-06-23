import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.jsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { darkTheme } from '../themes/'
import { BrowserRouter } from 'react-router-dom';
import { UIProvider } from './context/UIProvider.jsx'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UIProvider>
      <BrowserRouter>
        <ThemeProvider theme={ darkTheme }>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </UIProvider>
  </React.StrictMode>,
)
