import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const Freestyle: FC = () => {
  const [flow] = useState('Email Ads')
  const [title] = useState('Freestyle Email Content')
  const [subTitle] = useState('Generate an email based on any information or theme for your brand.')

  const [optional] = useState<Optional>({
    details: {
      text: true,
    },
    style: {
      tones: true,
      voice: true,
    },
    audience: {
      region: true,
      gender: true,
      age: true
    }
  });
  const [url] = useState<Url>({
    generator: "/content/email/freestyle/generator",
    history: "/content/email/freestyle/histories",
    content: "/content/email/freestyle/getHistoryById"
  });

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"freestyle"} optional={optional} url={url} />
  </>
}

export default Freestyle