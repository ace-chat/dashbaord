import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Outline: FC = () => {
  const [flow] = useState('Blog')
  const [title] = useState('Outline')
  const [subTitle] = useState('Generate a marketing blog outline to get going with your blog.')

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"outline"} />
  </>
}

export default Outline