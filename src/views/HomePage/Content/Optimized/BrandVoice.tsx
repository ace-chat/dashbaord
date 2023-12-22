import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const BrandVoice: FC = () => {
  const [flow] = useState('Optimize Content')
  const [title] = useState('Match Brand Voice')
  const [subTitle] = useState('Generate a version of any text that speaks like your brand and is Optimized for marketing.')

  const [optional] = useState<Optional>({
    text: true,
    style: {
      voice: true,
    }
  });
  const [url] = useState<Url>({
    generator: "/content/optimized/paraphrase/generator",
    history: "/content/optimized/paraphrase/histories",
    content: "/content/optimized/paraphrase/getHistoryById"
  });

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"voice"} optional={optional} url={url} />
  </>
}

export default BrandVoice