import { useState, useEffect } from 'react';
import { useEvents } from '../../context/EventsContext';
import LargeCalendar from './LargeCalendar';
import {
  monthNames,
  getCurrentDateISO
} from '../../utils/dateHelpers';
import './EventModal.css';

const EventModal = ({ monthIndex: initialMonth, year: initialYear, onClose }) => {
  const { addEvent } = useEvents();
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);
  
  const [eventData, setEventData] = useState({
    title: '',
    date: getCurrentDateISO(),
    time: '',
    category: 'personal'
  });

  // Manejar click fuera del modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains('modal')) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  // Navegar al mes anterior
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navegar al mes siguiente
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Ir a hoy
  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Agregar evento
  const handleAddEvent = () => {
    if (!eventData.title || !eventData.date) {
      alert('Por favor completa al menos el título y la fecha del evento.');
      return;
    }

    const [year, month, day] = eventData.date.split('-').map(Number);
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    addEvent(dateKey, {
      title: eventData.title,
      time: eventData.time,
      category: eventData.category,
      date: eventData.date
    });

    // Limpiar formulario
    setEventData({
      title: '',
      date: eventData.date,
      time: '',
      category: 'personal'
    });

    // Mostrar mensaje de éxito
    showTempMessage('¡Evento agregado correctamente!');
  };

  // Función para precargar fecha al hacer click en un día
  const handleDayClick = (dateKey) => {
    setEventData(prev => ({
      ...prev,
      date: dateKey
    }));
  };

  // Mensaje temporal
  const showTempMessage = (message) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'temp-message';
    msgDiv.textContent = message;
    document.body.appendChild(msgDiv);
    
    setTimeout(() => {
      msgDiv.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => msgDiv.remove(), 300);
    }, 3000);
  };

  return (
    <div className="modal" aria-hidden="false">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{monthNames[currentMonth]} {currentYear}</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="month-nav">
            <button className="nav-btn" onClick={handlePrevMonth}>
              ← Anterior
            </button>
            <button className="nav-btn" onClick={handleToday}>
              Hoy
            </button>
            <button className="nav-btn" onClick={handleNextMonth}>
              Siguiente →
            </button>
          </div>

          <LargeCalendar
            monthIndex={currentMonth}
            year={currentYear}
            onDayClick={handleDayClick}
          />

          <div className="add-event-section">
            <h3>Agregar Evento</h3>
            <div className="event-form">
              <div className="form-group">
                <label htmlFor="eventTitle">Evento</label>
                <input
                  type="text"
                  id="eventTitle"
                  name="title"
                  placeholder="Título del evento"
                  value={eventData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventDate">Fecha</label>
                <input
                  type="date"
                  id="eventDate"
                  name="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventTime">Hora</label>
                <input
                  type="time"
                  id="eventTime"
                  name="time"
                  value={eventData.time}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventCategory">Categoría</label>
                <select
                  id="eventCategory"
                  name="category"
                  value={eventData.category}
                  onChange={handleInputChange}
                >
                  <option value="personal">Personal</option>
                  <option value="trabajo">Trabajo</option>
                  <option value="estudio">Estudio</option>
                  <option value="salud">Salud</option>
                  <option value="social">Social</option>
                </select>
              </div>

              <button 
                className="add-btn" 
                type="button"
                onClick={handleAddEvent}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;