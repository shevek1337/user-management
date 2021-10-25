import React from "react"

interface Props {
  currentPage: number
  totalPages: number
  nextPage: () => void
  prevPage: () => void
  setCurrentPage: (currentPage: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  setCurrentPage,
}: Props) => {
  return (
    <div className="pagination">
      <ul>
        <li style={{ cursor: "pointer" }}>
          <span onClick={prevPage} className="prev">
            Previous
          </span>
        </li>
        {[...Array(totalPages).keys()].map((el) => (
          <li style={{ cursor: "pointer" }} key={el}>
            <span
              onClick={() => setCurrentPage(el + 1)}
              className={`page ${currentPage === el + 1 ? "active" : ""}`}
            >
              {el + 1}
            </span>
          </li>
        ))}
        <li style={{ cursor: "pointer" }}>
          <span onClick={nextPage} className="next">
            Next
          </span>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
