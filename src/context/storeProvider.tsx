import React, { createContext, FC, useState } from 'react'

type StoreContextType = {
  userId: string
  userData: any
  userPhoto: string
  isOpenAddModal: boolean
  isEditBlogMode: boolean
  initUserLoading: boolean
  setUserData: (arg: any) => void
  setUserId: (arg: string) => void
  setUserPhoto: (arg: string) => void
  setIsOpenAddModal: (arg: boolean) => void
  setIsEditBlogMode: (arg: boolean) => void
  setInitUserLoading: (arg: boolean) => void
}

const StoreContext = createContext<StoreContextType | null>(null)

const StoreContextProvider: FC = ({ children }) => {
  const [userData, setUserData] = useState<any>(null)
  const [userPhoto, setUserPhoto] = useState<string>('')
  const [userId, setUserId] = useState('');
  const [initUserLoading, setInitUserLoading] = useState(true)
  const [isEditBlogMode, setIsEditBlogMode] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        userId,
        userData,
        userPhoto,
        isOpenAddModal,
        isEditBlogMode,
        initUserLoading,
        setUserId,
        setUserData,
        setUserPhoto,
        setIsOpenAddModal,
        setIsEditBlogMode,
        setInitUserLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContextProvider, StoreContext }
