# Cyberpunk Blog & Portfolio

## Project Overview
A cyberpunk/neon aesthetic blog and portfolio website featuring article series with a focus on knowledge base content. The primary series is "Building Your Second Brain with Claude" - a 12-part guide on transforming Claude from a coding assistant into a persistent knowledge companion.

## Design System

### Color Palette (Neon/Void Aesthetic)
- **Primary:** `#ec4899` (Pink)
- **Secondary:** `#06b6d4` (Cyan)
- **Accent:** `#9333ea` (Purple)
- **Background:** Dark with subtle gradients

### Typography
- Display headings: Bold, uppercase for labels
- Body text: Clean, readable with good contrast
- Code/Mono: Used for labels, tags, and technical elements

## Content Guidelines

### Article Requirements
- **Length:** 1,200-2,000 words each
- **Tone:** Conversational with light humor
- **Audience:** Non-technical readers
- **Structure:** Follow the established template with Hook, Problem, Solution, What's Next sections

### Title Format
- Series articles use format: `[Title] PART: N` (e.g., "The Second Brain Concept PART: 1")
- NOT "Part N: [Title]"

### AI Disclaimer
Include in author bio or footer: "I extensively use AI for creating articles but not the content. The ideas are a result of hard work and testing approaches several times in real Software Development work."

## Visual Diagrams

### Diagram Component Rules
1. **Detection Order Matters:** Check for more specific patterns first to avoid false matches
2. **Use CSS-based diagrams** instead of ASCII art for better visual appeal
3. **Layout Guidelines:**
   - Use flexbox with `flex-col lg:flex-row` for responsive side-by-side layouts
   - Always put labels on their own line above content (e.g., "Session 1:" on line 1, question on line 2)
   - Avoid grid layouts that can overlap on medium screens

### Diagram Styling
- Wrap diagrams in `NeonCard` component with appropriate variant
- Include header with figure number: `FIG X.X // DIAGRAM_NAME`
- Use dashed borders (`border-dashed border-white/20`) for diagram containers
- Color-code sections: red for "bad/old", green for "good/new", primary/secondary/accent for neutral

### Comparison Diagrams
- Side-by-side layout on large screens, stacked on mobile
- Use contrasting colors (red vs green) to show old vs new approaches
- Include summary text at bottom of each column

### Architecture Diagrams
- Use icon components from lucide-react
- Show flow with arrow components and gradient lines
- Animate key elements subtly (e.g., `animate-bounce` on arrows)

## Database Schema

### Series Table
- `id`, `slug`, `title`, `description`, `coverImageUrl`, `accentColor`, `isVisible`

### Blog Posts Table
- `id`, `seriesId`, `seriesPosition`, `title`, `excerpt`, `content`, `date`, `tags[]`, `imageUrl`, `videoUrl`, `status` (draft/scheduled/published), `publishedAt`

## Component Patterns

### MarkdownRenderer
- Uses unified/remark/rehype pipeline
- Custom components for all elements (headings, code blocks, tables, etc.)
- ASCII diagram detection converts to visual CSS components
- Use `useEffect` for callbacks (not during render) to avoid React warnings

### Blog Post Page
- Conditionally show featured image OR video as hero media
- Series navigation with Instagram stories-style dots
- Table of contents extracted from headings

## File Organization
- Articles stored in `attached_assets/articles/`
- Generated images in `attached_assets/generated_images/`
- Components in `client/src/components/`
- Pages in `client/src/pages/`

## Recent Changes
- 2024-12-29: Created Part 1 article for Second Brain series
- 2024-12-29: Built custom MarkdownRenderer with cyberpunk styling
- 2024-12-29: Added CSS-based visual diagrams (AIComparisonDiagram, SecondBrainArchitectureDiagram)
- 2024-12-29: Fixed diagram layout/wrapping issues
