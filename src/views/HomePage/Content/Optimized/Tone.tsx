import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Tone: FC = () => {
  const [title] = useState('Generate Optimized Content Change Tone')
  const [subTitle] = useState('Generate a version of text in a different tone that is optimized for marketing.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"tone"} />
  </>
}

export default Tone