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
import PizzaDetail from './pages/PizzaDetail';
import { testBackend } from './services/api';

function VerificationHandler() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    
    // Email verification only - no popup for reset password
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
  // Check localStorage for existing user on app load
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return token && user ? true : false;
});
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

// Load favorites from database when user logs in
useEffect(() => {
  const loadFavorites = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await fetch('http://localhost:5001/api/auth/favorites', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error('Error loading favorites:', err);
      }
    }
  };
  loadFavorites();
}, [isLoggedIn]);
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
      <nav style={{ display: 'flex', gap: '20px', padding: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
  <Link to="/">Home</Link>
  <Link to="/menu">Menu 🍕</Link>
  <Link to="/custom-pizza">Custom Pizza 🎨</Link>
  <Link to="/favorites">Favorites ({favorites.length})</Link>
  <Link to="/cart">Cart ({cart.length})</Link>
  <Link to="/my-orders">My Orders 📦</Link>
  <Link to="/about">About</Link>
  {user.role === 'admin' && (
    <Link to="/admin">Admin Dashboard 👑</Link>
  )}
  <button onClick={() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  }}>Logout</button>
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
        <Route path="/custom-pizza" element={<CustomPizza cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/pizza/:id" element={<PizzaDetail cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites} />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;