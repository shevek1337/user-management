import React, { ReactElement, SVGProps } from "react"

const ArrowDownSmallIcon = ({
  ...props
}: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs></defs>
      <path d="M7.41,8.59,12,13.17l4.59-4.58L18,10l-6,6L6,10Z" />
      <path style={{ fill: "none" }} d="M0,0H24V24H0Z" />
    </svg>
  )
}

export default ArrowDownSmallIcon
