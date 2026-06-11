import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomPizza({ cart, setCart, favorites, setFavorites }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedMeats, setSelectedMeats] = useState([]);
  const [selectedSeafood, setSelectedSeafood] = useState([]);
  const [selectedVegan, setSelectedVegan] = useState([]);
  const [selectedJain, setSelectedJain] = useState([]);

  // ALL INGREDIENTS
  const bases = [
    { name: "Thin Crust", price: 0 }, { name: "Cheese Burst", price: 30 },
    { name: "Wheat Thin", price: 20 }, { name: "Pan Pizza", price: 10 },
    { name: "Stuffed Crust", price: 40 }
  ];

  const sauces = [
    { name: "Tomato Sauce", price: 0 }, { name: "Pesto Sauce", price: 10 },
    { name: "BBQ Sauce", price: 5 }, { name: "White Sauce", price: 15 },
    { name: "Spicy Red Sauce", price: 5 }
  ];

  const cheeses = [
    { name: "Mozzarella", price: 0 }, { name: "Cheddar", price: 10 },
    { name: "Parmesan", price: 5 }, { name: "Vegan Cheese", price: 15 },
    { name: "Jain Cheese", price: 10 }
  ];

  const veggies = [
    { name: "Onion", price: 10 }, { name: "Capsicum", price: 10 },
    { name: "Tomato", price: 10 }, { name: "Corn", price: 15 },
    { name: "Olives", price: 20 }, { name: "Mushroom", price: 15 },
    { name: "Spinach", price: 10 }, { name: "Zucchini", price: 15 },
    { name: "Paneer", price: 25 }, { name: "Jalapenos", price: 10 }
  ];

  const meats = [
    { name: "Pepperoni", price: 30 }, { name: "Chicken Tikka", price: 35 },
    { name: "BBQ Chicken", price: 30 }, { name: "Sausage", price: 25 },
    { name: "Bacon", price: 35 }, { name: "Beef Pepperoni", price: 30 },
    { name: "Spicy Chicken", price: 30 }, { name: "Chicken Sausage", price: 25 }
  ];

  const seafood = [
    { name: "Tuna", price: 40 }, { name: "Shrimp", price: 45 },
    { name: "Anchovy", price: 35 }, { name: "Mixed Seafood", price: 50 },
    { name: "Salmon", price: 45 }, { name: "Squid", price: 40 }
  ];

  const vegan = [
    { name: "Tofu", price: 20 }, { name: "Vegan Sausage", price: 25 },
    { name: "Plant-Based Pepperoni", price: 30 }, { name: "Vegan Chicken", price: 25 }
  ];

  const jain = [
    { name: "Jain Paneer", price: 25 }, { name: "Jain Corn", price: 15 },
    { name: "Jain Mushroom", price: 15 }
  ];

  const calculateTotal = () => {
    let total = 199;
    if (selectedBase) total += selectedBase.price;
    if (selectedSauce) total += selectedSauce.price;
    if (selectedCheese) total += selectedCheese.price;
    selectedVeggies.forEach(v => total += v.price);
    selectedMeats.forEach(m => total += m.price);
    selectedSeafood.forEach(s => total += s.price);
    selectedVegan.forEach(v => total += v.price);
    selectedJain.forEach(j => total += j.price);
    return total;
  };

  const toggleItem = (item, list, setList) => {
    const exists = list.find(i => i.name === item.name);
    if (exists) {
      setList(list.filter(i => i.name !== item.name));
    } else {
      setList([...list, item]);
    }
  };

  // Save custom pizza to favorites
  const addToFavorites = () => {
    const customPizzaData = {
      _id: 'custom_' + Date.now(),
      name: "Custom Pizza",
      price: calculateTotal(),
      description: `Base: ${selectedBase?.name || 'None'}, Sauce: ${selectedSauce?.name || 'None'}, Cheese: ${selectedCheese?.name || 'None'}, Veggies: ${selectedVeggies.map(v => v.name).join(', ') || 'None'}, Meats: ${selectedMeats.map(m => m.name).join(', ') || 'None'}, Seafood: ${selectedSeafood.map(s => s.name).join(', ') || 'None'}, Vegan: ${selectedVegan.map(v => v.name).join(', ') || 'None'}, Jain: ${selectedJain.map(j => j.name).join(', ') || 'None'}`,
      isVeg: selectedMeats.length === 0 && selectedSeafood.length === 0,
      isCustom: true,
      price: calculateTotal(),
      customDetails: {
        base: selectedBase,
        sauce: selectedSauce,
        cheese: selectedCheese,
        veggies: selectedVeggies,
        meats: selectedMeats,
        seafood: selectedSeafood,
        vegan: selectedVegan,
        jain: selectedJain
      }
    };
    
    const exists = favorites.find(fav => fav._id === customPizzaData._id);
    if (exists) {
      setFavorites(favorites.filter(fav => fav._id !== customPizzaData._id));
      alert('Removed from favorites ❌');
    } else {
      setFavorites([...favorites, customPizzaData]);
      alert('Added to favorites ❤️');
    }
  };

  const addToCart = () => {
    const customPizza = {
      name: "Custom Pizza",
      price: calculateTotal(),
      quantity: 1,
      isCustom: true,
      details: {
        base: selectedBase,
        sauce: selectedSauce,
        cheese: selectedCheese,
        veggies: selectedVeggies,
        meats: selectedMeats,
        seafood: selectedSeafood,
        vegan: selectedVegan,
        jain: selectedJain
      }
    };
    setCart([...cart, customPizza]);
    alert("Custom pizza added to cart! 🍕");
    setStep(1);
    setSelectedBase(null);
    setSelectedSauce(null);
    setSelectedCheese(null);
    setSelectedVeggies([]);
    setSelectedMeats([]);
    setSelectedSeafood([]);
    setSelectedVegan([]);
    setSelectedJain([]);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', background: '#FFFFFF', minHeight: '100vh' }}>
      <button onClick={() => navigate('/menu')} style={{ backgroundColor: '#E63946', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px' }}>
        ← Back to Menu
      </button>

      <h1 style={{ textAlign: 'center', color: '#E63946' }}>🎨 Build Your Custom Pizza</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>Choose from 50+ ingredients</p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '30px' }}>
        {[1,2,3,4,5,6,7,8,9].map(s => (
          <button key={s} onClick={() => setStep(s)} style={{ padding: '8px 15px', backgroundColor: step === s ? '#E63946' : '#ddd', color: step === s ? 'white' : 'black', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>
            {s === 1 && 'Base'} {s === 2 && 'Sauce'} {s === 3 && 'Cheese'} {s === 4 && 'Veggies'} {s === 5 && 'Meats'} {s === 6 && 'Seafood'} {s === 7 && 'Vegan'} {s === 8 && 'Jain'} {s === 9 && 'Review'}
          </button>
        ))}
      </div>

      {step === 1 && (
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3>Choose Base (5 options)</h3>
          {bases.map(b => <button key={b.name} onClick={() => { setSelectedBase(b); setStep(2); }} style={{ margin: '10px', padding: '12px', backgroundColor: selectedBase?.name === b.name ? '#E63946' : 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>{b.name} +₹{b.price}</button>)}
        </div>
      )}

      {step === 2 && (
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3>Choose Sauce (5 options)</h3>
          {sauces.map(s => <button key={s.name} onClick={() => { setSelectedSauce(s); setStep(3); }} style={{ margin: '10px', padding: '12px', backgroundColor: selectedSauce?.name === s.name ? '#E63946' : 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>{s.name} +₹{s.price}</button>)}
        </div>
      )}

      {step === 3 && (
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3>Choose Cheese (5 options)</h3>
          {cheeses.map(c => <button key={c.name} onClick={() => { setSelectedCheese(c); setStep(4); }} style={{ margin: '10px', padding: '12px', backgroundColor: selectedCheese?.name === c.name ? '#E63946' : 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>{c.name} +₹{c.price}</button>)}
        </div>
      )}

      {step === 4 && (
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3>Select Veggies (10 options)</h3>
          {veggies.map(v => <button key={v.name} onClick={() => toggleItem(v, selectedVeggies, setSelectedVeggies)} style={{ margin: '10px', padding: '10px', backgroundColor: selectedVeggies.find(x => x.name === v.name) ? '#4CAF50' : 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>{v.name} +₹{v.price} {selectedVeggies.find(x => x.name === v.name) && '✓'}</button>)}
          <button onClick={() => setStep(5)} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#E63946', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Next →</button>
        </div>
      )}

      {step === 5 && (
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3>Select Meats (8 options)</h3>
          {meats.map(m => <button key={m.name} onClick={() => toggleItem(m, selectedMeats, setSelectedMeats)} style={{ margin: '10px', padding: '10px', backgroundColor: selectedMeats.find(x => x.name === m.name) ? '#E63946' : 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>{m.name} +₹{m.price} {selectedMeats.find(x => x.name === m.name) && '✓'}</button>)}
          <button onClick={() => setStep(6)} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#E63946', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Next →</button>
        </div>
      )}

      {step === 6 && (
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3>Select Seafood (6 options)</h3>
          {seafood.map(s => <button key={s.name} onClick={() => toggleItem(s, selectedSeafood, setSelectedSeafood)} style={{ margin: '10px', padding: '10px', backgroundColor: selectedSeafood.find(x => x.name === s.name) ? '#1E88E5' : 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>{s.name} +₹{s.price} {selectedSeafood.find(x => x.name === s.name) && '✓'}</button>)}
          <button onClick={() => setStep(7)} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#E63946', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Next →</button>
        </div>
      )}

      {step === 7 && (
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3>Select Vegan (4 options)</h3>
          {vegan.map(v => <button key={v.name} onClick={() => toggleItem(v, selectedVegan, setSelectedVegan)} style={{ margin: '10px', padding: '10px', backgroundColor: selectedVegan.find(x => x.name === v.name) ? '#8BC34A' : 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>{v.name} +₹{v.price} {selectedVegan.find(x => x.name === v.name) && '✓'}</button>)}
          <button onClick={() => setStep(8)} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#E63946', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Next →</button>
        </div>
      )}

      {step === 8 && (
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3>Select Jain (3 options)</h3>
          {jain.map(j => <button key={j.name} onClick={() => toggleItem(j, selectedJain, setSelectedJain)} style={{ margin: '10px', padding: '10px', backgroundColor: selectedJain.find(x => x.name === j.name) ? '#FFD700' : 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>{j.name} +₹{j.price} {selectedJain.find(x => x.name === j.name) && '✓'}</button>)}
          <button onClick={() => setStep(9)} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#E63946', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Review →</button>
        </div>
      )}

      {step === 9 && (
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #ddd' }}>
          <h3>Review Your Custom Pizza</h3>
          <p><strong>Base:</strong> {selectedBase?.name || 'Not selected'}</p>
          <p><strong>Sauce:</strong> {selectedSauce?.name || 'Not selected'}</p>
          <p><strong>Cheese:</strong> {selectedCheese?.name || 'Not selected'}</p>
          <p><strong>Veggies:</strong> {selectedVeggies.map(v => v.name).join(', ') || 'None'}</p>
          <p><strong>Meats:</strong> {selectedMeats.map(m => m.name).join(', ') || 'None'}</p>
          <p><strong>Seafood:</strong> {selectedSeafood.map(s => s.name).join(', ') || 'None'}</p>
          <p><strong>Vegan:</strong> {selectedVegan.map(v => v.name).join(', ') || 'None'}</p>
          <p><strong>Jain:</strong> {selectedJain.map(j => j.name).join(', ') || 'None'}</p>
          <h2 style={{ color: '#E63946' }}>Total: ₹{calculateTotal()}</h2>
          
          {/* Add to Favorites Button - Only here */}
          <button onClick={addToFavorites} style={{ width: '100%', padding: '12px', backgroundColor: '#FFD700', color: '#333', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>
            ❤️ Add to Favorites
          </button>
          
          <button onClick={addToCart} style={{ width: '100%', padding: '15px', backgroundColor: '#E63946', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
            Add to Cart 🛒
          </button>
          <button onClick={() => setStep(1)} style={{ width: '100%', padding: '10px', backgroundColor: '#ddd', color: 'black', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>
            Start Over
          </button>
        </div>
      )}

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#E63946', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>
        Current Total: ₹{calculateTotal()}
      </div>
    </div>
  );
}

export default CustomPizza;