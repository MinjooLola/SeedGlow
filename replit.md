# SeedGlow Website

## Overview

SeedGlow is a Korean startup consulting company website built as a responsive single-page application. The platform showcases their consulting services for local startups, including business model development, local branding, IR (Investor Relations) strategy, and investment connections. The site features a modern, professional design inspired by companies like Stripe and Linear, with Korean language support optimized through Pretendard font.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **Component Library**: shadcn/ui (New York style) built on Radix UI primitives
- **State Management**: TanStack React Query for server state management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Static Serving**: Express serves the built Vite client in production

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route-level page components
    hooks/        # Custom React hooks
    lib/          # Utility functions
server/           # Express backend
shared/           # Shared types and schemas (Drizzle + Zod)
attached_assets/  # Static images and assets
```

### Design System
- Custom color palette with HSL-based CSS variables supporting light/dark modes
- Primary color: Golden/amber tone (hsl 43)
- Typography: Inter/Pretendard for Korean text optimization
- Responsive breakpoints following Tailwind defaults
- Component patterns: Cards, navigation, hero sections, metrics displays

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schemas with drizzle-zod integration
- **Storage Interface**: Abstract IStorage interface with in-memory implementation (MemStorage)
- **Schema Location**: `shared/schema.ts` for shared type definitions

## External Dependencies

### Database
- PostgreSQL (configured via DATABASE_URL environment variable)
- Drizzle Kit for migrations (`drizzle-kit push`)

### UI Component Libraries
- Radix UI primitives (dialog, accordion, tabs, etc.)
- Lucide React for icons
- React Icons for brand icons (LinkedIn, Instagram)
- Embla Carousel for image carousels

### Development Tools
- Replit-specific Vite plugins for development experience
- esbuild for server bundling in production
- PostCSS with Autoprefixer for CSS processing

### Key Integrations
- Google Fonts (Inter, DM Sans, Geist Mono) for typography
- Social links to LinkedIn and Instagram profiles
- Contact form with email integration planned (minjoo.kim.biz@gmail.com)