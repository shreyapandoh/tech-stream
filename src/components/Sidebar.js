import React from 'react';
import { NavLink } from 'react-router';

const Sidebar = () => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/', icon: '📊' },
    { id: 'news', label: 'News', path: '/news', icon: '📰' },
    { id: 'settings', label: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar bg-blue-50 w-64 p-4 hidden md:block">
      <nav className="mt-6">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-lg ${
                    isActive 
                      ? 'bg-pink-100 text-pink-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;