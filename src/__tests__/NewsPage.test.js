import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NewsPage from '../pages/NewsPage';

const mockStore = configureStore([]);

describe('NewsPage Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      news: {
        articles: [
          {
            id: 'news1',
            title: 'Test Article 1',
            summary: 'This is a test article',
            source: 'Test Source',
            publishedAt: new Date().toISOString(),
            category: 'frontend'
          },
          {
            id: 'news2',
            title: 'Test Article 2',
            summary: 'This is another test article',
            source: 'Test Source 2',
            publishedAt: new Date().toISOString(),
            category: 'podcast'
          }
        ],
        loading: false,
        error: null,
        selectedCategory: 'all',
        categories: ['all', 'frontend', 'podcast', 'it']
      }
    });
    
    store.dispatch = jest.fn();
  });

  test('renders news page title', () => {
    render(
      <Provider store={store}>
        <NewsPage />
      </Provider>
    );
    
    expect(screen.getByText('Latest Tech News')).toBeInTheDocument();
  });

  test('renders category filters', () => {
    render(
      <Provider store={store}>
        <NewsPage />
      </Provider>
    );
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Podcast')).toBeInTheDocument();
  });

  test('filters articles when category is selected', () => {
    render(
      <Provider store={store}>
        <NewsPage />
      </Provider>
    );
    
    // Click on the Frontend category button
    fireEvent.click(screen.getByText('Frontend'));
    
    expect(store.dispatch).toHaveBeenCalled();
  });
});