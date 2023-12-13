import React from 'react'
import './Header.css'
import {
  Box,
  AppBar,
  Toolbar,
  CssBaseline
} from '@mui/material'

interface Props {}
const Header: React.FC<Props> = () => (
    <Box className="header" sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
            <CssBaseline />
            <Toolbar className="header-toolbar" />
        </AppBar>
    </Box>
)

export default Header
