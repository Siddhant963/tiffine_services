import { useEffect } from 'react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/ui/StatCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  useEffect(() => {
    // Simulating data fetch
    toast.success('Dashboard loaded successfully', {
      id: 'dashboard-loaded',
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 animate-fade-in">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <StatCard 
            title="Total Active customers" 
            value="100" 
          />
          
          <StatCard 
            title="Total deliveries of the day" 
            value="49" 
          />
          
          <StatCard 
            title="Today's Revenue" 
            value="600" 
          />
          
          <StatCard 
            title="Pending Orders" 
            value="3" 
          />
        </div>

        <div className="space-y-4">
          <Link 
            to="/customers"
            className="card flex items-center justify-center py-5 hover:opacity-90 transition-opacity"
          >
            <span className="text-xl mr-2">Customer Management</span>
            <ChevronRight size={20} />
          </Link>
          
          <Link 
            to="/orders"
            className="card flex items-center justify-center py-5 hover:opacity-90 transition-opacity"
          >
            <span className="text-xl mr-2">Order Management</span>
            <ChevronRight size={20} />
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
