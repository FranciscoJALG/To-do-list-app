import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoItem from './components/TodoItem'

function App() {
const [tasks, setTasks] = useState([])
const [input, setInput] = useState("")
const [search, setSearch] = useState("")
const [filter, setFilter] = useState("all")
const [isInitialLoad, setIsInitialLoad] = useState(true)


  // ✅ useEffect que guarda tareas cada vez que cambian
useEffect(() => {
  if (isInitialLoad) return
  localStorage.setItem("tasks", JSON.stringify(tasks))
}, [tasks])

useEffect(() => {
  try {
    const saved = localStorage.getItem("tasks")
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  } catch (error) {
    console.error("Error al leer localStorage:", error)
    localStorage.removeItem("tasks")
  } finally {
    setIsInitialLoad(false)
  }
}, [])


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

  const filteredTasks = tasks
  .filter(task => task.text.toLowerCase().includes(search.toLowerCase()))
  .filter(task => {
    if (filter === "done") return task.done
    if (filter === "pending") return !task.done
    return true
  })

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar tarea..."
            className="border p-2 rounded w-full sm:max-w-xs"
          />

        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1 rounded ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter("done")}
            className={`px-3 py-1 rounded ${filter === "done" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          >
            Completadas
            </button>
            </div>
            </div>
          <table className="min-w-full border border-gray-300 rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Completado</th>
                <th className="p-2 text-left">Tarea</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, index) => (
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
