import { useHabits } from '../../context/HabitsContext';
import HabitItem from './HabitItem';
import './HabitsList.css';

const HabitsList = () => {
  const { habits } = useHabits();

  if (habits.length === 0) {
    return (
      <div className="habits-container">
        <div className="habit-item" style={{ 
          background: 'none', 
          boxShadow: 'none', 
          borderLeft: 'none' 
        }}>
          <div style={{ 
            textAlign: 'center', 
            width: '100%', 
            color: '#888', 
            padding: '40px' 
          }}>
            No hay hábitos registrados. ¡Agrega tu primer hábito!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="habits-container">
      {habits.map((habit, index) => (
        <HabitItem
          key={index}
          habit={habit}
          index={index}
        />
      ))}
    </div>
  );
};

export default HabitsList;