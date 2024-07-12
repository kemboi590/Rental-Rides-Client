import React, { useState, useEffect } from 'react';
import { ChevronsRight, ChevronsLeft } from 'lucide-react';
import { drawerData } from '../../../components/drawer/drawerData';
import { Link } from 'react-router-dom';

const Drawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Start with drawer closed

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Effect to close drawer on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative text-center">
      {/* Drawer toggle button */}
      <button
        className={`fixed left-0 top-0 z-50 p-3 ${isOpen ? '' : ''}`}
        type="button"
        onClick={toggleDrawer}
      >
        {isOpen ? (
          <ChevronsLeft className="dark:text-white text-webcolor block lg:hidden" size={45} />
        ) : (
          <ChevronsRight className="text-webcolor block lg:hidden" size={45} />
        )}
      </button>

      {/* Drawer content */}
      <div
        className={`fixed left-0 z-40 h-screen p-4 overflow-y-auto transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white w-64 dark:bg-gray-800 border-2 lg:translate-x-0`}
        tabIndex={-1}
        aria-labelledby="drawer-body-scrolling-label"
      >
        <div className="flex justify-between items-center">
          <h5
            id="drawer-body-scrolling-label"
            className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400 mt-0"
          >
            Dashboard
          </h5>
          {/* Close button */}
          <button className="text-gray-900 dark:text-white" type="button" onClick={toggleDrawer}>
            <ChevronsLeft className="block lg:hidden" />
          </button>
        </div>
        {/* Drawer items */}
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {drawerData.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className="text-gray-900 dark:text-white hover:bg-blue-200 block px-3 py-2 rounded-md text-justify"
                >
                  {item.icon && <item.icon className="inline-block mr-2" size={30} />}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
