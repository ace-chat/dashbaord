import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Freestyle: FC = () => {
  const [flow] = useState('Email Ads')
  const [title] = useState('Freestyle Email Content')
  const [subTitle] = useState('Generate an email based on any information or theme for your brand.')

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"freestyle"} />
  </>
}

export default Freestyle