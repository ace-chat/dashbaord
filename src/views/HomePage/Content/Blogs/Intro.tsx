import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Intro: FC = () => {
  const [flow] = useState('Blog')
  const [title] = useState('Intro')
  const [subTitle] = useState('Generate a marketing blog introduction, if you’re in a writer’s block.')

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"intro"} />
  </>
}

export default Intro