import { Menu, MenuProps } from "antd";
import { toggle } from "@/reducers/menu.ts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Layout } from 'antd'

import Icon from "@/components/Icon/Icon.tsx";
import Avatar from '@/assets/avatar.png'

import type { RootState } from "@/store";
import type { Key, ReactNode } from "react";
import type { MenuInfo } from "@/types";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Aside = () => {
  const navigate = useNavigate()
  const open = useSelector((state: RootState) => state.menu.open)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const items: MenuProps['items'] = [
    getItem(t('Home'), "home", <Icon name={'home'} />),
    getItem(t('Content Generation'), "content", <Icon name={'content'} />, [
      getItem(t('Social Media Ads'), 'content/media'),
      getItem(t('Search Engine Ads'), 'content/engine'),
      getItem(t('Optimized Content'), 'content/optimized', null, [
        getItem(t('Change Tone'), 'content/optimized/tone'),
        getItem(t('Summarize'), 'content/optimized/summarize'),
        getItem(t('Paraphrase'), 'content/optimized/paraphrase'),
        getItem(t('Match Brand Voice'), 'content/optimized/brandvoice'),
        getItem(t('Target Audience'), 'content/optimized/audience')
      ]),
      getItem(t('Email Ads'), 'content/email', null, [
        getItem(t("Freestyle"), 'content/email/freestyle'),
        getItem(t("Cold Marketing Email"), 'content/email/marketing'),
        getItem(t("Welcome Email"), 'content/email/welcome'),
        getItem(t("Advantages/Benefit Email"), 'content/email/odds'),
      ]),
      getItem(t('Blogs'), 'content/blogs', null, [
        getItem(t("Intro"), 'content/blogs/intro'),
        getItem(t("Outline"), 'content/blogs/outline'),
        getItem(t("Entire"), 'content/blogs/entire')
      ])
    ]),
    getItem(t('Chat Bot'), 'bot', <Icon name={'bot'} />, [
      getItem(t('Chat with ACE'), 'bot/chat'),
      getItem(t('Create a Chatbot'), 'bot/create'),
    ]),
    getItem(t('Analytics'), 'analytics', <Icon name={'analytics'} />, [
      getItem(t('Simple Analytics'), 'analytics/simple'),
      getItem(t('Deep Analytics'), 'analytics/deep'),
    ]),
    getItem(t('Support'), 'support', <Icon name={'support'} />)
  ]
  const change = (info: MenuInfo) => {
    console.log(info)
    dispatch(toggle(info.key))
    navigate(info.key)
  }

  return <>
    <Layout.Sider className="flex-1">
      <Menu
        mode="vertical"
        defaultSelectedKeys={[open]}
        items={items}
        onClick={change}
      />
      <div className={'w-240 h-60 flex items-center justify-between border border-[#E7E7E7] bg-[#EDEFF2] rounded-10 px-12 cursor-pointer'} 
        onClick={() => {
          navigate("profile")
        }}
      >
        <div className={'flex items-center'}>            
          <img className={'w-28 h-28 mr-12'} src={Avatar} alt="avatar" />
          <div className={'text-12 font-bold text-[#000000]'}>ACE Support</div>
        </div>
        <div className={`flex items-center`}>
          <Icon name={'more'} />
        </div>
      </div>
    </Layout.Sider>
  </>
}

export default Aside