# Launchpad

A Next.js application for tracking upcoming space launches, dockings, and expeditions.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI Joy** - Component library (Chips)
- **Emotion** - CSS-in-JS styling (for MUI Joy)
- **Day.js** - Date formatting
- **The Space Devs API** - Space launch and expedition data

## Getting Started

### Prerequisites

- Node.js 22.x (using nvm: `nvm use`)

### Installation

Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
```

### Start Production Server

Run the production server:

```bash
npm start
```

### Linting

Run ESLint:

```bash
npm run lint
```

### Testing

Run tests with coverage:

```bash
npm test
```

## Project Structure

```
launchpad/
├── app/                      # Next.js App Router
│   ├── layout.js            # Root layout with MUI Joy provider
│   ├── page.js              # Home page (redirects to dashboard)
│   ├── dashboard/           # Dashboard page
│   ├── launches/            # Launches page
│   └── expeditions/         # Expeditions page
├── src/
│   ├── components/          # Reusable components
│   │   ├── Cards/
│   │   ├── Hero/
│   │   ├── Moon/
│   │   ├── SolarSystemLoader/
│   │   └── ...
│   └── views/               # Legacy views (keep for reference)
├── public/                  # Static assets
└── next.config.js          # Next.js configuration
```

## Features

- View upcoming space launches
- Browse space expeditions
- Responsive design with Material-UI Joy
- Offline support with localStorage caching (30-minute TTL)
- Animated loading states
- PWA support

## API

This application uses [The Space Devs API](https://ll.thespacedevs.com/2.2.0) to fetch:
- Upcoming launches
- Space expeditions

Data is cached locally for 30 minutes to reduce API calls.

## Deployment

This application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- Any Node.js hosting platform

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

## Migration Notes

This project was migrated from Create React App to Next.js 15 with Tailwind CSS. Key changes:
- React Router → Next.js App Router
- Client-side only → Hybrid SSR/Client components
- react-scripts → Next.js build system
- Node 18 → Node 22
- Custom CSS → Tailwind CSS utility classes
- All component styles converted to Tailwind

## License

Private
