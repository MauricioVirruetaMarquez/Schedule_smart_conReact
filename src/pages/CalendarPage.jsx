import { useState } from 'react';
import MiniCalendar from '../components/Calendar/MiniCalendar';
import EventModal from '../components/Calendar/EventModal';
import { FIXED_YEAR } from '../utils/dateHelpers';
import './CalendarPage.css';

const CalendarPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const openModal = (monthIndex) => {
    setSelectedMonth(monthIndex);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMonth(null);
  };

  return (
    <div id="horario" className="content-section active">
      <div className="calendar-grid">
        {[...Array(12)].map((_, monthIndex) => (
          <MiniCalendar
            key={monthIndex}
            monthIndex={monthIndex}
            year={FIXED_YEAR}
            onOpenModal={() => openModal(monthIndex)}
          />
        ))}
      </div>

      {modalOpen && selectedMonth !== null && (
        <EventModal
          monthIndex={selectedMonth}
          year={FIXED_YEAR}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CalendarPage;