import { toggle } from '@/reducers/menu.ts'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Layout, Menu } from 'antd'

import Icon from '@/components/Icon/Icon'
import Avatar from '@/assets/avatar.png'

import type { RootState } from '@/store'
import { useEffect, type Key, type ReactNode, useState } from 'react'
import type { MenuInfo } from '@/types'
import type { MenuProps } from 'antd'
import { getUserInfo } from '@/request'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const Aside = () => {
  const navigate = useNavigate()
  const open = useSelector((state: RootState) => state.menu.open)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [displayName, setDisplayName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const resp = await getUserInfo()
        if (resp.code === 20000) {
          setDisplayName(resp.data.display_name)
          setAvatarUrl(resp.data.avatar)
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchUserInfo()
  }, [])

  const items: MenuProps['items'] = [
    getItem(t('Home'), 'home', <Icon name={'home'} />),
    getItem(t('Content Generation'), 'content', <Icon name={'content'} />, [
      getItem(t('Social Media Ads'), 'content/media'),
      getItem(t('Search Engine Ads'), 'content/engine'),
      getItem(t('Optimize Content'), 'content/optimize', null, [
        getItem(t('Change Tone'), 'content/optimize/tone'),
        getItem(t('Summarize'), 'content/optimize/summarize'),
        getItem(t('Paraphrase'), 'content/optimize/paraphrase'),
        getItem(t('Match Brand Voice'), 'content/optimize/brandvoice'),
        getItem(t('Target Audience'), 'content/optimize/audience'),
      ]),
      getItem(t('Email Ads'), 'content/email', null, [
        getItem(t('Freestyle'), 'content/email/freestyle'),
        getItem(t('Cold Marketing Email'), 'content/email/marketing'),
        getItem(t('Welcome Email'), 'content/email/welcome'),
        getItem(t('Advantages/Benefit Email'), 'content/email/odds'),
      ]),
      getItem(t('Blogs'), 'content/blogs', null, [
        getItem(t('Intro'), 'content/blogs/intro'),
        getItem(t('Outline'), 'content/blogs/outline'),
        getItem(t('Entire'), 'content/blogs/entire'),
      ]),
    ]),
    getItem(t('Chat Bot'), 'bot', <Icon name={'bot'} />, [
      getItem(t('Chat with ACE'), 'bot/chat'),
      getItem(t('Create a Chatbot'), 'bot/create'),
      getItem(t('Merchant Chatbot'), 'bot/merchantbot'),
    ]),
    getItem(t('Analytics'), 'analytics.tsx', <Icon name={'analytics'} />, [
      getItem(t('Simple Analytics'), 'analytics.tsx/simple'),
      getItem(t('Deep Analytics'), 'analytics.tsx/deep'),
      getItem(t('Deep Analytics Tool'), 'analytics.tsx/deeptool'),
    ]),
    getItem(t('Support'), 'support', <Icon name={'support'} />),
  ]

  const change = (info: MenuInfo) => {
    dispatch(toggle(info.key))
    navigate(info.key)
  }

  return (
    <>
      <Layout.Sider className="flex-1">
        <Menu
          mode="vertical"
          defaultSelectedKeys={[open]}
          items={items}
          onClick={change}
          style={{ flex: 'auto' }}
        />
        <div
          className={
            'w-240 h-60 flex items-center justify-between border border-[#E7E7E7] bg-[#557aa0] rounded-10 px-12 cursor-pointer'
          }
          onClick={async () => {
            dispatch(toggle(''))
            navigate('profile')
          }}
        >
          <div className={'flex items-center'}>
            {avatarUrl && avatarUrl !== '' ? (
              <img className={'w-28 h-28 mr-12'} src={avatarUrl} alt="avatar" />
            ) : (
              <img className={'w-28 h-28 mr-12'} src={Avatar} alt="avatar" />
            )}
            <div
              className={'text-12 font-bold text-[white]'}
              style={{ fontFamily: 'PingFang SC Medium' }}
            >
              {displayName}
            </div>
          </div>
          <div className={`flex items-center`}>
            <Icon name={'more'} />
          </div>
        </div>
      </Layout.Sider>
    </>
  )
}

export default Aside
