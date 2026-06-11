import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#FFFFFF'
    }}>
      {/* Full width image section */}
      <div style={{
        width: '100%',
        height: '40vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&h=600&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }} />
      
      {/* Content below image - REDUCED SPACE */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px 20px 30px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '42px', 
          color: '#E63946',
          marginBottom: '8px'
        }}>
          🍕 PizzaHub
        </h1>
        
        <p style={{ 
          fontSize: '16px', 
          color: '#666',
          marginBottom: '20px'
        }}>
          Hot & Fresh Pizzas Delivered To Your Doorstep
        </p>
        
        <button 
          onClick={() => navigate('/menu')}
          style={{
            backgroundColor: '#E63946',
            color: 'white',
            border: 'none',
            padding: '12px 40px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(230, 57, 70, 0.3)'
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Order Now 🍕
        </button>
      </div>
    </div>
  );
}

export default Home;