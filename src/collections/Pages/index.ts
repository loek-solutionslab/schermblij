import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { Banner } from '../../blocks/Banner/config'
import { BlogGrid } from '../../blocks/BlogGrid/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { CallToActionRelume } from '../../blocks/CallToActionRelume/config'
import { Code } from '../../blocks/Code/config'
import { Content } from '../../blocks/Content/config'
import { FooterBlock } from '../../blocks/FooterBlock/config'
import { FormBlock } from '../../blocks/Form/config'
import { Header01 } from '../../blocks/Header01/config'
import { Header05 } from '../../blocks/Header05/config'
import { Layout01 } from '../../blocks/Layout01/config'
import { Layout03 } from '../../blocks/Layout03/config'
import { Layout04 } from '../../blocks/Layout04/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { Testimonial } from '../../blocks/Testimonial/config'
import { FAQ } from '../../blocks/FAQ/config'
import { Gallery } from '../../blocks/Gallery/config'
import { Pricing } from '../../blocks/Pricing/config'
import { Navigation } from '../../blocks/Navigation/config'
import { Statistics } from '../../blocks/Statistics/config'
import { Team } from '../../blocks/Team/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { getServerSideURL } from '@/utilities/getURL'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pagess'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
      })

      return `${getServerSideURL()}${path}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Archive,
                Banner,
                BlogGrid,
                CallToAction,
                CallToActionRelume,
                Code,
                Content,
                FAQ,
                Gallery,
                FooterBlock,
                FormBlock,
                Header01,
                Header05,
                Layout01,
                Layout03,
                Layout04,
                MediaBlock,
                Navigation,
                Pricing,
                Statistics,
                Team,
                Testimonial,
              ],
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
