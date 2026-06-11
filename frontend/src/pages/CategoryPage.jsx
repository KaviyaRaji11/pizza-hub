import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pizzaImages } from '../assets/images';

function CategoryPage({ cart, setCart, favorites, setFavorites }) {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryNames = {
    vegetarian: 'Vegetarian Pizzas',
    nonVegetarian: 'Non-Veg Pizzas',
    vegan: 'Vegan Pizzas',
    jain: 'Jain Pizzas',
    pescetarian: 'Pescetarian Pizzas'
  };

  useEffect(() => {
    fetchPizzas();
  }, [categoryId]);

  const fetchPizzas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/api/pizzas/category/${categoryId}`);
      const data = await response.json();
      setPizzas(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (pizza, event) => {
    event.stopPropagation();
    const existing = cart.find(item => item.name === pizza.name);
    if (existing) {
      setCart(cart.map(item =>
        item.name === pizza.name ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
    alert(`${pizza.name} added to cart! 🍕`);
  };

  const toggleFavorite = async (pizza, event) => {
  event.stopPropagation();
  const token = localStorage.getItem('token');
  const isFavorite = favorites.find(fav => fav._id === pizza._id);
  
  try {
    if (isFavorite) {
      await fetch(`http://localhost:5001/api/auth/favorites/${pizza._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setFavorites(favorites.filter(fav => fav._id !== pizza._id));
    } else {
      await fetch('http://localhost:5001/api/auth/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ pizza })
      });
      setFavorites([...favorites, pizza]);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '⭐';
    return stars;
  };

  const getIngredients = (pizzaName) => {
    const ingredientsMap = {
      'Margherita': 'Tomato Sauce, Mozzarella, Fresh Basil',
      'Veggie Supreme': 'Capsicum, Onion, Tomato, Mushroom, Olives, Corn',
      'Paneer Tikka': 'Paneer, Tikka Masala, Capsicum, Onion',
      'Pepperoni': 'Pepperoni, Mozzarella, Tomato Sauce',
      'Chicken Tikka': 'Chicken Tikka, Capsicum, Onion'
    };
    return ingredientsMap[pizzaName] || 'Fresh ingredients';
  };

  const getCustomerReviews = (pizzaName) => {
    const reviewsMap = {
      'Margherita': ['"Best classic pizza ever!" - John', '"So fresh and delicious!" - Emily'],
      'Veggie Supreme': ['"Loaded with fresh veggies!" - Mike', '"My go-to veg pizza!" - Priya'],
      'Paneer Tikka': ['"Indian flavors on pizza!" - Raj', '"Paneer was perfectly spiced!" - Anita'],
      'Pepperoni': ['"Spicy and perfect!" - Tony', '"Best pepperoni in town!" - Nick'],
      'Chicken Tikka': ['"Tikka flavor is authentic!" - Vikram', '"Better than restaurant!" - Neha']
    };
    return reviewsMap[pizzaName] || ['"Absolutely delicious!" - Customer', '"Highly recommended!" - Foodie'];
  };

  const getPizzaImage = (pizzaName) => {
    return pizzaImages[pizzaName] || pizzaImages.default;
  };

  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading pizzas...</h2>;
  }

  if (categoryId === 'customized') {
    navigate('/custom-pizza');
    return null;
  }

  return (
    <div style={{ width: '100%', padding: '20px', background: '#FFFFFF', minHeight: '100vh' }}>
      <button 
        onClick={() => navigate('/menu')} 
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
        ← Back to Categories
      </button>

      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#E63946' }}>
        {categoryNames[categoryId] || 'Pizzas'}
      </h1>

      {pizzas.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No pizzas found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
          {pizzas.map(pizza => {
            const isFavorite = favorites.find(fav => fav.name === pizza.name);
            const ingredients = getIngredients(pizza.name);
            const reviews = getCustomerReviews(pizza.name);
            return (
              <div 
                key={pizza._id}
                onClick={() => navigate(`/pizza/${pizza._id}`)}
                style={{
                  display: 'flex',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  minHeight: '220px',
                  border: '1px solid #f0f0f0',
                  cursor: 'pointer'
                }}
              >
                {/* LEFT SIDE */}
                <div style={{ flex: 2, padding: '15px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '20px' }}>🍕</span>
                      <h3 style={{ margin: 0, fontSize: '20px', color: '#333' }}>{pizza.name}</h3>
                      <span style={{ 
                        backgroundColor: pizza.isVeg ? '#4CAF50' : '#E63946', 
                        color: 'white', 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        {pizza.isVeg ? 'VEG' : 'NON-VEG'}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#555' }}>
                      {pizza.description}
                    </p>
                    <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
                      <strong>🥗 Ingredients:</strong> {ingredients}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '14px' }}>{getRatingStars(pizza.rating || 4.5)}</span>
                      <span style={{ color: '#666', fontSize: '12px' }}>({Math.floor(Math.random() * 300) + 100} reviews)</span>
                    </div>
                    <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #E63946' }}>
                      <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#555', fontStyle: 'italic' }}>{reviews[0]}</p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#555', fontStyle: 'italic' }}>{reviews[1]}</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div style={{
                  width: '200px',
                  backgroundColor: '#fafafa',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '15px',
                  position: 'relative'
                }}>
                  <button
                    onClick={(e) => toggleFavorite(pizza, e)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                    }}
                  >
                    {isFavorite ? '❤️' : '🤍'}
                  </button>

                  <img
                    src={getPizzaImage(pizza.name)}
                    alt={pizza.name}
                    style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      marginBottom: '10px'
                    }}
                  />

                  <p style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: '#E63946',
                    margin: '5px 0'
                  }}>
                    ₹{pizza.price}
                  </p>

                  <button
                    onClick={(e) => addToCart(pizza, e)}
                    style={{
                      backgroundColor: '#E63946',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      width: '100%'
                    }}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={() => navigate('/menu')} 
          style={{
            backgroundColor: '#E63946',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          ← Back to Categories
        </button>
      </div>
    </div>
  );
}

export default CategoryPage;