import React, { Component } from 'react'
import './Form.css'

class FormComponent extends Component {
    render() {
      const {title, description, mode, handleTextChanged, handleAddItem, handleResetInputs} = this.props;
    return (
      <div className='form-container'>
        <form>
            <label htmlFor='title'>Title</label>
            <input placeholder='Title' value={title} name='title' onChange={handleTextChanged} id='title' />
            <label htmlFor='description'>Description</label>
            <textarea placeholder='Description' value={description} name='description' rows={4} onChange={handleTextChanged} id='description' />
            <div className='action-container'>
                <button onClick={handleAddItem}>{mode === 'adding' ? 'Add' : 'Updating'}</button>
                <button onClick={handleResetInputs}>{mode === 'adding' ? 'Reset' : 'Cancel'}</button>
            </div>
        </form>
      </div>
    )
  }
}

export default FormComponent;