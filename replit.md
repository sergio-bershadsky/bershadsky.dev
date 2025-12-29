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
- **DO NOT** include "Reading time / Audience / Words" metadata in article content - this info is already displayed in the hero block
- **MANDATORY:** Use Lucide line-based icons instead of emojis in all content, diagrams, and tables
- **MANDATORY:** Generate a hero image for every new article using the image generation tool with cyberpunk/neon aesthetic, then update the `image_url` field in the database

### Title Format
- Series articles use format: `[SERIES NAME]: [TOPIC]` (e.g., "Second Brain: The Second Brain Concept")
- The "PART: N" badge is shown separately in the UI, not in the title itself

### AI Disclaimer
Include in author bio or footer: "I extensively use AI for creating articles but not the content. The ideas are a result of hard work and testing approaches several times in real Software Development work."

### Series Icons (MANDATORY)
Series MUST use Lucide icons instead of images. Define icons in `getSeriesIcon()` function:
- `second-brain-claude` → Brain icon
- `architecture-fundamentals` → Layers icon  
- `startup-playbook` → Rocket icon
- Default → BookOpen icon

Located in:
- `client/src/components/SeriesRail.tsx` (for series bubbles)
- `client/src/pages/blog-post.tsx` (for series nav in articles)

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

# Part 6: Hooks
isSkillsVsHooks:        'SKILLS' && 'HOOKS' && 'You trigger them' && 'They trigger themselves'
isHookEventsTable:      'EVENT' && 'WHEN IT HAPPENS' && 'Session Start' && 'File Created'
isHookTimeline:         'SESSION START' && 'BEFORE TOOL USE' && 'AFTER TOOL USE' && 'SESSION END'
isHookFlowDiagram:      'EVENT HAPPENS' && 'HOOK CHECKS' && 'CONDITION MET' && 'CONDITION NOT MET'
isGoodFirstHooks:       'GOOD FIRST HOOKS' && 'NOT YET' && 'Session start reminder'
isHooksFolderStructure: 'your-second-brain/' && 'hooks/' && 'session-start.md'
isHookSpectrum:         'SILENT' && 'BLOCKING' && 'Inform' && 'Warn' && 'Suggest' && 'Require'

# Part 7: Plugins
isPluginEvolution:      'STAGE 1' && 'STAGE 2' && 'Personal automation' && 'Plugin solution'
isPluginFolderStructure: 'my-second-brain-plugin/' && 'plugin.json' && 'skills/'
isPluginComponentsTable: 'COMPONENT' && 'PURPOSE' && 'plugin.json' && 'Tells Claude'
isBeforeAfterPlugin:    'Before:' && 'After:' && 'your-second-brain/' && 'team-productivity-plugin/'
isDistributionOptions:  'Option 1:' && 'Option 2:' && 'Git repository' && 'Direct sharing'
isPluginHierarchy:      'PROJECT PLUGINS' && 'TEAM PLUGINS' && 'PERSONAL PLUGINS' && 'highest priority'
isPluginPatterns:       'PATTERN' && 'USE CASE' && 'Team conventions' && 'Project-specific'
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

### Adding New Diagrams (Modular Architecture)
The diagram system is now modular, organized under `client/src/components/markdown/`:

```
markdown/
├── MarkdownRenderer.tsx      # Main pipeline (~190 lines)
├── primitives.tsx            # Shared building blocks (DiagramFrame, etc.)
├── diagramRegistry.ts        # Detection + render mapping
├── CodeBlock.tsx             # CyberCodeBlock with detection logic
└── diagrams/
    ├── core.tsx              # Parts 1-3 diagrams
    ├── connections.tsx       # Part 4 diagrams
    ├── skills.tsx            # Part 5 diagrams
    ├── hooks.tsx             # Part 6 diagrams
    └── plugins.tsx           # Part 7 diagrams
```

**To add a new diagram for Part 8+:**
1. Create a new file `client/src/components/markdown/diagrams/part8.tsx` (or add to existing)
2. Export the diagram component and a detection function
3. Export a `DiagramEntry[]` array with `{ id, detect, component }`
4. Register entries in `CodeBlock.tsx` using `registerDiagrams()`
5. Use lucide-react icons, keep styling consistent with primitives

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
- `id`, `slug` (SEO-friendly URL), `title`, `excerpt`, `content`, `date`, `tags[]`, `imageUrl`, `videoUrl`, `status` (draft/published), `publishedAt`
- Routes use `/blog/:slug` for SEO-friendly URLs

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
- 2024-12-29: Refactored MarkdownRenderer into modular architecture under `client/src/components/markdown/`
- 2024-12-29: Created Part 7 article "Sharing Knowledge: Plugins" with 7 visual diagram components
- 2024-12-29: Added docker-compose.yml and database dump script for local development
- 2024-12-29: Created Part 6 article with hook diagrams
- 2024-12-29: Created Parts 1-5 articles for Second Brain series
- 2024-12-29: Built custom MarkdownRenderer with cyberpunk styling
- 2024-12-29: Added CSS-based visual diagrams (AIComparisonDiagram, SecondBrainArchitectureDiagram)
- 2024-12-29: Fixed diagram layout/wrapping issues
- 2024-12-29: Implemented SEO-friendly slug routing for blog posts
- 2024-12-29: Updated API route to use regex `/^\d+$/` for distinguishing IDs from slugs
