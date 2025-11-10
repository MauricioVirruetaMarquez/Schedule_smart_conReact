import { useEvents } from '../../context/EventsContext';
import {
  monthNames,
  dayNames,
  getDaysInMonth,
  getFirstDayOfMonth,
  formatKey,
  isToday
} from '../../utils/dateHelpers';
import './MiniCalendar.css';

const MiniCalendar = ({ monthIndex, year, onOpenModal }) => {
  const { events } = useEvents();
  
  const daysInMonth = getDaysInMonth(year, monthIndex);
  const firstDay = getFirstDayOfMonth(year, monthIndex);
  const daysInPrevMonth = getDaysInMonth(year, monthIndex - 1);

  // Renderizar días del mes anterior (relleno)
  const renderPrevMonthDays = () => {
    const days = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="day-cell other-month">
          {daysInPrevMonth - i}
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
      const hasEvents = events[dateKey] && events[dateKey].length > 0;
      const isTodayDate = isToday(year, monthIndex, day);

      days.push(
        <div
          key={`current-${day}`}
          className={`day-cell ${hasEvents ? 'has-events' : ''} ${isTodayDate ? 'today' : ''}`}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  // Renderizar días del mes siguiente (relleno para completar 42 celdas)
  const renderNextMonthDays = () => {
    const days = [];
    const cellsUsed = firstDay + daysInMonth;
    const remaining = 42 - cellsUsed;
    
    for (let day = 1; day <= remaining; day++) {
      days.push(
        <div key={`next-${day}`} className="day-cell other-month">
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar-box">
      <div className="mini-calendar">
        <h3>{monthNames[monthIndex]}</h3>
        
        <div className="calendar-header">
          {dayNames.map((day, idx) => (
            <div key={idx} className="day-header">
              {day}
            </div>
          ))}
        </div>
        
        <div className="calendar-days">
          {renderPrevMonthDays()}
          {renderCurrentMonthDays()}
          {renderNextMonthDays()}
        </div>
      </div>
      
      <button className="arrow-btn" onClick={onOpenModal}>
        →
      </button>
    </div>
  );
};

export default MiniCalendar;