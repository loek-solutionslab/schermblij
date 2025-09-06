import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { BlogGridBlock } from '@/blocks/BlogGrid/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CallToActionRelumeBlock } from '@/blocks/CallToActionRelume/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FooterBlock } from '@/blocks/FooterBlock/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { Header01Block } from '@/blocks/Header01/Component'
import { Header05Block } from '@/blocks/Header05/Component'
import { Layout01Block } from '@/blocks/Layout01/Component'
import { Layout03Block } from '@/blocks/Layout03/Component'
import { Layout04Block } from '@/blocks/Layout04/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { NavigationBlock } from '@/blocks/Navigation/Component'
import { TestimonialBlockComponent } from '@/blocks/Testimonial/Component'
import { FAQBlockComponent } from '@/blocks/FAQ/Component'
import { PricingBlockComponent } from '@/blocks/Pricing/Component'
import { TeamBlockComponent } from '@/blocks/Team/Component'
import { StatisticsBlock } from '@/blocks/Statistics/Component'
import { GalleryBlockComponent } from '@/blocks/Gallery/Component'

const blockComponents = {
  archive: ArchiveBlock,
  banner: BannerBlock,
  'blog-grid': BlogGridBlock,
  code: CodeBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  'cta-relume': CallToActionRelumeBlock,
  faq: FAQBlockComponent,
  'footer-block': FooterBlock,
  gallery: GalleryBlockComponent,
  formBlock: FormBlock,
  header01: Header01Block,
  header05: Header05Block,
  layout01: Layout01Block,
  layout03: Layout03Block,
  layout04: Layout04Block,
  mediaBlock: MediaBlock,
  navigation: NavigationBlock,
  pricing: PricingBlockComponent,
  statistics: StatisticsBlock,
  team: TeamBlockComponent,
  testimonial: TestimonialBlockComponent,
} as const

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  <Block {...(block as any)} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
