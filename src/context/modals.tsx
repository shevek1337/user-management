import React, { createContext, Dispatch, useState } from "react"
import { IData } from "./data"

export interface ModalContextProps {
  readonly isDeleteModalOpen: boolean
  readonly isAddModalOpen: boolean
  readonly user: IData | null
  readonly setIsDeleteModalOpen: Dispatch<React.SetStateAction<boolean>>
  readonly setIsAddModalOpen: Dispatch<React.SetStateAction<boolean>>
  readonly setUser: Dispatch<React.SetStateAction<IData | null>>
}

const ModalContext = createContext({} as ModalContextProps)

type Props = {
  children: React.ReactNode
}

const ModalProvider = (props: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [user, setUser] = useState<IData | null>(null)

  const { children } = props
  return (
    <ModalContext.Provider
      value={{
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        user,
        setUser,
        isAddModalOpen,
        setIsAddModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalProvider }
