import { cn } from '../../lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

const OrderCard = ({ orderId, customer, meal, status: initialStatus, className, onStatusChange }) => {
  const [status, setStatus] = useState(initialStatus);

  const handleUpdateStatus = (newStatus) => {
    setStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
    toast.success(`Order status updated to: ${newStatus}`);
  };

  const handleAssignDelivery = () => {
    toast.success('Delivery assigned');
  };

  // Get status color based on status
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered':
        return 'text-green-600';
      case 'ND IOT':
      case 'ND IL':
        return 'text-red-600';
      case 'Taken Extra Tiffin':
        return 'text-orange-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className={cn("card mb-4 animate-fade-in", className)}>
      <div className="mb-2">
        <h3 className="text-xl font-medium">Order #{orderId}</h3>
        <p className="text-sm opacity-80">customer: {customer}</p>
        <p className="text-sm opacity-80">meal: {meal}</p>
        <p className={`text-sm font-medium ${getStatusColor(status)}`}>Status: {status}</p>
      </div>
      
      <div className="flex justify-between mt-4">
        <div className="w-1/2 mr-2">
          <Select
            value={status}
            onValueChange={(value) => handleUpdateStatus(value)}
          >
            <SelectTrigger className="bg-white text-neutral-dark px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-gray-100 transition-colors">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="ND IOT">ND IOT</SelectItem>
              <SelectItem value="ND IL">ND IL</SelectItem>
              <SelectItem value="Taken Extra Tiffin">Taken Extra Tiffin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <button 
          onClick={handleAssignDelivery}
          className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-teal-500 transition-colors"
        >
          Assign delivery
        </button>
      </div>
    </div>
  );
};

export default OrderCard;