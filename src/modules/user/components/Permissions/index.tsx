import React from "react"
import { ArrowDownSmallIcon } from "~/components/svgs"
import { Toggler } from "~/components"
import { checkAllPermissions, DataContextProps, IData } from "~/context/data"
import { useDropdown } from "~/hooks"
import PermissionGroups from "./PermissionGroups"

interface Props {
  readonly user: IData
  readonly userIndex: number
  readonly actions: DataContextProps["actions"]
}

const Permissions = ({ user, actions, userIndex }: Props) => {
  const { isSelected, toggleDropdown } = useDropdown()

  return (
    <div className="permissions">
      <div className="heading">
        <h3 className="font-lg font-medium">Permissions</h3>
        <p className={`font-light${user?.active ? "" : " disabled"}`}>
          {user.role}
        </p>
      </div>
      <div className="section">
        <p className={`font-bold${user?.active ? "" : " disabled"}`}>
          Super Admin
        </p>
        <Toggler
          active={user.active}
          checked={user.superAdmin}
          fn={() => actions.updateSuperAdmin(!user.superAdmin, user.id)}
        />
      </div>
      {user.permissionGroups.map((group, index) => (
        <div className="section permission-group" key={index}>
          <div
            className="dropdown position-relative"
            onClick={() => toggleDropdown(index)}
          >
            <p className={user.active ? "font-medium" : "font-medium disabled"}>
              {group.name}
            </p>
            <ArrowDownSmallIcon
              className={
                isSelected.includes(index)
                  ? "position-absolute rotate-180"
                  : "position-absolute"
              }
              fill={user.active ? "" : "#C6C6C6"}
              style={{ left: "-36px", top: "-2px" }}
            />
            <Toggler
              checked={user.permissionGroups[index].permissions.every(
                (p) => p.value
              )}
              active={user.active}
              fn={() => {
                const payload = checkAllPermissions(
                  user.permissionGroups,
                  index,
                  user.permissionGroups[index].permissions.every((p) => p.value)
                    ? false
                    : true
                )
                actions.updatePermissionGroups(payload, user.id)
              }}
            />
          </div>
          <ul className={isSelected.includes(index) ? "show" : ""}>
            <PermissionGroups actions={actions} user={user} group={group} />
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Permissions
