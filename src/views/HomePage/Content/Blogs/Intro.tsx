import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const Intro: FC = () => {
  const [flow] = useState('Blog')
  const [title] = useState('Intro')
  const [subTitle] = useState('Generate a marketing blog introduction, if you’re in a writer’s block.')

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
    generator: "/content/blog/intro/generator",
    history: "/content/blog/intro/histories",
    content: "/content/blog/intro/getHistoryById"
  });

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"intro"} optional={optional} url={url} />
  </>
}

export default Intro