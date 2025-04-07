import React, { useState } from 'react';
import { Menu, User, LogOut, UserCircle, Edit } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    // In a real app, this would handle authentication
    window.location.href = '/';
  };

  const handleEditProfile = () => {
    toast.info('Profile editing functionality will be implemented soon');
    // This would navigate to a profile edit page in a complete implementation
  };

  return (
    React.createElement('header', { className: 'bg-neutral-dark text-white p-4 sticky top-0 z-50 shadow-md' },
      React.createElement('div', { className: 'flex justify-between items-center' },
        React.createElement('button', {
          className: 'p-2 rounded-full hover:bg-neutral-700 transition-colors',
          onClick: toggleMenu,
          'aria-label': 'Menu'
        },
          React.createElement(Menu, { size: 24 })
        ),

        React.createElement(DropdownMenu, null,
          React.createElement(DropdownMenuTrigger, { 
            className: 'w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors'
          },
            React.createElement(User, { className: 'text-neutral-dark', size: 20 })
          ),
          React.createElement(DropdownMenuContent, { align: 'end' },
            React.createElement(DropdownMenuLabel, null, 'My Account'),
            React.createElement(DropdownMenuSeparator, null),
            React.createElement(DropdownMenuItem, { onClick: handleEditProfile },
              React.createElement(Edit, { className: 'mr-2 h-4 w-4' }),
              React.createElement('span', null, 'Change Username/Password')
            ),
            React.createElement(DropdownMenuItem, { onClick: handleLogout },
              React.createElement(LogOut, { className: 'mr-2 h-4 w-4' }),
              React.createElement('span', null, 'Logout')
            )
          )
        )
      ),

      // Mobile menu - simplified to only show Customer and Order Management
      menuOpen && React.createElement('div', { className: 'absolute top-16 left-0 w-64 bg-white text-neutral-dark rounded-r-lg shadow-xl scale-in z-50' },
        React.createElement('nav', { className: 'py-4' },
          React.createElement('ul', { className: 'space-y-1' },
            React.createElement('li', null,
              React.createElement(Link, {
                to: "/customers",
                className: `block px-6 py-3 hover:bg-gray-100 transition-colors ${location.pathname === '/customers' ? 'font-medium text-teal-700' : ''}`,
                onClick: () => setMenuOpen(false)
              },
                'Customer Management'
              )
            ),
            React.createElement('li', null,
              React.createElement(Link, {
                to: "/orders",
                className: `block px-6 py-3 hover:bg-gray-100 transition-colors ${location.pathname === '/orders' ? 'font-medium text-teal-700' : ''}`,
                onClick: () => setMenuOpen(false)
              },
                'Order Management'
              )
            ),
            React.createElement('li', { className: 'border-t mt-2 pt-2' },
              React.createElement('button', {
                className: 'flex items-center w-full px-6 py-3 text-red-500 hover:bg-gray-100 transition-colors',
                onClick: handleLogout
              },
                React.createElement(LogOut, { size: 18, className: 'mr-2' }),
                React.createElement('span', null, 'Logout')
              )
            )
          )
        )
      )
    )
  );
};

export default Header;