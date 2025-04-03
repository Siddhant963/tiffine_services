import { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WeeklyCalendar from '@/components/ui/Calendar';
import InventoryCard from '@/components/ui/InventoryCard';
import { Plus, Edit, Expand, Users, Package } from 'lucide-react';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    category: ''
  });

  const handleAddItems = () => {
    setShowAddForm(true);
  };

  const handleEditItems = () => {
    toast.info('Edit items functionality will be implemented');
  };

  const handleExpandInventory = () => {
    toast.info('Expanding inventory view');
  };

  const handleSubmitItem = (e) => {
    e.preventDefault();
    toast.success(`Added ${newItem.quantity} ${newItem.name} to inventory`);
    setShowAddForm(false);
    setNewItem({ name: '', quantity: '', category: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 animate-fade-in">
        <WeeklyCalendar className="mb-8" />
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center justify-center py-4 rounded-lg transition-colors ${
              activeTab === 'inventory' 
                ? 'bg-teal-600 text-white shadow-md' 
                : 'bg-white text-neutral-dark border border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Package className="mr-2" size={18} />
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('staff')}
            className={`flex items-center justify-center py-4 rounded-lg transition-colors ${
              activeTab === 'staff' 
                ? 'bg-teal-600 text-white shadow-md' 
                : 'bg-white text-neutral-dark border border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Users className="mr-2" size={18} />
            Staff
          </button>
        </div>
        
        {activeTab === 'inventory' && (
          <>
            <InventoryCard 
              totalItems={150}
              available={120}
              used={30}
              onExpand={handleExpandInventory}
              className="mb-8"
            />
            
            <div className="card p-6 mb-4 bg-white rounded-xl shadow-sm">
              <h2 className="text-2xl font-medium mb-6">Manage Inventory</h2>
              
              {showAddForm ? (
                <form onSubmit={handleSubmitItem} className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newItem.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        value={newItem.quantity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        name="category"
                        value={newItem.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        required
                      >
                        <option value="">Select</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="proteins">Proteins</option>
                        <option value="grains">Grains</option>
                        <option value="spices">Spices</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Add Item
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between mt-6">
                  <button 
                    onClick={handleAddItems}
                    className="flex items-center bg-white text-neutral-dark px-6 py-3 rounded-full font-medium shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="mr-2" size={18} />
                    ADD ITEMS
                  </button>
                  
                  <button 
                    onClick={handleEditItems}
                    className="flex items-center bg-teal-600 text-white px-6 py-3 rounded-full font-medium shadow-sm hover:bg-teal-700 transition-colors"
                  >
                    <Edit className="mr-2" size={18} />
                    EDIT ITEMS
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        
        {activeTab === 'staff' && (
          <div className="card p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-medium mb-6">Staff Management</h2>
            <p className="text-gray-500">Staff management functionality coming soon</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Inventory;