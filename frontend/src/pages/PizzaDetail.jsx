import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pizzaImages } from '../assets/images';

function PizzaDetail({ cart, setCart, favorites, setFavorites }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchPizza();
  }, [id]);

  const fetchPizza = async () => {
    try {
      const response = await fetch(`https://pizza-api.onrender.com/api/pizzas/${id}`);
      const data = await response.json();
      setPizza(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    const existing = cart.find(item => item.name === pizza.name);
    if (existing) {
      setCart(cart.map(item =>
        item.name === pizza.name ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...pizza, quantity: quantity }]);
    }
    alert(`${pizza.name} added to cart! 🍕`);
  };

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  const toggleFavorite = () => {
    const exists = favorites.find(fav => fav._id === pizza._id);
    if (exists) {
      setFavorites(favorites.filter(fav => fav._id !== pizza._id));
    } else {
      setFavorites([...favorites, pizza]);
    }
  };

  const getPizzaImage = () => {
    return pizzaImages[pizza.name] || pizzaImages.default;
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '⭐';
    return stars;
  };

  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</h2>;
  }

  if (!pizza) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Pizza not found</h2>;
  }

  const isFavorite = favorites.find(fav => fav._id === pizza._id);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{
          backgroundColor: '#E63946',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Back
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        {/* Left Side - Image */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <img
            src={getPizzaImage()}
            alt={pizza.name}
            style={{
              width: '100%',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* Right Side - Details */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {/* Title and Favorite */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ color: '#E63946', fontSize: '32px' }}>{pizza.name}</h1>
            <button
              onClick={toggleFavorite}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '30px',
                cursor: 'pointer'
              }}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Veg/Non-Veg Badge */}
          <span style={{
            backgroundColor: pizza.isVeg ? '#4CAF50' : '#E63946',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            display: 'inline-block',
            marginBottom: '15px'
          }}>
            {pizza.isVeg ? 'VEGETARIAN' : 'NON-VEGETARIAN'}
          </span>

          {/* Price */}
          <h2 style={{ fontSize: '28px', color: '#E63946', marginBottom: '15px' }}>
            ₹{pizza.price}
          </h2>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ fontSize: '18px' }}>{getRatingStars(pizza.rating || 4.5)}</span>
            <span style={{ color: '#666' }}>({Math.floor(Math.random() * 500) + 100} reviews)</span>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '25px' }}>
            <h3>Description</h3>
            <p style={{ color: '#555', lineHeight: '1.6' }}>{pizza.description}</p>
          </div>

          {/* Ingredients */}
          <div style={{ marginBottom: '25px' }}>
            <h3>Ingredients</h3>
            <p style={{ color: '#555' }}>
              Fresh dough, premium cheese, signature sauce, and the finest toppings
            </p>
          </div>

          {/* Quantity Selector */}
          <div style={{ marginBottom: '25px' }}>
            <h3>Quantity</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                -
              </button>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div style={{ marginBottom: '25px' }}>
            <h3>Total Amount</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#E63946' }}>
              ₹{pizza.price * quantity}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button
              onClick={addToCart}
              style={{
                flex: 1,
                padding: '15px',
                backgroundColor: 'white',
                color: '#E63946',
                border: '2px solid #E63946',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🛒 Add to Cart
            </button>
            <button
              onClick={buyNow}
              style={{
                flex: 1,
                padding: '15px',
                backgroundColor: '#E63946',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Buy Now 💳
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PizzaDetail;