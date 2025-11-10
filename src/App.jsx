import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventsProvider } from './context/EventsContext';
import { TodosProvider } from './context/TodosContext';
import { HabitsProvider } from './context/HabitsContext';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import TodoPage from './pages/TodoPage';
import HabitsPage from './pages/HabitsPage';

import ProtectedRoute from './components/Auth/ProtectedRoute';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EventsProvider>
          <TodosProvider>
            <HabitsProvider>
              <Routes>
                {/* Ruta pública */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Rutas protegidas */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }>
                  {/* Rutas anidadas dentro del layout */}
                  <Route index element={<Navigate to="/calendar" replace />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="todos" element={<TodoPage />} />
                  <Route path="habits" element={<HabitsPage />} />
                </Route>

                {/* Redirección por defecto */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </HabitsProvider>
          </TodosProvider>
        </EventsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;