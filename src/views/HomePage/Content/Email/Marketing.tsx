import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Marketing: FC = () => {
  const [title] = useState('Generate Cold Marketing Email Content')
  const [subTitle] = useState('Generate an email to generate more leads for your brand.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"marketing"} />
  </>
}

export default Marketing