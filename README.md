# 🤖 Bot Tuner

![Status](https://img.shields.io/badge/status-active-brightgreen) 
![Vue](https://img.shields.io/badge/vue-3.5-green) 
![TypeScript](https://img.shields.io/badge/typescript-5.9-blue) 
![Tailwind](https://img.shields.io/badge/tailwind-4.1-38B2AC) 
![License](https://img.shields.io/badge/license-MIT-blue)

> Demo: https://kritpongt.github.io/vue-bot-tuner/

> Build the ultimate battle robot with real-time stat optimization and multi-build management

---

## 📖 About

Bot Tuner is a sophisticated robot building and optimization tool designed for creating the ultimate battle robots. Built with Vue 3 and TypeScript, this application allows players to fine-tune every aspect of their robot configuration with real-time calculations and persistent storage.

---

## ⭐ Key Features

### 🤖 Advanced Robot Builder
- **Real-time Calculations** - Instant stat updates as you modify builds
- **Multi-robot Management** - Create and compare multiple configurations simultaneously
- ~~**Auto-save System** - Your builds are automatically saved to local storage~~
- **Tab Interface** - Switch between different robot builds effortlessly

### 📊 Comprehensive Stats Management
- **6 Core Stats** - HP, STR, TEC, WLK, FLY, TGH
- **5 Weapon Stats** - Force, Ammo, Range, Speed, Intelligence
- **Capacity Management** - Optimize within weight and slot constraints
- **Smart Calculations** - Automatic stat optimization suggestions

### ⚔️ Sophisticated Weapon System
- **Customizable Weapons** - Adjust base stats (Force, Ammo, Range, Speed, Int)
- **Weapon Parts Integration** - Add parts to enhance weapon capabilities
- **Live Preview** - See both base stats and modified stats in real-time
- **Multi-weapon Support** - Each robot can have multiple weapons

### 🎯 Parts System
- **9 Part Categories** - HP, TGH, STR, TEC, WLK, FLY, OTHER, STR&TEC, WLK&FLY
- **Dynamic Data Loading** - Parts data fetched from external JSON source
- **Quantity-based Stacking** - Add multiple of the same part for enhanced effects
- **Type-based Filtering** - Smart cascading selection system

---

## 🛠️ Tech Stack

### Frontend
- **Vue 3** - With Composition API and `<script setup>` syntax
- **TypeScript** - Strict typing throughout the entire project
- **Tailwind CSS v4** - Modern, utility-first styling approach
- **DaisyUI** - Beautiful, accessible component library

### Development Tools
- **Vite** - Lightning-fast build tool and development server
- **Vue Router** - Single Page Application navigation
- **ESLint** - Code quality and consistency enforcement
- **Vue DevTools** - Enhanced debugging experience

### Architecture & Patterns
- **Composition API** - Modern Vue patterns with maximum reusability
- **Domain Models** - Rich business logic in dedicated classes (Robot, Weapon, Part)
- **LocalStorage Integration** - Persistent data with debounced saves
- **External Data API** - Dynamic parts loading from GitHub repository
- **Singleton Pattern** - Global state management for robot garage

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20.19.0+ or 22.12.0+
- npm, yarn, or pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vue-bot-tuner.git
cd vue-bot-tuner

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser and navigate to http://localhost:5173
```

### Build for Production

```bash
# Type check and build
npm run build

# Preview production build locally
npm run preview
```

---

## 📋 How to Use

### 🤖 Creating Your First Robot

1. **Add a Robot** - Click the `+` button to create a new robot tab
2. ~~**Name Your Bot** - Give it a memorable name~~
3. **Set Base Stats** - Adjust fundamental attributes (HP, STR, TEC, etc.)
4. **Configure Capacity** - Set your current and maximum capacity

### ⚙️ Adding Parts

1. **Select Type** - Choose from HP, STR, TEC, WLK, FLY, TGH, etc.
2. **Choose Part** - Select specific parts from the dropdown menu
3. **Set Quantity** - Specify how many of each part you want
4. **See Results** - Watch your total stats update in real-time

### ⚔️ Weapon Configuration

1. **Add Weapons** - Click to create multiple weapon slots per robot
2. **Customize Stats** - Adjust Force, Ammo, Range, Speed, Intelligence
3. **Add Weapon Parts** - Enhance weapons with specialized parts (MAIN/SUB types)
4. **Compare Builds** - Switch between tabs to compare different configurations

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run build-only   # Build without type checking
npm run preview      # Preview production build locally

# Quality Assurance
npm run type-check   # Run TypeScript compiler checks
npm run lint         # Run ESLint with auto-fix
```

### Code Style Guidelines

- **Components** - Use `<script setup lang="ts">` syntax
- **Naming** - Kebab-case for files, PascalCase for components
- **Types** - Strict TypeScript with interfaces for object shapes
- **Imports** - Organized by Vue → External → Internal order

### Key Architecture Patterns

- **Composition API** - Use composables for reusable logic
- **Singleton Pattern** - `useRobotGarage` for global state management
- **Domain Models** - Rich business logic in dedicated classes
- **Debounced Saves** - Prevent excessive localStorage writes
- **Provider/Inject** - Clean component communication

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Reporting Bugs

- Use the issue template for bug reports
- Include reproduction steps and screenshots
- Specify your OS, browser, and Node.js version
- Provide detailed error messages and logs

### 💡 Feature Requests

- Open an issue with the "enhancement" label
- Describe the use case and expected behavior
- Consider opening a discussion first for major features

### 🔧 Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes following code style guidelines
4. **Run** tests and linting (`npm run lint && npm run type-check`)
5. **Commit** your changes with descriptive messages
6. **Push** to your fork (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

### 📝 Development Guidelines

- Follow existing code style and patterns
- Add TypeScript types for new features
- Update README if adding new functionality
- Include tests for new features when possible
- Ensure responsive design considerations
- Add proper error handling and validation

---

## 🌐 Deployment

The app is optimized for static hosting and can be deployed to various platforms:

### Recommended Platforms

- ~~**Vercel** - Zero-config deployment with automatic CI/CD~~
- ~~**Netlify** - Simple drag-and-drop deployment~~
- **GitHub Pages** - Free hosting for public repositories

### Configuration for GitHub Pages

For GitHub Pages deployment, make sure to set the `base` path in `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/vue-bot-tuner/', // Your repository name
  // ... other config
})
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🙏 Credits

- **Parts Data** - Sourced from [GitHub Repository](https://github.com/kritpongt/data_tune_up_parts)
- **UI Components** - Built with [DaisyUI](https://daisyui.com/)
- **Icons** - Heroicons

---

## 🔮 Future Roadmap

- [ ] **Build Sharing** - Share robot configurations with community
- [ ] **Import/Export** - JSON export/import for backup and sharing
- [ ] **Build Analyzer** - Advanced analytics and optimization suggestions
- [ ] **Theme System** - Dark mode and custom themes

---

⭐ **Star this repo** if you find it helpful!

🐛 **Found a bug?** [Open an issue](https://github.com/yourusername/vue-bot-tuner/issues)

💡 **Have an idea?** [Start a discussion](https://github.com/yourusername/vue-bot-tuner/discussions)

🚀 **Ready to contribute?** [Read the contributing guide](#-contributing)

---

<div align="center">

**Made with ❤️ using Vue 3, TypeScript, and Tailwind CSS**

</div>