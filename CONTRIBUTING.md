# Contributing to Nice

Thank you for your interest in contributing to the "nice" Farcaster mini-app!

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- A code editor (VS Code recommended)
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/nice.git
   cd nice
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Development Workflow

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Test your changes:
   ```bash
   npm run build  # Ensure it builds
   npm test       # Run tests
   npm run lint   # Check for linting errors
   ```

4. Commit with a clear message:
   ```bash
   git commit -m "feat: add your feature description"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Open a Pull Request

### Commit Message Format

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat: add dark mode support`

## Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **React**: Use functional components and hooks
- **CSS**: Use Tailwind utility classes
- **Formatting**: Code will be checked by ESLint
- **Naming**: Use camelCase for variables, PascalCase for components

## Project Structure

```
/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout with metadata
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # React components
│   └── WishDisplay.tsx
├── lib/              # Utility functions
│   ├── wishes.ts     # Wishes array
│   ├── hash.ts       # Hash algorithm
│   └── __tests__/    # Unit tests
├── public/           # Static assets
└── ...
```

## Adding New Features

### Adding More Wishes

Edit `lib/wishes.ts`:

```typescript
export const wishes = [
  "Your new wish here...",
  // ... existing wishes
];
```

Guidelines:
- Keep them positive and uplifting
- Use clear, simple English
- Avoid controversial topics
- Max ~100 characters per wish

### Modifying the UI

Edit `components/WishDisplay.tsx`:

- Follow existing Tailwind patterns
- Maintain responsive design
- Test on mobile and desktop
- Keep accessibility in mind

### Changing the Algorithm

If modifying `lib/hash.ts`:

1. Update the implementation
2. Add/update tests in `lib/__tests__/hash.test.ts`
3. Document the change in `ALGORITHM.md`
4. Ensure determinism is maintained

## Testing

### Running Tests

```bash
npm test              # Run all tests
npm test:watch        # Watch mode
npm test -- --coverage # With coverage
```

### Writing Tests

Place tests in `__tests__` directories:

```typescript
import { yourFunction } from "../yourModule";

describe("Your Feature", () => {
  test("should do something", () => {
    expect(yourFunction()).toBe(expected);
  });
});
```

## Documentation

When adding features:

1. Update README.md if needed
2. Add JSDoc comments for functions
3. Update relevant .md files
4. Include examples where helpful

## Pull Request Process

1. **Description**: Clearly describe what and why
2. **Screenshots**: For UI changes, include before/after
3. **Testing**: Confirm all tests pass
4. **Documentation**: Update docs if needed
5. **Breaking Changes**: Clearly mark and explain

### PR Checklist

- [ ] Code follows project style
- [ ] Tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] No linting errors (`npm run lint`)
- [ ] Documentation updated
- [ ] Commit messages are clear

## Reporting Issues

### Bug Reports

Include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Browser/device information

### Feature Requests

Include:
- Clear description
- Use case / why it's needed
- Proposed solution (if any)
- Alternative approaches considered

## Questions?

- Open an issue for discussion
- Check existing issues first
- Be respectful and constructive

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

## Thank You!

Every contribution helps make "nice" better for everyone. Thank you for taking the time to contribute! 🎉
