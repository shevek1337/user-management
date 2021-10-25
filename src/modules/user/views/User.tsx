import React, { useContext } from "react"
import { useParams } from "react-router"
import { Loader } from "~/components"
import { DataContext } from "~/context/data"
import Layout from "~/layout"
import { Info, Permissions, Details } from "../components"

interface UserProps {
  readonly title: string
  readonly name: string
}

interface RouteParams {
  readonly id: string
}

const User = ({ title, name }: UserProps) => {
  const { id } = useParams<RouteParams>()
  const { data, loading, actions } = useContext(DataContext)
  const user = data.find((user) => user.id === id)
  if (loading || user == null) return <Loader />

  return (
    <Layout title={title} name={name}>
      <div className="user">
        <Info user={user} />
        <Details user={user} actions={actions} />
        <Permissions
          actions={actions}
          user={user}
          userIndex={data.indexOf(user)}
        />
      </div>
    </Layout>
  )
}

export default User
