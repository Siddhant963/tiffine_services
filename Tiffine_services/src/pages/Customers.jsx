import { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomerCard from '@/components/ui/CustomerCard';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Customers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([
    { 
      id: 1, 
      name: 'Ishant patel', 
      location: 'Jabalpur', 
      joinDate: 'Jan 5, 2023', 
      mealsLeft: 15,
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Rahul Sharma', 
      location: 'Jabalpur', 
      joinDate: 'Feb 12, 2023', 
      mealsLeft: 8,
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'Priya Patel', 
      location: 'Jabalpur', 
      joinDate: 'Mar 20, 2023', 
      mealsLeft: 22,
      status: 'Active'
    },
    { 
      id: 4, 
      name: 'Amit Singh', 
      location: 'Jabalpur', 
      joinDate: 'Jan 15, 2023', 
      mealsLeft: 0,
      status: 'Inactive'
    },
  ]);

  const handleAddCustomer = () => {
    navigate('/customers/create');
  };

  const handleEditCustomer = (id) => {
    navigate(`/customers/edit/${id}`);
  };

  const handleTerminateCustomer = (id) => {
    toast.error(`Terminate customer ${id}`);
    setCustomers(customers.map(customer => 
      customer.id === id 
        ? { ...customer, status: 'Inactive' } 
        : customer
    ));
  };

  const handleRenewCustomer = (id) => {
    toast.success(`Renew customer ${id}`);
    setCustomers(customers.map(customer => 
      customer.id === id 
        ? { ...customer, status: 'Active', mealsLeft: 30 } 
        : customer
    ));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 animate-fade-in">
        <div className="flex justify-end mb-6">
          <button 
            onClick={handleAddCustomer}
            className="bg-teal-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-teal-600 transition-all duration-300 flex items-center"
          >
            <span className="mr-2">Add customer</span>
            <UserPlus size={18} />
          </button>
        </div>
        
        <div className="space-y-4">
          {customers.map(customer => (
            <CustomerCard 
              key={customer.id}
              name={customer.name}
              location={customer.location}
              joinDate={customer.joinDate}
              mealsLeft={customer.mealsLeft}
              status={customer.status}
              onEdit={() => handleEditCustomer(customer.id)}
              onTerminate={() => handleTerminateCustomer(customer.id)}
              onRenew={() => handleRenewCustomer(customer.id)}
            />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Customers;