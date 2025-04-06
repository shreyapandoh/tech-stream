import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (category) => {
    // In a real app, this would be an API call to a news service
    // For this example, we'll simulate a delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock news data
    return [
      {
        id: 'news1',
        title: 'Elon Musk Announces New AI Project',
        summary: 'Tesla and SpaceX CEO unveils plans for a new artificial intelligence venture.',
        source: 'Tech Chronicle',
        publishedAt: new Date().toISOString(),
        category: 'people',
        imageUrl: 'https://placeholder.com/news1.jpg',
      },
      {
        id: 'news2',
        title: 'React 19 Release Date Announced',
        summary: 'The React team has announced the release date for React 19 with new features.',
        source: 'Frontend Weekly',
        publishedAt: new Date().toISOString(),
        category: 'frontend',
        imageUrl: 'https://placeholder.com/news2.jpg',
      },
      {
        id: 'news3',
        title: 'New JavaScript Framework Gains Popularity',
        summary: 'A new JavaScript framework is gaining traction among developers.',
        source: 'Dev Times',
        publishedAt: new Date().toISOString(),
        category: 'frontend',
        imageUrl: 'https://placeholder.com/news3.jpg',
      },
      {
        id: 'news4',
        title: 'Tech Podcast Reaches 1 Million Subscribers',
        summary: 'Popular tech podcast celebrates milestone of 1 million subscribers.',
        source: 'Podcast Insider',
        publishedAt: new Date().toISOString(),
        category: 'podcast',
        imageUrl: 'https://placeholder.com/news4.jpg',
      },
      {
        id: 'news5',
        title: 'Major Security Vulnerability Found in Popular Library',
        summary: 'Developers urged to update dependencies after major security flaw discovered.',
        source: 'Security Report',
        publishedAt: new Date().toISOString(),
        category: 'it',
        imageUrl: 'https://placeholder.com/news5.jpg',
      },
    ];
  }
);

const initialState = {
  articles: [],
  loading: false,
  error: null,
  selectedCategory: 'all',
  categories: ['all', 'people', 'frontend', 'podcast', 'it'],
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategory } = newsSlice.actions;
export default newsSlice.reducer;