
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomPizza({ cart, setCart }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedNonVeg, setSelectedNonVeg] = useState([]);
  const [selectedVegan, setSelectedVegan] = useState([]);
  const [selectedExtraCheese, setSelectedExtraCheese] = useState(false);
  const [selectedExtraSauce, setSelectedExtraSauce] = useState(false);

  const bases = [
    { name: "Thin Crust", price: 0 },
    { name: "Cheese Burst", price: 30 },
    { name: "Wheat Thin", price: 20 },
    { name: "Pan Pizza", price: 10 },
    { name: "Stuffed Crust", price: 40 },
    { name: "Gluten Free", price: 50 }
  ];

  const sauces = [
    { name: "Tomato Sauce", price: 0 },
    { name: "Pesto Sauce", price: 10 },
    { name: "BBQ Sauce", price: 5 },
    { name: "White Sauce", price: 15 },
    { name: "Spicy Red Sauce", price: 5 },
    { name: "Garlic Sauce", price: 10 }
  ];

  const cheeses = [
    { name: "Mozzarella", price: 0 },
    { name: "Cheddar", price: 10 },
    { name: "Parmesan", price: 5 },
    { name: "Vegan Cheese", price: 15 },
    { name: "Jain Cheese", price: 10 },
    { name: "Gouda", price: 12 }
  ];

  const veggies = [
    { name: "Onion", price: 10 }, { name: "Capsicum", price: 10 },
    { name: "Tomato", price: 10 }, { name: "Corn", price: 15 },
    { name: "Olives", price: 20 }, { name: "Mushroom", price: 15 },
    { name: "Spinach", price: 10 }, { name: "Zucchini", price: 15 },
    { name: "Paneer", price: 25 }, { name: "Jalapenos", price: 10 },
    { name: "Baby Corn", price: 20 }, { name: "Broccoli", price: 15 }
  ];

  const nonVegToppings = [
    { name: "Pepperoni", price: 30 }, { name: "Chicken Tikka", price: 35 },
    { name: "BBQ Chicken", price: 30 }, { name: "Sausage", price: 25 },
    { name: "Beef Pepperoni", price: 35 }, { name: "Tuna", price: 40 },
    { name: "Shrimp", price: 45 }, { name: "Bacon", price: 35 }
  ];

  const veganToppings = [
    { name: "Tofu", price: 20 }, { name: "Vegan Sausage", price: 25 },
    { name: "Plant Pepperoni", price: 30 }
  ];

  const calculateTotal = () => {
    let total = 199;
    if (selectedBase) total += selectedBase.price;
    if (selectedSauce) total += selectedSauce.price;
    if (selectedCheese) total += selectedCheese.price;
    selectedVeggies.forEach(v => total += v.price);
    selectedNonVeg.forEach(n => total += n.price);
    selectedVegan.forEach(v => total += v.price);
    if (selectedExtraCheese) total += 20;
    if (selectedExtraSauce) total += 15;
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

  const addToCart = () => {
  const customPizza = {
    name: "Custom Pizza",
    price: calculateTotal(),
    quantity: 1,
    isCustom: true,
    details: { base: selectedBase, sauce: selectedSauce, cheese: selectedCheese, veggies: selectedVeggies, nonVeg: selectedNonVeg, vegan: selectedVegan, extraCheese: selectedExtraCheese, extraSauce: selectedExtraSauce }
  };
  setCart([...cart, customPizza]);
  // No alert
  setStep(1);
  setSelectedBase(null);
  setSelectedSauce(null);
  setSelectedCheese(null);
  setSelectedVeggies([]);
  setSelectedNonVeg([]);
  setSelectedVegan([]);
  setSelectedExtraCheese(false);
  setSelectedExtraSauce(false);
};

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Back Button */}
      <button onClick={() => navigate('/menu')} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px', fontSize: '14px' }}>
        ← Back to Categories
      </button>

      <h1 style={{ textAlign: 'center', color: '#333' }}>🎨 Build Your Custom Pizza</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>Choose from 40+ ingredients</p>

      {/* Step Buttons */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '30px' }}>
        {[1, 2, 3, 4, 5, 6, 7].map(s => (
          <button key={s} onClick={() => setStep(s)} style={{ padding: '8px 16px', backgroundColor: step === s ? '#ff4d4d' : '#e0e0e0', color: step === s ? 'white' : '#333', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}>
            {s === 1 && 'Base'} {s === 2 && 'Sauce'} {s === 3 && 'Cheese'} {s === 4 && 'Veggies'} {s === 5 && 'Non-Veg'} {s === 6 && 'Vegan'} {s === 7 && 'Review'}
          </button>
        ))}
      </div>

      {/* Step 1 - Base */}
      {step === 1 && (
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '15px' }}>Choose Your Pizza Base</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {bases.map(b => (
              <button key={b.name} onClick={() => { setSelectedBase(b); setStep(2); }} style={{ padding: '12px 20px', backgroundColor: selectedBase?.name === b.name ? '#ff4d4d' : 'white', color: selectedBase?.name === b.name ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                {b.name} +₹{b.price}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 - Sauce */}
      {step === 2 && (
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '15px' }}>Choose Your Sauce</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {sauces.map(s => (
              <button key={s.name} onClick={() => { setSelectedSauce(s); setStep(3); }} style={{ padding: '12px 20px', backgroundColor: selectedSauce?.name === s.name ? '#ff4d4d' : 'white', color: selectedSauce?.name === s.name ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                {s.name} +₹{s.price}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 - Cheese */}
      {step === 3 && (
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '15px' }}>Choose Your Cheese</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {cheeses.map(c => (
              <button key={c.name} onClick={() => { setSelectedCheese(c); setStep(4); }} style={{ padding: '12px 20px', backgroundColor: selectedCheese?.name === c.name ? '#ff4d4d' : 'white', color: selectedCheese?.name === c.name ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                {c.name} +₹{c.price}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 - Veggies */}
      {step === 4 && (
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '15px' }}>Select Veggies (Click to add/remove)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {veggies.map(v => (
              <button key={v.name} onClick={() => toggleItem(v, selectedVeggies, setSelectedVeggies)} style={{ padding: '10px 16px', backgroundColor: selectedVeggies.find(x => x.name === v.name) ? '#4CAF50' : 'white', color: selectedVeggies.find(x => x.name === v.name) ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                {v.name} +₹{v.price} {selectedVeggies.find(x => x.name === v.name) && '✓'}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(5)} style={{ marginTop: '20px', padding: '12px 24px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>Next → ({selectedVeggies.length} selected)</button>
        </div>
      )}

      {/* Step 5 - Non-Veg */}
      {step === 5 && (
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '15px' }}>Select Non-Veg Toppings</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {nonVegToppings.map(n => (
              <button key={n.name} onClick={() => toggleItem(n, selectedNonVeg, setSelectedNonVeg)} style={{ padding: '10px 16px', backgroundColor: selectedNonVeg.find(x => x.name === n.name) ? '#ff9800' : 'white', color: selectedNonVeg.find(x => x.name === n.name) ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                {n.name} +₹{n.price} {selectedNonVeg.find(x => x.name === n.name) && '✓'}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(6)} style={{ marginTop: '20px', padding: '12px 24px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>Next → ({selectedNonVeg.length} selected)</button>
        </div>
      )}

      {/* Step 6 - Vegan */}
      {step === 6 && (
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '15px' }}>Select Vegan Toppings</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {veganToppings.map(v => (
              <button key={v.name} onClick={() => toggleItem(v, selectedVegan, setSelectedVegan)} style={{ padding: '10px 16px', backgroundColor: selectedVegan.find(x => x.name === v.name) ? '#8bc34a' : 'white', color: selectedVegan.find(x => x.name === v.name) ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                {v.name} +₹{v.price} {selectedVegan.find(x => x.name === v.name) && '✓'}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(7)} style={{ marginTop: '20px', padding: '12px 24px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>Review Order →</button>
        </div>
      )}

      {/* Step 7 - Review */}
      {step === 7 && (
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
          <h3 style={{ marginBottom: '15px' }}>Review Your Custom Pizza</h3>
          
          <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
            <p><strong>Base:</strong> {selectedBase?.name || 'Not selected'} - ₹{selectedBase?.price || 0}</p>
            <p><strong>Sauce:</strong> {selectedSauce?.name || 'Not selected'} - ₹{selectedSauce?.price || 0}</p>
            <p><strong>Cheese:</strong> {selectedCheese?.name || 'Not selected'} - ₹{selectedCheese?.price || 0}</p>
            <p><strong>Veggies:</strong> {selectedVeggies.map(v => v.name).join(', ') || 'None'} - ₹{selectedVeggies.reduce((s, v) => s + v.price, 0)}</p>
            <p><strong>Non-Veg:</strong> {selectedNonVeg.map(n => n.name).join(', ') || 'None'} - ₹{selectedNonVeg.reduce((s, n) => s + n.price, 0)}</p>
            <p><strong>Vegan:</strong> {selectedVegan.map(v => v.name).join(', ') || 'None'} - ₹{selectedVegan.reduce((s, v) => s + v.price, 0)}</p>
          </div>

          <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
            <h4>Extras:</h4>
            <label style={{ display: 'block', marginBottom: '10px' }}>
              <input type="checkbox" checked={selectedExtraCheese} onChange={() => setSelectedExtraCheese(!selectedExtraCheese)} /> Extra Cheese (+₹20)
            </label>
            <label style={{ display: 'block' }}>
              <input type="checkbox" checked={selectedExtraSauce} onChange={() => setSelectedExtraSauce(!selectedExtraSauce)} /> Extra Sauce (+₹15)
            </label>
          </div>

          <h2 style={{ color: '#ff4d4d', textAlign: 'center' }}>Total: ₹{calculateTotal()}</h2>
          
          <button onClick={addToCart} style={{ width: '100%', padding: '15px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', marginTop: '15px' }}>
            Add to Cart 🛒
          </button>
          <button onClick={() => setStep(1)} style={{ width: '100%', padding: '12px', backgroundColor: '#e0e0e0', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>
            Start Over
          </button>
        </div>
      )}

      {/* Current Total Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#ff4d4d', color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>
        Current Total: ₹{calculateTotal()}
      </div>
    </div>
  );
}

export default CustomPizza;