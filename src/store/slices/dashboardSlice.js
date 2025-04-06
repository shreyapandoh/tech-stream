import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  widgets: [
    { id: 'chart1', type: 'lineChart', title: 'CPU Usage', order: 1 },
    { id: 'chart2', type: 'barChart', title: 'Memory Allocation', order: 2 },
    { id: 'chart3', type: 'areaChart', title: 'Network Traffic', order: 3 },
    { id: 'chart4', type: 'pieChart', title: 'Storage Usage', order: 4 },
  ],
  chartData: {
    chart1: [],
    chart2: [],
    chart3: [],
    chart4: [],
  },
  favorites: [
    { id: 'fav1', type: 'shortcut', title: 'News', icon: 'newspaper', link: '/news', order: 1 },
    { id: 'fav2', type: 'shortcut', title: 'CPU Chart', icon: 'chart-line', link: '#chart1', order: 2 },
    { id: 'fav3', type: 'shortcut', title: 'Settings', icon: 'gear', link: '/settings', order: 3 },
  ],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateChartData: (state, action) => {
      const { chartId, data } = action.payload;
      // Keep only the last 20 data points for performance
      state.chartData[chartId] = [...state.chartData[chartId].slice(-19), data];
    },
    reorderFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
    },
  },
});

export const { updateChartData, reorderFavorites, addToFavorites, removeFromFavorites } = dashboardSlice.actions;
export default dashboardSlice.reducer;