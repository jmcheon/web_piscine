import './ToDoListTemplate.css'
import {useState} from 'react';
import Input from './input';
import ItemList from './itemList';

function Todolist() {
  const [input, setInput] = useState('');
  const [list, setlist] = useState([]);
  const [nextId, setNextId] = useState(0);

  return (
    <div>
        <section className="firstSection">
          <p>ToDoList</p> 
        </section>
        <section className="secondSection">
          <Input 
                  input={input} 
                  setInput={setInput}
                  list={list}
                  setlist={setlist}
                  nextId={nextId}
                  setNextId={setNextId}
          />
        </section>
        <hr/>
        <section className="thirdSection">
          <ItemList 
                    input={input}
                    setInput={setInput}
                    list={list}
                    setlist={setlist}
                    nextId={nextId}
                    setNextId={setNextId}
          />
        </section>
    </div>
  )
}

  export default Todolist;