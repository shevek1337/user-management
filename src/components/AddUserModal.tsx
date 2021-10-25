import React, { useContext, useEffect, useState } from "react"
import { addUser, DataContext, IData } from "~/context/data"
import { ModalContext } from "~/context/modals"
import { Button } from "."
import { CloseIcon, EmailIcon, FaceIcon, KeyIcon } from "./svgs"

const AddUserModal = () => {
  const { data, actions } = useContext(DataContext)
  const { isAddModalOpen, setIsAddModalOpen } = useContext(ModalContext)

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [role, setRole] = useState<string>("")
  const [isReadyToSubmit, setIsReadyToSubmit] = useState<boolean>(false)

  useEffect(() => {
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      role.length > 0
    ) {
      setIsReadyToSubmit(true)
    }

    if (!isAddModalOpen) {
      setFirstName("")
      setLastName("")
      setEmail("")
      setRole("")
      setIsReadyToSubmit(false)
    }
  }, [firstName, lastName, email, role, isAddModalOpen])

  return isAddModalOpen ? (
    <div className="modal">
      <div className="modal-inner position-relative">
        <button
          style={{ border: "none", background: "none", cursor: "pointer" }}
          onClick={() => setIsAddModalOpen(false)}
        >
          <CloseIcon absolute />
        </button>
        <h2 className="font-lg">Invite New User</h2>
        <form>
          <div className="name">
            <FaceIcon absolute />
            <label className="font-medium">
              * First Name
              <input
                type="text"
                value={firstName}
                placeholder="Enter First Name"
                onChange={(e) => {
                  e.preventDefault()
                  setFirstName(e.target.value)
                }}
              />
            </label>
            <label className="font-medium">
              * Last Name
              <input
                type="text"
                value={lastName}
                placeholder="Enter Last Name"
                onChange={(e) => {
                  e.preventDefault()
                  setLastName(e.target.value)
                }}
              />
            </label>
          </div>
          <div className="email">
            <EmailIcon absolute />
            <label className="font-medium">
              * Email
              <input
                type="text"
                value={email}
                placeholder="Enter Email Adress"
                onChange={(e) => {
                  e.preventDefault()
                  setEmail(e.target.value)
                }}
              />
            </label>
          </div>
          <div className="role">
            <KeyIcon absolute />
            <label className="font-medium">
              * Role
              <select
                name="role"
                value={role}
                onChange={(e) => {
                  e.preventDefault()
                  setRole(e.target.value)
                }}
              >
                <option value="" disabled hidden>
                  Choose Role
                </option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </label>
          </div>
          <div className="submit">
            <Button
              small
              disabled={!isReadyToSubmit}
              submitAction={() => {
                const payload: IData[] = addUser(
                  data,
                  firstName,
                  lastName,
                  email,
                  role
                )
                actions.setData(payload)
                setIsAddModalOpen(false)
              }}
            >
              Send Invitation
            </Button>
            {isReadyToSubmit ? (
              <p style={{ color: "green" }}>Good to go</p>
            ) : (
              <p style={{ color: "red" }}>Fill in all the fields</p>
            )}
          </div>
        </form>
      </div>
    </div>
  ) : null
}

export default AddUserModal
