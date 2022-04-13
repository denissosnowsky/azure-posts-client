import { useEffect } from 'react'
import {
  AccountInfo,
  AuthenticationResult,
  IPublicClientApplication,
} from '@azure/msal-browser'

import { config } from '../config'
import { getUserDataFromGraph } from '../utils/getUserDataFromGraph'
import { getUserPhotoFromGraph } from '../utils/getUserPhotoFromGraph'
import { makeImageFromBlobToUri } from '../utils/makeImageFromBufferToUri'

export const useInitUser = (
  account: AccountInfo | null,
  instance: IPublicClientApplication,
  setUserId: (arg: string) => void,
  setUserData: (arg: unknown) => void,
  setUserPhoto: (arg: string) => void,
  setInitUserLoading: (arg: boolean) => void,
) => {
  useEffect(() => {
    const initUserAuth = async () => {
      if (account) {
        try {
          const metaData = await instance.acquireTokenSilent({
            scopes: config.scopes,
            account,
          })

          await setUserDataToStore(
            metaData,
            setUserId,
            setUserData,
            setUserPhoto,
            setInitUserLoading,
          )
        } catch (e) {
          const metaData = await instance.acquireTokenPopup({
            scopes: config.scopes,
            account,
          })

          await setUserDataToStore(
            metaData,
            setUserId,
            setUserData,
            setUserPhoto,
            setInitUserLoading,
          )
        }
      } else {
        setInitUserLoading(false)
      }
    }
    initUserAuth()
  }, [
    account,
    instance,
    setUserId,
    setInitUserLoading,
    setUserData,
    setUserPhoto,
  ])
}

const setUserDataToStore = async (
  metaData: AuthenticationResult,
  setUserId: (arg: string) => void,
  setUserData: (arg: unknown) => void,
  setUserPhoto: (arg: string) => void,
  setInitUserLoading: (arg: boolean) => void,
) => {
  if (metaData) {
    localStorage.setItem(config.localStorageName, metaData.idToken)
    localStorage.setItem(config.localStorageAccessToken, metaData.accessToken)

    setUserId(metaData.account?.localAccountId ?? '')

    const userData = await getUserDataFromGraph(metaData.accessToken)

    if (userData.id) {
      setUserData(userData)
    } else {
      setUserData({
        displayName: metaData.account?.name ?? '',
        userPrincipalName: metaData.account?.username ?? '',
        id: 'no_id',
      })
    }

    localStorage.setItem(config.localStorageUserId, userData.id ?? 'no_id')

    const userPhoto: Blob = await getUserPhotoFromGraph(
      metaData.accessToken,
      userData.id,
    )
    setUserPhoto(makeImageFromBlobToUri(userPhoto))
    setInitUserLoading(false)
  }
}
