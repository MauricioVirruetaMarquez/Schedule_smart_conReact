import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const EventsContext = createContext();

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents debe usarse dentro de EventsProvider');
  }
  return context;
};

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useLocalStorage('events', {});

  // Agregar evento
  const addEvent = (dateKey, event) => {
    setEvents(prev => {
      const newEvents = { ...prev };
      if (!newEvents[dateKey]) {
        newEvents[dateKey] = [];
      }
      newEvents[dateKey].push({
        ...event,
        id: Date.now(), // ID único
        createdAt: new Date().toISOString()
      });
      return newEvents;
    });
  };

  // Eliminar evento
  const deleteEvent = (dateKey, eventIndex) => {
    setEvents(prev => {
      const newEvents = { ...prev };
      if (newEvents[dateKey]) {
        newEvents[dateKey].splice(eventIndex, 1);
        // Si no quedan eventos en esa fecha, eliminar la clave
        if (newEvents[dateKey].length === 0) {
          delete newEvents[dateKey];
        }
      }
      return newEvents;
    });
  };

  // Actualizar evento
  const updateEvent = (dateKey, eventIndex, updatedEvent) => {
    setEvents(prev => {
      const newEvents = { ...prev };
      if (newEvents[dateKey] && newEvents[dateKey][eventIndex]) {
        newEvents[dateKey][eventIndex] = {
          ...newEvents[dateKey][eventIndex],
          ...updatedEvent,
          updatedAt: new Date().toISOString()
        };
      }
      return newEvents;
    });
  };

  // Obtener eventos de una fecha
  const getEventsByDate = (dateKey) => {
    return events[dateKey] || [];
  };

  // Obtener eventos de un mes
  const getEventsByMonth = (year, month) => {
    const monthEvents = {};
    Object.keys(events).forEach(dateKey => {
      const [y, m] = dateKey.split('-').map(Number);
      if (y === year && m === month + 1) {
        monthEvents[dateKey] = events[dateKey];
      }
    });
    return monthEvents;
  };

  // Limpiar todos los eventos
  const clearEvents = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los eventos?')) {
      setEvents({});
    }
  };

  // Contar eventos totales
  const getTotalEvents = () => {
    return Object.values(events).reduce((total, dayEvents) => total + dayEvents.length, 0);
  };

  const value = {
    events,
    addEvent,
    deleteEvent,
    updateEvent,
    getEventsByDate,
    getEventsByMonth,
    clearEvents,
    getTotalEvents
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};