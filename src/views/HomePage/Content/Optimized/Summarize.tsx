import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Summarize: FC = () => {
  const [title] = useState('Generate Optimized Content Summarize')
  const [subTitle] = useState('Generate a summary of any text that is optimized for marketing.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"summarize"} />
  </>
}

export default Summarize