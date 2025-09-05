import PageTemplate, { generateMetadata } from './[slug]/page'

// Temporarily disable static generation to allow database schema sync
export const dynamic = 'force-dynamic'

export default PageTemplate

export { generateMetadata }
