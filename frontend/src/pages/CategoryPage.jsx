import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    pescetarian: 'Pescetarian Pizzas',
    customized: 'Custom Pizza'
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

  const addToCart = (pizza) => {
  const existing = cart.find(item => item.name === pizza.name);
  if (existing) {
    setCart(cart.map(item =>
      item.name === pizza.name ? { ...item, quantity: item.quantity + 1 } : item
    ));
  } else {
    setCart([...cart, { ...pizza, quantity: 1 }]);
  }
  // No alert - just add silently
};

  // FAVORITE FUNCTION - Add or Remove
  const toggleFavorite = (pizza) => {
  const exists = favorites.find(fav => fav.name === pizza.name);
  if (exists) {
    setFavorites(favorites.filter(fav => fav.name !== pizza.name));
  } else {
    setFavorites([...favorites, pizza]);
  }
  // No alert - heart just changes color
};

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '⭐';
    return stars;
  };

  const getPizzaImage = (pizzaName) => {
    const images = {
      'Margherita': 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_640.jpg',
      'Veggie Supreme': 'https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5180942_640.jpg',
      'Paneer Tikka': 'https://cdn.pixabay.com/photo/2019/05/15/11/40/pizza-4204604_640.jpg',
      'Pepperoni': 'https://cdn.pixabay.com/photo/2017/09/30/15/15/pizza-2802332_640.jpg',
    };
    return images[pizzaName] || 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_640.jpg';
  };

  const getIngredients = (pizzaName) => {
    const ingredientsMap = {
      'Margherita': 'Tomato Sauce, Mozzarella, Fresh Basil',
      'Veggie Supreme': 'Capsicum, Onion, Tomato, Mushroom, Olives, Corn',
      'Paneer Tikka': 'Paneer, Tikka Masala, Capsicum, Onion',
      'Pepperoni': 'Pepperoni, Mozzarella, Tomato Sauce',
    };
    return ingredientsMap[pizzaName] || 'Fresh ingredients';
  };

  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading pizzas...</h2>;
  }

  if (categoryId === 'customized') {
    navigate('/custom-pizza');
    return null;
  }

  return (
    <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '24px' }}>
        {categoryNames[categoryId] || 'Pizzas'}
      </h1>

      {pizzas.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No pizzas found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '1000px', margin: '0 auto' }}>
          {pizzas.map(pizza => {
            const isFavorite = favorites.find(fav => fav.name === pizza.name);
            const ingredients = getIngredients(pizza.name);
            return (
              <div 
                key={pizza._id} 
                style={{
                  display: 'flex',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  minHeight: '220px'
                }}
              >
                {/* LEFT SIDE */}
                <div style={{ flex: 2, padding: '15px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '20px' }}>🍕</span>
                      <h3 style={{ margin: 0, fontSize: '20px', color: '#333' }}>{pizza.name}</h3>
                      <span style={{ backgroundColor: pizza.isVeg ? '#4CAF50' : '#ff9800', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                        {pizza.isVeg ? 'VEG' : 'NON-VEG'}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#555' }}>
                      <strong>Ingredients:</strong> {ingredients}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '14px' }}>{getRatingStars(pizza.rating || 4.5)}</span>
                      <span style={{ color: '#666', fontSize: '12px' }}>({Math.floor(Math.random() * 300) + 100} reviews)</span>
                    </div>
                    <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #ff4d4d' }}>
                      <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#555', fontStyle: 'italic' }}>"Best pizza ever!" - John</p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#555', fontStyle: 'italic' }}>"Highly recommended!" - Sarah</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div style={{ width: '180px', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', position: 'relative' }}>
                  {/* HEART BUTTON - Click to add/remove from favorites */}
                  <button
                    onClick={() => toggleFavorite(pizza)}
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
                    style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '10px', marginTop: '5px', marginBottom: '10px', display: 'block' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_640.jpg'; }}
                  />

                  <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#ff4d4d', margin: '5px 0' }}>₹{pizza.price}</p>
                  <button onClick={() => addToCart(pizza)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '25px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', width: '100%' }}>🛒 Add to Cart</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Back Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button onClick={() => navigate('/menu')} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to Categories
        </button>
      </div>
    </div>
  );
}

export default CategoryPage;