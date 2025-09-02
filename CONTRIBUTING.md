# Contributing to UBL Chatbot

Thank you for your interest in contributing to the UBL Chatbot project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 1. Fork the Repository
- Click the "Fork" button on the GitHub repository page
- Clone your fork locally:
  ```bash
  git clone https://github.com/yourusername/ubl-chatbot.git
  cd ubl-chatbot
  ```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Changes
- Follow the coding standards
- Add tests if applicable
- Update documentation as needed

### 4. Commit Changes
```bash
git add .
git commit -m "Add: your feature description"
```

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```
Then create a Pull Request on GitHub.

## 📋 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup
```bash
# Clone repository
git clone https://github.com/yourusername/ubl-chatbot.git
cd ubl-chatbot

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your API keys to .env.local
# GEMINI_API_KEY=your_key_here
# TAVILY_API_KEY=your_key_here

# Run development server
npm run dev
```

## 🎯 Areas for Contribution

### 🐛 Bug Fixes
- Fix reported issues
- Improve error handling
- Performance optimizations

### ✨ New Features
- Additional AI capabilities
- UI/UX improvements
- Voice feature enhancements
- Mobile optimizations

### 📚 Documentation
- Improve README
- Add code comments
- Create tutorials
- Update API documentation

### 🧪 Testing
- Add unit tests
- Integration tests
- E2E tests
- Performance testing

## 📝 Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type

### React/Next.js
- Use functional components with hooks
- Follow Next.js 14 App Router patterns
- Implement proper error boundaries

### Styling
- Use Tailwind CSS classes
- Follow responsive design principles
- Maintain UBL branding consistency

### Code Style
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Follow existing code patterns

## 🚀 Pull Request Guidelines

### Before Submitting
- [ ] Code follows project standards
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design maintained

### PR Description
Include:
- What changes were made
- Why the changes were needed
- How to test the changes
- Screenshots (for UI changes)

### Review Process
1. Automated checks must pass
2. Code review by maintainers
3. Testing on staging environment
4. Approval and merge

## 🐛 Reporting Issues

### Bug Reports
Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Screenshots if applicable

### Feature Requests
Include:
- Clear description of the feature
- Use case and benefits
- Mockups or examples
- Implementation suggestions

## 📞 Getting Help

- Create an issue for questions
- Join discussions in GitHub Issues
- Contact maintainers directly

## 🏆 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit in the project

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to UBL Chatbot! 🏦✨**
