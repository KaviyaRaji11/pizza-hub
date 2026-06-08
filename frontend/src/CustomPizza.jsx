import { useState } from 'react';

function CustomPizza({ cart, setCart }) {
  const [step, setStep] = useState(1);
  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedNonVeg, setSelectedNonVeg] = useState([]);
  const [selectedVegan, setSelectedVegan] = useState([]);

  // ALL INGREDIENTS
  const bases = [
    { name: "Thin Crust", price: 0 },
    { name: "Cheese Burst", price: 30 },
    { name: "Wheat Thin", price: 20 },
    { name: "Pan Pizza", price: 10 },
    { name: "Stuffed Crust", price: 40 }
  ];

  const sauces = [
    { name: "Tomato Sauce", price: 0 },
    { name: "Pesto Sauce", price: 10 },
    { name: "BBQ Sauce", price: 5 },
    { name: "White Sauce", price: 15 },
    { name: "Spicy Red Sauce", price: 5 }
  ];

  const cheeses = [
    { name: "Mozzarella", price: 0 },
    { name: "Cheddar", price: 10 },
    { name: "Parmesan", price: 5 },
    { name: "Vegan Cheese", price: 15 },
    { name: "Jain Cheese", price: 10 }
  ];

  const veggies = [
    { name: "Onion", price: 10 },
    { name: "Capsicum", price: 10 },
    { name: "Tomato", price: 10 },
    { name: "Corn", price: 15 },
    { name: "Olives", price: 20 },
    { name: "Mushroom", price: 15 },
    { name: "Spinach", price: 10 },
    { name: "Zucchini", price: 15 },
    { name: "Paneer", price: 25 },
    { name: "Jalapenos", price: 10 }
  ];

  const nonVegToppings = [
    { name: "Pepperoni", price: 30 },
    { name: "Chicken Tikka", price: 35 },
    { name: "BBQ Chicken", price: 30 },
    { name: "Sausage", price: 25 },
    { name: "Beef Pepperoni", price: 35 },
    { name: "Tuna", price: 40 },
    { name: "Shrimp", price: 45 },
    { name: "Smoked Salmon", price: 50 }
  ];

  const veganToppings = [
    { name: "Tofu", price: 20 },
    { name: "Vegan Sausage", price: 25 },
    { name: "Plant-Based Pepperoni", price: 30 }
  ];

  const calculateTotal = () => {
    let total = 199; // Base price
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
        nonVeg: selectedNonVeg,
        vegan: selectedVegan
      }
    };
    setCart([...cart, customPizza]);
    alert("Custom pizza added to cart! 🍕");
    // Reset
    setStep(1);
    setSelectedBase(null);
    setSelectedSauce(null);
    setSelectedCheese(null);
    setSelectedVeggies([]);
    setSelectedNonVeg([]);
    setSelectedVegan([]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>🎨 Build Your Custom Pizza</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Choose from 36+ ingredients</p>

      {/* Step Progress */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', margin: '20px 0' }}>
        {[1, 2, 3, 4, 5, 6, 7].map(s => (
          <button
            key={s}
            onClick={() => setStep(s)}
            style={{
              padding: '8px 15px',
              backgroundColor: step === s ? '#ff4d4d' : '#ddd',
              color: step === s ? 'white' : 'black',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            {s === 1 && 'Base'} {s === 2 && 'Sauce'} {s === 3 && 'Cheese'}
            {s === 4 && 'Veggies'} {s === 5 && 'Non-Veg'} {s === 6 && 'Vegan'} {s === 7 && 'Review'}
          </button>
        ))}
      </div>

      {/* Step 1: Base */}
      {step === 1 && (
        <div>
          <h3>Step 1: Choose Pizza Base (5 options)</h3>
          {bases.map(base => (
            <button
              key={base.name}
              onClick={() => { setSelectedBase(base); setStep(2); }}
              style={{
                margin: '10px',
                padding: '12px',
                backgroundColor: selectedBase?.name === base.name ? '#ff4d4d' : '#f0f0f0',
                color: selectedBase?.name === base.name ? 'white' : 'black',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                width: 'calc(50% - 20px)'
              }}
            >
              {base.name} +₹{base.price}
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Sauce */}
      {step === 2 && (
        <div>
          <h3>Step 2: Choose Sauce (5 options)</h3>
          {sauces.map(sauce => (
            <button
              key={sauce.name}
              onClick={() => { setSelectedSauce(sauce); setStep(3); }}
              style={{
                margin: '10px',
                padding: '12px',
                backgroundColor: selectedSauce?.name === sauce.name ? '#ff4d4d' : '#f0f0f0',
                color: selectedSauce?.name === sauce.name ? 'white' : 'black',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                width: 'calc(50% - 20px)'
              }}
            >
              {sauce.name} +₹{sauce.price}
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Cheese */}
      {step === 3 && (
        <div>
          <h3>Step 3: Choose Cheese (5 options)</h3>
          {cheeses.map(cheese => (
            <button
              key={cheese.name}
              onClick={() => { setSelectedCheese(cheese); setStep(4); }}
              style={{
                margin: '10px',
                padding: '12px',
                backgroundColor: selectedCheese?.name === cheese.name ? '#ff4d4d' : '#f0f0f0',
                color: selectedCheese?.name === cheese.name ? 'white' : 'black',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                width: 'calc(50% - 20px)'
              }}
            >
              {cheese.name} +₹{cheese.price}
            </button>
          ))}
        </div>
      )}

      {/* Step 4: Veggies */}
      {step === 4 && (
        <div>
          <h3>Step 4: Select Veggies (10 options - click to add/remove)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {veggies.map(veggie => (
              <button
                key={veggie.name}
                onClick={() => toggleItem(veggie, selectedVeggies, setSelectedVeggies)}
                style={{
                  margin: '10px',
                  padding: '10px',
                  backgroundColor: selectedVeggies.find(v => v.name === veggie.name) ? '#4CAF50' : '#f0f0f0',
                  color: selectedVeggies.find(v => v.name === veggie.name) ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {veggie.name} +₹{veggie.price} {selectedVeggies.find(v => v.name === veggie.name) && '✓'}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(5)} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Next → ({selectedVeggies.length} selected)
          </button>
        </div>
      )}

      {/* Step 5: Non-Veg Toppings */}
      {step === 5 && (
        <div>
          <h3>Step 5: Select Non-Veg Toppings (8 options - click to add/remove)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {nonVegToppings.map(topping => (
              <button
                key={topping.name}
                onClick={() => toggleItem(topping, selectedNonVeg, setSelectedNonVeg)}
                style={{
                  margin: '10px',
                  padding: '10px',
                  backgroundColor: selectedNonVeg.find(n => n.name === topping.name) ? '#ff9800' : '#f0f0f0',
                  color: selectedNonVeg.find(n => n.name === topping.name) ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {topping.name} +₹{topping.price} {selectedNonVeg.find(n => n.name === topping.name) && '✓'}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(6)} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Next → ({selectedNonVeg.length} selected)
          </button>
        </div>
      )}

      {/* Step 6: Vegan Toppings */}
      {step === 6 && (
        <div>
          <h3>Step 6: Select Vegan Toppings (3 options - click to add/remove)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {veganToppings.map(topping => (
              <button
                key={topping.name}
                onClick={() => toggleItem(topping, selectedVegan, setSelectedVegan)}
                style={{
                  margin: '10px',
                  padding: '10px',
                  backgroundColor: selectedVegan.find(v => v.name === topping.name) ? '#8bc34a' : '#f0f0f0',
                  color: selectedVegan.find(v => v.name === topping.name) ? 'white' : 'black',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {topping.name} +₹{topping.price} {selectedVegan.find(v => v.name === topping.name) && '✓'}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(7)} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Review Order →
          </button>
        </div>
      )}

      {/* Step 7: Review */}
      {step === 7 && (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '15px' }}>
          <h3>Review Your Custom Pizza</h3>
          <p><strong>Base:</strong> {selectedBase?.name || 'Not selected'} - ₹{selectedBase?.price || 0}</p>
          <p><strong>Sauce:</strong> {selectedSauce?.name || 'Not selected'} - ₹{selectedSauce?.price || 0}</p>
          <p><strong>Cheese:</strong> {selectedCheese?.name || 'Not selected'} - ₹{selectedCheese?.price || 0}</p>
          <p><strong>Veggies:</strong> {selectedVeggies.map(v => v.name).join(', ') || 'None'} - ₹{selectedVeggies.reduce((s, v) => s + v.price, 0)}</p>
          <p><strong>Non-Veg:</strong> {selectedNonVeg.map(n => n.name).join(', ') || 'None'} - ₹{selectedNonVeg.reduce((s, n) => s + n.price, 0)}</p>
          <p><strong>Vegan:</strong> {selectedVegan.map(v => v.name).join(', ') || 'None'} - ₹{selectedVegan.reduce((s, v) => s + v.price, 0)}</p>
          <hr />
          <h2 style={{ color: '#ff4d4d' }}>Total: ₹{calculateTotal()}</h2>
          <button
            onClick={addToCart}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#ff4d4d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Add to Cart 🛒
          </button>
          <button
            onClick={() => setStep(1)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#ddd',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Start Over
          </button>
        </div>
      )}

      {/* Current Total Display */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ff4d4d',
        color: 'white',
        padding: '15px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '18px'
      }}>
        Current Total: ₹{calculateTotal()}
      </div>
    </div>
  );
}

export default CustomPizza;