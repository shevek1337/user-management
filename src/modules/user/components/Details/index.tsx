import React, { useContext, useEffect, useState } from "react"
import { Button, Toggler } from "~/components"
import {
  DataContext,
  DataContextProps,
  IData,
  userPayload,
} from "~/context/data"

interface Props {
  readonly user: IData
  readonly actions: DataContextProps["actions"]
}

const Details = ({ user, actions }: Props) => {
  const { data } = useContext(DataContext)
  const [formData, setFormData] = useState<IData>(user)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [canSubmit, setCanSubmit] = useState(
    firstNameError || lastNameError ? false : true
  )
  useEffect(() => {
    setFormData(data.find((d) => d.id === formData.id)!)
  }, [data, formData.id])

  useEffect(() => {
    if (formData.firstName.length === 0) {
      setFirstNameError(true)
      canSubmit && setCanSubmit(false)
    }
    if (formData.firstName.length !== 0 && firstNameError) {
      setFirstNameError(false)
      !canSubmit && !lastNameError && setCanSubmit(true)
    }

    if (formData.lastName.length === 0) {
      setLastNameError(true)
      canSubmit && setCanSubmit(false)
    }
    if (formData.lastName.length !== 0 && lastNameError) {
      setLastNameError(false)
      !canSubmit && !firstNameError && setCanSubmit(true)
    }
  }, [formData, canSubmit, firstNameError, lastNameError])

  return (
    <div className="details">
      <h3 className="font-lg font-medium heading">Details</h3>
      <div className="position-relative user-state">
        <p>
          The user is{" "}
          <span className="font-bold">
            {formData.active ? "Active" : "Inactive"}
          </span>
        </p>
        <Toggler
          fn={() => actions.updateActiveStatus(!formData.active, formData.id)}
          checked={formData.active}
          style={{ position: "absolute", top: "0", left: "-52px" }}
        />
      </div>
      <form>
        <label
          className="font-medium"
          style={formData.active ? undefined : { color: "#b0acac" }}
        >
          <div className="label-text">
            * First Name{" "}
            {firstNameError && (
              <span style={{ color: "red", fontStyle: "italic" }}>
                * This field is required
              </span>
            )}
          </div>
          <input
            type="text"
            disabled={!formData.active}
            value={formData.firstName}
            placeholder="Enter First Name"
            onChange={(e) => {
              e.preventDefault()
              setFormData({
                ...formData,
                firstName: e.target.value,
              })
            }}
          />
        </label>
        <label
          className="font-medium"
          style={formData.active ? undefined : { color: "#b0acac" }}
        >
          <div className="label-text">
            * Last Name{" "}
            {lastNameError && (
              <span style={{ color: "red", fontStyle: "italic" }}>
                * This field is required
              </span>
            )}
          </div>
          <input
            type="text"
            disabled={!formData.active}
            value={formData.lastName}
            onChange={(e) => {
              e.preventDefault()
              setFormData({
                ...formData,
                lastName: e.target.value,
              })
            }}
            placeholder="Enter Last Name"
          />
        </label>
        <label
          className="font-medium"
          style={formData.active ? undefined : { color: "#b0acac" }}
        >
          * Role
          <select
            name="role"
            disabled={!formData.active}
            value={formData.role}
            onChange={(e) => {
              e.preventDefault()
              setFormData({
                ...formData,
                role: e.target.value,
              })
            }}
          >
            <option value="" disabled hidden>
              Choose Role
            </option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </label>
        {formData.active && (
          <Button
            color="lightBlue"
            disabled={!canSubmit}
            submitAction={() => {
              const payload = userPayload(data, formData)
              canSubmit && actions.setData(payload)
            }}
          >
            Save Changes
          </Button>
        )}
      </form>
    </div>
  )
}

export default Details
