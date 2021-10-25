import React, {
  createContext,
  Dispatch,
  ReactElement,
  useEffect,
  useReducer,
  useState,
} from "react"
import { useFetch } from "~/hooks"

export interface IData {
  readonly id: string
  readonly active: boolean
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly role: string
  readonly superAdmin: boolean
  readonly permissionGroups: ReadonlyArray<{
    readonly name: string
    readonly permissions: ReadonlyArray<{
      readonly name: string
      readonly value: boolean
    }>
  }>
}

export enum ActionTypes {
  setData = "setData",
  firstName = "firstName",
  lastName = "lastName",
  active = "active",
  email = "email",
  role = "role",
  superAdmin = "superAdmin",
  permissionGroups = "permissionGroups",
}

interface Actions {
  readonly type: ActionTypes
  readonly payload: any
  readonly id?: string
  readonly index?: number
}

const updateValue = (state: IData[], actions: Actions, type: ActionTypes) => {
  return [
    ...state.slice(
      0,
      state.indexOf(state.find((item) => item.id === actions.id)!)
    ),
    {
      ...state[state.indexOf(state.find((item) => item.id === actions.id)!)],
      [type]: actions.payload,
    },
    ...state.slice(
      state.indexOf(state.find((item) => item.id === actions.id)!) + 1
    ),
  ]
}

export const addUser = (
  state: IData[],
  firstName: IData["firstName"],
  lastName: IData["lastName"],
  email: IData["email"],
  role: IData["role"]
) => {
  return [
    {
      firstName,
      lastName,
      email,
      role,
      id: (state.length + 1).toString(),
      active: true,
      superAdmin: false,
      permissionGroups: [
        {
          name: "Permission Group 1",
          permissions: [
            {
              name: "Permission 1",
              value: false,
            },
            {
              name: "Permission 2",
              value: false,
            },
            {
              name: "Permission 3",
              value: false,
            },
            {
              name: "Permission 4",
              value: false,
            },
            {
              name: "Permission 5",
              value: false,
            },
          ],
        },
      ],
    },
    ...state,
  ]
}

export const userPayload = (state: IData[], payload: IData) => {
  return [
    ...state.slice(
      0,
      state.indexOf(state.find((user) => user.id === payload.id)!)
    ),
    payload,
    ...state.slice(
      state.indexOf(state.find((user) => user.id === payload.id)!) + 1
    ),
  ]
}

export const deleteUser = (state: IData[], id: IData["id"]) => {
  return [...state.filter((user) => user.id !== id)]
}

export const userPermissionPayload = (
  state: IData["permissionGroups"],
  groupIndex: number,
  permissionIndex: number
): IData["permissionGroups"] => {
  return [
    ...state.slice(0, groupIndex),
    {
      ...state[groupIndex],
      permissions: [
        ...state[groupIndex]["permissions"].slice(0, permissionIndex),
        {
          ...state[groupIndex]["permissions"][permissionIndex],
          value: !state[groupIndex]["permissions"][permissionIndex]["value"],
        },
        ...state[groupIndex]["permissions"].slice(permissionIndex + 1),
      ],
    },
    ...state.slice(groupIndex + 1),
  ]
}

export const checkAllPermissions = (
  state: IData["permissionGroups"],
  groupIndex: number,
  check: boolean
): IData["permissionGroups"] => {
  return [
    ...state.slice(0, groupIndex),
    {
      ...state[groupIndex],
      permissions: state[groupIndex]["permissions"].map((permission) => {
        return { name: permission.name, value: check }
      }),
    },
    ...state.slice(groupIndex + 1),
  ]
}

export const userReducer = (state: IData[], actions: Actions) => {
  switch (actions.type) {
    case ActionTypes.setData:
      return actions.payload
    case ActionTypes.active:
      return updateValue(state, actions, ActionTypes.active)
    case ActionTypes.firstName:
      return updateValue(state, actions, ActionTypes.firstName)
    case ActionTypes.lastName:
      return updateValue(state, actions, ActionTypes.lastName)
    case ActionTypes.email:
      return updateValue(state, actions, ActionTypes.email)
    case ActionTypes.role:
      return updateValue(state, actions, ActionTypes.role)
    case ActionTypes.superAdmin:
      return updateValue(state, actions, ActionTypes.superAdmin)
    case ActionTypes.permissionGroups:
      return updateValue(state, actions, ActionTypes.permissionGroups)
    default:
      return state
  }
}

export interface DataContextProps {
  readonly data: IData[]
  readonly error: Error | undefined
  readonly loading: boolean
  readonly filteredData: IData[]
  readonly searchedWord: string
  readonly setSearchedWord: Dispatch<React.SetStateAction<string>>
  readonly setFilteredData: Dispatch<React.SetStateAction<IData[]>>
  readonly actions: {
    setData: (payload: IData[]) => void
    updateActiveStatus: (payload: IData["active"], id: string) => void
    updateFirstname: (payload: IData["firstName"], id: string) => void
    updateLastName: (payload: IData["lastName"], id: string) => void
    updateEmail: (payload: IData["email"], id: string) => void
    updateRole: (payload: IData["role"], id: string) => void
    updateSuperAdmin: (payload: IData["superAdmin"], id: string) => void
    updatePermissionGroups: (
      payload: IData["permissionGroups"],
      id: string
    ) => void
  }
}

const DataContext = createContext({} as DataContextProps)

type Props = {
  children: React.ReactNode
}

const DataContextProvider = (props: Props): ReactElement => {
  const url = "/data/data.json"
  const { children } = props
  const { data: init, error, loading } = useFetch<IData[]>(url)

  const [data, dispatch] = useReducer(userReducer, init)
  const [filteredData, setFilteredData] = useState<IData[]>([])
  const [searchedWord, setSearchedWord] = useState<string>("")

  useEffect(() => {
    dispatch({ type: ActionTypes.setData, payload: init })
  }, [init])

  useEffect(() => {
    const test: IData[] = data
    if (test) {
      setFilteredData(
        test.filter(
          (i: IData) =>
            i.firstName
              .toLocaleLowerCase()
              .match(searchedWord.toLocaleLowerCase()) ||
            i.lastName
              .toLocaleLowerCase()
              .match(searchedWord.toLocaleLowerCase()) ||
            i.email
              .toLocaleLowerCase()
              .match(searchedWord.toLocaleLowerCase()) ||
            i.role.toLocaleLowerCase().match(searchedWord.toLocaleLowerCase())
        )
      )
    }
  }, [searchedWord, data])

  const actions = {
    setData: (payload: IData[]) => {
      dispatch({ type: ActionTypes.setData, payload })
    },
    updateActiveStatus: (payload: IData["active"], id: string) => {
      dispatch({ type: ActionTypes.active, payload, id })
    },
    updateFirstname: (payload: IData["firstName"], id: string) => {
      dispatch({ type: ActionTypes.firstName, payload, id })
    },
    updateLastName: (payload: IData["lastName"], id: string) => {
      dispatch({ type: ActionTypes.lastName, payload, id })
    },
    updateEmail: (payload: IData["email"], id: string) => {
      dispatch({ type: ActionTypes.email, payload, id })
    },
    updateRole: (payload: IData["role"], id: string) => {
      dispatch({ type: ActionTypes.role, payload, id })
    },
    updateSuperAdmin: (payload: IData["superAdmin"], id: string) => {
      dispatch({ type: ActionTypes.superAdmin, payload, id })
    },
    updatePermissionGroups: (
      payload: IData["permissionGroups"],
      id: string
    ) => {
      dispatch({
        type: ActionTypes.permissionGroups,
        payload,
        id,
      })
    },
  }

  return (
    <DataContext.Provider
      value={{
        data,
        error,
        loading,
        actions,
        filteredData,
        setFilteredData,
        searchedWord,
        setSearchedWord,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataContextProvider }
