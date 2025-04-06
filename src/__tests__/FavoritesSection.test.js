import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FavoritesSection from '../components/FavoritesSection';
import { BrowserRouter } from 'react-router';

// Mocking react-beautiful-dnd
jest.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }) => children,
  Droppable: ({ children }) => children({
    droppableProps: {
      'data-rbd-droppable-id': 'droppable',
      'data-rbd-droppable-context-id': '1'
    },
    innerRef: jest.fn(),
    placeholder: null
  }),
  Draggable: ({ children }) => children({
    draggableProps: {
      'data-rbd-draggable-context-id': '1',
      'data-rbd-draggable-id': 'draggable'
    },
    innerRef: jest.fn(),
    dragHandleProps: {
      'data-rbd-drag-handle-draggable-id': 'draggable',
      'data-rbd-drag-handle-context-id': '1'
    }
  }, {
    isDragging: false
  })
}));

const mockStore = configureStore([]);

describe('FavoritesSection Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      dashboard: {
        favorites: [
          { id: 'fav1', type: 'shortcut', title: 'News', icon: 'newspaper', link: '/news', order: 1 },
          { id: 'fav2', type: 'shortcut', title: 'Settings', icon: 'gear', link: '/settings', order: 2 }
        ]
      }
    });
    
    store.dispatch = jest.fn();
  });

  test('renders favorites items', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FavoritesSection />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('handles remove action', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FavoritesSection />
        </BrowserRouter>
      </Provider>
    );
    
    // Find all remove buttons and click the first one
    const removeButtons = screen.getAllByText('✕');
    fireEvent.click(removeButtons[0]);
    
    expect(store.dispatch).toHaveBeenCalled();
  });
});