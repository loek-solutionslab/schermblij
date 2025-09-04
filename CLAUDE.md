# CLAUDE.md
## Development Guide for New Payload CMS V3 Project

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with code in this repository. It contains critical setup instructions, migration best practices, and deployment guidelines for Payload CMS V3.

## CRITICAL WARNINGS - READ BEFORE STARTING

### THE CARDINAL RULE: Never Mix Push Mode with Production

**This is the #1 cause of deployment disasters.** Mixing Payload's push mode with production migrations causes irreversible schema drift that will destroy your production database.

**Development Setup:**
```bash
# .env.local - ONLY for development
PAYLOAD_DATABASE_SYNC=true
```

**Production Setup:**
```bash
# Production environment - NEVER set PAYLOAD_DATABASE_SYNC=true
PAYLOAD_MIGRATE_SKIP_PROMPT=true
NODE_ENV=production
```

---

## What is Payload?

Payload is a **Next.js fullstack framework** that provides instant backend superpowers. Since version 3.0, it's the first CMS that installs directly into your Next.js app folder without any third-party SaaS services.

### Core Features
- **Full Admin Panel**: React-based using Next.js App Router, completely extensible
- **Automatic Database Management**: Schema generation, migrations, transactions, proper indexing
- **Instant APIs**: Local API (direct database access), REST API, and GraphQL
- **Built-in Authentication**: JWT-based with granular access control
- **File & Media Management**: Image optimization, cropping, focal points
- **Live Preview**: Real-time content updates visible in frontend
- **TypeScript-First**: Full type safety with auto-generated types
- **Database Agnostic**: Support for PostgreSQL, MongoDB, and other databases via adapters
- **Serverless Ready**: Deploy to Vercel, Railway, or any Node.js host
- **Jobs Queue**: Defer tasks, run on schedule, set up workflows
- **Version Control**: Keep history of document changes with drafts support

### Primary Use Cases
1. **Headless CMS** - Content management with marketing-friendly features
2. **Enterprise Tools** - Internal applications with complex business logic
3. **Headless Commerce** - E-commerce with integrated content management
4. **Digital Asset Management** - Media organization and delivery at scale
5. **Custom Applications** - Build anything requiring a backend and admin UI

---

## Initial Project Setup

### Prerequisites
- Node.js 18.20+
- PostgreSQL database (local or hosted)
- pnpm (recommended) or npm/yarn



### Environment Configuration

**Development (.env.local):**
```bash
DATABASE_URI=postgresql://localhost:5432/payload_dev
PAYLOAD_SECRET=dev-secret-key-change-in-production
PAYLOAD_DATABASE_SYNC=true  # ONLY for development
NODE_ENV=development
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Production (.env.production):**
```bash
DATABASE_URI=postgresql://[production-connection-string]
PAYLOAD_SECRET=[secure-production-secret-min-32-chars]
NODE_ENV=production
PAYLOAD_MIGRATE_SKIP_PROMPT=true
NEXT_PUBLIC_SERVER_URL=https://[your-domain].com
# NEVER include PAYLOAD_DATABASE_SYNC in production
```

---

## Essential Commands

### Development
```bash
# Start development server (port 3000)
pnpm dev

# Build for production (runs migrations first)
pnpm build

# Start production server
pnpm start

# Test production build locally
pnpm dev:prod
```

### Code Quality
```bash
# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Generate TypeScript types from Payload schema
pnpm generate:types

# Generate import map for Payload admin
pnpm generate:importmap
```

### Database & Migrations
```bash
# Run migrations
pnpm payload migrate

# Create new migration
pnpm payload migrate:create migration_name

# Check migration status
pnpm payload migrate:status

# Access Payload CLI
pnpm payload [command]
```

---

## Architecture Planning

### Project Structure
```
/app
  /(frontend)     # Public routes
  /(payload)      # Admin/API routes
/src
  /blocks         # Reusable content blocks
  /collections    # Data models
  /fields         # Reusable field configurations
  /globals        # Single-instance configs
  /migrations     # Database migrations
/public
  /media          # Uploaded files (configure volume in production)
```

### Key Architectural Decisions to Make Early

1. **Database Naming Convention**
   - **CRITICAL**: Choose snake_case OR camelCase and stick with it
   - Recommended: snake_case for PostgreSQL compatibility
   - Configure in payload.config.ts from day one

2. **Content Strategy**
   - Block-based for flexible layouts
   - Fixed templates for structured content
   - Hybrid approach for different page types

3. **Authentication Strategy**
   - Single Users collection vs multiple user types
   - JWT configuration and cookie settings
   - Session duration and refresh strategy

4. **Media Storage**
   - Local storage for development
   - Cloud storage (S3, Cloudinary) for production
   - CDN configuration for performance

---

## Core Concepts

### Collections
Collections are the primary way to structure recurring data. Each collection:
- Represents a group of documents with common schema
- Auto-generates Local API, REST API, and GraphQL API endpoints
- Supports authentication when enabled
- Includes access control, hooks, and admin UI configuration

### Fields
Fields define the schema and UI for documents:
- **Field Types**: Text, Number, Select, Relationship, Array, Blocks, RichText, Upload
- **Validation**: Built-in and custom validation rules
- **Conditional Logic**: Show/hide based on other fields
- **Access Control**: Field-level permissions
- **Localization**: Field-level translation support
- **Hooks**: Field-specific lifecycle hooks

### Hooks
Execute custom logic during document lifecycle:

**Collection Hooks**:
- `beforeOperation`: Modify arguments before operations
- `beforeChange`: Run before create/update
- `afterChange`: Run after create/update
- `afterRead`: Modify data before returning
- `beforeDelete`/`afterDelete`: Handle deletion logic

### Access Control
Define permissions at multiple levels:
```typescript
// Collection-level
access: {
  create: ({ req: { user } }) => user?.role === 'admin',
  read: true, // Public access
  update: ({ req: { user }, id }) => user?.id === id,
  delete: () => false, // No one can delete
}
```

### Globals
Single-instance documents for non-repeating data:
- Site settings
- Navigation menus
- Footer content
- SEO defaults

---

## Migration Strategy - REQUIRED FOR ALL DEPLOYMENTS

### CRITICAL: Migrations Are Always Required

**Even if you use the same remote database for development and production, you STILL need migrations.** This confuses many people, so let's be clear:

- **Migrations are NOT about moving data**
- **Migrations are about documenting structure changes**
- **Every schema change needs a migration file before deployment**

### Why Migrations Are Required (Simple Explanation)

When you develop locally with `PAYLOAD_DATABASE_SYNC=true`, you're making instant changes to the database structure. But Payload in production needs a "paper trail" of these changes. The migration file is that paper trail.

Think of it like this:
- Development mode: "Just change the filing cabinet"  
- Production mode: "Show me the instruction manual for what changed"

Even though the changes are already in the database (because you used the same remote database), production Payload still needs the migration file to understand what happened.

### Development Workflow (MUST FOLLOW)
```bash
# 1. Enable push mode for development ONLY
echo "PAYLOAD_DATABASE_SYNC=true" >> .env.local

# 2. Make schema changes and test
pnpm dev
# Your changes are now in the database

# 3. CRITICAL STEP - Before EVERY deployment, generate migration
pnpm payload migrate:create descriptive_name
# This creates the "paper trail" production needs

# 4. Test migration locally
pnpm payload migrate
# Usually does nothing (changes already applied) but verifies the file is valid

# 5. Commit migration files
git add migrations/
git commit -m "Add migration for [feature]"

# 6. Deploy - migration file tells production what changed
git push
```

### Common Misunderstanding

**"I'm using the same database for development and production, so I don't need migrations"**

WRONG. You still need migrations because:
1. Production Payload tracks which migrations have been applied
2. Without migration files, production doesn't know the database structure is valid
3. Payload will error without the migration history

### The Only Way to Skip Migrations (NOT RECOMMENDED)

If you absolutely refuse to deal with migrations, you must:
1. Set `PAYLOAD_DATABASE_SYNC=true` in production too
2. Accept the risks: data loss, no rollback, potential downtime
3. This goes against all best practices

### Database Adapter Configuration
```typescript
// payload.config.ts - CORRECT configuration
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  database: postgresAdapter({
    pool: { connectionString: databaseURI },
    // Production: use migrations
    ...(process.env.NODE_ENV === 'production' && {
      migrationDir: path.resolve(dirname, './migrations'),
    }),
    // Development: use push mode
    ...(process.env.NODE_ENV !== 'production' && {
      push: true,
    }),
  }),
})
```

### What NOT to Do
```typescript
// NEVER in production
database: postgresAdapter({
  pool: { connectionString: databaseURI },
  push: true, // This WILL destroy your production database
})
```

---

## Railway Deployment Setup

### Initial Railway Configuration

1. **Create Railway Project**
```bash
railway login
railway new [project-name]
railway link
```

2. **Add PostgreSQL Database**
```bash
railway add postgresql
```

3. **Configure Environment Variables**
```bash
DATABASE_URI=${{Postgres.DATABASE_URL}}
PAYLOAD_SECRET=[generate-secure-32-char-min]
NEXT_PUBLIC_SERVER_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}
NODE_ENV=production
PAYLOAD_MIGRATE_SKIP_PROMPT=true
```

### Docker Configuration for Railway

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS base
WORKDIR /app

# Install pnpm and su-exec for user switching
RUN npm install -g pnpm && \
    apk add --no-cache su-exec

# Dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Builder
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Runner - DO NOT switch user in Dockerfile
FROM base AS runner
ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY scripts/start.sh ./

# Make startup script executable
RUN chmod +x start.sh

EXPOSE 3000
CMD ["./start.sh"]
```

**scripts/start.sh:**
```bash
#!/bin/sh
# Fix Railway volume permissions (critical for media uploads)
if [ -d "/app/public/media" ]; then
    chmod -R 755 /app/public/media/lost+found 2>/dev/null || rm -rf /app/public/media/lost+found
    chown -R node:node /app/public/media
fi

# Switch to non-root user for security
exec su-exec node:node node server.js
```

---

## Database Schema Best Practices

### Naming Conventions (DECIDE EARLY)
- **Choose ONE**: snake_case OR camelCase
- **Recommended**: snake_case for PostgreSQL
- **NEVER**: Mix naming conventions

### Safe Schema Changes
- Adding optional fields
- Adding new collections
- Adding enum values (append only)
- Adding indexes

### Dangerous Schema Changes (Require Multi-Step Migration)
- Removing fields (causes data loss)
- Changing field types
- Renaming fields/collections
- Removing enum values
- Adding required fields to existing collections

### Multi-Step Migration Strategy
```typescript
// Step 1: Add new field alongside old
fields: [
  { name: 'oldField', type: 'text', admin: { hidden: true } },
  { name: 'newField', type: 'select', options: [...] },
]

// Step 2: Create data migration
// Step 3: Remove old field in next deployment
```

---

## Development Best Practices

### Performance
- Use `depth` parameter to limit nested data fetching
- Implement pagination for large collections
- Use indexes on frequently queried fields
- Optimize images with Sharp integration
- Use server components by default
- Leverage Payload's Local API in server components

### Security
- Always validate and sanitize user input
- Use field-level access control for sensitive data
- Store secrets in environment variables
- Enable CSRF protection in production
- Use JWT with httpOnly cookies for auth
- Never expose database credentials

### Code Organization
- Group related collections in subdirectories
- Create reusable field configs in `/fields`
- Keep hooks in separate files for complex logic
- Use TypeScript for type safety
- Generate types after schema changes (`pnpm generate:types`)
- Maintain separation between frontend and payload routes

---

## Pre-Deployment Checklist

Before EVERY deployment:

- [ ] Schema changes tested locally with push mode
- [ ] Migration file generated for any schema changes
- [ ] Migration tested locally
- [ ] Production environment variables configured correctly
- [ ] `PAYLOAD_MIGRATE_SKIP_PROMPT=true` set in production
- [ ] NO `PAYLOAD_DATABASE_SYNC` in production
- [ ] Migration files committed to git
- [ ] Build tested locally with `pnpm build`
- [ ] TypeScript types generated and committed

---

## Warning Signs to Prevent

### During Development
- Making schema changes without generating migrations
- Different behavior between local and production
- Seeing "column doesn't exist" errors
- Forgetting to test migrations before deployment

### During Deployment
- Build process hanging on migration prompts
- "Relation does not exist" errors
- TypeScript errors that weren't present locally
- Container restart loops

### After Deployment
- Database queries failing with schema errors
- Admin panel showing empty collections
- Need to manually run SQL commands
- Production data not matching expected schema

---

## Emergency Recovery Procedures

### If Schema Drift Occurs
1. **STOP** - Do not attempt manual SQL fixes
2. **Backup** existing data if valuable
3. **Fresh Start**:
   ```bash
   # Create new database
   # Update DATABASE_URI
   # Redeploy with all migrations
   ```

### Local Development Reset
```bash
# Complete reset
dropdb payload_dev && createdb payload_dev
rm -rf migrations/
pnpm payload migrate:create initial_setup
```

### Production Debugging
```bash
# Check logs
railway logs

# Connect to database
railway connect postgres

# Force redeploy
railway up --detach
```

---

## Golden Rules for Success

1. **NEVER** mix push mode with production migrations
2. **ALWAYS** generate migrations before deployment
3. **ALWAYS** use consistent database naming (snake_case)
4. **ALWAYS** test production builds locally first
5. **NEVER** manually edit production database schema
6. **ALWAYS** handle volume permissions in Docker startup
7. **ALWAYS** set `PAYLOAD_MIGRATE_SKIP_PROMPT=true` in production
8. **NEVER** deploy schema changes without migration files

---

## Success Indicators

Your setup is correct when:
- Deployments complete without manual intervention
- No schema-related errors in any environment
- Local and production behave identically
- Migrations run automatically during build
- Admin panel works immediately after deployment
- No container restart loops
- Media uploads work without permission errors

---

## Key Takeaways

Starting a new Payload project with these guidelines will prevent:
- Schema drift between environments
- Migration prompt build failures
- Database naming conflicts
- Volume permission errors
- Container security issues
- Manual database intervention needs

Follow this guide from day one to avoid deployment disasters and ensure smooth development and production operations.