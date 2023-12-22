import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const Summarize: FC = () => {
  const [flow] = useState('Optimize Content')
  const [title] = useState('Summarize')
  const [subTitle] = useState('Generate a summary of any text that is Optimized for marketing.')

  const [optional] = useState<Optional>({
    text: true,
    word_count: true,
  });
  const [url] = useState<Url>({
    generator: "/content/optimized/summarize/generator",
    history: "/content/optimized/summarize/histories",
    content: "/content/optimized/summarize/getHistoryById"
  });

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"summarize"} optional={optional} url={url} />
  </>
}

export default Summarize