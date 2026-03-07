# MSDE Tech — Personal Website

A modern, engineering-driven personal website for a Data Engineer & Software Engineer. Built with Angular 21, Spartan UI, and TailwindCSS.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
# → http://localhost:4200

# Build for production
npm run build

# Run tests
npm test

# Lint
npm run lint
```

## Project Structure

```
src/
  app/
    core/
      layout/          # Header, Footer, Shell (app shell wrapper)
      models/          # TypeScript interfaces (BlogPost, Project)
      services/        # ContentService (loads blog/project data)
    shared/
      ui/              # Shared UI components (SingularityBackground)
    features/
      home/            # Landing page with hero + capability cards
      services/        # Services listing page
      blog/            # Blog list + detail pages
      projects/        # Project list + detail pages
      contact/         # Contact form with validation
content/
  blog/posts.json      # Blog post data
  projects/projects.json # Project case study data
```

## Routes

| Route               | Page              |
| ------------------- | ----------------- |
| `/`                 | Home / Landing    |
| `/services`         | Services          |
| `/blog`             | Blog listing      |
| `/blog/:slug`       | Blog post detail  |
| `/projects`         | Project listing   |
| `/projects/:slug`   | Project detail    |
| `/contact`          | Contact form      |

## Adding Content

### Blog Posts

Edit `content/blog/posts.json`. Each post has:

```json
{
  "slug": "my-post-slug",
  "title": "Post Title",
  "date": "2025-11-15",
  "tags": ["data-engineering", "azure"],
  "summary": "A short summary of the post.",
  "readingTime": "5 min",
  "content": "## Heading\n\nParagraph text.\n\n- List item 1\n- List item 2"
}
```

The content field supports a subset of markdown: `## ` headings, `### ` subheadings, `- ` list items, and paragraphs separated by blank lines.

### Projects

Edit `content/projects/projects.json`. Each project has:

```json
{
  "slug": "project-slug",
  "title": "Project Title",
  "industry": "Industry Name",
  "problem": "Description of the problem.",
  "approach": "How the problem was solved.",
  "architecture": "Technical architecture description.",
  "techStack": ["Azure", "Databricks", "Python"],
  "results": "Outcomes and metrics.",
  "responsibilities": ["Item 1", "Item 2"]
}
```

## Contact Form

The contact form includes validation and a honeypot field for spam prevention. Currently, form submission is simulated (no backend endpoint).

To wire up a real endpoint, update the `onSubmit()` method in `src/app/features/contact/contact.ts`:

```typescript
// Replace the simulated delay with an actual API call:
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: this.form.value.name,
    email: this.form.value.email,
    subject: this.form.value.subject,
    message: this.form.value.message,
  }),
});
if (!response.ok) throw new Error('Failed to send');
```

Options for the backend:
- **Azure Functions** or **AWS Lambda** — serverless endpoint that sends an email
- **Formspree / Formcarry** — third-party form service
- **Self-hosted** — NestJS/Express API with email sending

## Tech Stack

- **Angular 21** with standalone components
- **Spartan UI** (helm) — headless UI components for Angular
- **TailwindCSS v4** — utility-first CSS
- **Vitest** — unit testing
- **ng-icons** (Lucide) — icon library

## Theme

The site uses a dark navy + orange accent theme inspired by a "singularity / event horizon" visual concept. Theme colors are defined as CSS custom properties in `src/styles.css` and are compatible with Spartan UI's design token system.

## Animated Background

The `SingularityBackground` component renders a Canvas-based particle animation:
- Particles drift from left to right, converging toward an orange singularity
- Respects `prefers-reduced-motion` (static frame when enabled)
- devicePixelRatio-aware with ResizeObserver
- Runs behind all content with `position: fixed; z-index: -1`
