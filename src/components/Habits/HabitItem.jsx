import { useHabits } from '../../context/HabitsContext';
import './HabitItem.css';

const HabitItem = ({ habit, index }) => {
  const { toggleHabit, deleteHabit, getCurrentDateISO } = useHabits();

  const handleToggle = () => {
    toggleHabit(index);
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este hábito?')) {
      deleteHabit(index);
    }
  };

  // Generar últimos 7 días
  const renderLast7Days = () => {
    const days = [];
    const todayISO = getCurrentDateISO();

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const iso = date.toISOString().split('T')[0];
      
      const isChecked = habit.completedDates.includes(iso);
      const isToday = iso === todayISO;

      days.push(
        <div
          key={i}
          className={`day ${isChecked ? 'checked' : ''} ${isToday ? 'today' : ''}`}
          title={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
        >
          {date.getDate()}
        </div>
      );
    }

    return days;
  };

  const todayISO = getCurrentDateISO();
  const isCompletedToday = habit.completedDates.includes(todayISO);

  return (
    <div className="habit-item">
      <div className="habit-info">
        <div className="habit-name">{habit.name}</div>
        
        <div className="habit-counter">
          Racha actual: {habit.streak} día{habit.streak !== 1 ? 's' : ''}
        </div>
        
        <div className="calendar">
          {renderLast7Days()}
        </div>
      </div>

      <div className="habit-actions">
        <button
          className={`habit-check ${isCompletedToday ? 'checked' : ''}`}
          onClick={handleToggle}
          title={isCompletedToday ? 'Desmarcar para hoy' : 'Marcar como completado hoy'}
        >
          ✓
        </button>
        
        <button
          className="habit-delete"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default HabitItem;