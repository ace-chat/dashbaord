import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Outline: FC = () => {
  const [title] = useState('Generate Blog Outline')
  const [subTitle] = useState('Generate a marketing blog outline to get going with your blog.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"outline"} />
  </>
}

export default Outline