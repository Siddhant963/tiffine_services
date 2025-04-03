import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    React.createElement('footer', { className: 'bg-neutral-dark text-white py-6 mt-auto' },
      React.createElement('div', { className: 'container mx-auto px-4' },
        React.createElement('div', { className: 'flex flex-col items-center justify-center' },
          React.createElement('p', { className: 'text-sm opacity-80' },
            `© ${currentYear} Tiffin Manager Admin. All rights reserved.`
          )
        )
      )
    )
  );
};

export default Footer;