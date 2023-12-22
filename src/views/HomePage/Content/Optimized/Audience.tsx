import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const Audience: FC = () => {
  const [flow] = useState('Optimize Content')
  const [title] = useState('Target Audience')
  const [subTitle] = useState('Generate a version of text that closely matches your target audience and is Optimized for marketing.')

  const [optional] = useState<Optional>({
    text: true,
    audience: {
      region: true,
      gender: true,
      age: true
    }
  });
  const [url] = useState<Url>({
    generator: "/content/optimized/audience/generator",
    history: "/content/optimized/audience/histories",
    content: "/content/optimized/audience/getHistoryById"
  });

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"audience"} optional={optional} url={url} />
  </>
}

export default Audience