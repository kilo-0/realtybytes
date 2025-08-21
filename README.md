# RealtyBytes - AI-Powered Real Estate Search

An intelligent real estate search application that uses AI to browse the web and find properties based on natural language queries.

## Features

- **AI-Powered Search**: Describe your ideal property in natural language and let the AI find relevant listings
- **Multi-Step Reasoning**: Watch the AI work through location extraction, site identification, and property searching
- **Interactive Preferences**: Select amenities and features you care about (schools, restaurants, gyms, etc.)
- **Property Browsing**: View mock listings with image carousels and detailed information  
- **Favorites System**: Save properties you're interested in with local storage persistence
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Pure CSS with CSS Variables
- **AI Integration**: OpenRouter API with web-enabled models
- **State Management**: React hooks with local storage persistence

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mkarman/realtybytes.git
cd realtybytes
```

2. Install dependencies:
```bash
npm install
```

3. Configure your OpenRouter API key:
   - Edit `src/config/secrets.ts` and replace with your API key
   - For production, use environment variables instead

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Carousel/        # Image carousel for properties
│   ├── Header/          # Main navigation header
│   ├── SearchBar/       # Search input component
│   └── Icons/           # SVG icon components
├── features/            # Feature-based organization
│   ├── home/           # Homepage with AI search
│   └── listings/       # Property listings and grid
├── services/           # API and external services
├── config/             # Configuration files
├── styles/             # Global CSS variables
└── utils/              # Utility functions
```

## AI Search Process

The application implements a sophisticated multi-step AI search process:

1. **Location Extraction**: Analyzes your query to identify the target location
2. **Site Identification**: Determines the best real estate websites for that area  
3. **Property Search**: Searches each identified site for relevant listings
4. **Results Presentation**: Displays found properties with links to original listings

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### AI Model
The app uses OpenRouter's API with web-enabled models. You can change the model in `src/services/openRouterService.ts`:

```typescript
export const AI_MODEL = "qwen/qwen-turbo:online";
```

### API Key Security
⚠️ **Important**: The current implementation includes the API key in client-side code for demo purposes. For production:

- Move API calls to a backend server
- Use environment variables
- Never commit API keys to version control

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes  
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).