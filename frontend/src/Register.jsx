import { useState } from 'react';

function Register({ setShowLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Step 1: Send verification email
  const sendVerificationEmail = async () => {
    if (!email) {
      setMessage('Please enter email');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Verification code sent to your email!');
        setStep(2);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error sending verification');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify code
  const verifyCode = async () => {
    if (!enteredCode) {
      setMessage('Please enter verification code');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: enteredCode })
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Email verified! Now set your password.');
        setIsEmailVerified(true);
        setStep(3);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error verifying code');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Complete registration
  const completeRegistration = async () => {
    if (!name || !password) {
      setMessage('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/auth/complete-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Registration successful! Please login.');
        setTimeout(() => setShowLogin(true), 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error completing registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Register 🍕</h1>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button onClick={sendVerificationEmail} disabled={loading}>
              {loading ? 'Sending...' : 'Send Verification Email'}
            </button>
          </>
        )}

        {/* Step 2: Enter Verification Code */}
        {step === 2 && (
          <>
            <p style={{ color: '#666', textAlign: 'center' }}>
              We sent a verification code to:<br/>
              <strong>{email}</strong>
            </p>
            <input
              type="text"
              placeholder="Enter 6-digit verification code"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              required
            />
            <button onClick={verifyCode} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
            <p 
              className="register-text" 
              onClick={sendVerificationEmail}
              style={{ fontSize: '12px', cursor: 'pointer' }}
            >
              Resend Code
            </p>
          </>
        )}

        {/* Step 3: Set Password */}
        {step === 3 && (
          <>
            <p style={{ color: 'green', textAlign: 'center' }}>
              ✅ Email Verified! Now set your password.
            </p>
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button onClick={completeRegistration} disabled={loading}>
              {loading ? 'Registering...' : 'Complete Registration'}
            </button>
          </>
        )}

        {message && <p style={{color: message.includes('successful') || message.includes('sent') ? 'green' : 'red'}}>{message}</p>}
        
        <p className="register-text" onClick={() => setShowLogin(true)}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;