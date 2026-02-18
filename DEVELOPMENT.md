# Development Guide

This project is configured with a comprehensive development setup including ESLint, Prettier, and TypeScript with proper configurations for Angular with spartan UI.

## Available Scripts

- `bun run start` - Start the development server
- `bun run build` - Build the application for production
- `bun run test` - Run tests
- `bun run lint` - Lint the codebase
- `bun run lint:fix` - Lint and auto-fix issues
- `bun run format` - Format code with Prettier
- `bun run format:check` - Check if code is formatted correctly
- `bun run type-check` - Run TypeScript type checking

## Development Workflow

1. **Before committing:**

   ```bash
   bun run type-check  # Check for TypeScript errors
   bun run lint:fix    # Fix linting issues
   bun run format      # Format code
   ```

2. **VS Code Integration:**
   - Install recommended extensions when prompted
   - Code will be automatically formatted on save
   - ESLint errors will be highlighted and auto-fixable ones will be fixed on save

## Configuration Files

- **ESLint**: `eslint.config.cjs` - Angular-specific rules with spartan UI support
- **Prettier**: Configuration in `package.json` with Angular template support
- **TypeScript**: `tsconfig.json` with strict settings and path mappings
- **VS Code**: `.vscode/settings.json` with proper editor configuration

## Code Quality Standards

- **Prefix Rules**: Components can use `app-` or `hlm-` prefixes (for spartan UI)
- **Import Style**: Type-only imports are enforced with `import type`
- **Formatting**: Consistent with Prettier (single quotes, 100 char line length)
- **TypeScript**: Strict mode enabled with comprehensive error checking

## CI/CD

The project includes a GitHub Actions workflow that:

- Runs type checking
- Lints the code
- Checks formatting
- Runs tests
- Builds the application

This ensures code quality is maintained across all contributions.
