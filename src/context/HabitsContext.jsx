import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const HabitsContext = createContext();

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error('useHabits debe usarse dentro de HabitsProvider');
  }
  return context;
};

export const HabitsProvider = ({ children }) => {
  const [habits, setHabits] = useLocalStorage('habits', []);

  // Función auxiliar para obtener fecha ISO
  const getCurrentDateISO = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Calcular racha
  const recalculateStreak = (completedDates) => {
    const sortedDates = [...completedDates].sort().reverse();
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < sortedDates.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const checkISO = checkDate.toISOString().split('T')[0];
      
      if (sortedDates.includes(checkISO)) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Agregar hábito
  const addHabit = (name) => {
    const newHabit = {
      name,
      streak: 0,
      completedDates: [],
      createdAt: new Date().toISOString()
    };
    setHabits([...habits, newHabit]);
  };

  // Marcar/desmarcar hábito del día
  const toggleHabit = (index) => {
    const todayISO = getCurrentDateISO();
    setHabits(habits.map((habit, i) => {
      if (i !== index) return habit;

      const isCompleted = habit.completedDates.includes(todayISO);
      const newCompletedDates = isCompleted
        ? habit.completedDates.filter(d => d !== todayISO)
        : [...habit.completedDates, todayISO];

      return {
        ...habit,
        completedDates: newCompletedDates,
        streak: recalculateStreak(newCompletedDates)
      };
    }));
  };

  // Eliminar hábito
  const deleteHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  // Verificar si un hábito está completado hoy
  const isCompletedToday = (habitIndex) => {
    const todayISO = getCurrentDateISO();
    return habits[habitIndex]?.completedDates.includes(todayISO) || false;
  };

  // Obtener estadísticas
  const getStats = () => {
    const total = habits.length;
    const todayISO = getCurrentDateISO();
    const completedToday = habits.filter(h => 
      h.completedDates.includes(todayISO)
    ).length;
    const longestStreak = Math.max(0, ...habits.map(h => h.streak));
    
    return { total, completedToday, longestStreak };
  };

  const value = {
    habits,
    addHabit,
    toggleHabit,
    deleteHabit,
    isCompletedToday,
    getStats,
    getCurrentDateISO
  };

  return (
    <HabitsContext.Provider value={value}>
      {children}
    </HabitsContext.Provider>
  );
};