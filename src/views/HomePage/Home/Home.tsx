import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import analyticsIcon from '@/assets/home/analytics.png'
import contentIcon from '@/assets/home/content.png'
import chatIcon from '@/assets/home/chat.png'
import { pxToVw } from '@/utils'

function Home() {
  const { t } = useTranslation()

  const [cards] = useState([
    {
      id: 'analytics.tsx',
      icon: analyticsIcon,
      title: t('Data Analytics'),
      content: t('Dive into the world of data insights. Our AI-driven analytics.tsx unveils your customers\' preferences, helping you make informed decisions.')
    },
    {
      id: 'content',
      icon: contentIcon,
      title: t('Content Generation'),
      content: t('Say goodbye to content creation hassles. Our AI-powered tool generates compelling content for social media ads and more, so you can focus on strategy.')
    },
    {
      id: 'chat',
      icon: chatIcon,
      title: t('Chat Bot'),
      content: t('Elevate your customer service game. Our AI-powered chat bot provides round-the-clock support, with a personal touch.')
    }
  ])

  return (
    <div className={'flex items-start justify-center'}>
      <div className={'w-1110 flex items-center justify-between'}>
        {
          cards.map(card => {
            return <div key={card.id} className={`w-358 h-390 bg-[#FFFFFF] px-30 rounded-24 pt-60 flex items-center flex-col`}>
              <img className={'w-78 h-78'} src={card.icon} alt="icon" />
              <div className={'font-bold text-[#000000] mb-12 mt-42'} style={{ fontSize: pxToVw(20), fontFamily: "PingFang SC Medium" }} >{ card.title }</div>
              <div className={'flex text-[#535563] leading-28'} style={{ textAlign: "center", fontSize: pxToVw(16), fontFamily: "PingFang SC Regular" }} >{ card.content }</div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Home
