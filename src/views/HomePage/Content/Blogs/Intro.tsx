import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Intro: FC = () => {
  const [title] = useState('Generate Blog Intro')
  const [subTitle] = useState('Generate a marketing blog introduction, if you’re in a writer’s block.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"intro"} />
  </>
}

export default Intro