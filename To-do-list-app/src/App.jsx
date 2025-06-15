import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoItem from './components/TodoItem'

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
  const pendingCount = tasks.filter(task => !task.done).length
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">To-Do List App</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="border p-2 flex-1 rounded"
            placeholder="Escribe una nueva tarea"
          />
          <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Agregar
          </button>
        </div>

        <div className="mb-2 text-gray-600">
          {tasks.length === 0
            ? "No hay tareas"
            : `Tienes ${pendingCount} tarea(s) pendiente(s)`}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Completado</th>
                <th className="p-2 text-left">Tarea</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <TodoItem
                  key={index}
                  task={task}
                  onToggle={() => toggleDone(index)}
                  onDelete={() => deleteTask(index)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
