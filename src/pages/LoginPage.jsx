import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, signup, socialLogin } = useAuth();
  
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Formulario de registro
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Formulario de login
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Manejar registro
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!signupData.name || !signupData.email || !signupData.password) {
        throw new Error('Por favor completa todos los campos');
      }

      if (signupData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      await signup(signupData.name, signupData.email, signupData.password);
      
      // Esperar un momento para mostrar éxito
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Manejar login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!loginData.email || !loginData.password) {
        throw new Error('Por favor completa todos los campos');
      }

      await login(loginData.email, loginData.password);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Manejar login social
  const handleSocialLogin = (platform) => {
    const name = prompt(`Ingresa tu nombre para continuar con ${platform}:`);
    if (name && name.trim()) {
      socialLogin(platform, name.trim());
      navigate('/');
    }
  };

  // Cambiar entre login y signup
  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError('');
    setSignupData({ name: '', email: '', password: '' });
    setLoginData({ email: '', password: '' });
  };

  return (
    <div className="login-container">
      {/* Partículas decorativas */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>

      <div className="login-wrapper">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-circle">📅</div>
          <div className="logo-text">
            <span>SCHEDULE</span>
            <span>SMART</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          {isSignup ? (
            // Formulario de Registro
            <div>
              <h2>Crear Cuenta</h2>
              {error && <div className="error-message">{error}</div>}
              
              <form onSubmit={handleSignup}>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={signupData.name}
                    onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    placeholder="Contraseña (mín. 6 caracteres)"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    required
                    minLength={6}
                  />
                </div>

                <button type="submit" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrarse'}
                </button>
              </form>

              <div className="divider"><span>o continuar con</span></div>

              <div className="social-buttons">
                <button type="button" onClick={() => handleSocialLogin('Google')}>
                  Google
                </button>
                <button type="button" onClick={() => handleSocialLogin('Facebook')}>
                  Facebook
                </button>
              </div>

              <p className="terms">
                Al registrarte, aceptas los <a href="#">Términos de Servicio</a> y la{' '}
                <a href="#">Política de Privacidad</a> de Schedule Smart.
              </p>

              <p className="switch-link">
                ¿Ya tienes una cuenta?{' '}
                <a onClick={toggleMode}>Inicia Sesión</a>
              </p>
            </div>
          ) : (
            // Formulario de Login
            <div>
              <h2>Iniciar Sesión</h2>
              {error && <div className="error-message">{error}</div>}
              
              <form onSubmit={handleLogin}>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                  />
                </div>

                <button type="submit" disabled={loading}>
                  {loading ? 'Iniciando...' : 'Entrar'}
                </button>
              </form>

              <div className="divider"><span>o continuar con</span></div>

              <div className="social-buttons">
                <button type="button" onClick={() => handleSocialLogin('Google')}>
                  Google
                </button>
                <button type="button" onClick={() => handleSocialLogin('Facebook')}>
                  Facebook
                </button>
              </div>

              <p className="switch-link">
                ¿No tienes una cuenta?{' '}
                <a onClick={toggleMode}>Regístrate</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;