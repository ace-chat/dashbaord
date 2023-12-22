import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const Welcome: FC = () => {
  const [flow] = useState('Email Ads')
  const [title] = useState('Welcome Email Content')
  const [subTitle] = useState('Generate an email to welcome new customers to your brand.')

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
    generator: "/content/email/welcome/generator",
    history: "/content/email/welcome/histories",
    content: "/content/email/welcome/getHistoryById"
  });

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"welcome"} optional={optional} url={url} />
  </>
}

export default Welcome