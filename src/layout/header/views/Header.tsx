import React, { useContext } from "react"
import { SearchIcon, SettingsIcon } from "~/components/svgs"
import { DataContext } from "~/context/data"
import { ModalContext } from "~/context/modals"

interface HeaderProps {
  readonly title: string
  readonly name: string
}

const Header = ({ title, name }: HeaderProps) => {
  const { setSearchedWord, searchedWord } = useContext(DataContext)
  const { setIsAddModalOpen } = useContext(ModalContext)
  return (
    <>
      <div className="head">
        <div className="container">
          <h2 className="title font-lg">{title}</h2>
          {name === "home" && (
            <>
              <div className="position-relative">
                <SearchIcon />
                <input
                  type="text"
                  value={searchedWord}
                  className="search"
                  placeholder="Type to filter the table"
                  onChange={(e) => setSearchedWord(e.target.value)}
                />
              </div>
              <button
                className="add-button"
                type="button"
                onClick={() => setIsAddModalOpen(true)}
              >
                <span className="font-xl">+</span>
              </button>
            </>
          )}
          {name === "user" && (
            <div className="setup-button">
              <SettingsIcon />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
