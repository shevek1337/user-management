import React from "react"
import { Toggler } from "~/components"
import { DataContextProps, IData, userPermissionPayload } from "~/context/data"

interface Props {
  readonly user: IData
  readonly actions: DataContextProps["actions"]
  readonly group: {
    readonly name: string
    readonly permissions: ReadonlyArray<{
      readonly name: string
      readonly value: boolean
    }>
  }
}

const PermissionGroups = ({ user, actions, group }: Props) => {
  return (
    <>
      {group.permissions.map((permission, index) => (
        <li
          className={
            user.active
              ? permission.value
                ? "permission-granted"
                : ""
              : permission.value
              ? "permission-granted disabled"
              : "disabled"
          }
          key={index}
        >
          <div className="list-item">
            <p
              className={
                user.active
                  ? permission.value
                    ? "font-medium"
                    : ""
                  : permission.value
                  ? "font-medium disabled"
                  : "disabled"
              }
            >
              {permission.name}
            </p>
            <Toggler
              active={user.active}
              checked={permission.value}
              fn={() => {
                const payload: IData["permissionGroups"] =
                  userPermissionPayload(
                    user.permissionGroups,
                    user.permissionGroups.indexOf(group),
                    group.permissions.indexOf(permission)
                  )
                actions.updatePermissionGroups(payload, user.id)
              }}
            />
          </div>
        </li>
      ))}
    </>
  )
}

export default PermissionGroups
