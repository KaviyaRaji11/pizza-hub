import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';

function Menu() {
  const navigate = useNavigate();

  const categories = [
    { id: 'vegetarian', name: 'Vegetarian', description: '7 veg pizzas' },
    { id: 'nonVegetarian', name: 'Non-Veg', description: '7 meat pizzas' },
    { id: 'vegan', name: 'Vegan', description: '6 plant pizzas' },
    { id: 'jain', name: 'Jain', description: '5 jain pizzas' },
    { id: 'pescetarian', name: 'Pescetarian', description: '6 seafood pizzas' },
    { id: 'customized', name: 'Custom', description: 'Build your own' }
  ];

  const handleClick = (categoryId) => {
    if (categoryId === 'customized') {
      navigate('/custom-pizza');
    } else {
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <div style={{ 
      background: '#FFFFFF', 
      minHeight: '100vh', 
      padding: '30px 20px'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '10px', 
        fontSize: '28px', 
        color: '#E63946' 
      }}>
        🍕 Pizza Categories
      </h1>
      <p style={{ 
        textAlign: 'center', 
        color: '#666', 
        marginBottom: '30px',
        fontSize: '14px'
      }}>
        Choose your favorite category
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 300px)',
        justifyContent: 'center',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {categories.map(cat => (
          <CategoryCard 
            key={cat.id} 
            category={cat} 
            onClick={() => handleClick(cat.id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;