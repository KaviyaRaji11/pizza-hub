import { useState, useEffect } from 'react';
import { getMyOrders } from '../services/api';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ff9800';
      case 'confirmed': return '#2196f3';
      case 'preparing': return '#9c27b0';
      case 'out_for_delivery': return '#4caf50';
      case 'delivered': return '#2e7d32';
      default: return '#666';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      case 'preparing': return '👨‍🍳';
      case 'out_for_delivery': return '🚚';
      case 'delivered': return '🏠';
      default: return '📦';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Order Received';
      case 'confirmed': return 'Confirmed';
      case 'preparing': return 'In Kitchen';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  const getProgress = (status) => {
    switch(status) {
      case 'pending': return 20;
      case 'confirmed': return 40;
      case 'preparing': return 60;
      case 'out_for_delivery': return 80;
      case 'delivered': return 100;
      default: return 0;
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px', background: '#FFFFFF', minHeight: '100vh', padding: '20px' }}>Loading orders...</h2>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', background: '#FFFFFF', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#E63946' }}>📦 My Orders</h1>
      
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No orders yet. Build your first pizza!</p>
      ) : (
        orders.map((order, idx) => (
          <div 
            key={order._id} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '15px', 
              padding: '20px', 
              margin: '20px 0',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>Order #{idx + 1}</h3>
              <span style={{ 
                backgroundColor: getStatusColor(order.status),
                color: 'white',
                padding: '5px 15px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {getStatusIcon(order.status)} {getStatusText(order.status)}
              </span>
            </div>
            
            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Address:</strong> {order.deliveryAddress?.street}, {order.deliveryAddress?.city}</p>
            <p><strong>Phone:</strong> {order.deliveryAddress?.phone}</p>
            
            <div style={{ margin: '15px 0' }}>
              <div style={{ backgroundColor: '#e0e0e0', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${getProgress(order.status)}%`, backgroundColor: '#E63946', height: '100%', transition: 'width 0.5s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '10px', color: '#666' }}>
                <span>Order Received</span>
                <span>Confirmed</span>
                <span>In Kitchen</span>
                <span>Out for Delivery</span>
                <span>Delivered</span>
              </div>
            </div>
            
            {order.menuItems && order.menuItems.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <strong>🍕 Items:</strong>
                {order.menuItems.map((item, i) => (
                  <p key={i} style={{ margin: '5px 0 0 15px' }}>• {item.name} x {item.quantity}</p>
                ))}
              </div>
            )}
            
            {order.customPizza && order.customPizza.base?.name !== 'Regular Pizza' && (
              <div style={{ marginTop: '10px' }}>
                <strong>🍕 Custom Pizza:</strong>
                <p style={{ margin: '5px 0 0 15px' }}>Base: {order.customPizza?.base?.name}</p>
                <p style={{ margin: '2px 0 0 15px' }}>Sauce: {order.customPizza?.sauce?.name}</p>
                <p style={{ margin: '2px 0 0 15px' }}>Cheese: {order.customPizza?.cheese?.name}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;