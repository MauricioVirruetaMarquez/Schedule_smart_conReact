import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <NavLink 
        to="/calendar" 
        className={({ isActive }) => isActive ? 'menu-btn active' : 'menu-btn'}
      >
        HORARIO
      </NavLink>
      
      <NavLink 
        to="/todos" 
        className={({ isActive }) => isActive ? 'menu-btn active' : 'menu-btn'}
      >
        TO DO LIST
      </NavLink>
      
      <NavLink 
        to="/habits" 
        className={({ isActive }) => isActive ? 'menu-btn active' : 'menu-btn'}
      >
        HÁBITOS
      </NavLink>
    </aside>
  );
};

export default Sidebar;