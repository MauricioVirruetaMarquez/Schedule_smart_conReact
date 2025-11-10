import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar sesión al cargar
  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem('userLoggedIn');
    const userName = sessionStorage.getItem('userName');
    const userEmail = sessionStorage.getItem('userEmail');

    if (userLoggedIn === 'true' && userName && userEmail) {
      setUser({ name: userName, email: userEmail });
    }
    setLoading(false);
  }, []);

  // Registro
  const signup = (name, email, password) => {
    // Verificar si el usuario ya existe
    const users = JSON.parse(localStorage.getItem('scheduleSmartUsers')) || {};
    
    if (users[email]) {
      throw new Error('Este correo ya está registrado');
    }

    // Guardar usuario
    users[email] = { name, password };
    localStorage.setItem('scheduleSmartUsers', JSON.stringify(users));

    // Crear sesión
    const userData = { name, email };
    setUser(userData);
    sessionStorage.setItem('userLoggedIn', 'true');
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('userEmail', email);

    return userData;
  };

  // Login
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('scheduleSmartUsers')) || {};
    const user = users[email];

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (user.password !== password) {
      throw new Error('Contraseña incorrecta');
    }

    // Crear sesión
    const userData = { name: user.name, email };
    setUser(userData);
    sessionStorage.setItem('userLoggedIn', 'true');
    sessionStorage.setItem('userName', user.name);
    sessionStorage.setItem('userEmail', email);

    return userData;
  };

  // Logout
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userEmail');
  };

  // Login social (simulado)
  const socialLogin = (platform, name) => {
    const email = `${name.toLowerCase().replace(/\s+/g, '')}@${platform.toLowerCase()}.com`;
    const userData = { name, email };
    
    setUser(userData);
    sessionStorage.setItem('userLoggedIn', 'true');
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('userEmail', email);

    return userData;
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    socialLogin,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};