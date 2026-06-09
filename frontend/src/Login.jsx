import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from './services/api';

function Login({ setShowLogin, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  if (!email || !password) {
    setMessage('Please fill all fields');
    return;
  }

  setLoading(true);
  try {
    const res = await login({ email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setMessage('Login Successful!');
    setTimeout(() => setIsLoggedIn(true), 1000);
  } catch (err) {
    setMessage(err.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <h1>Login 🍕</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleLogin} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        {message && <p style={{ color: message.includes('Successful') ? 'green' : 'red' }}>{message}</p>}
        <Link to="/forgot-password" className="register-text" style={{ display: 'block', textAlign: 'center' }}>Forgot Password?</Link>
        <p className="register-text" onClick={() => setShowLogin(false)}>Don't have an account? Register</p>
      </form>
    </div>
  );
}

export default Login;