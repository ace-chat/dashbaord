import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Welcome: FC = () => {
  const [title] = useState('Generate Welcome Email Content')
  const [subTitle] = useState('Generate an email to welcome new customers to your brand.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"welcome"} />
  </>
}

export default Welcome