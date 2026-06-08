import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';

function Menu() {
  const navigate = useNavigate();

  const categories = [
    { id: 'vegetarian', name: 'Vegetarian', color: '#4CAF50', description: '7 delicious veg pizzas' },
    { id: 'nonVegetarian', name: 'Non-Veg', color: '#ff9800', description: '7 meat lovers pizzas' },
    { id: 'vegan', name: 'Vegan', color: '#8bc34a', description: '6 plant-based pizzas' },
    { id: 'jain', name: 'Jain', color: '#ffc107', description: '5 no onion-garlic pizzas' },
    { id: 'pescetarian', name: 'Pescetarian', color: '#2196f3', description: '6 seafood pizzas' },
    { id: 'customized', name: 'Custom', color: '#9c27b0', description: 'Build your own' }
  ];

  const handleClick = (categoryId) => {
    if (categoryId === 'customized') {
      navigate('/custom-pizza');
    } else {
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '28px' }}>🍕 Pizza Categories</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Choose your favorite category</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {categories.map(cat => (
          <CategoryCard key={cat.id} category={cat} onClick={() => handleClick(cat.id)} />
        ))}
      </div>
    </div>
  );
}

export default Menu;