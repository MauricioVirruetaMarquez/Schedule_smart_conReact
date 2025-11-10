import { useState } from 'react';
import { useTodos } from '../../context/TodosContext';
import './TodoForm.css';

const TodoForm = () => {
  const { addTodo } = useTodos();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    
    if (text) {
      addTodo(text);
      setInputValue('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder=" + Agregar una tarea"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="btn">
        Agregar
      </button>
    </form>
  );
};

export default TodoForm;