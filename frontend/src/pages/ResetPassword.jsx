import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`https://pizza-api-jktk.onrender.com/api/auth/verify-reset-token/${token}`);
        if (!response.ok) {
          setValidToken(false);
          setMessage('Invalid or expired reset link. Please request a new one.');
        }
      } catch (error) {
        setValidToken(false);
        setMessage('Error verifying reset link');
      }
    };
    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    
    if (password.length < 4) {
      setMessage('Password must be at least 4 characters');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetchfetch(`https://pizza-api-jktk.onrender.com/api/auth/reset-password/${token}`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Password reset successful! Redirecting to login...');
        setTimeout(() => navigate('/'), 3000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  if (!validToken) {
    return (
      <div className="login-container">
        <div className="login-form">
          <h1>🔐 Reset Password</h1>
          <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>
          <p className="register-text" onClick={() => navigate('/forgot-password')}>
            Request New Reset Link
          </p>
          <p className="register-text" onClick={() => navigate('/')}>
            Back to Login
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>🔐 Reset Password</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {message && <p style={{color: message.includes('successful') ? 'green' : 'red'}}>{message}</p>}
        <p className="register-text" onClick={() => navigate('/')}>
          Back to Login
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;