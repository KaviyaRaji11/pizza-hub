import { useState, useEffect } from 'react';
import margherita from './assets/margherita.jpg';
import pepperoni from './assets/pepperoni.jpg';
import veggie from './assets/veggie.jpg';

function Dashboard({ setIsLoggedIn }) {

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [orderMessage, setOrderMessage] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

const [customerName, setCustomerName] = useState('');
const [address, setAddress] = useState('');
const [phone, setPhone] = useState('');

  useEffect(() => {

    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

  }, [cart]);

  const handleOrder = (pizza) => {

    const existingPizza = cart.find(
      (item) => item.name === pizza.name
    );

    if (existingPizza) {

      const updatedCart = cart.map((item) =>
        item.name === pizza.name
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          ...pizza,
          quantity: 1
        }
      ]);

    }

  };

  const increaseQuantity = (pizzaName) => {

    const updatedCart = cart.map((item) =>
      item.name === pizzaName
        ? {
            ...item,
            quantity: item.quantity + 1
          }
        : item
    );

    setCart(updatedCart);

  };

  const decreaseQuantity = (pizzaName) => {

    const updatedCart = cart
      .map((item) =>
        item.name === pizzaName
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

  };

  const handleRemove = (indexToRemove) => {

    const updatedCart = cart.filter(
      (_, index) => index !== indexToRemove
    );

    setCart(updatedCart);

  };

  const handleClearCart = () => {

    setCart([]);
    setOrderMessage('');

    localStorage.removeItem('cart');

  };

  const handlePlaceOrder = () => {
    if (
  customerName === '' ||
  address === '' ||
  phone === ''
) {

  setOrderMessage(
    'Please fill checkout details'
  );

  return;
}
  if (cart.length === 0) {

    setOrderMessage('Please add pizzas first 🍕');

  } else {

    const newOrder = {
      items: cart,
      total: totalPrice
    };

    setOrderHistory([
      ...orderHistory,
      newOrder
    ]);

    setOrderMessage(
      '🎉 Order Placed Successfully!'
    );

    setCart([]);

    localStorage.removeItem('cart');

  }

};

  const pizzas = [
    {
      name: 'Margherita',
      price: 199,
      image: margherita,
      category: 'Veg'
    },
    {
      name: 'Pepperoni',
      price: 299,
      image: pepperoni,
      category: 'Non-Veg'
    },
    {
      name: 'Veggie Supreme',
      price: 249,
      image: veggie,
      category: 'Veg'
    }
  ];

  const filteredPizzas = pizzas.filter((pizza) => {

    const matchesSearch =
      pizza.name.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === 'All' || pizza.category === filter;

    return matchesSearch && matchesFilter;

  });

  const totalPrice = cart.reduce(
    (total, pizza) =>
      total + pizza.price * pizza.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (

    <div
  className={
    darkMode
      ? 'dashboard dark-mode'
      : 'dashboard'
  }
>

      <nav className="navbar">

        <h2>PizzaHub 🍕</h2>
        <button
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? '☀️ Light' : '🌙 Dark'}
</button>

        <button
          onClick={() => setIsLoggedIn(false)}
        >
          Logout
        </button>

      </nav>

      <input
        type="text"
        placeholder="🔍 Search Pizza..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <div className="filter-buttons">

        <button onClick={() => setFilter('All')}>
          All
        </button>

        <button onClick={() => setFilter('Veg')}>
          Veg
        </button>

        <button onClick={() => setFilter('Non-Veg')}>
          Non-Veg
        </button>

      </div>

      <h1>Welcome to PizzaHub 🍕</h1>

      <p>Choose your favorite pizza</p>

      <div className="cart-section">

        <h2>Cart 🛒</h2>

        {cart.length === 0 ? (

          <p>No pizzas added</p>

        ) : (

          cart.map((item, index) => (

            <div key={index}>

              <p>
                {item.name} - ₹{item.price}
              </p>

              <div>

                <button
                  onClick={() => decreaseQuantity(item.name)}
                >
                  ➖
                </button>

                <span
                  style={{
                    margin: '0 10px',
                    fontWeight: 'bold'
                  }}
                >
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.name)}
                >
                  ➕
                </button>

              </div>

              <button
                onClick={() => handleRemove(index)}
              >
                Remove ❌
              </button>

            </div>

          ))

        )}

        <button onClick={handleClearCart}>
          Clear Cart 🗑️
        </button>

        <h3>Total: ₹{totalPrice}</h3>

        <h3>Items: {totalItems}</h3>
        <button
  onClick={() => setShowCheckout(true)}
>
  Checkout 💳
</button>
        <button onClick={handlePlaceOrder}>
          Place Order 🍕
        </button>

        <p>{orderMessage}</p>

      </div>
      {showCheckout && (

  <div className="checkout-section">

    <h2>Checkout 💳</h2>

    <input
      type="text"
      placeholder="Enter Name"
      value={customerName}
      onChange={(e) =>
        setCustomerName(e.target.value)
      }
    />

    <input
      type="text"
      placeholder="Enter Address"
      value={address}
      onChange={(e) =>
        setAddress(e.target.value)
      }
    />

    <input
      type="text"
      placeholder="Enter Phone Number"
      value={phone}
      onChange={(e) =>
        setPhone(e.target.value)
      }
    />

  </div>

)}
      <div className="order-history">

  <h2>📦 Order History</h2>

  {orderHistory.length === 0 ? (

    <p>No orders yet</p>

  ) : (

    orderHistory.map((order, index) => (

      <div key={index}>

        <h3>Order {index + 1}</h3>

        {order.items.map((item, itemIndex) => (

          <p key={itemIndex}>
            {item.name} x {item.quantity}
          </p>

        ))}

        <h4>₹ {order.total}</h4>

        <hr />

      </div>

    ))

  )}

</div>

      <div className="pizza-list">

        {filteredPizzas.map((pizza, index) => (

          <div className="pizza-card" key={index}>

            <img
              src={pizza.image}
              alt={pizza.name}
              className="pizza-image"
            />

            <h2>{pizza.name}</h2>

            <h3>₹ {pizza.price}</h3>

            <button onClick={() => handleOrder(pizza)}>
              Add to Cart
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Dashboard;