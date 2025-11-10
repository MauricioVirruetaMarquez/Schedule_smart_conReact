import TodoForm from '../components/Todo/TodoForm';
import TodoList from '../components/Todo/TodoList';
import './TodoPage.css';

const TodoPage = () => {
  return (
    <div id="todo" className="content-section active">
      <div className="section-header">
        <h2>To Do List</h2>
      </div>
      
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default TodoPage;