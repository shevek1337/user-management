import React, { CSSProperties } from "react"

interface Props {
  readonly active?: boolean
  readonly checked?: boolean
  readonly style?: CSSProperties
  readonly fn?: () => void
}

const Toggler = ({ checked, style, fn, active }: Props) => {
  return (
    <label className="switch" style={style}>
      <input
        type="checkbox"
        title="checkbox"
        checked={checked}
        onChange={fn}
        disabled={active === false}
      />
      <span className="slider"></span>
    </label>
  )
}

export default Toggler
