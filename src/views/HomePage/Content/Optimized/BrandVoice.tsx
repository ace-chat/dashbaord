import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const BrandVoice: FC = () => {
  const [title] = useState('Generate Optimized Content Match Brand Voice')
  const [subTitle] = useState('Generate a version of any text that speaks like your brand and is optimized for marketing.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"brandvoice"} />
  </>
}

export default BrandVoice