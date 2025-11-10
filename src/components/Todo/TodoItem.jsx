import { useTodos } from '../../context/TodosContext';
import './TodoItem.css';

const TodoItem = ({ todo, index }) => {
  const { toggleTodo, deleteTodo } = useTodos();

  const handleToggle = () => {
    toggleTodo(index);
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      deleteTodo(index);
    }
  };

  return (
    <li className={todo.done ? 'done' : ''}>
      <span>{todo.text}</span>
      
      <button
        className="check-btn"
        onClick={handleToggle}
        title={todo.done ? 'Reactivar tarea' : 'Marcar como completada'}
      >
        {todo.done ? '↶' : '✓'}
      </button>
      
      <button
        className="delete-btn"
        onClick={handleDelete}
        title="Eliminar tarea"
      >
        X
      </button>
    </li>
  );
};

export default TodoItem;