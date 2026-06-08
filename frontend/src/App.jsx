import './App.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate
} from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import About from './pages/About';
import Favorites from './pages/Favorites';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/AdminDashboard';
import CategoryPage from './pages/CategoryPage';
import CustomPizza from './pages/CustomPizza';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { testBackend } from './services/api';

// Component to handle verification links
function VerificationHandler() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    // Email verification
    if (path.startsWith('/verify/')) {
      const token = path.split('/verify/')[1];
      fetch(`http://localhost:5001/api/auth/verify/${token}`)
        .then(res => res.json())
        .then(data => {
          alert(data.message);
          window.location.href = '/';
        })
        .catch(err => alert('Verification failed'));
    }
  }, [location]);

  return null;
}

function App() {

  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    testBackend()
      .then(res => console.log('Backend connected:', res.data))
      .catch(err => console.log('Backend error:', err));
  }, []);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!isLoggedIn) {
    return (
      <BrowserRouter>
        <VerificationHandler />
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={
            <div>
              {showLogin ? (
                <Login
                  setShowLogin={setShowLogin}
                  setIsLoggedIn={setIsLoggedIn}
                />
              ) : (
                <Register
                  setShowLogin={setShowLogin}
                />
              )}
            </div>
          } />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <VerificationHandler />
      <nav style={{ display: 'flex', gap: '20px', padding: '20px', flexWrap: 'wrap' }}>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu 🍕</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        <Link to="/my-orders">My Orders 📦</Link>
        <Link to="/about">About</Link>
        <Link to="/favorites">Favorites ({favorites.length})</Link>
        {user.role === 'admin' && (
          <Link to="/admin">Admin Dashboard 👑</Link>
        )}
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/admin" element={user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/category/:categoryId" element={<CategoryPage cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/custom-pizza" element={<CustomPizza cart={cart} setCart={setCart} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;