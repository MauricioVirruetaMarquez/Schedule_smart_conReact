import { useTodos } from '../../context/TodosContext';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = () => {
  const { todos } = useTodos();

  if (todos.length === 0) {
    return (
      <ul className="task-list">
        <li style={{ 
          background: 'none', 
          boxShadow: 'none', 
          borderLeft: 'none' 
        }}>
          <span style={{ 
            color: '#888', 
            textAlign: 'center', 
            width: '100%' 
          }}>
            No hay tareas pendientes. ¡Agrega una nueva!
          </span>
        </li>
      </ul>
    );
  }

  return (
    <ul className="task-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
        />
      ))}
    </ul>
  );
};

export default TodoList;