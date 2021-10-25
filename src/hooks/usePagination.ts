import { useState } from "react"

interface Props {
  contentPerPage: number
  count: number
}

const usePagination = ({ contentPerPage, count }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageCount = Math.ceil(count / contentPerPage)
  const lastIndex = currentPage * contentPerPage
  const firstIndex = lastIndex - contentPerPage

  const changePage = (nextPage: boolean) => {
    setCurrentPage((state) => {
      if (nextPage) {
        if (state === pageCount) {
          return state
        }
        return state + 1
      } else {
        if (state === 1) {
          return state
        }
        return state - 1
      }
    })
  }

  const setPage = (num: number) => {
    if (num > pageCount) {
      setCurrentPage(pageCount)
    } else if (num < 1) {
      setCurrentPage(1)
    } else {
      setCurrentPage(num)
    }
  }

  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setCurrentPage: setPage,
    firstIndex,
    lastIndex,
    currentPage,
  }
}

export default usePagination
