import React, {useState} from 'react';

import useKeyboardEvent from './useKeyboardEvent.js';

function Todo(props) {
    const [content, setContent] = useState(props.content);
    const [done, setDone] = useState(false);
    const [edit, setEdit] = useState(false);
    const id = props.id;
  
    // const [bold, setBold] = useState(false);
    // const [italic, setItalic] = useState(false);
    // const [underlined, setUnderlined] = useState(false);
  
    const showContent = () => {
      if (edit) {
        return (<input id={id} value={content} onChange={(event) => setContent(event.target.value)}/>);
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

    useKeyboardEvent('Enter', () => setEdit(!edit), id);
  
    return (
      <div className='container'>
        {showContent()}
        <button className='btn' onClick={() => setEdit(!edit)}>{showEditButton()}</button>
      </div>
    );
  }

  export default Todo;