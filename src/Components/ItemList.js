import React from 'react'
import './ItemContainer.css'
import './Form.css'

function ItemList(props) {

    const deleteItem = () => {
        props.handleDeleteItem(props.item.id)
    }

    const editItem = () => {
        props.handleSetUpdateMode(props.item.id)
    }

  return (
    <div className='item-container'>
        <h4>{props.item.title}</h4>
        <p>{props.item.title}</p>
        <p>{props.item.description}</p>
        <div className='action-container'>
            <button onClick={editItem}>Edit</button>
            <button onClick={deleteItem}>Delete</button>
        </div>
        <hr />
    </div>
  )
}

export default  ItemList;