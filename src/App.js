import './App.css';

import React, {useEffect, useState} from 'react';

function Todo(props) {
  const [content, setContent] = useState(props.content);
  const [done, setDone] = useState(false);
  const [edit, setEdit] = useState(false);

  // const [bold, setBold] = useState(false);
  // const [italic, setItalic] = useState(false);
  // const [underlined, setUnderlined] = useState(false);

  const showContent = () => {
    if (edit) {
      return (<input value={content} onChange={(event) => setContent(event.target.value)}/>);
    }
    return (
      <span
        className='todoItem' 
        onClick={() => {setDone(!done)}}
        style={{textDecoration: done ? 'line-through' : 'none' }}>{content}
      </span>
      );
  }
  
  const showEditButton = () => {return !edit ? 'Edit' : 'Save'};

  return (
    <div className='container'>
      {showContent()}
      <button className='btn' onClick={() => setEdit(!edit)}>{showEditButton()}</button>
    </div>
  );
}

function useKeyboardEvent(key, callback) {
  useEffect(() => {
    const handler = function(event) {
      if (event.key === key && document.activeElement.id === 'input') {
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [key, callback])
}

function App() {
  const [numItems, setNumItems] = useState(0);
  const [list,setList] = useState([]);
  const [input,setInput] = useState('');
  const [searchVal, setSearchVal] = useState('');

  const listItems = (inputList) => inputList.map((item)=>
    <li className='list-item' key={item.id}>
      <Todo content={item.content}/>
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
        id: numItems, 
        content: input,
      });
    } else {
      alert("A todo cannot be empty!");
    }
    setNumItems(newNum);
    setList(newList);
  }

  useKeyboardEvent('Enter', handleSubmit);

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
          <input id='input' placeholder="type here" value={input} onChange={(event)=>{setInput(event.target.value)}}/>
          <input className='btn' onClick={handleSubmit} type="submit" value="Submit (or press ENTER)" />
        </div>

        <ul id='todo-list'>{showList()}</ul>
      </header>
    </div>
  );
}

export default App;
