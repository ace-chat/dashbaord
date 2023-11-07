import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'

const Odds: FC = () => {
  const [title] = useState('Generate Advantages/Benefits Email Content')
  const [subTitle] = useState('Generate an email to convert leads into customers for your brand.')

  return <>
    <Content title={title} subTitle={subTitle} tag={"odds"} />
  </>
}

export default Odds