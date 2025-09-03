# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript-based Docusaurus blog site for Vertexcover, built as a static site generator with React components and deployed to GitHub Pages.

## Package Management and Build Commands

- **Package Manager**: Use `bun` as the package manager (not npm/yarn despite lockfiles present)
- **Build**: `bun run build` - Uses custom CSS minifier flag (`USE_SIMPLE_CSS_MINIFIER=true`)
- **Development**: `bun start` - Starts local dev server with live reload
- **Type Check**: `bun run typecheck` - Runs TypeScript compiler checks
- **Deploy**: `bun run deploy` - Builds and deploys to GitHub Pages
- **Serve**: `bun run serve` - Serves built static files locally

**Critical**: Always ensure `bun run build` succeeds after any changes. The build uses a custom CSS minifier configuration.

## Architecture

### Core Technologies
- **Docusaurus 3.8.1**: Static site generator with React
- **TypeScript 5.8.3**: Primary language
- **Tailwind CSS 4.x**: Utility-first CSS framework via custom PostCSS plugin
- **React 19**: Component framework
- **MDX**: Markdown with JSX for blog posts and pages

### Site Structure
- **Blog-first**: Root path (`/`) serves blog posts, not traditional docs
- **Custom Pages**: `/projects`, `/about-us` pages in `src/pages/`
- **Components**: Extensive custom React components in `src/components/`
- **Theming**: Custom theme overrides in `src/theme/` for blog post pages
- **Styling**: Custom CSS in `src/css/custom.css` + Tailwind via plugin

### Key Configuration
- **Base URL**: `https://blog.vertexcover.io` (production)
- **Deployment**: GitHub Pages (`vertexcover-io/blog` repo)
- **Styling Plugin**: Custom Tailwind integration at `src/plugins/tailwind-plugin.js`
- **Analytics**: Google Analytics (gtag) configured
- **Future Flag**: Docusaurus v4 compatibility enabled

### Component Architecture
The site features many custom React components for blog content:
- Data visualization components (`QueueWaitChart`, `QueueingTheoryGraph`)
- Interactive simulators (`SmartScalingSimulator`, `MultiQueueSystem`)
- Content organization (`DeepDive`, `TLDR`, `SubSection`)
- Business components (`ClientCard`, `ProjectCard`, `CalendlyButton`)
- Technical utilities (`ComparisonTable`, `TechnicalCard`)

## Working Method

Create work tracking files in `docs/work/` folder using format:
`YYYY-MM-DD-[numbered-prefix]-[category]-[four-word-summary].md`

- **Date**: Use `date` command to get current date
- **Numbered prefix**: 001, 002, etc. (3-digit, per day)  
- **Category**: `bug`, `feature`, `task`, `research`, etc.
- **Summary**: Four-word description

## Development Notes

- **Docs disabled**: Site uses blog-first approach (`docs: false` in preset)
- **Trailing slash**: Explicitly disabled (`trailingSlash: false`)
- **Broken links**: Configured to throw errors (`onBrokenLinks: 'throw'`)
- **PostCSS**: Custom Tailwind integration via plugin, not standard Docusaurus approach


