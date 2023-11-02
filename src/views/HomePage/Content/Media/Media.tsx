import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Media: FC = () => {
  const [title] = useState('Generate AI Social Media Ads Content')
  const [subTitle] = useState('Tell us more about your project in detail so we can get a best content!')

  return <>
    <Content title={title} subTitle={subTitle} />
  </>
}

export default Media