// src/pages/NewsPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, setCategory } from '../store/slices/newsSlice';

const NewsPage = () => {
  const dispatch = useDispatch();
  const { articles, loading, error, selectedCategory, categories } = useSelector(state => state.news);

  useEffect(() => {
    dispatch(fetchNews());
    // In a real app, you might set up a polling interval to fetch the latest news
    const interval = setInterval(() => {
      dispatch(fetchNews());
    }, 300000); // Refresh every 5 minutes
    
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="news-page">
      <div className="page-header mb-6">
        <h1 className="text-2xl font-bold mb-2">Latest Tech News</h1>
        <p className="text-gray-600">Stay updated with the latest news in tech, frontend development, and more</p>
      </div>

      <div className="category-filter mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="news-content">
        {loading ? (
          <div className="loading-indicator p-8 text-center">
            <p>Loading latest news...</p>
          </div>
        ) : error ? (
          <div className="error-message p-4 bg-red-100 text-red-700 rounded">
            <p>Error loading news: {error}</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="no-news p-8 text-center">
            <p>No news articles found for this category.</p>
          </div>
        ) : (
          <div className="news-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <div key={article.id} className="news-card bg-white rounded-lg shadow-md overflow-hidden">
                <div className="news-image h-40 bg-gray-200">
                  {/* In a real app, you would use real images */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    [News Image]
                  </div>
                </div>
                <div className="news-content p-4">
                  <h3 className="news-title text-lg font-semibold mb-2">{article.title}</h3>
                  <p className="news-summary text-gray-600 mb-4">{article.summary}</p>
                  <div className="news-meta flex justify-between items-center text-sm text-gray-500">
                    <span className="news-source">{article.source}</span>
                    <span className="news-date">{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="news-category mt-3">
                    <span className="inline-block bg-pink-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {article.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;