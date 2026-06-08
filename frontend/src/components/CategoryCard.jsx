import { useState, useEffect } from 'react';

function CategoryCard({ category, onClick }) {
  const [currentImage, setCurrentImage] = useState(0);

  const categoryImages = {
    vegetarian: ['/images/margherita.jpg', '/images/veggie_supreme.jpg', '/images/paneer_tikka.jpg'],
    nonVegetarian: ['/images/pepperoni.jpg', '/images/chicken_tikka.jpg', '/images/meat_lovers.jpg'],
    vegan: ['/images/vegan_margherita.jpg', '/images/vegan_veggie.jpg', '/images/bbq_tofu.jpg'],
    jain: ['/images/jain_margherita.jpg', '/images/jain_veggie.jpg', '/images/jain_paneer.jpg'],
    pescetarian: ['/images/tuna.jpg', '/images/shrimp.jpg', '/images/salmon.jpg'],
    customized: ['/images/custom_pizza.jpg', '/images/custom_pizza.jpg', '/images/custom_pizza.jpg']
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const images = categoryImages[category.id] || ['/images/default.jpg'];

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: category.color,
        borderRadius: '15px',
        padding: '15px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        transform: 'scale(1)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        color: 'white',
        outline: 'none'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img
        src={images[currentImage]}
        alt={category.name}
        style={{
          width: '100%',
          height: '140px',
          objectFit: 'cover',
          borderRadius: '10px',
          marginBottom: '10px'
        }}
      />
      <h3 style={{ margin: '5px 0', fontSize: '18px' }}>{category.name}</h3>
      <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>{category.description}</p>
    </div>
  );
}

export default CategoryCard;