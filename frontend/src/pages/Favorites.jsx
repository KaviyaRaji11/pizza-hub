import { useNavigate } from 'react-router-dom';
import { pizzaImages } from '../assets/images';

function Favorites({ favorites, setFavorites }) {
  const navigate = useNavigate();

  const removeFromFavorites = (pizza, event) => {
    event.stopPropagation();
    setFavorites(favorites.filter(fav => fav._id !== pizza._id));
  };

  const getPizzaImage = (pizzaName) => {
    if (pizzaName === 'Custom Pizza') {
      return pizzaImages.default;
    }
    return pizzaImages[pizzaName] || pizzaImages.default;
  };

  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>❤️ Favorites</h1>
        <p>No favorites yet. Click the heart icon on any pizza to add it here!</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>❤️ Your Favorite Pizzas</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {favorites.map((pizza) => (
          <div 
            key={pizza._id}
            onClick={() => navigate(`/pizza/${pizza._id}`)}
            style={{
              display: 'flex',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              minHeight: '150px',
              cursor: 'pointer',
              border: '1px solid #f0f0f0'
            }}
          >
            <div style={{ width: '120px', overflow: 'hidden' }}>
              <img
                src={getPizzaImage(pizza.name)}
                alt={pizza.name}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover'
                }}
              />
            </div>

            <div style={{ flex: 2, padding: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>{pizza.name}</h3>
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
              <p style={{ color: '#666', fontSize: '13px', margin: '0 0 8px 0' }}>
                {pizza.description}
              </p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#E63946', margin: 0 }}>
                ₹{pizza.price}
              </p>
            </div>

            <div style={{
              width: '100px',
              backgroundColor: '#fafafa',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '15px'
            }}>
              <button
                onClick={(e) => removeFromFavorites(pizza, e)}
                style={{
                  backgroundColor: '#E63946',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Remove ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;