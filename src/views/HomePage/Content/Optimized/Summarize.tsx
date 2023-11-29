import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Summarize: FC = () => {
  const [flow] = useState('Optimized Content')
  const [title] = useState('Summarize')
  const [subTitle] = useState('Generate a summary of any text that is optimized for marketing.')

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"summarize"} />
  </>
}

export default Summarize