import HabitForm from '../components/Habits/HabitForm';
import HabitsList from '../components/Habits/HabitsList';
import './HabitsPage.css';

const HabitsPage = () => {
  return (
    <div id="habits" className="content-section active">
      <div className="section-header">
        <h2>Mis Hábitos</h2>
      </div>
      
      <HabitForm />
      <HabitsList />
    </div>
  );
};

export default HabitsPage;