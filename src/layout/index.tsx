import React, { useEffect } from "react"
import { AddUserModal, DeleteUserModal } from "~/components"
import Header from "./header/views/Header"

interface Props {
  readonly children?: React.ReactNode
  readonly title: string
  readonly name: string
}

const Layout = ({ children, title, name }: Props) => {
  useEffect(() => {
    if (typeof document != "undefined") {
      document.title = title
    }
  }, [title])
  return (
    <>
      <AddUserModal />
      <DeleteUserModal />
      <Header title={title} name={name} />
      {children}
    </>
  )
}

export default Layout
