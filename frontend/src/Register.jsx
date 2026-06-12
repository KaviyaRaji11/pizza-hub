import { useState } from 'react';

function Register({ setShowLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const sendCode = async () => {
    if (!name || !email) {
      setMessage('Please enter name and email');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://pizza-api-jktk.onrender.com/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Verification code sent! Check your email.');
        setStep(2);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Error sending code');
    }
    setLoading(false);
  };

  const verifyAndRegister = async () => {
    if (!code || !password) {
      setMessage('Please enter code and password');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://pizza-api-jktk.onrender.com/api/auth/verify-and-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, name, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! Please login.');
        setTimeout(() => setShowLogin(true), 2000);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Register 🍕</h1>
        {step === 1 ? (
          <>
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button onClick={sendCode} disabled={loading}>{loading ? 'Sending...' : 'Send Verification Code'}</button>
          </>
        ) : (
          <>
            <p style={{ textAlign: 'center' }}>Code sent to: <strong>{email}</strong></p>
            <input type="text" placeholder="Enter 6-digit code" value={code} onChange={(e) => setCode(e.target.value)} required />
            <input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button onClick={verifyAndRegister} disabled={loading}>{loading ? 'Registering...' : 'Verify & Register'}</button>
            <p className="register-text" onClick={sendCode} style={{ fontSize: '12px' }}>Resend Code</p>
          </>
        )}
        {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
        <p className="register-text" onClick={() => setShowLogin(true)}>Already have an account? Login</p>
      </div>
    </div>
  );
}

export default Register;