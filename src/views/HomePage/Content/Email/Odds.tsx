import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const Odds: FC = () => {
  const [flow] = useState('Email Ads')
  const [title] = useState('Advantages/Benefits Email Content')
  const [subTitle] = useState('Generate an email to convert leads into customers for your brand.')

  const [optional] = useState<Optional>({
    details: {
      brand_name: true,
      brand_desc: true,
      service_name: true,
      service_desc: true
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
    generator: "/content/email/advantage/generator",
    history: "/content/email/advantage/histories",
    content: "/content/email/advantage/getHistoryById"
  });

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"odds"} optional={optional} url={url} />
  </>
}

export default Odds