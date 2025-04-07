import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import OrderCard from '../components/ui/OrderCard';

const Orders = () => {
  const [orders, setOrders] = useState([
    { 
      id: '17983', 
      customer: 'Ishant patel', 
      meal: 'Vegan delight', 
      status: 'Pending'
    },
    { 
      id: '17984', 
      customer: 'Rahul Sharma', 
      meal: 'Protein Pack', 
      status: 'Pending'
    }
  ]);

  // Function to update order status
  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Data for the pie chart
  const data = [
    { name: 'Pending', value: orders.filter(o => o.status === 'Pending').length },
    { name: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length },
    { name: 'ND IOT', value: orders.filter(o => o.status === 'ND IOT').length },
    { name: 'ND IL', value: orders.filter(o => o.status === 'ND IL').length },
    { name: 'Taken Extra Tiffin', value: orders.filter(o => o.status === 'Taken Extra Tiffin').length },
  ].filter(item => item.value > 0);
  
  const COLORS = ['#00C4C4', '#FF6B6B', '#FFB800', '#9C55FF', '#FF8A5B'];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 animate-fade-in">
        <h1 className="text-3xl font-medium mb-6">Delivery management</h1>
        
        <div className="space-y-4 mb-8">
          {orders.map(order => (
            <OrderCard 
              key={order.id}
              orderId={order.id}
              customer={order.customer}
              meal={order.meal}
              status={order.status}
              onStatusChange={(newStatus) => handleStatusUpdate(order.id, newStatus)}
            />
          ))}
        </div>
        
        <div className="card">
          <h2 className="text-2xl font-medium mb-4">Analytics and report</h2>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
