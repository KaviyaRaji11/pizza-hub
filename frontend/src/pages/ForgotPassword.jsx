import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5001/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Password reset email sent! Check your inbox.');
        setTimeout(() => navigate('/'), 3000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error sending reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>🔐 Forgot Password</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {message && <p style={{color: message.includes('sent') ? 'green' : 'red'}}>{message}</p>}
        <p className="register-text" onClick={() => navigate('/')}>
          Back to Login
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
