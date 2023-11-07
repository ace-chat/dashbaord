import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Media: FC = () => {
  const [title] = useState('Generate AI Social Media Ads Content')
  const [subTitle] = useState('Generate a personalized caption for your product or service for the platform of your choice.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"media"} />
  </>
}

export default Media