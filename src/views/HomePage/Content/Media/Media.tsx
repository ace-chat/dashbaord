import { useState } from 'react'
import type { FC } from 'react'
import type { Optional, Url } from '@/types/content.ts'

import Content from '@/components/Content/Content.tsx'

const Media: FC = () => {
  const [title] = useState('Social Media Ads')
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
    generator: "/content/media/generator",
    history: "/content/media/histories",
    content: "/content/media/getHistoryById"
  });

  return <>
    <Content title={title} subTitle={subTitle} tag={"media"} optional={optional} url={url} />
  </>
}

export default Media