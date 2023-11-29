import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Marketing: FC = () => {
  const [flow] = useState('Email Ads')
  const [title] = useState('Cold Marketing Email Content')
  const [subTitle] = useState('Generate an email to generate more leads for your brand.')

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"marketing"} />
  </>
}

export default Marketing