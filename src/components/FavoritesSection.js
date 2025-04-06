// src/components/FavoritesSection.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorderFavorites, removeFromFavorites } from '../store/slices/dashboardSlice';
import { Link } from 'react-router';

// Icons (in a real project, you would import from a library like React Icons or Lucide)
const icons = {
  'newspaper': '📰',
  'chart-line': '📈',
  'gear': '⚙️',
};

const FavoritesSection = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.dashboard.favorites);
  
  const onDragEnd = (result) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(favorites);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    // Update the order property for each item
    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    dispatch(reorderFavorites(updatedItems));
  };

  const handleRemove = (id) => {
    dispatch(removeFromFavorites(id));
  };

  return (
    <div className="favorites-section mb-8">
      <h2 className="text-xl font-semibold mb-4">Favorites</h2>
      <p className="text-sm text-gray-600 mb-4">Drag and drop to reorder your favorites</p>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="favorites">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="favorites-container grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {favorites.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`favorite-item p-4 bg-white rounded-lg shadow-sm border-2 ${
                        snapshot.isDragging ? 'border-blue-500' : 'border-transparent'
                      } flex items-center justify-between`}
                    >
                      <Link to={item.link} className="flex items-center">
                        <span className="icon mr-3 text-xl">{icons[item.icon] || '🔗'}</span>
                        <span className="title font-medium">{item.title}</span>
                      </Link>
                      <button 
                        onClick={() => handleRemove(item.id)}
                        className="remove-btn text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FavoritesSection;