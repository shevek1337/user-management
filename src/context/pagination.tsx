import React, { createContext, Dispatch, useState } from "react"

export interface PaginationContextProps {
  readonly recordsCount: number
  readonly setRecordsCount: Dispatch<React.SetStateAction<number>>
}

const PaginationContext = createContext({} as PaginationContextProps)

type Props = {
  children: React.ReactNode
}

const PaginationProvider = (props: Props) => {
  const [recordsCount, setRecordsCount] = useState(3)

  const { children } = props
  return (
    <PaginationContext.Provider
      value={{
        recordsCount,
        setRecordsCount,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export { PaginationContext, PaginationProvider }
