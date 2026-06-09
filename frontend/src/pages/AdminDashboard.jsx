import { useState, useEffect } from 'react';
import { getInventory, updateInventory, getAllOrders, updateOrderStatus } from '../services/api';

function AdminDashboard() {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [invRes, ordersRes] = await Promise.all([
        getInventory(),
        getAllOrders()
      ]);
      setInventory(invRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (id, newStock) => {
    try {
      await updateInventory(id, { stock: newStock });
      setInventory(inventory.map(item => 
        item._id === id ? { ...item, stock: newStock } : item
      ));
    } catch (error) {
      alert('Failed to update stock');
    }
  };

  const changeOrderStatus = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      setOrders(orders.map(order =>
        order._id === id ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const lowStockItems = inventory.filter(item => item.stock < item.threshold);

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px', background: '#FFFFFF', minHeight: '100vh', padding: '20px' }}>Loading...</h2>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', background: '#FFFFFF', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#E63946' }}>👑 Admin Dashboard</h1>
      
      {lowStockItems.length > 0 && (
        <div style={{ backgroundColor: '#ffcccc', padding: '15px', borderRadius: '10px', marginBottom: '20px', border: '1px solid red' }}>
          <h3 style={{ color: 'red', margin: 0 }}>⚠️ LOW STOCK ALERT!</h3>
          {lowStockItems.map(item => (
            <p key={item._id} style={{ margin: '5px 0' }}>{item.name}: Only {item.stock} left (Threshold: {item.threshold})</p>
          ))}
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        <button onClick={() => setActiveTab('inventory')} style={{ padding: '10px 20px', backgroundColor: activeTab === 'inventory' ? '#E63946' : '#f0f0f0', color: activeTab === 'inventory' ? 'white' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          📦 Inventory Management ({inventory.length} items)
        </button>
        <button onClick={() => setActiveTab('orders')} style={{ padding: '10px 20px', backgroundColor: activeTab === 'orders' ? '#E63946' : '#f0f0f0', color: activeTab === 'orders' ? 'white' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          📋 All Orders ({orders.length})
        </button>
      </div>
      
      {activeTab === 'inventory' && (
        <div>
          <h2>Inventory Stock</h2>
          {['base', 'sauce', 'cheese', 'veggie', 'meat'].map(category => (
            <div key={category} style={{ marginBottom: '30px' }}>
              <h3 style={{ textTransform: 'capitalize', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '8px' }}>
                {category.toUpperCase()} ({inventory.filter(i => i.category === category).length} items)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px' }}>
                {inventory.filter(i => i.category === category).map(item => (
                  <div key={item._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: item.stock < item.threshold ? '#fff3f3' : 'white' }}>
                    <strong>{item.name}</strong>
                    <p>Price: ₹{item.price}</p>
                    <p>Stock: <input type="number" value={item.stock} onChange={(e) => updateStock(item._id, parseInt(e.target.value))} style={{ width: '80px', marginLeft: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }} /></p>
                    <p style={{ color: item.stock < item.threshold ? 'red' : 'green' }}>Threshold: {item.threshold} {item.stock < item.threshold && '⚠️ LOW STOCK'}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'orders' && (
        <div>
          <h2>Customer Orders</h2>
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            orders.map(order => (
              <div key={order._id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', marginBottom: '15px', background: 'white' }}>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p><strong>Address:</strong> {order.deliveryAddress?.street}, {order.deliveryAddress?.city}</p>
                <p><strong>Phone:</strong> {order.deliveryAddress?.phone}</p>
                
                {order.menuItems && order.menuItems.length > 0 && (
                  <div><strong>Items:</strong>{order.menuItems.map((item, i) => (<p key={i}>• {item.name} x {item.quantity}</p>))}</div>
                )}
                
                <p><strong>Status:</strong>
                  <select value={order.status} onChange={(e) => changeOrderStatus(order._id, e.target.value)} style={{ marginLeft: '10px', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;