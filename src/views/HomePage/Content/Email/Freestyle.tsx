import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Freestyle: FC = () => {
  const [title] = useState('Generate Freestyle Email Content')
  const [subTitle] = useState('Generate an email based on any information or theme for your brand.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"freestyle"} />
  </>
}

export default Freestyle