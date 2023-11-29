import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const BrandVoice: FC = () => {
  const [flow] = useState('Optimized Content')
  const [title] = useState('Match Brand Voice')
  const [subTitle] = useState('Generate a version of any text that speaks like your brand and is optimized for marketing.')

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"brandvoice"} />
  </>
}

export default BrandVoice