import React, { useContext } from "react"
import { PaginationContext } from "~/context/pagination"

const RecordsCount = () => {
  const { recordsCount, setRecordsCount } = useContext(PaginationContext)
  return (
    <div className="records">
      <p className="font-light">Records on Page</p>
      <select
        value={recordsCount}
        onChange={(e) => {
          e.preventDefault()
          setRecordsCount(Number(e.target.value))
        }}
        name="count"
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
  )
}

export default RecordsCount
