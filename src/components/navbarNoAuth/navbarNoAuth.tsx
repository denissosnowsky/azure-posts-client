import React, { FC } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import LogoutIcon from '@mui/icons-material/Logout'
import { NavLink } from 'react-router-dom'

import s from './navbarNoAuth.module.css'

export const NavbarNoAuth: FC = ({ children }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className={s.wrapper}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <NavLink to="/">
              <LogoutIcon className={s.icon} />
            </NavLink>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </>
  )
}
