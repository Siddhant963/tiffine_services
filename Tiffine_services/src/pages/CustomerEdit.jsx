import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Input } from '../components/ui/input';
import { ArrowLeft, Star } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CustomerEdit = () => {
  const [customer, setCustomer] = useState({
    id: 0,
    name: '',
    location: '',
    contactNumber: '',
    subscriptionType: '',
    remainingValidity: '',
    expirationDate: '',
    isActive: 'Active',
    mealsLeft: 1,
    rating: 3
  });
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would fetch customer data from an API
    // For now we'll simulate with dummy data
    setCustomer({
      id: parseInt(id || '0'),
      name: 'Amit Singh',
      location: 'Jabalpur',
      contactNumber: '9876543210',
      subscriptionType: 'Monthly',
      remainingValidity: '15 days',
      expirationDate: '2023-12-31',
      isActive: 'Active',
      mealsLeft: 15,
      rating: 3
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Customer details updated');
    navigate('/customers');
  };

  const incrementMeals = () => {
    setCustomer(prev => ({
      ...prev,
      mealsLeft: prev.mealsLeft + 1
    }));
  };

  const decrementMeals = () => {
    if (customer.mealsLeft > 0) {
      setCustomer(prev => ({
        ...prev,
        mealsLeft: prev.mealsLeft - 1
      }));
    }
  };

  const handleViewOrders = () => {
    toast.info('View orders functionality will be implemented');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 animate-fade-in">
        <div className="mb-6">
          <Link to="/customers" className="flex items-center text-neutral-dark">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Customers</span>
          </Link>
        </div>
        
        <div className="card">
          <div className="bg-neutral-dark text-white p-4 mb-6">
            <h1 className="text-xl font-medium text-center">Customer Management</h1>
          </div>
          
          <div className="p-4">
            <div className="aspect-square bg-gray-300 rounded-md mb-6"></div>
            
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-medium">Customer details</h2>
              <p className="text-sm opacity-70">Meal tracking and management</p>
              <p className="text-sm opacity-70">Track customer activity and subscription</p>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={star <= customer.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex space-x-4 mb-6">
              <button 
                className="bg-white border border-gray-200 text-neutral-dark px-6 py-3 rounded-full shadow-sm"
                onClick={() => navigate(`/customers/edit/${id}`)}
              >
                Edit details
              </button>
              
              <button 
                className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-sm"
                onClick={handleViewOrders}
              >
                View orders
              </button>
            </div>
            
            <div className="border-t border-b py-4 my-6">
              <h3 className="text-xl font-medium mb-4">Meals left</h3>
              <div className="flex items-center justify-center space-x-6">
                <button 
                  type="button" 
                  onClick={decrementMeals}
                  className="text-4xl font-bold"
                >
                  -
                </button>
                <span className="text-3xl">{customer.mealsLeft}</span>
                <button 
                  type="button" 
                  onClick={incrementMeals}
                  className="text-4xl font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerEdit;