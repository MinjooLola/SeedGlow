# SeedGlow Website Design Guidelines

## Design Approach

**Reference-Based Approach**: Modern Korean consulting website with a professional purple/violet color scheme. Inspired by career coaching and professional consulting sites with clean layouts, professional photography, and accent colors for branding.

## Color Palette

**Primary Color**: Purple/Violet (hsl 271 81% 56%)
- Used for: CTA buttons, accents, highlights, icons
- Creates a professional, trustworthy, and modern feeling

**Background Colors**:
- Hero/Dark sections: gradient from violet-950 to purple-900
- Light sections: subtle violet-tinted backgrounds (bg-card, bg-background)
- Card backgrounds: violet-900/30 for dark sections, bg-card for light sections

**Text Colors**:
- On dark backgrounds: white, violet-200, violet-300
- On light backgrounds: foreground (dark purple-tinted gray), muted-foreground

## Typography

**Primary Font**: Inter or Pretendard (for Korean text optimization)
- Headings: 700 weight, sizes from text-4xl to text-6xl for hierarchy
- Body: 400 weight, text-base to text-lg for readability
- Metrics/Numbers: 600-700 weight, text-2xl to text-5xl for impact

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-16 md:py-24 lg:py-32
- Component spacing: gap-8 to gap-12
- Inner margins: p-6 to p-8
- Container max-width: max-w-7xl with px-4 md:px-6

**Grid System**: 
- Desktop: grid-cols-3 for services/features
- Tablet: grid-cols-2
- Mobile: grid-cols-1

## Component Library

### Navigation
Top navigation bar with transparent background on hero, solid purple-tinted background on scroll. Sticky with high z-index.

### Hero Section (Full-width, min-h-screen)
- Background: gradient from violet-950 via purple-900
- Professional photo on right side with gradient overlay
- Left side: tagline, headline, description, CTA button
- Bottom metrics bar with stats

### Section Styling

**Dark Sections** (Services, Success Stories):
- Background: gradient from violet-950 to purple-950
- Cards: bg-violet-900/30 with border-violet-700/50
- Text: white for headings, violet-200/80 for descriptions

**Light Sections** (Target Audience, About, Contact):
- Background: bg-background or bg-card
- Cards: bg-card with border-border
- Standard foreground/muted-foreground text colors

### Cards and Containers
- Border radius: rounded-md (small, not pill-shaped)
- Borders: subtle violet-700/50 on dark, border-border on light
- Hover: use hover-elevate utility class

### Buttons
- Primary: Purple background (primary color)
- Outline: For secondary actions, with backdrop blur on hero
- Ghost: For navigation items

## Images

**Hero Image**: Professional photo of CEO/consultant presenting, positioned on right side with gradient overlay for text readability.

**Profile Images**: Rounded-md corners, professional headshots

## Animations

Minimal and purposeful:
- Fade-in-up on scroll for section entries
- Smooth number counting for metrics
- Subtle hover effects on cards (hover-elevate utility)
- Scroll animation for partner logos

## Korean Language Optimization

- Ensure proper line-height (1.7-1.8) for Korean text readability
- Use Pretendard or similar Korean-optimized font family
- Consider vertical rhythm with mixed Korean/English content
- Maintain professional tone appropriate for B2B consulting context
