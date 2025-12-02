# RealtyBytes - AI-Powered Real Estate Search

An intelligent real estate search application that uses AI to browse the web and find properties based on natural language queries. Now with integrated search results and optional real property data from RentCast API.

## Features

### Core Features
- **AI-Powered Search**: Describe your ideal property in natural language and let the AI find relevant listings
- **Multi-Step Reasoning**: Watch the AI work through location extraction, site identification, and property searching
- **Interactive Preferences**: Select amenities and features you care about (schools, restaurants, gyms, etc.)
- **Integrated Search Results**: Search results flow directly to the browsing page - see the properties you searched for!
- **Real Property Data**: Optional RentCast API integration for structured property information (price, bedrooms, location)
- **Smart Fallbacks**: API data → Web URLs → Featured listings (graceful degradation)
- **Favorites System**: Save properties you're interested in with local storage persistence
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Pure CSS with CSS Variables
- **AI Integration**: OpenRouter API with web-enabled models
- **Property Data**: RentCast API (optional, 50 free calls/month)
- **State Management**: React Context API + hooks with local storage persistence

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kilo-0/realtybytes.git
cd realtybytes
```

2. Install dependencies:
```bash
npm install
```

3. Configure your API keys in `src/config/secrets.ts`:

   **Required - OpenRouter API:**
   - Sign up at [OpenRouter](https://openrouter.ai/)
   - Get your API key
   - Replace `OPENROUTER_API_KEY` in `src/config/secrets.ts`

   **Optional - RentCast API (for real property data):**
   - Sign up at [RentCast API](https://www.rentcast.io/api)
   - Free tier: 50 API calls per month
   - Get your API key from the dashboard
   - Replace `RENTCAST_API_KEY` in `src/config/secrets.ts`
   - If not configured, app falls back to web URL results

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
├── context/             # Global state management
│   └── SearchContext/   # Search results and API data state
├── features/            # Feature-based organization
│   ├── home/           # Homepage with AI search
│   └── listings/       # Property listings and grid
│       ├── PropertyCard/      # Standard property display
│       └── SearchResultCard/  # URL-based search results
├── services/           # API and external services
│   ├── openRouterService/  # AI search integration
│   └── rentcastService/    # Real property data API
├── config/             # Configuration files
├── styles/             # Global CSS variables
└── utils/              # Utility functions
```

## How It Works

### Search Flow

The application implements a sophisticated multi-step search process with intelligent fallbacks:

1. **Location Extraction**: AI analyzes your natural language query to identify the target location (city, state, country)
2. **API Data Fetch** (if RentCast configured): Fetches real property listings with structured data (price, bedrooms, address, etc.)
3. **Site Identification**: AI determines the best real estate websites for that area (Zillow, Realtor.com, etc.)
4. **Property Search**: AI searches each identified site for relevant property URLs
5. **Results Display**: Shows properties in priority order:
   - ✅ **First**: Real property data from RentCast API (if available)
   - ✅ **Second**: Web URLs found by AI (click to view on original sites)
   - ✅ **Third**: Featured mock listings (if no search performed)

### Data Priority

```
┌─────────────────────────────────────────┐
│  User Search: "Austin, Texas"           │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  1. AI Extracts Location                │
│     → City: Austin, State: TX           │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  2. RentCast API (if configured)        │
│     → Fetches 20 real properties        │
│     → Structured data with prices       │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  3. AI Web Search                       │
│     → Identifies zillow.com, etc.       │
│     → Finds property URLs               │
└─────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│  4. ListingsPage Display                │
│     Priority: API > URLs > Mock         │
│     → "15 Properties in Austin, Texas"  │
└─────────────────────────────────────────┘
```

### Features in Detail

**Context-Based State Management**
- Search results persist when navigating between pages
- Global state via React Context API
- Clear search button to reset and view featured listings

**Smart Fallback System**
- RentCast API not configured → Shows web URLs
- API returns no results → Shows web URLs
- No search performed → Shows curated mock listings
- All scenarios handled gracefully with appropriate messaging

**Search Result Cards**
- API results: Full property cards with price, location, type, area
- URL results: Clickable cards with site badges linking to external listings
- Visual indicators show data source (API badge vs. External Link badge)

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

### RentCast API Setup (Optional)

**Free Tier Details:**
- **Rate Limit**: 50 API calls per month
- **Coverage**: US properties only
- **Data Included**: Price, address, bedrooms, bathrooms, square footage, property type
- **Response Time**: ~500ms average

**Setup Steps:**
1. Visit [https://www.rentcast.io/api](https://www.rentcast.io/api)
2. Create a free account
3. Navigate to API dashboard and copy your API key
4. Open `src/config/secrets.ts`
5. Replace `'YOUR_RENTCAST_API_KEY'` with your actual key:
   ```typescript
   export const RENTCAST_API_KEY = 'your-actual-api-key-here';
   ```

**Without RentCast:**
- App works perfectly fine without RentCast API key
- Will show web URL results instead of structured property data
- Still fully functional for searching and browsing

### API Key Security
⚠️ **Important**: The current implementation includes API keys in client-side code for demo/portfolio purposes. For production deployment:

- Move all API calls to a backend server (Next.js API routes, Express, etc.)
- Use environment variables (`.env` files)
- Never commit API keys to version control
- Implement rate limiting and request validation
- Add API key rotation strategy

**For Portfolio/Demo Use:**
- Current approach is acceptable
- Monitor your API usage on provider dashboards
- Rotate keys periodically
- Document the security limitation in deployment notes

## Version History

### v2.1 - API Integration (Current)
- ✅ RentCast API integration for real property data
- ✅ Smart fallback system (API → URLs → Mock)
- ✅ Enhanced SearchContext with API state management
- ✅ Priority-based data display in ListingsPage
- ✅ API setup instructions and graceful degradation

### v2.0 - Search Integration
- ✅ Context API for global search state
- ✅ Search results flow from HomePage to ListingsPage
- ✅ SearchResultCard component for URL-based results
- ✅ Clear search functionality
- ✅ Dynamic headers based on search status

### v1.0 - Initial Release
- AI-powered natural language search
- Multi-step reasoning display
- Mock property listings
- Favorites system
- Responsive design

## Troubleshooting

**Search returns no results:**
- Check that OpenRouter API key is configured correctly
- Verify internet connection
- Try a more common location (e.g., "Austin, Texas" instead of small towns)

**API data not showing:**
- Verify RentCast API key is set in `src/config/secrets.ts`
- Check API key is not `'YOUR_RENTCAST_API_KEY'` (default placeholder)
- RentCast only supports US locations
- Check browser console for API error messages
- Verify you haven't exceeded 50 API calls/month limit

**Build fails:**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (18+ required)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Backend proxy for API keys (production security)
- [ ] Property detail pages
- [ ] Map integration for location visualization
- [ ] Advanced filtering (price range, bedrooms, property type)
- [ ] Search history and saved searches
- [ ] User authentication and cloud-synced favorites
- [ ] Additional property data APIs (Zillow, Redfin, etc.)
- [ ] Testing infrastructure (Jest, React Testing Library)
- [ ] Performance optimizations (caching, lazy loading)
- [ ] Dark mode

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- OpenRouter for AI integration capabilities
- RentCast for real property data API
- React team for amazing developer experience
- Vite for lightning-fast build tooling