import React, { ReactElement } from "react"

interface Props {
  readonly absolute?: boolean
}

const KeyIcon = ({ absolute }: Props): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={
        absolute
          ? {
              position: "absolute",
              marginLeft: "-52px",
              bottom: "4px",
            }
          : undefined
      }
    >
      <path style={{ fill: "none" }} d="M0,0H24V24H0Z" />
      <path d="M12.65,10a6,6,0,1,0,0,4H17v4h4V14h2V10ZM7,14a2,2,0,1,1,2-2A2.006,2.006,0,0,1,7,14Z" />
    </svg>
  )
}

export default KeyIcon
