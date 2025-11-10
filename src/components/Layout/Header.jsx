import { useAuth } from '../../context/AuthContext';
import { FIXED_YEAR } from '../../utils/dateHelpers';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  const handleCalendarComplete = () => {
    alert('Vista de calendario completo - Próximamente');
  };

  return (
    <header className="app-header">
      <h1>SCHEDULE SMART</h1>
      <div className="header-right">
        <span className="year">{FIXED_YEAR}</span>
        <button 
          className="btn btn-calendario" 
          type="button"
          onClick={handleCalendarComplete}
        >
          CALENDARIO COMPLETO
        </button>
        {user && (
          <div className="user-info">
            <span className="user-name">👤 {user.name}</span>
            <button 
              className="btn btn-logout" 
              onClick={logout}
              title="Cerrar sesión"
            >
              Salir
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;