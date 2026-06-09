import { useNavigate } from 'react-router-dom';
import pizzaImage from '../assets/pizza.jpeg';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      background: '#FFFFFF'
    }}>
      <h1 style={{ 
        fontSize: '42px', 
        color: '#E63946',
        marginBottom: '15px',
        textAlign: 'center'
      }}>
        🍕 PizzaHub
      </h1>
      
      <p style={{ 
        fontSize: '18px', 
        color: '#666',
        marginBottom: '25px',
        textAlign: 'center'
      }}>
        Hot & Fresh Pizzas Delivered To Your Doorstep
      </p>
      
      {/* Pizza Image - Smaller and compact */}
      <div style={{
        maxWidth: '450px',
        width: '100%',
        margin: '0 auto',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <img 
          src={pizzaImage} 
          alt="Delicious Pizza" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            aspectRatio: '16/9',
            objectFit: 'cover'
          }}
        />
      </div>
      
      {/* Order Now Button - Below image */}
      <button 
        onClick={() => navigate('/menu')}
        style={{
          backgroundColor: '#E63946',
          color: 'white',
          border: 'none',
          padding: '12px 35px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          marginTop: '25px',
          boxShadow: '0 4px 12px rgba(230, 57, 70, 0.3)'
        }}
        onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        Order Now 🍕
      </button>
    </div>
  );
}

export default Home;