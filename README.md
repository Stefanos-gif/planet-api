# Planetary Facts API

A SvelteKit application that provides daily facts about planets in our solar system and the Sun. Each day of the month features a different fact based on EST timezone.

## Features

- 🪐 Facts for all 8 planets plus the Sun
- 📅 Daily facts that change based on the current day of the month (EST)
- 🌐 REST API endpoint for programmatic access
- 💻 Interactive web interface
- 🎨 Responsive design

## Available Celestial Bodies

- Sun
- Mercury
- Venus
- Earth
- Mars
- Jupiter
- Saturn
- Uranus
- Neptune

## API Usage

### Get a fact for a specific planet

```http
GET /api/fact?planet={planetName}
```

**Parameters:**
- `planet` (required): Name of the planet or "sun" (case insensitive)

**Example Request:**
```sh
curl "http://localhost:5174/api/fact?planet=earth"
```

**Example Response:**
```json
{
  "planet": "earth",
  "day": 27,
  "fact": "Earth has experienced five major mass extinction events.",
  "timestamp": "2025-08-27T21:59:21.000Z"
}
```

**Error Response:**
```json
{
  "error": "Planet 'invalid' not found or no fact available for day 27",
  "availablePlanets": ["sun", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"],
  "currentDay": 27
}
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
```sh
git clone git@github.com:Stefanos-gif/planet-api.git
cd planet-api
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal)

## Development

Once you've installed dependencies, start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

## Project Structure

```
src/
├── lib/
│   └── planetary-facts.ts    # Planetary facts data and helper functions
├── routes/
│   ├── +page.svelte         # Main web interface
│   └── api/
│       └── fact/
│           └── +server.ts   # API endpoint
└── app.html                 # HTML template
```

## Technology Stack

- **Framework**: SvelteKit
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS (component-scoped)

## Deployment

To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
