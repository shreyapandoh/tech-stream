import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from '../pages/Dashboard';
import { BrowserRouter } from 'react-router';

// Create a mock store
const mockStore = configureStore([]);

describe('Dashboard Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      dashboard: {
        widgets: [
          { id: 'chart1', type: 'lineChart', title: 'CPU Usage', order: 1 },
          { id: 'chart2', type: 'barChart', title: 'Memory Allocation', order: 2 }
        ],
        chartData: {
          chart1: [],
          chart2: []
        },
        favorites: [
          { id: 'fav1', type: 'shortcut', title: 'News', icon: 'newspaper', link: '/news', order: 1 }
        ]
      },
      news: {
        articles: [
          {
            id: 'news1',
            title: 'Test News Article',
            summary: 'This is a test article',
            source: 'Test Source',
            publishedAt: new Date().toISOString()
          }
        ]
      }
    });
  });

  test('renders dashboard title', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('renders favorites section', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });

  test('renders charts section', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Real-time Monitoring')).toBeInTheDocument();
  });
});