import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites } from '../store/slices/dashboardSlice';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const widgets = useSelector(state => state.dashboard.widgets);
  const favorites = useSelector(state => state.dashboard.favorites);
  
  const handleAddToFavorites = (widget) => {
    const newFavorite = {
      id: `fav-${Date.now()}`,
      type: 'shortcut',
      title: widget.title,
      icon: 'chart-line',
      link: `/#${widget.id}`,
      order: favorites.length + 1
    };
    
    dispatch(addToFavorites(newFavorite));
  };
  
  return (
    <div className="settings-page">
      <div className="page-header mb-6">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Customize your dashboard experience</p>
      </div>
      
      <div className="settings-section mb-8">
        <h2 className="text-xl font-semibold mb-4">Dashboard Widgets</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="mb-4">Manage the widgets that appear on your dashboard.</p>
          
          <div className="widget-list space-y-4">
            {widgets.map(widget => {
              const isInFavorites = favorites.some(fav => fav.link === `/#${widget.id}`);
              
              return (
                <div key={widget.id} className="widget-item flex justify-between items-center p-3 border border-gray-200 rounded">
                  <div>
                    <h3 className="font-medium">{widget.title}</h3>
                    <p className="text-sm text-gray-600">Type: {widget.type}</p>
                  </div>
                  <div>
                    {isInFavorites ? (
                      <span className="text-green-600 text-sm">In Favorites</span>
                    ) : (
                      <button 
                        onClick={() => handleAddToFavorites(widget)}
                        className="px-3 py-1 bg-pink-100 text-pink-700 rounded text-sm hover:bg-blue-200"
                      >
                        Add to Favorites
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="settings-section mb-8">
        <h2 className="text-xl font-semibold mb-4">News Preferences</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="mb-4">Customize your news feed preferences.</p>
          
          <div className="form-group mb-4">
            <label className="block text-gray-700 mb-2">News Categories</label>
            <div className="flex flex-wrap gap-2">
            {['Tech News', 'Frontend', 'Podcast', 'IT Security', 'Elon Musk'].map(category => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    defaultChecked
                    className="mr-2"
                  />
                  <label htmlFor={`category-${category}`} className="text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group mb-4">
            <label className="block text-gray-700 mb-2">Update Frequency</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="5">Every 5 minutes</option>
              <option value="15">Every 15 minutes</option>
              <option value="30">Every 30 minutes</option>
              <option value="60">Every hour</option>
            </select>
          </div>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;