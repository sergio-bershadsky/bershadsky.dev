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
- Series articles use format: `[SERIES NAME]: [TOPIC]` (e.g., "Second Brain: The Second Brain Concept")
- The "PART: N" badge is shown separately in the UI, not in the title itself

### AI Disclaimer
Include in author bio or footer: "I extensively use AI for creating articles but not the content. The ideas are a result of hard work and testing approaches several times in real Software Development work."

## Visual Diagrams System

The blog uses CSS-based visual diagrams instead of ASCII art. ASCII diagrams in markdown are detected and replaced with React components.

### How It Works
1. **Markdown contains ASCII diagrams** in code blocks (using `│`, `├──`, `───`, etc.)
2. **CyberCodeBlock** detects ASCII patterns and matches to specific diagram types
3. **React components** render styled visual versions with icons, colors, and animations

### Detection Rules (in MarkdownRenderer.tsx)
Pattern detection checks are done in order—**check specific patterns first** to avoid false matches:

```
isComparisonDiagram:    'TRADITIONAL AI' && ('Session 1:' || 'Session 2:')
isDecisionDiagram:      'DECISION:' && 'OPTIONS CONSIDERED'
isFlowDiagram:          'DISCUSSION' && '▶' && 'KNOWLEDGE'
isCurrentKnowledge:     'CURRENT KNOWLEDGE' && 'Changes frequently'
isHistoricalRecord:     'HISTORICAL RECORD' && 'Rarely changes'
isDecisionLifecycle:    'Proposed' && 'Accepted' && 'Implemented'
isFolderStructure:      'my-second-brain/' && '├──' && 'docs/'
isThreePillars:         'CURRENT' && 'HISTORICAL' && 'DECISIONS'
isSecondBrain:          'AUTOMATED WORKFLOWS' || 'CLAUDE WITH MEMORY'
```

### Diagram Component Structure
All diagrams follow a flat structure (no nested containers):

```jsx
<div className="my-8 border border-{color}/30 rounded-lg bg-black/40 p-5">
  {/* Header row */}
  <div className="text-sm font-mono text-{color} mb-4 flex justify-between">
    <span>FIG X.X // DIAGRAM_NAME</span>
    <span className="text-xs text-muted-foreground">TYPE</span>
  </div>
  {/* Content directly here - no inner wrapper */}
  ...
</div>
```

### Color Coding
- **Primary (#ec4899):** Current knowledge, main concepts
- **Secondary (#06b6d4):** Historical records, discussions
- **Accent (#9333ea):** Decisions, choices
- **Green:** Good/chosen/implemented options
- **Red:** Bad/rejected options
- **Yellow:** Pending/proposed states

### Adding New Diagrams
1. Create a const component in `MarkdownRenderer.tsx`
2. Add detection pattern in `CyberCodeBlock` (check order matters!)
3. Return the component when pattern matches
4. Use lucide-react icons, keep styling consistent

### Layout Guidelines
- Use `flex flex-col md:flex-row` for responsive layouts
- Put labels above content, not inline
- Use `gap-3` or `gap-4` for spacing
- Icons at 4-5px (`w-4 h-4` or `w-5 h-5`)
- Text sizes: headers `text-sm`, content `text-xs`

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
