import { Link } from 'react-router-dom';
import { Rocket, Package, Users, CreditCard } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to MealMasters</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your complete solution for meal subscription management and delivery tracking
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link 
            to="/customers" 
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center"
          >
            <Users className="text-blue-600 mr-4" size={32} />
            <div>
              <h3 className="font-semibold text-lg">Customer Management</h3>
              <p className="text-gray-500">View and manage all customers</p>
            </div>
          </Link>

          <Link 
            to="/orders" 
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center"
          >
            <Package className="text-green-600 mr-4" size={32} />
            <div>
              <h3 className="font-semibold text-lg">Order Tracking</h3>
              <p className="text-gray-500">Monitor today's deliveries</p>
            </div>
          </Link>

          <Link 
            to="/subscriptions" 
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center"
          >
            <CreditCard className="text-purple-600 mr-4" size={32} />
            <div>
              <h3 className="font-semibold text-lg">Subscriptions</h3>
              <p className="text-gray-500">Manage meal plans</p>
            </div>
          </Link>

          <Link 
            to="/delivery" 
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center"
          >
            <Rocket className="text-orange-600 mr-4" size={32} />
            <div>
              <h3 className="font-semibold text-lg">Delivery Hub</h3>
              <p className="text-gray-500">Dispatch and track orders</p>
            </div>
          </Link>
        </div>

        {/* Stats Preview */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Today's Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-500">Active Customers</p>
              <p className="text-3xl font-bold">142</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-500">Today's Orders</p>
              <p className="text-3xl font-bold">67</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-500">Meals to Deliver</p>
              <p className="text-3xl font-bold">89</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-gray-500">Revenue</p>
              <p className="text-3xl font-bold">$1,240</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;