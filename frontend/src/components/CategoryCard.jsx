import { useState } from 'react';
import { pizzaImages } from '../assets/images';

function CategoryCard({ category, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // Get images for each category
  const getImages = () => {
    switch(category.id) {
      case 'vegetarian':
        return [pizzaImages.Margherita, pizzaImages['Veggie Supreme'], pizzaImages['Paneer Tikka']];
      case 'nonVegetarian':
        return [pizzaImages.Pepperoni, pizzaImages['Chicken Tikka'], pizzaImages['BBQ Chicken']];
      case 'vegan':
        return [pizzaImages['Vegan Margherita'], pizzaImages['Vegan Veggie Delight'], pizzaImages['Mediterranean Vegan']];
      case 'jain':
        return [pizzaImages['Jain Margherita'], pizzaImages['Jain Veggie Delight'], pizzaImages['Jain Paneer Tikka']];
      case 'pescetarian':
        return [pizzaImages['Tuna Pizza'], pizzaImages['Shrimp Pizza'], pizzaImages['Salmon Pizza']];
      case 'customized':
        return [pizzaImages.default, pizzaImages.default, pizzaImages.default];
      default:
        return [pizzaImages.default, pizzaImages.default, pizzaImages.default];
    }
  };

  const images = getImages();

  // Box colors for each category
  const getBoxColor = () => {
    switch(category.id) {
      case 'vegetarian': return '#E63946';      // Red
      case 'nonVegetarian': return '#8B4513';   // Spice Brown
      case 'vegan': return '#A8E6CF';           // Light Green
      case 'jain': return '#FFD700';            // Yellow
      case 'pescetarian': return '#DEB887';     // Pizza base color
      case 'customized': return '#FF8C42';      // Orange-Red
      default: return '#FFFFFF';
    }
  };

  // Text color based on box color
  const getTextColor = () => {
    switch(category.id) {
      case 'vegetarian': return '#FFFFFF';
      case 'nonVegetarian': return '#FFFFFF';
      case 'vegan': return '#2E7D32';
      case 'jain': return '#8B4513';
      case 'pescetarian': return '#5C4033';
      case 'customized': return '#FFFFFF';
      default: return '#333';
    }
  };

  const boxColor = getBoxColor();
  const textColor = getTextColor();

  // Handle hover - images move
  const handleMouseEnter = () => {
    setIsHovered(true);
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setImageIndex(index);
    }, 400);
    window.imageInterval = interval;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    clearInterval(window.imageInterval);
    setImageIndex(0);
  };

  const currentImage = isHovered ? images[imageIndex] : images[0];

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: boxColor,
        borderRadius: '12px',
        padding: '15px 12px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 6px 15px rgba(0,0,0,0.15)' : '0 2px 6px rgba(0,0,0,0.1)',
        aspectRatio: '1 / 1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <img
        src={currentImage}
        alt={category.name}
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
          borderRadius: '10px',
          marginBottom: '8px'
        }}
      />
      
      <h3 style={{ 
        margin: '6px 0 2px 0', 
        fontSize: '16px', 
        fontWeight: 'bold',
        color: textColor
      }}>
        {category.name}
      </h3>
      
      <p style={{ 
        fontSize: '12px', 
        color: textColor,
        opacity: 0.85,
        margin: 0
      }}>
        {category.description}
      </p>
    </div>
  );
}

export default CategoryCard;