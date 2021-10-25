import React, { ReactElement } from "react"

interface Props {
  readonly absolute?: boolean
}

const Avatar = ({ absolute }: Props): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="41.486"
      height="41.486"
      viewBox="0 0 41.486 41.486"
      style={absolute ? { position: "absolute", marginLeft: "-85px" } : {}}
    >
      <defs></defs>
      <g transform="translate(0 0)">
        <path
          style={{ fill: "#666" }}
          d="M429.866,529.651a20.743,20.743,0,1,0,20.743,20.743A20.74,20.74,0,0,0,429.866,529.651Zm0,8.03a7.36,7.36,0,1,1-7.361,7.36A7.361,7.361,0,0,1,429.866,537.681Zm0,28.772a16.03,16.03,0,0,1-12.254-5.7,9.326,9.326,0,0,1,8.239-5,2.011,2.011,0,0,1,.593.092,10.446,10.446,0,0,0,6.842,0,2.012,2.012,0,0,1,.593-.092,9.326,9.326,0,0,1,8.239,5A16.028,16.028,0,0,1,429.866,566.453Z"
          transform="translate(-409.123 -529.651)"
        />
      </g>
    </svg>
  )
}

export default Avatar
