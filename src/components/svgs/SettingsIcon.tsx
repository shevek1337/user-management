import React, { ReactElement, useState } from "react"

interface Props {
  readonly hover?: boolean
}

const SettingsIcon = ({ hover }: Props): ReactElement => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
      fill={isHovered ? "#44a0d3" : hover ? "#c6c6c6" : "white"}
      style={
        hover
          ? { cursor: "pointer", marginRight: "24px", paddingTop: "1px" }
          : {}
      }
      viewBox={hover ? "0 0 18 18" : "0 0 20 20"}
      height={hover ? "22" : "50"}
      width={hover ? "22" : "50"}
    >
      <path
        fillRule="evenodd"
        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default SettingsIcon
