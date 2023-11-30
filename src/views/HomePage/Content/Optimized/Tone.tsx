import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Tone: FC = () => {
  const [flow] = useState('Optimize Content')
  const [title] = useState('Change Tone')
  const [subTitle] = useState('Generate a version of text in a different tone that is Optimized for marketing.')

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"tone"} />
  </>
}

export default Tone