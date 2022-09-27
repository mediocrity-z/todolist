import { useCallback, useState } from 'react';
import './App.css';

function Todo({ item, index, completeTodo, removeTodo }) {
  return <div className='todo-item' style={{ textDecoration: item.iscompleted ? 'line-through' : '' }}>{item.text}
    <button onClick={() => completeTodo(index)}>完成</button>
    <button onClick={() => removeTodo(index)}>X</button>
  </div>
}

function TodoForm({ addtodo }) {
  let [value, setValue] = useState('')
  let handlesubmit = function (e) {
    e.preventDefault()
    if (!value) return
    addtodo(value)
    setValue('')
  }
  return (
    <form onSubmit={handlesubmit}>
      <input type='text' placeholder='add...' value={value} onChange={e => setValue(e.target.value)}></input>
    </form>
  )
}

function App() {
  const [todos, setTodo] = useState([{ text: 'sleep', iscompleted: true }, { text: 'eat', iscompleted: false }])
  let addtodo = useCallback((text) => {
    let newtodos = [...todos, { text }]
    setTodo(newtodos)
  })

  let completeTodo = useCallback((index) => {
    let newtodos = [...todos]
    newtodos[index].iscompleted = true
    setTodo(newtodos)
  })
  let removeTodo = useCallback((index) => {
    let newtodos = [...todos]
    newtodos.splice(index, 1)
    setTodo(newtodos)
  })
  return (
    <div className="App">
      <h1>todoList</h1>
      <div className='todo-list'>
        {todos.map((item, index) => {
          return <Todo key={index} item={item} index={index} completeTodo={completeTodo} removeTodo={removeTodo}></Todo>
        })}
      </div>
      <div><TodoForm addtodo={addtodo}></TodoForm></div>
    </div>
  );
}

export default App;
