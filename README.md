# PentaFlick Frontend

Frontend application for PentaFlick - A mood-based movie recommendation system built with React, Redux, and TypeScript.

## Features

- 🎭 **5 Mood States**: Alegría, Tristeza, Miedo, Enojo, Asco
- 🎬 **Smart Recommendations**: Potenciar or contrarrestar your current mood
- 📝 **Watched Movies Management**: Track movies you've seen (max 50)
- 🚫 **Exclusion System**: Prevent watched movies from appearing in recommendations
- 💾 **LocalStorage Persistence**: Your watched list is saved locally
- 🎨 **Beautiful UI**: Modern design with Tailwind CSS and smooth animations
- 📱 **Responsive**: Works on all devices

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── MoodButton.tsx
│   │   ├── MovieCard.tsx
│   │   └── LoadingSpinner.tsx
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   └── WatchedMovies.tsx
│   ├── store/           # Redux store
│   │   ├── index.ts
│   │   ├── hooks.ts
│   │   ├── watchedMoviesSlice.ts
│   │   └── recommendationsSlice.tsx
│   ├── services/        # API services
│   │   └── api.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Environment Variables

Create a `.env` file in the frontend directory (optional):

```env
VITE_API_URL=http://localhost:3001/api
```

If not set, it will default to `/api` (using Vite proxy).

## Features Details

### Mood Selection
- Choose from 5 emotional states
- Each mood has a unique icon and color scheme
- Visual feedback on hover and selection

### Action Selection
- **Potenciar**: Get movies that intensify your current mood
- **Contrarrestar**: Get movies that balance and improve your mood

### Movie Recommendations
- Displays 5 movie recommendations
- Shows movie poster (if available from TMDB)
- Displays rating, release year, and genres
- Indicates source (TMDB or AI)

### Watched Movies Management
- Add movies you've watched
- Maximum of 50 movies (configurable)
- Toggle to exclude from recommendations
- Delete individual movies or clear all
- Persisted in localStorage

## API Integration

The frontend communicates with the backend API:

- `POST /api/recommendations` - Get movie recommendations
- `GET /api/health` - Check API health

## Deployment

This is a static site that can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Build the project and deploy the `dist` folder.

## License

MIT
