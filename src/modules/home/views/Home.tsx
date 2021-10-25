import React, { useContext } from "react"
import { Loader } from "~/components"
import { DataContext } from "~/context/data"
import { PaginationContext } from "~/context/pagination"
import { usePagination } from "~/hooks"
import Layout from "~/layout"
import { Table, RecordsCount, Pagination } from "../components"

interface HomeProps {
  title: string
  name: string
}

const Home = ({ title, name }: HomeProps) => {
  const { data, loading, actions, searchedWord } = useContext(DataContext)
  const { recordsCount } = useContext(PaginationContext)
  const {
    firstIndex,
    lastIndex,
    nextPage,
    prevPage,
    currentPage,
    setCurrentPage,
    totalPages,
  } = usePagination({
    contentPerPage: searchedWord.length === 0 ? recordsCount : data.length,
    count: data != null ? data.length : 1,
  })
  if (loading || data == null) return <Loader />

  return (
    <Layout title={title} name={name}>
      <div className="home">
        <Table
          actions={actions}
          data={data}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
        />
        {searchedWord.length === 0 && (
          <div className="bottom">
            <RecordsCount />
            <Pagination
              nextPage={nextPage}
              prevPage={prevPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Home
