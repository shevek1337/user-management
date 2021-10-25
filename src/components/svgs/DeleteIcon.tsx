import React, { ReactElement, SVGProps, useState } from "react"

const DeleteIcon = ({ ...props }: SVGProps<SVGSVGElement>): ReactElement => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12.934"
      height="17.15"
      viewBox="0 0 12.934 17.15"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      fill={isHovered ? "#d91002" : "#c6c6c6"}
      style={{ cursor: "pointer", marginRight: "10px" }}
      {...props}
    >
      <defs></defs>
      <path
        d="M1.539,16.156a1.883,1.883,0,0,0,1.848,1.905h7.391a1.883,1.883,0,0,0,1.848-1.905V4.723H1.539ZM13.549,1.864H10.316L9.392.912H4.772l-.924.953H.615V3.77H13.549Z"
        transform="translate(-0.615 -0.912)"
      />
    </svg>
  )
}

export default DeleteIcon
