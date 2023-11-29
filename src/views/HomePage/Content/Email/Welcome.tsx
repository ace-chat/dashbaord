import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Welcome: FC = () => {
  const [flow] = useState('Email Ads')
  const [title] = useState('Welcome Email Content')
  const [subTitle] = useState('Generate an email to welcome new customers to your brand.')

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"welcome"} />
  </>
}

export default Welcome