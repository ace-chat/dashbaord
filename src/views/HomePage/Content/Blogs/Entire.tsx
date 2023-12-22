import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const Entire: FC = () => {
  const [flow] = useState('Blog')
  const [title] = useState('Entire')
  const [subTitle] = useState('Generate a marketing blog by providing information that you need included in the blog.')

  const [optional] = useState<Optional>({
    topic: true,
    style: {
      tones: true,
      type: true,
      voice: true,
      keyword: true,
    },
    audience: {
      age: true
    },
    word_count: true,
    other_detail: true,
  });
  const [url] = useState<Url>({
    generator: "/content/blog/entire/generator",
    history: "/content/blog/entire/histories",
    content: "/content/blog/entire/getHistoryById"
  });

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"entire"} optional={optional} url={url} />
  </>
}

export default Entire