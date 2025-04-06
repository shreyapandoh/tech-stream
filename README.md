# TechStream

TechStream is a modern React application for monitoring tech news and system metrics in real-time. It provides users with a personalized dashboard experience, real-time charts, and curated tech news from various categories.

## Features

- **User Authentication**: Simple login system with local storage persistence
- **Real-time Monitoring**: Dynamic charts showing system metrics (CPU, Memory, Network, Storage)
- **Tech News Feed**: Curated news articles from various tech categories
- **Customizable Dashboard**: Drag-and-drop favorites section for quick access
- **Responsive Design**: Mobile-friendly layout with collapsible sidebar and navigation

## Technologies Used

- **React**: Frontend UI library
- **Redux Toolkit**: State management
- **React Router**: Navigation and routing
- **Recharts**: Interactive chart components
- **React Beautiful DND**: Drag and drop functionality
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon components

## Project Structure

```
src/
|── __tests__/
│   ├── Dashboard.test.js
│   ├── FavoritiesSection.test.js
│   ├── NewsPage.test.js
├── components/
│   ├── charts/
│   │   └── RealTimeChart.js
│   ├── FavoritesSection.js
│   ├── Header.js
│   ├── Navbar.js
│   └── Sidebar.js
├── pages/
│   ├── Dashboard.js
│   ├── LoginPage.js
│   ├── NewsPage.js
│   └── SettingsPage.js
├── store/
│   ├── index.js
│   └── slices/
│       ├── authSlice.js
│       ├── dashboardSlice.js
│       └── newsSlice.js
├── App.css
├── App.js
└── index.js
```

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/techstream.git
cd techstream
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Build for production
```bash
npm run build
```

## Usage

### Authentication

The application includes a simple authentication system. Users need to register/login with:
- Name
- Email
- Password (minimum 6 characters)

User data is persisted in localStorage for session management.

### Dashboard

The main dashboard displays:
- Customizable favorites section with drag-and-drop functionality
- Real-time monitoring charts for system metrics
- Featured news articles from the tech world

### News Page

Browse and filter tech news by categories:
- All categories
- People (tech personalities)
- Frontend development
- Podcasts
- IT Security

### Settings

Configure application settings:
- Manage dashboard widgets
- Add/remove items from favorites
- Customize news preferences
- Set update frequencies

## State Management

The application uses Redux Toolkit with three main slices:

### Auth Slice
Manages user authentication state with login/logout functionality.

### Dashboard Slice
Handles dashboard widgets, chart data, and favorites management.

### News Slice
Manages news articles, categories, and filtering.

## Responsive Design

TechStream is fully responsive with:
- Desktop view: Full sidebar and dashboard layout
- Mobile view: Collapsible navigation and stacked content

## Future Enhancements

- User profile management
- Dark mode support
- News article bookmarking
- Push notifications for breaking news
- Additional chart types and customization options
- Backend integration for real data
