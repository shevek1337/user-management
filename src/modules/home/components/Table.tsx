import React, { useContext } from "react"
import { Link } from "react-router-dom"
import {
  ArrowDownIcon,
  Avatar,
  DeleteIcon,
  SettingsIcon,
} from "~/components/svgs"
import Toggler from "~/components/Toggler"
import { DataContext, DataContextProps, IData } from "~/context/data"
import { ModalContext } from "~/context/modals"
import { useSortData } from "~/hooks"

interface Props {
  readonly data: IData[]
  readonly actions: DataContextProps["actions"]
  readonly firstIndex: number
  readonly lastIndex: number
}

const Table = ({
  data,
  actions,
  firstIndex,
  lastIndex,
}: Props): React.ReactElement => {
  const { filteredData, searchedWord } = useContext(DataContext)
  const { setUser, setIsDeleteModalOpen } = useContext(ModalContext)
  const { items, sort, config, KeyType, classNames } = useSortData(
    searchedWord.length > 0 ? filteredData : data
  )

  return items.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => sort(KeyType.firstName)}
              className={classNames(KeyType.firstName)}
            >
              User
              <ArrowDownIcon
                className={classNames(KeyType.firstName, "rotate-180")}
                fill={config?.key !== KeyType.firstName ? "#c6c6c6" : ""}
              />
            </div>
          </th>
          <th>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => sort(KeyType.role)}
              className={classNames(KeyType.role)}
            >
              Role
              <ArrowDownIcon
                className={classNames(KeyType.role, "rotate-180")}
                fill={config?.key !== KeyType.role ? "#c6c6c6" : ""}
              />
            </div>
          </th>
          <th>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => sort(KeyType.active)}
              className={classNames(KeyType.active)}
            >
              Status
              <ArrowDownIcon
                className={classNames(KeyType.active, "rotate-180")}
                fill={config?.key !== KeyType.active ? "#c6c6c6" : ""}
              />
            </div>
          </th>
          <th className="disabled">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.slice(firstIndex, lastIndex).map((user, index) => (
          <tr key={user.id} className={user.active ? undefined : "disabled"}>
            <td>
              <div className="position-relative">
                <Avatar absolute />
                <p className="font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="font-light" style={{ marginTop: "5px" }}>
                  {user.email}
                </p>
              </div>
            </td>
            <td>
              <p className="font-medium">{user.role}</p>
            </td>
            <td>
              <Toggler
                fn={() => actions.updateActiveStatus(!user.active, user.id)}
                checked={user.active}
              />
            </td>
            <td>
              {user.active && (
                <Link to={`/user/${user.id}`}>
                  <SettingsIcon hover />
                </Link>
              )}
              <span
                onClick={() => {
                  setUser(user)
                  setIsDeleteModalOpen(true)
                }}
              >
                <DeleteIcon />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p style={{ textAlign: "center" }} className="font-lg">
      Nothing Found...
    </p>
  )
}

export default Table
