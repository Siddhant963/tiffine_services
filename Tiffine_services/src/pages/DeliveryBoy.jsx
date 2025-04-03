import { useState } from 'react';
import { toast } from 'sonner';
import OrderCard from '@/components/ui/OrderCard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeliveryBoy = () => {
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

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    // In a real app, this would sync with the admin's view through a backend
    toast.success(`Order #${orderId} updated to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <header className="bg-neutral-dark text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-white">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Login</span>
          </Link>
          <h1 className="text-lg font-medium">Delivery Mode</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 animate-fade-in">
        <h1 className="text-2xl font-medium mb-6">Today's Deliveries</h1>
        
        <div className="space-y-4">
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
      </main>
    </div>
  );
};

export default DeliveryBoy;