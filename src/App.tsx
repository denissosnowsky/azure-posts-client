import React, { useContext } from 'react'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'
import { useMsal, useAccount } from '@azure/msal-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { config } from './config'
import { Login } from './pages/login/login'
import { Loading } from './components/loading/loading'
import { StoreContext } from './context/storeProvider'
import { useInitUser } from './hooks/initUser'
import { NavBar } from './components/navbar/navbar'
import { Articles } from './pages/articles/articles'
import './index.css'
import { Authors } from './pages/authors/authors'
import { Blog } from './pages/blog/blog'
import { NavbarNoAuth } from './components/navbarNoAuth/navbarNoAuth'

function App() {
  const { instance, accounts, inProgress } = useMsal()
  const account = useAccount(accounts[0] || {})
  const {
    initUserLoading,
    setUserId,
    setUserData,
    setUserPhoto,
    setInitUserLoading,
  } = useContext(StoreContext)!

  useInitUser(
    account,
    instance,
    setUserId,
    setUserData,
    setUserPhoto,
    setInitUserLoading,
  )

  const authRequest = {
    scopes: config.scopes,
    prompt: 'select_account',
  }

  const loginHandler = () => {
    setInitUserLoading(true)
    instance.loginPopup(authRequest)
  }

  const logoutHanlder = () => {
    instance.logoutPopup({
      mainWindowRedirectUri: config.redirectUri,
    })
    localStorage.removeItem(config.localStorageName)
    localStorage.removeItem(config.localStorageAccessToken)
    localStorage.removeItem(config.localStorageUserId)
    setUserData(null)
    setUserPhoto('')
    setUserId('')
  }

  if (initUserLoading) {
    return <Loading />
  }

  return (
    <>
      <AuthenticatedTemplate>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <NavBar logoutHandler={logoutHanlder}>
                  <Articles />
                </NavBar>
              }
            />
            <Route
              path="/authors"
              element={
                <NavBar logoutHandler={logoutHanlder}>
                  <Authors />
                </NavBar>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <NavBar logoutHandler={logoutHanlder}>
                  <Blog />
                </NavBar>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        {inProgress === 'login' ? (
          <Loading />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login loginHandler={loginHandler} />} />
              <Route
                path="/articles"
                element={
                  <NavbarNoAuth>
                    <Articles />
                  </NavbarNoAuth>
                }
              />
            </Routes>
          </BrowserRouter>
        )}
      </UnauthenticatedTemplate>
    </>
  )
}

export default App
