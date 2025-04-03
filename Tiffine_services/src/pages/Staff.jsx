import React, { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WeeklyCalendar from '@/components/ui/Calendar';
import EmployeeCard from '@/components/ui/EmployeeCard';
import { UserPlus } from 'lucide-react';

const Staff = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Ishant Patel', role: 'Backend', salary: 200 },
    { id: 2, name: 'Rahul Sharma', role: 'Chef', salary: 250 },
    { id: 3, name: 'Priya Patel', role: 'Delivery', salary: 150 },
  ]);

  const [attendanceEmployees, setAttendanceEmployees] = useState([
    { id: 1, name: 'Ishant Patel', role: 'Backend', salary: 200 },
  ]);

  const handleAddEmployee = () => {
    toast.success('Add employee feature will be implemented in the future');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 animate-fade-in">
        <WeeklyCalendar className="mb-8" />
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="btn-primary py-4">See Inventory</button>
          <button className="btn-primary py-4">Staff</button>
        </div>

        <div className="card mb-8 relative pb-12">
          <h2 className="text-2xl font-medium mb-4">Salary distribution</h2>
          
          <div className="space-y-2">
            {employees.map((employee) => (
              <EmployeeCard 
                key={employee.id}
                name={employee.name}
                role={employee.role}
                salary={employee.salary}
              />
            ))}
          </div>
          
          <div className="absolute right-4 bottom-4">
            <button 
              onClick={handleAddEmployee}
              className="bg-teal-600 text-white px-4 py-2 rounded-full shadow-sm hover:bg-teal-500 transition-colors flex items-center"
            >
              <span className="mr-2">Add Employee</span>
              <UserPlus size={18} />
            </button>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-2xl font-medium mb-4">Attendance tracker</h2>
          
          <div className="space-y-2">
            {attendanceEmployees.map((employee) => (
              <EmployeeCard 
                key={employee.id}
                name={employee.name}
                role={employee.role}
                salary={employee.salary}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Staff;

