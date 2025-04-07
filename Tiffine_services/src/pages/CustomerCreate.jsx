import { useState } from 'react';
import { toast } from 'sonner';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerCreate = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');
  const [remainingValidity, setRemainingValidity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [isActive, setIsActive] = useState('Active');
  const [mealsAssigned, setMealsAssigned] = useState(1);
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !location || !contactNumber) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Here we would normally send data to a backend
    toast.success('Customer created successfully');
    navigate('/customers');
  };

  const incrementMeals = () => {
    setMealsAssigned(prev => prev + 1);
  };

  const decrementMeals = () => {
    if (mealsAssigned > 1) {
      setMealsAssigned(prev => prev - 1);
    }
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
            <h1 className="text-xl font-medium text-center">Customer Creation</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <h2 className="text-2xl font-medium mb-4">Customer details</h2>
            
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-200 p-4 h-14"
                />
              </div>
              
              <div>
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-gray-200 p-4 h-14"
                />
              </div>
              
              <div>
                <Input
                  placeholder="Contact Number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="bg-gray-200 p-4 h-14"
                  type="tel"
                />
              </div>
              
              <div>
                <Input
                  placeholder="Subscription Type"
                  value={subscriptionType}
                  onChange={(e) => setSubscriptionType(e.target.value)}
                  className="bg-gray-200 p-4 h-14"
                />
              </div>
              
              <div>
                <Input
                  placeholder="Remaining Validity"
                  value={remainingValidity}
                  onChange={(e) => setRemainingValidity(e.target.value)}
                  className="bg-gray-200 p-4 h-14"
                />
              </div>
              
              <div>
                <Input
                  placeholder="Expiration Date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  className="bg-gray-200 p-4 h-14"
                  type="date"
                />
              </div>
              
              <div>
                <select
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)}
                  className="bg-gray-200 w-full p-4 h-14 rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-b py-4 my-6">
              <h3 className="text-xl font-medium mb-4">Meals Assign</h3>
              <div className="flex items-center justify-center space-x-6">
                <button 
                  type="button" 
                  onClick={decrementMeals}
                  className="text-4xl font-bold"
                >
                  -
                </button>
                <span className="text-3xl">{mealsAssigned}</span>
                <button 
                  type="button" 
                  onClick={incrementMeals}
                  className="text-4xl font-bold"
                >
                  +
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-teal-600 text-white p-4 rounded-full text-xl font-medium"
            >
              {isActive}
            </button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerCreate;