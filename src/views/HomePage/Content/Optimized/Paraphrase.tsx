import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const Paraphrase: FC = () => {
  const [flow] = useState('Optimize Content')
  const [title] = useState('Content Paraphrase')
  const [subTitle] = useState('Generate a paraphrased text that is Optimized for marketing.')

  const [optional] = useState<Optional>({
    text: true,
  });
  const [url] = useState<Url>({
    generator: "/content/optimized/paraphrase/generator",
    history: "/content/optimized/paraphrase/histories",
    content: "/content/optimized/paraphrase/getHistoryById"
  });

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"paraphrase"} optional={optional} url={url} />
  </>
}

export default Paraphrase