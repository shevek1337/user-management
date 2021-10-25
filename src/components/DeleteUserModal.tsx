import React, { useContext } from "react"
import { DataContext, deleteUser, IData } from "~/context/data"
import { ModalContext } from "~/context/modals"
import { Button } from "."
import { CloseIcon, FaceIcon } from "./svgs"

const DeleteUserModal = () => {
  const { data, actions } = useContext(DataContext)
  const { isDeleteModalOpen, setIsDeleteModalOpen, user } =
    useContext(ModalContext)
  if (data == null || user == null) return null

  return isDeleteModalOpen ? (
    <div className="modal delete">
      <div className="modal-inner position-relative">
        <button
          style={{ border: "none", background: "none", cursor: "pointer" }}
          onClick={() => setIsDeleteModalOpen!(false)}
        >
          <CloseIcon absolute />
        </button>
        <h2 className="font-lg">Delete User</h2>
        <div className="name">
          <FaceIcon absolute />
          <div>
            {user.firstName} {user.lastName}
          </div>
          {user.active ? (
            <p className="active-status">Active User</p>
          ) : (
            <p className="inactive-status">Inactive User</p>
          )}
        </div>
        <Button
          deleteSmall
          submitAction={() => {
            const payload: IData[] = deleteUser(data, user.id)
            actions.setData(payload)
            setIsDeleteModalOpen!(false)
          }}
        >
          Delete User
        </Button>
      </div>
    </div>
  ) : null
}

export default DeleteUserModal
