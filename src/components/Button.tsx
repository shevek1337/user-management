import React from "react"

interface Props {
  readonly children: string
  readonly color?: string
  readonly small?: boolean
  readonly deleteSmall?: boolean
  readonly submit?: boolean
  readonly disabled?: boolean
  readonly submitAction?: () => void
}

const Button = ({
  color,
  children,
  small,
  submit,
  disabled,
  submitAction,
  deleteSmall,
}: Props) => {
  return (
    <button
      className={`btn ${color} ${small && "sm"} ${deleteSmall && "sm-red"}`}
      type={submit ? "submit" : "button"}
      disabled={disabled}
      onClick={submitAction}
    >
      {children}
    </button>
  )
}

export default Button
