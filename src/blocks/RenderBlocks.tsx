import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CallToActionRelumeBlock } from '@/blocks/CallToActionRelume/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FooterBlock } from '@/blocks/FooterBlock/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { Header05Block } from '@/blocks/Header05/Component'
import { Layout01Block } from '@/blocks/Layout01/Component'
import { Layout03Block } from '@/blocks/Layout03/Component'
import { Layout04Block } from '@/blocks/Layout04/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { NavigationBlock } from '@/blocks/Navigation/Component'
import { TestimonialBlockComponent } from '@/blocks/Testimonial/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  'cta-relume': CallToActionRelumeBlock,
  'footer-block': FooterBlock,
  formBlock: FormBlock,
  header05: Header05Block,
  layout01: Layout01Block,
  layout03: Layout03Block,
  layout04: Layout04Block,
  mediaBlock: MediaBlock,
  navigation: NavigationBlock,
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
