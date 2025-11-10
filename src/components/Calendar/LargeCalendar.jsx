import { useEvents } from '../../context/EventsContext';
import {
  dayNamesFull,
  getDaysInMonth,
  getFirstDayOfMonth,
  formatKey,
  isToday
} from '../../utils/dateHelpers';
import './LargeCalendar.css';

const LargeCalendar = ({ monthIndex, year, onDayClick }) => {
  const { events, deleteEvent } = useEvents();
  
  const daysInMonth = getDaysInMonth(year, monthIndex);
  const firstDay = getFirstDayOfMonth(year, monthIndex);
  const daysInPrevMonth = getDaysInMonth(year, monthIndex - 1);

  // Manejar eliminación de evento
  const handleDeleteEvent = (dateKey, eventIndex, e) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      deleteEvent(dateKey, eventIndex);
    }
  };

  // Renderizar días del mes anterior
  const renderPrevMonthDays = () => {
    const days = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      days.push(
        <div key={`prev-${i}`} className="large-day-cell other-month">
          <div className="day-number">{dayNum}</div>
          <div className="event-list"></div>
        </div>
      );
    }
    return days;
  };

  // Renderizar días del mes actual
  const renderCurrentMonthDays = () => {
    const days = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatKey(year, monthIndex, day);
      const dayEvents = events[dateKey] || [];
      const isTodayDate = isToday(year, monthIndex, day);

      days.push(
        <div
          key={`current-${day}`}
          className={`large-day-cell ${isTodayDate ? 'today' : ''}`}
          onClick={() => onDayClick && onDayClick(dateKey)}
        >
          <div className="day-number">{day}</div>
          
          <div className="event-list">
            {dayEvents.map((event, index) => (
              <div
                key={index}
                className="event-item"
                data-category={event.category || 'personal'}
              >
                <span className="event-text">
                  {event.time ? `${event.time} · ` : ''}{event.title}
                </span>
                <button
                  className="event-delete-btn"
                  onClick={(e) => handleDeleteEvent(dateKey, index, e)}
                  title="Eliminar evento"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  // Renderizar días del mes siguiente
  const renderNextMonthDays = () => {
    const days = [];
    const cellsUsed = firstDay + daysInMonth;
    const remaining = 42 - cellsUsed;
    
    for (let day = 1; day <= remaining; day++) {
      days.push(
        <div key={`next-${day}`} className="large-day-cell other-month">
          <div className="day-number">{day}</div>
          <div className="event-list"></div>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="large-calendar-grid">
      {/* Encabezados de días */}
      {dayNamesFull.map((day, index) => (
        <div key={index} className="large-day-header">
          {day}
        </div>
      ))}
      
      {/* Días del calendario */}
      {renderPrevMonthDays()}
      {renderCurrentMonthDays()}
      {renderNextMonthDays()}
    </div>
  );
};

export default LargeCalendar;