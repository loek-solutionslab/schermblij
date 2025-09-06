// storage-adapter-import-placeholder
import { s3Storage } from '@payloadcms/storage-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { AgeGroups } from './collections/AgeGroups'
import { Categories } from './collections/Categories'
import { Comments } from './collections/Comments'
import { CourseCategories } from './collections/CourseCategories'
import { Courses } from './collections/Courses'
import { FormSubmissions } from './collections/FormSubmissions'
import { Gallery } from './collections/Gallery'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Team } from './collections/Team'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { SiteSettings } from './SiteSettings/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // Enable push mode when PAYLOAD_DATABASE_SYNC is set or in development
    push: process.env.PAYLOAD_DATABASE_SYNC === 'true' || process.env.NODE_ENV !== 'production',
  }),
  collections: [Pages, Posts, Media, Categories, Users, Comments, AgeGroups, CourseCategories, Courses, FormSubmissions, Gallery, Team],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, SiteSettings],
  plugins: [
    ...plugins,
    // S3 Storage - Only enabled in production
    ...(process.env.NODE_ENV === 'production' 
      ? [s3Storage({
          collections: {
            media: true,
          },
          bucket: process.env.S3_BUCKET || '',
          config: {
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
            },
            region: process.env.S3_REGION || 'us-east-1',
            endpoint: process.env.S3_ENDPOINT, // Optional: for S3-compatible services
            forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true', // For S3-compatible services
          },
        })]
      : []
    ),
  ],
  endpoints: [
    {
      path: '/health',
      method: 'get',
      handler: async (req) => {
        return new Response('OK', { status: 200 });
      }
    }
  ],
  secret: process.env.PAYLOAD_SECRET || '6TcsY6nZRfbdjsAFviyMqplVPiDzKQjG3+1Dt4R8l+Q=', // Force rebuild
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
