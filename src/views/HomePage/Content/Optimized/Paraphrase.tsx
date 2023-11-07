import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Paraphrase: FC = () => {
  const [title] = useState('Generate Optimized Content Paraphrase')
  const [subTitle] = useState('Generate a paraphrased text that is optimized for marketing.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"paraphrase"} />
  </>
}

export default Paraphrase