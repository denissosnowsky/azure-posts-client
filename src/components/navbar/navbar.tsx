import React, { FC, useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar } from '@mui/material'

import { StoreContext } from '../../context/storeProvider'
import s from './navbar.module.css'
import { Header } from '../header/header'
import { useLocation } from 'react-router-dom'
import { DrawerNavigation } from './drawerNavigation/drawerNavigation'

export const NavBar: FC<Props> = ({ children, logoutHandler }) => {
  const blogName = 'Blog'
  const authorsName = 'Authors'
  const articlesName = 'Articles'
  const { userPhoto, userData, userId } = useContext(StoreContext)!
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  let location = useLocation()

  useEffect(() => {
    switch (location.pathname) {
      case `/blog/${userId}`:
        setActiveLink(blogName)
        break
      case '/':
        setActiveLink(articlesName)
        break
      case '/authors':
        setActiveLink(authorsName)
        break
      default:
        setActiveLink('')
    }
  }, [location, userId])

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className={s.wrapper} >
        <AppBar position="static" color="transparent">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setToggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {activeLink}
            </Typography>
            <div className={s.logoWrapper}>
              <Header style={{ fontSize: '30px' }} />
            </div>
            <div className={s.name}>{userData.displayName ?? ''}</div>
            <div>
              <Avatar alt={userData.displayName ?? ''} src={userPhoto} />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <DrawerNavigation
        userId={userId}
        blogName={blogName}
        activeLink={activeLink}
        authorsName={authorsName}
        articlesName={articlesName}
        toggleDrawer={toggleDrawer}
        logoutHandler={logoutHandler}
        setToggleDrawer={setToggleDrawer}
      />
      {children}
    </>
  )
}

type Props = {
  logoutHandler: () => void
}
