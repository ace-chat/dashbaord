import { useState } from 'react'
import type { FC } from 'react'

import Content from '@/components/Content/Content.tsx'
import type {Optional, Url} from "@/types";

const Engine: FC = () => {
  const [title] = useState('Search Engine Ads')
  const [subTitle] = useState('Generate a personalized caption for your product or service for the platform of your choice.')

  const [optional] = useState<Optional>({
    platform: true,
    details: {
      brand_name: true,
      brand_desc: true,
      service_name: true,
      service_desc: true,
    },
    style: {
      tones: true,
      voice: true,
    },
    audience: {
      region: true,
      gender: true,
      age: true,
    }
  });
  const [url] = useState<Url>({
    generator: "/content/engine/generator",
    history: "/content/engine/histories",
    content: "/content/engine/getHistoryById"
  });

  return <>
    <Content title={title} subTitle={subTitle} tag={"engine"} optional={optional} url={url} />
  </>
}

export default Engine