function Favorites({ favorites, setFavorites }) {
  
  const removeFromFavorites = (pizza) => {
    setFavorites(favorites.filter(fav => fav.name !== pizza.name));
  };

  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', background: '#FFFFFF', minHeight: '100vh' }}>
        <h1 style={{ color: '#E63946' }}>❤️ Favorites</h1>
        <p>No favorites yet. Click the heart icon on any pizza to add it here!</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', background: '#FFFFFF', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#E63946' }}>❤️ Your Favorite Pizzas</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {favorites.map((pizza, index) => (
          <div 
            key={index} 
            style={{
              display: 'flex',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              minHeight: '150px',
              border: '1px solid #f0f0f0'
            }}
          >
            <div style={{ flex: 2, padding: '15px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>🍕</span>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#E63946' }}>{pizza.name}</h3>
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
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#E63946', margin: 0 }}>
                ₹{pizza.price}
              </p>
            </div>

            <div style={{
              width: '120px',
              backgroundColor: '#fafafa',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '15px'
            }}>
              <button
                onClick={() => removeFromFavorites(pizza)}
                style={{
                  backgroundColor: '#E63946',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  width: '100%'
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