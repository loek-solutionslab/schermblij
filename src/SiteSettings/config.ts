import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings'
  },
  label: 'Site Instellingen',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'site_name',
      type: 'text',
      label: 'Site Name',
      defaultValue: 'SchermBlij',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        description: 'Short description or motto for the site',
      },
    },
    {
      name: 'default_seo',
      type: 'group',
      label: 'Default SEO Settings',
      fields: [
        {
          name: 'meta_title',
          type: 'text',
          label: 'Default Meta Title',
          admin: {
            description: 'Used when pages don\'t have their own title',
          },
        },
        {
          name: 'meta_description',
          type: 'textarea',
          label: 'Default Meta Description',
          admin: {
            rows: 3,
            description: 'Used when pages don\'t have their own description',
          },
        },
        {
          name: 'og_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Default Open Graph Image',
          admin: {
            description: 'Default image for social media sharing',
          },
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Primary Email',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Primary Phone Number',
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp Number',
          admin: {
            description: 'Include country code (e.g., +31)',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Physical Address',
          admin: {
            rows: 4,
          },
        },
        {
          name: 'kvk_number',
          type: 'text',
          label: 'KvK Number',
          admin: {
            description: 'Chamber of Commerce registration number',
          },
        },
      ],
    },
    {
      name: 'social_media',
      type: 'group',
      label: 'Social Media Accounts',
      fields: [
        {
          name: 'facebook_url',
          type: 'text',
          label: 'Facebook URL',
          admin: {
            placeholder: 'https://facebook.com/schermblij',
          },
        },
        {
          name: 'instagram_url',
          type: 'text',
          label: 'Instagram URL',
          admin: {
            placeholder: 'https://instagram.com/schermblij',
          },
        },
        {
          name: 'linkedin_url',
          type: 'text',
          label: 'LinkedIn URL',
          admin: {
            placeholder: 'https://linkedin.com/company/schermblij',
          },
        },
        {
          name: 'youtube_url',
          type: 'text',
          label: 'YouTube URL',
          admin: {
            placeholder: 'https://youtube.com/@schermblij',
          },
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics & Tracking',
      fields: [
        {
          name: 'google_analytics_id',
          type: 'text',
          label: 'Google Analytics ID',
          admin: {
            placeholder: 'G-XXXXXXXXXX',
            description: 'Google Analytics 4 measurement ID',
          },
        },
        {
          name: 'google_tag_manager_id',
          type: 'text',
          label: 'Google Tag Manager ID',
          admin: {
            placeholder: 'GTM-XXXXXXX',
            description: 'Google Tag Manager container ID',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}