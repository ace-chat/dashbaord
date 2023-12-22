import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const Marketing: FC = () => {
  const [flow] = useState('Email Ads')
  const [title] = useState('Cold Marketing Email Content')
  const [subTitle] = useState('Generate an email to generate more leads for your brand.')

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
    generator: "/content/email/marketing/generator",
    history: "/content/email/marketing/histories",
    content: "/content/email/marketing/getHistoryById"
  });

  return <>
    <Content flow={flow} title={title} subTitle={subTitle} tag={"marketing"} optional={optional} url={url} />
  </>
}

export default Marketing