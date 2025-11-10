import { useState } from 'react';
import { useHabits } from '../../context/HabitsContext';
import './HabitForm.css';

const HabitForm = () => {
  const { addHabit } = useHabits();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = inputValue.trim();
    
    if (name) {
      addHabit(name);
      setInputValue('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder=" + Agregar un hábito"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="btn">
        Agregar
      </button>
    </form>
  );
};

export default HabitForm;