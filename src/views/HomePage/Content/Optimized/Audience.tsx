import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Audience: FC = () => {
  const [title] = useState('Generate Optimized Content Target Audience')
  const [subTitle] = useState('Generate a version of text that closely matches your target audience and is optimized for marketing.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"audience"} />
  </>
}

export default Audience