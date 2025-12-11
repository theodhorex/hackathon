# 🤝 Contributing to IP Shield

Thank you for your interest in contributing to IP Shield! This document provides guidelines for contributing to the project.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [How to Contribute](#how-to-contribute)
5. [Coding Standards](#coding-standards)
6. [Pull Request Process](#pull-request-process)
7. [Reporting Bugs](#reporting-bugs)
8. [Feature Requests](#feature-requests)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We expect all contributors to:

- ✅ Be respectful and inclusive
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what is best for the community
- ✅ Show empathy towards other community members

### Unacceptable Behavior

- ❌ Harassment or discriminatory language
- ❌ Trolling or insulting comments
- ❌ Public or private harassment
- ❌ Publishing others' private information

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Git** for version control
- **Chrome** browser (for extension testing)
- Basic knowledge of:
  - React/Next.js
  - TypeScript
  - Chrome Extensions

### First Contribution?

Look for issues labeled:
- `good first issue` - Simple fixes, great for beginners
- `help wanted` - Issues needing attention
- `documentation` - Improve docs

---

## 💻 Development Setup

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/ip-shield.git
cd ip-shield
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/ip-shield.git
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Create Environment File

```bash
cp .env.example .env.local
# Edit .env.local with your API keys (optional)
```

### 6. Run Development Server

```bash
npm run dev
```

### 7. Load Extension

1. Open `chrome://extensions/`
2. Enable Developer mode
3. Load unpacked: `app/extension/`

---

## 🎯 How to Contribute

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/changes

### 2. Make Your Changes

- Write clean, maintainable code
- Follow our [coding standards](#coding-standards)
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Type check
npm run type-check

# Lint
npm run lint

# Build (ensure no errors)
npm run build
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

**Commit message format:**
```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance

**Example:**
```
feat(extension): add background monitoring toggle

- Add toggle button in header
- Implement monitoring state management
- Update UI indicators

Closes #123
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Fill in the PR template
4. Wait for review!

---

## 📐 Coding Standards

### TypeScript

- ✅ Use TypeScript for all new files
- ✅ Define interfaces for all data structures
- ✅ Avoid `any` type (use `unknown` if necessary)
- ✅ Use strict mode

**Example:**
```typescript
// Good
interface User {
  id: string;
  name: string;
  role: "admin" | "demo";
}

// Bad
const user: any = {...}
```

### React Components

- ✅ Use functional components with hooks
- ✅ Extract reusable logic into custom hooks
- ✅  Memoize expensive computations
- ✅ Use descriptive component names

**Example:**
```typescript
// Good
export function ContentCard({ content, onProtect }: ContentCardProps) {
  const isProtected = useMemo(
    () => content.status === "PROTECTED",
    [content.status]
  );
  
  return <div>...</div>;
}

// Bad
export default function Card(props: any) {
  return <div>...</div>;
}
```

### Styling

- ✅ Use Tailwind CSS utilities
- ✅ Follow mobile-first approach
- ✅ Use consistent spacing scale
- ✅ Maintain dark theme consistency

### File Organization

```
components/
├── ui/              # UI primitives
├── features/        # Feature-specific components
└── layout/          # Layout components

lib/
├── yakoa/           # Yakoa integration
├── story/           # Story Protocol
└── utils/           # Utility functions
```

---

## 🔍 Pull Request Process

### Before Submitting

- [ ] Tests pass (`npm test`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No lint errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Updated documentation if needed
- [ ] Added tests for new features

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
How did you test your changes?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project style
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process

1. **Automated Checks** - CI runs tests/lints
2. **Code Review** - Maintainer reviews code
3. **Feedback** - Address any comments
4. **Approval** - Maintainer approves
5. **Merge** - PR merged to main

### Review Timeline

- Initial review: Within 48 hours
- Follow-up: Within 24 hours
- Merge: After approval

---

## 🐛 Reporting Bugs

### Before Reporting

1. Check if bug already reported
2. Try latest version
3. Isolate the problem

### Bug Report Template

```markdown
**Describe the bug**
Clear description of what happened

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Extension version: [e.g. 1.0.0]

**Additional context**
Any other relevant information
```

---

## ✨ Feature Requests

### Suggesting Features

We welcome feature requests! Please:

1. **Check existing suggestions** first
2. **Explain the use case** clearly
3. **Provide examples** if helpful
4. **Consider alternatives** you've tried

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
What you want to happen

**Describe alternatives you've considered**
Other solutions you thought about

**Additional context**
Screenshots, mockups, examples
```

---

## 📚 Documentation

### Contributing to Docs

Documentation is in:
- `README.md` - Main project README
- `docs/` - Detailed documentation
- `app/extension/README.md` - Extension docs
- Inline code comments

### Documentation Style

- ✅ Use clear, simple language
- ✅ Include code examples
- ✅ Add visual aids (diagrams, screenshots)
- ✅ Keep it up-to-date

---

## 🎨 Design Contributions

### UI/UX Improvements

We welcome design contributions!

**How to contribute:**
1. Create mockups (Figma, Sketch, etc.)
2. Open an issue with designs
3. Get feedback from maintainers
4. Implementation can follow

**Design principles:**
- Cyberpunk/futuristic theme
- Dark mode first
- Accessibility matters
- Smooth animations

---

## 🧪 Testing

### Writing Tests

```typescript
// Example test
describe('ContentCard', () => {
  it('should display status badge', () => {
    const content = {
      id: 1,
      status: 'PROTECTED',
      // ...
    };
    
    render(<ContentCard content={content} />);
    expect(screen.getByText('PROTECTED')).toBeInTheDocument();
  });
});
```

### Test Coverage

- ✅ Unit tests for utilities
- ✅ Component tests for UI
- ✅ Integration tests for features
- ✅ E2E tests for critical paths

---

## 🎯 Areas for Contribution

### High Priority

- [ ] Mobile responsiveness improvements
- [ ] Accessibility enhancements
- [ ] Performance optimizations
- [ ] Test coverage expansion
- [ ] Documentation improvements

### Features Wanted

- [ ] Multi-language support
- [ ] Batch content protection
- [ ] Export/import IP assets
- [ ] Advanced analytics
- [ ] API integration

### Nice to Have

- [ ] Dark/light theme toggle
- [ ] Customizable UI themes
- [ ] Keyboard shortcuts
- [ ] Browser notifications
- [ ] Activity history

---

## 💬 Communication Channels

- **GitHub Issues** - Bug reports, features
- **Pull Requests** - Code contributions
- **Discussions** - General questions
- **Email** - [your-email@example.com]

---

## 🏆 Recognition

Contributors will be recognized in:
- `CONTRIBUTORS.md` file
- Release notes
- Project README
- Special mention in docs

---

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Every contribution, no matter how small, helps make IP Shield better for everyone. We appreciate your time and effort!

---

<div align="center">

**Happy Contributing! 🚀**

*Built with ❤️ by the community*

</div>
