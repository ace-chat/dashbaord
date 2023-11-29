import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Audience: FC = () => {
  const [flow] = useState('Optimized Content')
  const [title] = useState('Target Audience')
  const [subTitle] = useState('Generate a version of text that closely matches your target audience and is optimized for marketing.')

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"audience"} />
  </>
}

export default Audience