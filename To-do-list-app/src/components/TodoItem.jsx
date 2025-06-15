export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex justify-between items-center py-2 border-b">
      <span
        onClick={onToggle}
        className={`cursor-pointer flex-1 ${task.done ? "line-through text-gray-400" : ""}`}
      >
        {task.text}
      </span>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700 ml-4">
        Eliminar
      </button>
    </li>
  )
}