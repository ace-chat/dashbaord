import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const Outline: FC = () => {
  const [flow] = useState('Blog')
  const [title] = useState('Outline')
  const [subTitle] = useState('Generate a marketing blog outline to get going with your blog.')

  const [optional] = useState<Optional>({
    topic: true,
    style: {
      tones: true,
      voice: true,
    },
    audience: {
      age: true
    }
  });
  const [url] = useState<Url>({
    generator: "/content/blog/outline/generator",
    history: "/content/blog/outline/histories",
    content: "/content/blog/outline/getHistoryById"
  });

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"outline"} optional={optional} url={url} />
  </>
}

export default Outline