import './App.css';

import React, {useState} from 'react';
import Todo from './Todo.js';
import useKeyboardEvent from './useKeyboardEvent.js';

function App() {
  const [numItems, setNumItems] = useState(0);
  const [list,setList] = useState([]);
  const [input,setInput] = useState('');
  const [searchVal, setSearchVal] = useState('');

  // const [date, setDate] = useState(new Date());

  const listItems = (inputList) => inputList.map((item)=>
    <li className='list-item' key={item.id}>
      <Todo content={item.content} id={item.id}/>
      <div className='container'>
        {/* <div className='container'>
          <button className='btn' onClick={() => moveUp(item.id)}> ^ </button>
          <button className='btn' onClick={() => moveDown(item.id)}> v </button>
        </div> */}
        <button className='btn' onClick={() => deleteItem(item.id)}> delete </button>
      </div>
    </li>
  );

  const deleteList = () => setList([]);

  const deleteItem = (id) => {
    console.log(id)
    let newList = list.filter((item) => item.id !== id)

    console.log(newList)
    setList(newList)
  }
  
  const handleSubmit = () => {
    let newList = list;
    let newNum = numItems;
    if (input !== '') {
      newNum++;
      newList.push({
        id: 'task-#' + numItems, 
        content: input,
      });
    } else {
      alert("A todo cannot be empty!");
    }
    setNumItems(newNum);
    setList(newList);
    setInput('');
  }

  useKeyboardEvent('Enter', handleSubmit, 'input');

  const showList = () => {
    let newList = list;
    if (searchVal !== '') {
      newList = list.filter(item => item.content.toUpperCase().indexOf(searchVal.toUpperCase()) !== -1)
      if (newList.length < 1) {
        return (<li>no todos match your search :((</li>);
      }
    }
    return listItems(newList);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>let's get down to business...</h1>

        <input className='searchbar' placeholder="search" onChange={(event)=>setSearchVal(event.target.value)} value={searchVal}/>

        <button className='btn' onClick={deleteList}>
          Delete All Todos
        </button>

        <div className='taskAdder'>
          Add new todo:
          {/* <input type="date" value={date} onChange={(event)=>setDate(event.target.value)} /> */}
          <input id='input' placeholder="(ex: defeat the huns)" value={input} onChange={(event)=>{setInput(event.target.value)}}/>
          <input className='btn' onClick={handleSubmit} type="submit" value="Submit (or press ENTER)" />
        </div>

        <ul id='todo-list'>{showList()}</ul>
      </header>
    </div>
  );
}

export default App;
