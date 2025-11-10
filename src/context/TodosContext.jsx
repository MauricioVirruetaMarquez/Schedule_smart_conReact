import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TodosContext = createContext();

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodos debe usarse dentro de TodosProvider');
  }
  return context;
};

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  // Agregar tarea
  const addTodo = (text) => {
    const newTodo = {
      text,
      done: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
  };

  // Marcar/desmarcar como completada
  const toggleTodo = (index) => {
    setTodos(todos.map((todo, i) => 
      i === index ? { ...todo, done: !todo.done } : todo
    ));
  };

  // Eliminar tarea
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Limpiar todas las tareas completadas
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.done));
  };

  // Obtener estadísticas
  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(t => t.done).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    getStats
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};