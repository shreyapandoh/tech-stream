import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import newsReducer from './slices/newsSlice';
import authReducer from './slices/authSlice'

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    news: newsReducer,
    auth: authReducer
  },
});

export default store;