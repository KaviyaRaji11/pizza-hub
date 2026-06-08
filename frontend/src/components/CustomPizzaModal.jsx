import { useState } from 'react';

function CustomPizzaModal({ isOpen, onClose, onAddToCart }) {
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedNonVeg, setSelectedNonVeg] = useState([]);
  const [selectedVegan, setSelectedVegan] = useState([]);
  const [step, setStep] = useState(1);

  const ingredients = {
    bases: [
      { name: "Thin Crust", price: 0 },
      { name: "Cheese Burst", price: 30 },
      { name: "Wheat Thin", price: 20 },
      { name: "Pan Pizza", price: 10 },
      { name: "Stuffed Crust", price: 40 }
    ],
    sauces: [
      { name: "Tomato Sauce", price: 0 },
      { name: "Pesto Sauce", price: 10 },
      { name: "BBQ Sauce", price: 5 },
      { name: "White Sauce", price: 15 },
      { name: "Spicy Red Sauce", price: 5 }
    ],
    cheeses: [
      { name: "Mozzarella", price: 0 },
      { name: "Cheddar", price: 10 },
      { name: "Parmesan", price: 5 },
      { name: "Vegan Cheese", price: 15 },
      { name: "Jain Cheese", price: 10 }
    ],
    veggies: [
      { name: "Onion", price: 10 },
      { name: "Capsicum", price: 10 },
      { name: "Tomato", price: 10 },
      { name: "Corn", price: 15 },
      { name: "Olives", price: 20 },
      { name: "Mushroom", price: 15 },
      { name: "Spinach", price: 10 },
      { name: "Paneer", price: 25 },
      { name: "Jalapenos", price: 10 }
    ],
    nonVeg: [
      { name: "Pepperoni", price: 30 },
      { name: "Chicken Tikka", price: 35 },
      { name: "BBQ Chicken", price: 30 },
      { name: "Sausage", price: 25 },
      { name: "Tuna", price: 40 },
      { name: "Shrimp", price: 45 }
    ],
    vegan: [
      { name: "Tofu", price: 20 },
      { name: "Vegan Sausage", price: 25 }
    ]
  };

  const calculateTotal = () => {
    let total = 199;
    if (selectedBase) total += selectedBase.price;
    if (selectedSauce) total += selectedSauce.price;
    if (selectedCheese) total += selectedCheese.price;
    selectedVeggies.forEach(v => total += v.price);
    selectedNonVeg.forEach(n => total += n.price);
    selectedVegan.forEach(v => total += v.price);
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

  const handleAddToCart = () => {
    const customPizza = {
      name: "Custom Pizza",
      price: calculateTotal(),
      quantity: 1,
      isCustom: true,
      details: { base: selectedBase, sauce: selectedSauce, cheese: selectedCheese, veggies: selectedVeggies, nonVeg: selectedNonVeg, vegan: selectedVegan }
    };
    onAddToCart(customPizza);
    onClose();
    setStep(1);
    setSelectedBase(null);
    setSelectedSauce(null);
    setSelectedCheese(null);
    setSelectedVeggies([]);
    setSelectedNonVeg([]);
    setSelectedVegan([]);
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', borderRadius: '15px', width: '90%', maxWidth: '600px', maxHeight: '80vh', overflow: 'auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>🍕 Build Your Custom Pizza</h2>
          <button onClick={onClose} style={{ fontSize: '24px', cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '20px 0' }}>
          {[1,2,3,4,5,6].map(s => (
            <button key={s} onClick={() => setStep(s)} style={{ padding: '8px 15px', backgroundColor: step === s ? '#ff4d4d' : '#ddd', color: step === s ? 'white' : 'black', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>
              {s === 1 && 'Base'} {s === 2 && 'Sauce'} {s === 3 && 'Cheese'} {s === 4 && 'Veggies'} {s === 5 && 'Non-Veg'} {s === 6 && 'Vegan'}
            </button>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h3>Choose Base</h3>
            {ingredients.bases.map(b => <button key={b.name} onClick={() => { setSelectedBase(b); setStep(2); }} style={{ margin: '10px', padding: '10px', backgroundColor: selectedBase?.name === b.name ? '#ff4d4d' : '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{b.name} +₹{b.price}</button>)}
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>Choose Sauce</h3>
            {ingredients.sauces.map(s => <button key={s.name} onClick={() => { setSelectedSauce(s); setStep(3); }} style={{ margin: '10px', padding: '10px', backgroundColor: selectedSauce?.name === s.name ? '#ff4d4d' : '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{s.name} +₹{s.price}</button>)}
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>Choose Cheese</h3>
            {ingredients.cheeses.map(c => <button key={c.name} onClick={() => { setSelectedCheese(c); setStep(4); }} style={{ margin: '10px', padding: '10px', backgroundColor: selectedCheese?.name === c.name ? '#ff4d4d' : '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{c.name} +₹{c.price}</button>)}
          </div>
        )}

        {step === 4 && (
          <div>
            <h3>Select Veggies</h3>
            {ingredients.veggies.map(v => <button key={v.name} onClick={() => toggleItem(v, selectedVeggies, setSelectedVeggies)} style={{ margin: '10px', padding: '10px', backgroundColor: selectedVeggies.find(x => x.name === v.name) ? '#4CAF50' : '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{v.name} +₹{v.price} {selectedVeggies.find(x => x.name === v.name) && '✓'}</button>)}
            <button onClick={() => setStep(5)} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px' }}>Next →</button>
          </div>
        )}

        {step === 5 && (
          <div>
            <h3>Select Non-Veg</h3>
            {ingredients.nonVeg.map(n => <button key={n.name} onClick={() => toggleItem(n, selectedNonVeg, setSelectedNonVeg)} style={{ margin: '10px', padding: '10px', backgroundColor: selectedNonVeg.find(x => x.name === n.name) ? '#4CAF50' : '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{n.name} +₹{n.price} {selectedNonVeg.find(x => x.name === n.name) && '✓'}</button>)}
            <button onClick={() => setStep(6)} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px' }}>Next →</button>
          </div>
        )}

        {step === 6 && (
          <div>
            <h3>Select Vegan</h3>
            {ingredients.vegan.map(v => <button key={v.name} onClick={() => toggleItem(v, selectedVegan, setSelectedVegan)} style={{ margin: '10px', padding: '10px', backgroundColor: selectedVegan.find(x => x.name === v.name) ? '#4CAF50' : '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{v.name} +₹{v.price} {selectedVegan.find(x => x.name === v.name) && '✓'}</button>)}
            <button onClick={() => setStep(7)} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px' }}>Review →</button>
          </div>
        )}

        {step === 7 && (
          <div>
            <h3>Review Your Pizza</h3>
            <p><strong>Base:</strong> {selectedBase?.name || 'Not selected'}</p>
            <p><strong>Sauce:</strong> {selectedSauce?.name || 'Not selected'}</p>
            <p><strong>Cheese:</strong> {selectedCheese?.name || 'Not selected'}</p>
            <p><strong>Veggies:</strong> {selectedVeggies.map(v => v.name).join(', ') || 'None'}</p>
            <p><strong>Non-Veg:</strong> {selectedNonVeg.map(n => n.name).join(', ') || 'None'}</p>
            <p><strong>Vegan:</strong> {selectedVegan.map(v => v.name).join(', ') || 'None'}</p>
            <h2>Total: ₹{calculateTotal()}</h2>
            <button onClick={handleAddToCart} style={{ padding: '15px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', width: '100%', fontSize: '18px', cursor: 'pointer' }}>Add to Cart 🛒</button>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold' }}>Current Total: ₹{calculateTotal()}</div>
      </div>
    </div>
  );
}

export default CustomPizzaModal;