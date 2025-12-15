# SeedGlow Website Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from professional business/consulting sites like Stripe, Y Combinator, and Linear - combining credibility with modern aesthetics. The design should convey trust, achievement, and forward-thinking innovation suitable for the Korean startup ecosystem.

## Typography

**Primary Font**: Inter or Pretendard (for Korean text optimization)
- Headings: 700 weight, sizes from text-4xl to text-6xl for hierarchy
- Body: 400 weight, text-base to text-lg for readability
- Metrics/Numbers: 600-700 weight, text-2xl to text-5xl for impact

**Secondary Font**: Source Sans Pro or similar for accents
- Subheadings: 600 weight
- Captions: 400 weight, text-sm

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
Top navigation bar with SeedGlow logo (left), menu items (center/right), and prominent CTA button. Sticky on scroll with subtle backdrop blur.

### Hero Section (Full-width, 80vh)
Large hero image showing startup/team collaboration or modern office environment with overlay gradient. SeedGlow logo prominently displayed with headline "스타트업 성장의 파트너" and subtitle describing their mission. Two CTAs: primary "상담 신청하기" and secondary "성공 사례 보기".

### Success Metrics Bar
Horizontal stats display with large numbers (300+, 26팀) and descriptive labels. Use subtle background differentiation with icons.

### Services Section (3-column grid)
Cards with icons, titles, and descriptions for consulting services and investment support. Each card includes a subtle hover lift effect and "자세히 보기" link.

### Company Introduction
Two-column layout (60/40 split): Left side contains company story and expertise text, right side features team photo or office image. Include founding year, mission statement, and core values.

### Success Stories Showcase
Card-based grid (2-3 columns) featuring client logos, brief case descriptions, and key results. Each story includes company industry tag and investment amount/growth metric.

### Contact Form Section
Two-column layout: Left side has form (name, email, phone, company, inquiry type, message), right side displays office information, contact details, and small map placeholder or office photo.

### Footer
Multi-column layout with company info, quick links, social media icons, address, and copyright. Include newsletter signup field.

## Images

**Hero Image**: Professional photo of diverse startup team collaborating in modern office or coworking space, or abstract visualization of growth/connectivity. Aspect ratio 16:9, positioned as full-width background with gradient overlay.

**Company Section**: Team photo or office environment showing SeedGlow's professional workspace (approximately 600x400px).

**Success Stories**: Client company logos and representative product/service images for case studies.

**Contact Section**: Office exterior or interior photo, or map visualization showing Seoul location.

## Animations

Minimal and purposeful:
- Fade-in-up on scroll for section entries
- Smooth number counting for metrics
- Subtle hover effects on cards (transform: translateY(-4px))
- Page transition fade only

## Korean Language Optimization

- Ensure proper line-height (1.7-1.8) for Korean text readability
- Use Pretendard or similar Korean-optimized font family
- Consider vertical rhythm with mixed Korean/English content
- Maintain professional tone appropriate for B2B consulting context