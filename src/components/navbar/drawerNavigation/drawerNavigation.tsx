import React, { VFC } from 'react'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import GroupIcon from '@mui/icons-material/Group'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Box from '@mui/material/Box'
import { NavLink } from 'react-router-dom'

import s from './drawerNavigation.module.css'

export const DrawerNavigation: VFC<Props> = ({
  userId,
  blogName,
  activeLink,
  authorsName,
  articlesName,
  toggleDrawer,
  setToggleDrawer,
  logoutHandler,
}) => {
  return (
    <Drawer
      anchor="left"
      open={toggleDrawer}
      onClose={() => setToggleDrawer(false)}
    >
      <Box onClick={() => setToggleDrawer(false)}>
        <List className={s.list}>
          <NavLink to="/">
            <ListItem button selected={activeLink === articlesName}>
              <ListItemIcon>
                <LibraryBooksIcon
                  className={
                    activeLink === articlesName ? s.active : 'iconDrawer'
                  }
                />
              </ListItemIcon>
              <ListItemText primary="All Articles" />
            </ListItem>
          </NavLink>
          <NavLink to={`/blog/${userId}`}>
            <ListItem button selected={activeLink === blogName}>
              <ListItemIcon>
                <MenuBookIcon
                  className={activeLink === blogName ? s.active : 'iconDrawer'}
                />
              </ListItemIcon>
              <ListItemText primary="My Blog" />
            </ListItem>
          </NavLink>
          <NavLink to="/authors">
            <ListItem button selected={activeLink === authorsName}>
              <ListItemIcon>
                <GroupIcon
                  className={
                    activeLink === authorsName ? s.active : 'iconDrawer'
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Authors" />
            </ListItem>
          </NavLink>
          <ListItem button onClick={logoutHandler}>
            <ListItemIcon>
              <LogoutIcon className="iconDrawer" />
            </ListItemIcon>
            <ListItemText primary="LogOut" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

type Props = {
  userId: string
  blogName: string
  activeLink: string
  authorsName: string
  articlesName: string
  toggleDrawer: boolean
  logoutHandler: () => void
  setToggleDrawer: (arg: boolean) => void
}
