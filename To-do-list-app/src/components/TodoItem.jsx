export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <tr className="border-b last:border-none hover:bg-gray-50">
      <td className="p-2">
        <input
          type="checkbox"
          checked={task.done}
          onChange={onToggle}
          className="w-5 h-5"
        />
      </td>
      <td className="p-2">
        <span className={task.done ? "line-through text-gray-400" : ""}>
          {task.text}
        </span>
      </td>
      <td className="p-2">
        {task.due ? (
            <span className={new Date(task.due) < new Date() && !task.done ? "text-red-500 font-semibold" : ""}>
            {task.due}
            </span>
        ) : (
            <span className="text-gray-400">Sin fecha</span>
        )}
        </td>
      <td className="p-2 text-center">
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 font-semibold"
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}