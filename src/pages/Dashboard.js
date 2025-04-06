// src/pages/Dashboard.js
import React from 'react';
import { useSelector } from 'react-redux';
import RealTimeChart from '../components/charts/RealTimeChart';
import FavoritesSection from '../components/FavoritesSection';

const Dashboard = () => {
  const widgets = useSelector(state => state.dashboard.widgets);
  const news = useSelector(state => state.news.articles);
  
  // Show only the first 3 news articles on the dashboard
  const featuredNews = news.slice(0, 3);

  return (
    <div className="dashboard-page">
      <div className="page-header mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your tech monitoring dashboard</p>
      </div>
      
      {/* Favorites Section */}
      <FavoritesSection />
      
      {/* Real-time Charts */}
      <div className="charts-section mb-8">
        <h2 className="text-xl font-semibold mb-4">Real-time Monitoring</h2>
        <div className="charts-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {widgets.map(widget => (
            <div key={widget.id} id={widget.id} className="chart-widget">
              <RealTimeChart 
                chartId={widget.id}
                type={widget.type}
                title={widget.title}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured News Section */}
      <div className="featured-news-section mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Latest Tech News</h2>
          <a href="/news" className="text-pink-600 hover:underline">View All</a>
        </div>
        
        <div className="featured-news-grid grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredNews.length > 0 ? (
            featuredNews.map(article => (
              <div key={article.id} className="news-card bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-medium mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{article.summary}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{article.source}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 bg-white rounded-lg">
              <p>Loading latest news...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;