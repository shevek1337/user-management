import React from "react"
import avatar from "~/assets/imgs/avatar.png"
import Button from "~/components/Button"
import { IData } from "~/context/data"

interface Props {
  readonly user: IData
}

const Info = ({ user }: Props) => {
  return (
    <div className="info">
      <img src={avatar} alt="user" />
      {user.active && (
        <label className="uploader">
          Upload a Photo
          <input type="file" />
        </label>
      )}
      <h2
        className={`font-xl font-medium name${
          user.active ? "" : "   disabled"
        }`}
      >
        {user.firstName}
      </h2>
      <h2 className={`font-xl font-medium${user.active ? "" : "   disabled"}`}>
        {user.lastName}
      </h2>
      <p className={`mail${user.active ? "" : "   disabled"}`}>{user.email}</p>
      {user.active && <Button color="purple">Resend the invite</Button>}
    </div>
  )
}

export default Info
