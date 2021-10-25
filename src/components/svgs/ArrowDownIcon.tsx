import React, { ReactElement, SVGProps } from "react"

const ArrowDownIcon = ({ ...props }: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="7"
      viewBox="0 0 13 7"
      {...props}
    >
      <path d="M6.5,0,13,7H0Z" transform="translate(13 7) rotate(180)" />
    </svg>
  )
}

export default ArrowDownIcon
