import React, { Component } from 'react'
import './Form.css'
import ItemList from './ItemList';

class FormComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            mode: 'adding',
            todoList: [],
            title: '',
            description: '',
            currentUpdatingIdx: -1
        }
    }


    handleTextChanged(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleResetInputs(e){
        e.preventDefault();

        this.setState({
            title: '',
            description: ''
        })
    }

    handleAddItem(e){
        e.preventDefault();
        if(this.state.title === '' || this.state.description === '')
            return;
        
        if (this.state.mode === 'adding'){
            this.setState({
                todoList: [...this.state.todoList, {
                    title: this.state.title,
                    description: this.state.description,
                    id: this.state.todoList.length
                }],
                title: '',
                description: ''
            })
        }else{
            let _todoList = JSON.parse(JSON.stringify(this.state.todoList));
            _todoList.forEach((todo, idx) => {
                if (idx === this.state.currentUpdatingIdx && this.state.currentUpdatingIdx !== -1){
                    todo.title = this.state.title;
                    todo.description = this.state.description;
                }
            });
            this.setState({
                todoList: _todoList,
                currentUpdatingIdx: -1,
                title: '',
                description: '',
                mode: 'adding'
            })
        }
    }

    handleDeleteItem(idx){
        let _todoList = JSON.parse(JSON.stringify(this.state.todoList));
        _todoList = _todoList.filter((todo) => todo.id !== idx)
        this.setState({
            todoList: _todoList
        })
    }

    handleSetUpdateMode(idx){
        this.setState({
            currentUpdatingIdx: idx,
            title: this.state.todoList[idx].title,
            description: this.state.todoList[idx].description,
            mode: 'updating'
        })
    }

  render() {
    return (
      <div className='form-container'>
        <form>
            <label htmlFor='title'>Title</label>
            <input placeholder='Title' value={this.state.title} name='title' onChange={this.handleTextChanged.bind(this)} id='title' />
            <label htmlFor='description'>Description</label>
            <textarea placeholder='Description' value={this.state.description} name='description' rows={4} onChange={this.handleTextChanged.bind(this)} id='description' />
            <div className='action-container'>
                <button onClick={this.handleAddItem.bind(this)}>{this.state.mode === 'adding' ? 'Add' : 'Updating'}</button>
                <button onClick={this.handleResetInputs.bind(this)}>Reset</button>
            </div>
        </form>
        <hr />
        {
            this.state.todoList.map((item) => {
                return <ItemList 
                            key={item.id}
                            item={item} 
                            handleSetUpdateMode={this.handleSetUpdateMode.bind(this)} 
                            handleDeleteItem={this.handleDeleteItem.bind(this)} 
                        />
            })
        }
      </div>
    )
  }
}

export default FormComponent;