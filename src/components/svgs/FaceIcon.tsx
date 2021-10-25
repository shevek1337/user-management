import React, { ReactElement } from "react"

interface Props {
  readonly absolute?: boolean
}

const FaceIcon = ({ absolute }: Props): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={
        absolute
          ? { position: "absolute", marginLeft: "-52px", marginBottom: "2px" }
          : undefined
      }
    >
      <path d="M9,11.75A1.25,1.25,0,1,0,10.25,13,1.25,1.25,0,0,0,9,11.75Zm6,0A1.25,1.25,0,1,0,16.25,13,1.25,1.25,0,0,0,15,11.75ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8.011,8.011,0,0,1-8-8,8.108,8.108,0,0,1,.05-.86A10.062,10.062,0,0,0,9.26,5.77,9.974,9.974,0,0,0,17.42,10a9.76,9.76,0,0,0,2.25-.26A7.988,7.988,0,0,1,12,20Z" />
      <path style={{ fill: "none" }} d="M0,0H24V24H0Z" />
    </svg>
  )
}

export default FaceIcon
