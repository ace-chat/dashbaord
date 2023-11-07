import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Entire: FC = () => {
  const [title] = useState('Generate Blog Entire')
  const [subTitle] = useState('Generate a marketing blog by providing information that you need included in the blog.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"entire"} />
  </>
}

export default Entire