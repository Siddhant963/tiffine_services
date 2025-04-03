import { cn } from '@/lib/utils';

const CustomerCard = ({ 
  name, 
  location, 
  joinDate, 
  mealsLeft, 
  status, 
  className,
  onEdit,
  onTerminate,
  onRenew
}) => {
  return (
    <div className={cn("card relative mb-4 animate-fade-in", className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-xs opacity-80">Location: {location}</p>
          <p className="text-xs opacity-80">Joined: {joinDate}</p>
          <p className="text-xs opacity-80">Meals Left: {mealsLeft}</p>
        </div>
        <div className="flex flex-col gap-2">
          <button 
            onClick={onEdit}
            className="bg-white text-neutral-dark px-4 py-1 rounded-full text-sm shadow-sm hover:bg-gray-100 transition-colors"
          >
            Edit
          </button>
          
          {status === 'Active' ? (
            <button 
              onClick={onTerminate}
              className="bg-teal-600 text-white px-4 py-1 rounded-full text-sm shadow-sm hover:bg-teal-500 transition-colors"
            >
              Terminate
            </button>
          ) : (
            <button 
              onClick={onRenew}
              className="bg-teal-600 text-white px-4 py-1 rounded-full text-sm shadow-sm hover:bg-teal-500 transition-colors"
            >
              Renewal
            </button>
          )}
        </div>
      </div>
      <div className="absolute bottom-3 right-4">
        <span className="text-sm">{status}</span>
      </div>
    </div>
  );
};

export default CustomerCard;