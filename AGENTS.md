# Vue Bot Tuner - Agent Guidelines

This file contains build commands, code style guidelines, and conventions for agentic coding agents working in this Vue 3 + TypeScript project.

## Build & Development Commands

### Core Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs type-check + build-only in parallel)
- `npm run build-only` - Build without type checking
- `npm run preview` - Preview production build locally
- `npm run type-check` - Run TypeScript compiler checks
- `npm run lint` - Run ESLint with auto-fix

### Testing
This project currently has no test framework configured. When adding tests:
- Use Vitest for unit testing (recommended for Vue projects)
- Use Vue Test Utils for component testing
- Place test files in `src/**/__tests__/*` or `src/**/*.test.ts`

## Project Architecture

### Tech Stack
- **Vue 3** with Composition API and `<script setup>`
- **TypeScript** with strict type checking
- **Vite** as build tool and dev server
- **Tailwind CSS v4** with DaisyUI for styling
- **Vue Router** for navigation

### Directory Structure
```
src/
├── components/     # Reusable Vue components
├── composables/    # Vue composition functions
├── models/         # TypeScript classes and business logic
├── types/          # TypeScript type definitions
├── views/          # Page-level components
├── layouts/        # Layout components
├── router/         # Vue Router configuration
├── style.css       # Global styles and Tailwind imports
└── main.ts         # App entry point
```

## Code Style Guidelines

### Vue Components
- Use `<script setup lang="ts">` syntax
- Import types with `type` keyword: `import type { ComponentProps } from './types'`
- Use kebab-case for component file names: `RobotTab.vue`
- Use PascalCase for component names in templates
- Define props with interfaces: `interface Props { robot: Robot }`

### TypeScript
- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use type assertions sparingly
- Export classes for domain models (see `models/` directory)
- Use generic types where appropriate

### Import Organization
1. Vue imports first: `import { ref, computed } from 'vue'`
2. External libraries second
3. Internal imports third, using `@/` alias
4. Type imports with `type` keyword: `import type { Robot } from '@/models/Robot'`

### Naming Conventions
- **Components**: PascalCase (RobotTab, StatsCard)
- **Files**: kebab-case (robot-tab.vue, use-robot-garage.ts)
- **Composables**: camelCase with `use` prefix (useRobotGarage, useStats)
- **Models/Classes**: PascalCase (Robot, Weapon, Part)
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase with descriptive verbs

### Error Handling
- Throw errors with descriptive messages in composables and models
- Use try-catch blocks for async operations
- Validate inputs in class constructors and composable functions
- Return boolean or null for operations that may fail

### Vue Composition API Patterns
- Use `ref()` for primitive values and reactive objects
- Use `computed()` for derived values
- Use `watch()` for side effects
- Return readonly refs from composables when appropriate: `readonly(robots)`
- Use `defineProps<InterfaceName>()` for typed props

### Styling
- Use Tailwind CSS classes for styling
- DaisyUI components for UI elements
- Custom CSS classes only when necessary (see `style.css`)
- Scoped styles in components when needed
- Responsive design with mobile-first approach

### State Management
- Use composables for local state management
- Singletons for global state (see `useRobotGarage` pattern)
- Avoid mutations, prefer immutable updates
- Use computed properties for derived state

## Development Workflow

### Before Committing
1. Run `npm run type-check` to ensure TypeScript compliance
2. Run `npm run lint` to fix code style issues
3. Test functionality manually in development server
4. Check console for errors or warnings

### File Creation Guidelines
- When creating new components, place in appropriate directory
- Follow existing naming patterns
- Add proper TypeScript types
- Include basic error handling
- Use existing UI patterns (DaisyUI components)

### Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] Imports follow organization rules
- [ ] Component uses `<script setup>` syntax
- [ ] Error handling is implemented
- [ ] Code follows existing patterns
- [ ] No console.log statements left in production code
- [ ] Responsive design considered
- [ ] Accessibility features included

## Specific Project Patterns

### Robot Management System
- Robots are managed through `useRobotGarage` composable
- Each robot has parts, weapons, parts of weapon, and stats
- Use singleton pattern for global robot garage
- Parts and weapons use slot-based system

### Component Communication
- Use props for parent-to-child communication
- Use events for child-to-parent communication
- Provide/inject for deep component trees
- Composables for shared logic

### Performance Considerations
- Use `computed()` for expensive calculations
- Avoid unnecessary reactivity
- Use `readonly()` where appropriate
- Consider lazy loading for heavy components

## Tools Configuration

### ESLint
- Uses Vue 3 + TypeScript recommended configuration
- Auto-fix enabled in `npm run lint`
- Ignores build directories

### TypeScript
- Strict mode enabled
- Path aliases configured (`@/` for `src/`)
- Vue SFC support enabled

### Vite
- Base path configured for GitHub Pages deployment
- Vue DevTools plugin enabled
- Tailwind CSS plugin integrated