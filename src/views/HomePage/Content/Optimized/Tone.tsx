import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const Tone: FC = () => {
  const [flow] = useState('Optimize Content')
  const [title] = useState('Change Tone')
  const [subTitle] = useState('Generate a version of text in a different tone that is Optimized for marketing.')

  const [optional] = useState<Optional>({
    text: true,
    style: {
      tones: true,
    },
  });
  const [url] = useState<Url>({
    generator: "/content/optimized/tone/generator",
    history: "/content/optimized/tone/histories",
    content: "/content/optimized/tone/getHistoryById"
  });

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"tone"} optional={optional} url={url} />
  </>
}

export default Tone