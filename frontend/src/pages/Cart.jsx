import { useState } from 'react';
import { createOrder } from '../services/api';

function Cart({ cart, setCart }) {

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const increaseQuantity = (pizzaName) => {
    const updatedCart = cart.map((item) =>
      item.name === pizzaName ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (pizzaName) => {
    const updatedCart = cart
      .map((item) =>
        item.name === pizzaName ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = 40;
  const gst = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryCharge + gst - discount;

  const applyCoupon = () => {
    if (coupon === 'SAVE50') {
      setDiscount(50);
      alert('Coupon Applied 🎉');
    } else {
      alert('Invalid Coupon ❌');
    }
  };

  const handlePlaceOrder = async () => {
    if (name === '' || address === '' || phone === '') {
      alert('Fill all details');
      return;
    }

    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    try {
      const orderData = {
        customPizza: {
          base: { name: 'Regular Pizza', price: 0 },
          sauce: { name: 'Standard', price: 0 },
          cheese: { name: 'Mozzarella', price: 0 },
          veggies: [],
          meats: []
        },
        totalAmount: finalTotal,
        deliveryAddress: { street: address, city: name, phone: phone },
        menuItems: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };
      
      await createOrder(orderData);
      alert('Order Placed Successfully! 🎉');
      
      setCart([]);
      setName('');
      setAddress('');
      setPhone('');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to place order: ' + (error.response?.data?.message || error.message));
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', background: '#FFFFFF', minHeight: '100vh', textAlign: 'center' }}>
        <h1>🛒 Your Cart</h1>
        <p>No pizzas added. Go to Menu!</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', background: '#FFFFFF', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>🛒 Your Cart</h1>

      {cart.map((item, index) => (
        <div key={index} style={{
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'white'
        }}>
          <div>
            <h3 style={{ margin: 0 }}>{item.name}</h3>
            <p style={{ margin: '5px 0', color: '#E63946', fontWeight: 'bold' }}>₹{item.price}</p>
          </div>
          <div>
            <button onClick={() => decreaseQuantity(item.name)} style={{ padding: '5px 10px', margin: '0 5px', cursor: 'pointer' }}>➖</button>
            <span style={{ fontSize: '18px' }}>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.name)} style={{ padding: '5px 10px', margin: '0 5px', cursor: 'pointer' }}>➕</button>
          </div>
        </div>
      ))}

      <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '10px', marginTop: '20px' }}>
        <h3>Coupon Code</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Enter Coupon (SAVE50)"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
          />
          <button onClick={applyCoupon} style={{ padding: '10px 20px', backgroundColor: '#E63946', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Apply
          </button>
        </div>

        <hr style={{ margin: '15px 0' }} />

        <h3>Sub Total: ₹{totalPrice}</h3>
        <h3>Delivery: ₹{deliveryCharge}</h3>
        <h3>GST (5%): ₹{gst}</h3>
        <h3>Discount: ₹{discount}</h3>
        <h2 style={{ color: '#E63946' }}>Final Total: ₹{finalTotal}</h2>

        <hr style={{ margin: '15px 0' }} />

        <h3>Delivery Details</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
        />
        <input
          type="text"
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
        />

        <button
          onClick={handlePlaceOrder}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#E63946',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Place Order 🍕
        </button>
      </div>
    </div>
  );
}

export default Cart;