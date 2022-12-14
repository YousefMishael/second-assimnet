import React from 'react';
import './App.css';
import FormComponent from './Components/FormComponent';
import ItemList from './Components/ItemList';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        mode: 'adding',//used to specify form button label 'add or update'
        todoList: [],
        title: '',//title input value
        description: '',//description textarea value
        currentUpdatingIdx: -1//under updating item from child component, to specify on which item's update button pressed 
    }
}

handleTextChanged(e){//handle text changed in title input and description text area at the same function
  this.setState({
      [e.target.name]: e.target.value
  })
}

handleResetInputs(e){//reset title input and description textarea or cancel updating
  e.preventDefault();

  if (this.state.mode === 'adding'){
      this.setState({
          title: '',
          description: ''
      })
  }else{
      this.setState({//set form mode to adding mode and reset fields
          mode: 'adding',
          title: '',
          description: ''
      })
  }
}

handleAddItem(e){//function to add and update 
  e.preventDefault();
  if(this.state.title === '' || this.state.description === '')
      return;
  
  if (this.state.mode === 'adding'){//add
      this.setState({//copy todoList items and add to it a new item then reset title input and description textarea
          todoList: [...this.state.todoList, {
              title: this.state.title,
              description: this.state.description,
              id: Math.random() * 10000//give the new item an id to use it in deleting
          }],
          title: '',//reset title input
          description: ''//reset description textarea
      })
  }else{//mode updating
      let _todoList = JSON.parse(JSON.stringify(this.state.todoList));//todoList deep copy to modify it
      _todoList.forEach(todo => {
          if (todo.id === this.state.currentUpdatingIdx && this.state.currentUpdatingIdx !== -1){//update selected item using currentUpdatingIdx (calling from child component (Edit Button in list items) sets form to editing mode and this function called from current component from update button so the selected index from child is stored in currentUpdatingIdx)
              todo.title = this.state.title;
              todo.description = this.state.description;
          }
      });
      this.setState({//update state and rerender
          todoList: _todoList,
          currentUpdatingIdx: -1,
          title: '',//reset title input
          description: '',//reset description textarea
          mode: 'adding'//change form mode to adding mode
      })
  }
}

handleDeleteItem(id){//called when delete button pressed in child component (list item)
  if (this.state.currentUpdatingIdx === id) //check if deleted item is the current updating item
    this.setState({ //change form mode to adding mode and reset fields then delete the item
      mode: 'adding',
      title: '',
      description: ''
    })

  let _todoList = JSON.parse(JSON.stringify(this.state.todoList));//todoList deep copy to modify it
  _todoList = _todoList.filter((todo) => todo.id !== id)//remove selected item using its id
  this.setState({//update our list and rerender
      todoList: _todoList
  })
}

handleSetUpdateMode(id){//set form to updating mode
  this.state.todoList.forEach((todo) => {
      if (todo.id === id){
          this.setState({
              currentUpdatingIdx: id,//to specify on which item update button pressed after updating data 
              title: todo.title,//fill title
              description: todo.description,//fill description
              mode: 'updating'//change form to updating mode
          })
      }
  })
}

  render(){
    return (
      <div className="container">
        <div className='title-container'>
          <h2>Simple Todo List App</h2>
        </div>
        <FormComponent 
          title={this.state.title}
          description={this.state.description}
          mode={this.state.mode}
          handleTextChanged={this.handleTextChanged.bind(this)}
          handleResetInputs={this.handleResetInputs.bind(this)}
          handleAddItem={this.handleAddItem.bind(this)}
        />
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
    );
  }
}

export default App;
