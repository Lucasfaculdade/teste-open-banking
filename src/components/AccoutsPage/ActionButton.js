import React from "react";

export const ActionButtons = (props) => {
    const {editingUser, setEditingUser, index, setEditModal, setDeleteUser} = props;

    return (
      <div id="actions">
        <ActionButton 
          icon="bx bx-edit" 
          text="Editar" 
          index={index} 
          actionType="edit"
          editingUser={editingUser} 
          setEditingUser={setEditingUser} setEditModal={setEditModal} />

        <ActionButton 
          icon="bx bxs-x-square"  
          index={index} 
          actionType='delete'
          text="Excluir" editingUser={editingUser} 
          setDeleteUser={setDeleteUser} />
      </div>
    )
  }
  
export const ActionButton = (props) => {
    const {icon, text, editingUser, actionType, setEditingUser, index, setEditModal, setDeleteUser} = props;

    const click = (e, index) => {
      e.preventDefault();
      
      if(actionType === 'edit') {
        setEditingUser(index);
        setEditModal(true);
      }

      if(actionType === 'delete') {
        setDeleteUser(index);
      }
    }

    return (
      <button onClick={(e) => click(e, index)}><i className={icon} ></i> {text}</button>
    )
  }