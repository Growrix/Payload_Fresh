# Payload CMS Project Audit Report

## Executive Summary

This is a **Payload CMS v3.52.0 monorepo** containing the core CMS framework, multiple templates, and a production-ready website template. The project follows a modern TypeScript + Next.js architecture with a comprehensive plugin ecosystem.

**Key Finding**: The main customizable website is located in `templates/website/` - this is where you should focus your development efforts.

---

## 🎯 **Quick Start Guide for Customization**

**Primary Working Directory**: `templates/website/`

- **Frontend Pages**: `templates/website/src/app/(frontend)/`
- **CMS Collections**: `templates/website/src/collections/`
- **Components**: `templates/website/src/components/`
- **Styling**: `templates/website/src/app/(frontend)/globals.css`

---

## 📁 **Root Level Structure Analysis**

### Core Configuration Files

| File                  | Purpose                           | Editable      | Notes                                       |
| --------------------- | --------------------------------- | ------------- | ------------------------------------------- |
| `package.json`        | Monorepo root, defines workspaces | ⚠️ Advanced   | Contains build scripts for entire ecosystem |
| `pnpm-workspace.yaml` | Workspace configuration           | ❌ Don't Edit | Defines monorepo structure                  |
| `turbo.json`          | Build orchestration               | ❌ Don't Edit | Handles multi-package builds                |
| `tsconfig.json`       | TypeScript config                 | ⚠️ Advanced   | Base TypeScript settings                    |

**Teacher Note**: These are monorepo management files. Editing them incorrectly can break the entire project build system.

### Documentation & Setup

| File/Folder       | Purpose                   | Editable | Notes                         |
| ----------------- | ------------------------- | -------- | ----------------------------- |
| `README.md`       | Project documentation     | ✅ Yes   | Update with your project info |
| `CONTRIBUTING.md` | Development guidelines    | ✅ Yes   | Customize for your team       |
| `.github/`        | GitHub Actions, templates | ✅ Yes   | CI/CD workflows               |
| `docs/`           | Extended documentation    | ✅ Yes   | API docs and guides           |

**Teacher Note**: Documentation is fully customizable and should be updated to reflect your project needs.

---

## 🏗️ **Core Directories Deep Dive**

### `/packages/` - Payload CMS Core

```
packages/
├── payload/           # Main CMS package
├── ui/               # Admin UI components
├── db-mongodb/       # MongoDB adapter
├── db-postgres/      # PostgreSQL adapter
├── next/            # Next.js integration
├── richtext-lexical/ # Rich text editor
└── plugin-*/        # Various plugins
```

**Role**: Contains the actual Payload CMS source code
**Editable**: ❌ **DO NOT EDIT** - These are the core CMS files
**Teacher Note**: This is the framework itself. Modifying these files would be like editing React's source code. Use templates instead.

### `/templates/` - Project Templates

```
templates/
├── website/          # 🎯 YOUR MAIN WORKSPACE
├── blank/           # Minimal template
├── with-postgres/   # PostgreSQL example
├── with-payload-cloud/ # Cloud hosting
└── _template/       # Template generator
```

**Role**: Pre-built project configurations
**Focus**: `templates/website/` is your customizable website
**Teacher Note**: Each template is a complete, deployable project. `website/` is the most feature-complete.

---

## 🌐 **Website Template Detailed Analysis**

**Location**: `templates/website/`

### Core Configuration

| File                 | Purpose                | Customizable | Priority                   |
| -------------------- | ---------------------- | ------------ | -------------------------- |
| `package.json`       | Dependencies & scripts | ✅ High      | Add your dependencies here |
| `next.config.js`     | Next.js configuration  | ✅ Medium    | Customize build settings   |
| `tailwind.config.js` | Styling configuration  | ✅ High      | Define your design system  |
| `payload.config.ts`  | CMS configuration      | ✅ High      | Core CMS setup             |

**Teacher Note**: These files control how your website builds and behaves. Start with `payload.config.ts` for CMS setup.

### Application Structure (`src/`)

```
src/
├── app/
│   ├── (frontend)/   # 🎯 YOUR WEBSITE PAGES
│   └── (payload)/    # CMS admin interface
├── collections/      # 🎯 YOUR DATA MODELS
├── components/       # 🎯 YOUR REACT COMPONENTS
├── Footer/          # Global footer
├── Header/          # Global navigation
└── utilities/       # Helper functions
```

**Teacher Note**: The `(frontend)` and `(payload)` folders use Next.js route groups to separate your website from the admin panel.

### Frontend Pages (`src/app/(frontend)/`)

| File/Folder   | Purpose          | Customizable | Notes                             |
| ------------- | ---------------- | ------------ | --------------------------------- |
| `layout.tsx`  | Site-wide layout | ✅ High      | Wrap all pages with header/footer |
| `page.tsx`    | Homepage         | ✅ High      | Your main landing page            |
| `globals.css` | Global styles    | ✅ High      | Site-wide CSS and Tailwind        |
| `[slug]/`     | Dynamic pages    | ✅ Medium    | Handles CMS-generated pages       |

**Teacher Note**: This is where you build your actual website. `page.tsx` is your homepage - start here!

### Collections (`src/collections/`)

```
collections/
├── Users.ts          # User accounts
├── Pages.ts          # Website pages
├── Posts.ts          # Blog posts
├── Media.ts          # File uploads
└── Categories.ts     # Content categories
```

**Role**: Define your content types (like database schemas)
**Customizable**: ✅ **HIGH PRIORITY** - This defines what content you can manage
**Teacher Note**: Collections are like database tables. Add new collections for your content types (products, services, etc.).

### Components (`src/components/`)

```
components/
├── AdminBar/         # Admin preview bar
├── BeforeDashboard/  # Admin welcome screen
├── RichText/        # Content renderer
├── ui/              # Reusable UI components
└── ...
```

**Role**: Reusable React components
**Customizable**: ✅ **HIGH PRIORITY** - Build your UI here
**Teacher Note**: The `ui/` folder contains design system components. Start by customizing existing components before creating new ones.

---

## 🎨 **Styling System**

### Tailwind CSS Setup

| File                 | Purpose              | Customization Level       |
| -------------------- | -------------------- | ------------------------- |
| `tailwind.config.js` | Design tokens        | ✅ Primary styling config |
| `globals.css`        | CSS base & utilities | ✅ Custom CSS rules       |
| `postcss.config.js`  | CSS processing       | ⚠️ Advanced users only    |

**Teacher Note**: Tailwind config is where you define colors, fonts, spacing. This controls your entire design system.

### UI Component Library

- **Location**: `src/components/ui/`
- **Framework**: Radix UI + Tailwind
- **Customizable**: ✅ Full control
- **Examples**: Button, Card, Input, Select components

**Teacher Note**: These are your building blocks. Customize the base components and your entire site updates consistently.

---

## 🗃️ **Database & Content**

### Database Configuration

- **Current**: MongoDB (via `@payloadcms/db-mongodb`)
- **Alternatives**: PostgreSQL, SQLite, Vercel Postgres
- **Configuration**: In `src/payload.config.ts`

**Teacher Note**: You can switch databases by changing the adapter in the config. MongoDB is the default and works well for most projects.

### Content Management

- **Location**: Defined in `src/collections/`
- **Admin Interface**: Available at `/admin`
- **API**: Auto-generated REST & GraphQL APIs

**Teacher Note**: Every collection automatically gets CRUD operations and an admin interface. No additional setup needed.

---

## 🛠️ **Development Workflow**

### Essential Commands

```bash
# Development
cd templates/website
pnpm dev                 # Start dev server
pnpm build              # Production build
pnpm start              # Run production server

# Content Management
pnpm payload generate:types  # Generate TypeScript types
pnpm payload             # Payload CLI commands
```

### File Watching & Hot Reload

- **Frontend**: Next.js hot reload (automatic)
- **Collections**: Requires restart when modified
- **Components**: Hot reload enabled

**Teacher Note**: Frontend changes update instantly. CMS schema changes (collections) need a server restart.

---

## ⚠️ **What NOT to Touch**

### Strictly Off-Limits

- `/packages/` - Core Payload source code
- `/node_modules/` - Dependencies
- `/.next/` - Build cache
- `/test/` - Framework testing

### Advanced Users Only

- Root `package.json` - Monorepo configuration
- `turbo.json` - Build orchestration
- `/tools/` - Development utilities

**Teacher Note**: These files control the framework itself. Breaking them means reinstalling the entire project.

---

## 🎯 **Customization Roadmap**

### Phase 1: Quick Wins (Start Here)

1. **Update Homepage**: Edit `templates/website/src/app/(frontend)/page.tsx`
2. **Customize Styling**: Modify `templates/website/tailwind.config.js`
3. **Add Content**: Use existing collections (Pages, Posts, Media)
4. **Update Layout**: Edit `templates/website/src/app/(frontend)/layout.tsx`

### Phase 2: Content Structure

1. **Create Collections**: Add new content types in `src/collections/`
2. **Build Components**: Create React components in `src/components/`
3. **Design System**: Customize `src/components/ui/` components
4. **Add Pages**: Create new routes in `src/app/(frontend)/`

### Phase 3: Advanced Features

1. **Plugins**: Configure in `src/plugins/`
2. **API Endpoints**: Add custom endpoints in `src/endpoints/`
3. **Hooks**: Add lifecycle hooks in `src/hooks/`
4. **Search**: Implement search functionality

**Teacher Note**: Follow this order to avoid breaking changes. Get the basics working before adding complex features.

---

## 🔧 **Configuration Deep Dive**

### Key Configuration Files

1. **`src/payload.config.ts`** - Main CMS configuration

   - Database connection
   - Admin settings
   - Plugin configuration
   - Collections registration

2. **`next.config.js`** - Next.js configuration

   - Build optimization
   - API routes
   - Static file handling

3. **Environment Variables** (`.env`)
   ```
   PAYLOAD_SECRET=          # JWT secret
   DATABASE_URI=           # Database connection
   NEXT_PUBLIC_SERVER_URL= # Public server URL
   ```

**Teacher Note**: Environment variables control sensitive settings. Never commit real values to git.

---

## 📊 **Plugin Ecosystem**

### Included Plugins

- **Form Builder**: Contact forms, surveys
- **SEO**: Meta tags, sitemaps
- **Search**: Full-text search functionality
- **Redirects**: URL redirect management
- **Nested Docs**: Hierarchical content

### Adding New Plugins

```typescript
// In src/payload.config.ts
plugins: [
  seoPlugin({
    collections: ['pages', 'posts'],
  }),
  // Add your plugins here
]
```

**Teacher Note**: Plugins extend Payload's functionality. Each plugin adds new admin interfaces and API endpoints automatically.

---

## 🚀 **Deployment Considerations**

### Build Output

- **Frontend**: Static/SSR Next.js app
- **Admin**: Bundled admin interface
- **API**: Node.js server

### Environment Requirements

- Node.js 18+
- Database (MongoDB recommended)
- File storage (local or cloud)

**Teacher Note**: The website template is production-ready. Just configure environment variables and deploy.

---

## 📝 **Summary & Next Steps**

### What You Should Keep

- ✅ All of `/templates/website/` - Your main workspace
- ✅ Core framework in `/packages/` - Don't edit, but keep
- ✅ Documentation in `/docs/` - Reference material

### What You Can Remove

- ❌ Other templates in `/templates/` (blank, postgres, etc.) if not needed
- ❌ `/examples/` - Just reference material
- ❌ Test files in `/test/` if not contributing to core

### Where to Start Building

1. **Begin Here**: `templates/website/src/app/(frontend)/page.tsx`
2. **Then**: `templates/website/tailwind.config.js`
3. **Next**: `templates/website/src/collections/`
4. **Finally**: `templates/website/src/components/`

**Teacher Note**: This is a powerful, production-ready CMS. Start small with homepage customization, then expand to match your needs. The learning curve is moderate, but the capabilities are extensive.

---

_Last Updated: September 1, 2025_
_Payload Version: 3.52.0_
