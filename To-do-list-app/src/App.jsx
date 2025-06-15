import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [tasks, setTasks] = useState([])
  const [input, setInput] = useState("")

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input, done: false }])
      setInput("")
    }
  }

  const toggleDone = (index) => {
    const newTasks = [...tasks]
    newTasks[index].done = !newTasks[index].done
    setTasks(newTasks)
  }

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="border p-2 flex-1 rounded"
            placeholder="Nueva tarea"
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
            Agregar
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <TodoItem
              key={index}
              task={task}
              onToggle={() => toggleDone(index)}
              onDelete={() => deleteTask(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
