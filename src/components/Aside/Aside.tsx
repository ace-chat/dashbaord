import { Menu, MenuProps } from "antd";
import { useState, useEffect } from 'react'
import { toggle } from "@/reducers/menu.ts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Layout } from 'antd';

import Icon from "@/components/Icon/Icon.tsx";
import Avatar from '@/assets/avatar.png'

import type { RootState } from "@/store";
import type { Key, ReactNode } from "react";
import type { MenuInfo } from "@/types";
import { pxToVw } from "@/utils";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  // type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    // type,
  } as MenuItem;
}

const Aside = () => {
  const navigate = useNavigate()
  const open = useSelector((state: RootState) => state.menu.open)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [openKeys, setOpenKeys]: any = useState([]);

  const items: MenuProps['items'] = [
    getItem(t('Home'), "home", <Icon name={"home"} />),
    getItem(t('Content Generation'), "content", <Icon name={'content'} />, [
      getItem(t('Social Media Ads'), 'content/media', <Icon name="" />),
      getItem(t('Search Engine Ads'), 'content/engine', <Icon name="" />),
      getItem(t('Optimized Content'), 'content/optimized', <Icon name="" />, [
        getItem(t('Change Tone'), 'content/optimized/tone', <Icon name="" style={{ width: pxToVw(48) }} />),
        getItem(t('Summarize'), 'content/optimized/summarize', <Icon name="" style={{ width: pxToVw(48) }} />),
        getItem(t('Paraphrase'), 'content/optimized/paraphrase', <Icon name="" style={{ width: pxToVw(48) }} />),
        getItem(t('Match Brand Voice'), 'content/optimized/brandvoice', <Icon name="" style={{ width: pxToVw(48) }} />),
        getItem(t('Target Audience'), 'content/optimized/audience', <Icon name="" style={{ width: pxToVw(48) }} />)
      ]),
      getItem(t('Email Ads'), 'content/email', <Icon name="" />, [
        getItem(t("Freestyle"), 'content/email/freestyle', <Icon name="" style={{ width: pxToVw(48) }} />),
        getItem(t("Cold Marketing Email"), 'content/email/marketing', <Icon name="" style={{ width: pxToVw(48) }} />),
        getItem(t("Welcome Email"), 'content/email/welcome',<Icon name="" style={{ width: pxToVw(48) }} />),
        getItem(t("Advantages/Benefit Email"), 'content/email/odds', <Icon name="" style={{ width: pxToVw(48) }} />),
      ]),
      getItem(t('Blogs'), 'content/blogs', <Icon name="" />, [
        getItem(t("Intro"), 'content/blogs/intro', <Icon name="" style={{ width: pxToVw(48) }} />),
        getItem(t("Outline"), 'content/blogs/outline', <Icon name="" style={{ width: pxToVw(48) }} />),
        getItem(t("Entire"), 'content/blogs/entire', <Icon name="" style={{ width: pxToVw(48) }} />)
        
      ])
    ]),
    getItem(t('Chat Bot'), 'bot', <Icon name={'bot'} />, [
      getItem(t('Chat with ACE'), 'bot/chat', <Icon name="" />),
      getItem(t('Create a Chatbot'), 'bot/create', <Icon name="" />),
    ]),
    getItem(t('Analytics'), 'analytics', <Icon name={'analytics'} />, [
      getItem(t('Simple Analytics'), 'analytics/simple', <Icon name="" />),
      getItem(t('Deep Analytics'), 'analytics/deep', <Icon name="" />),
    ]),
    getItem(t('Support'), 'support', <Icon name={'support'} />)
  ];

  const change = (info: MenuInfo) => {
    console.log(info)
    dispatch(toggle(info.key))
    navigate(info.key)
  };

  const rootSubmenuKeys = ['content', 'bot', 'analytics'];

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    console.log(keys, "----KEYS")
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  
  return <>
    <Layout.Sider className="flex-1">
      <Menu
        mode="inline"
        // defaultSelectedKeys={[open]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
        onClick={change}
      />
      <div className={'w-240 h-60 flex items-center justify-between border border-[#E7E7E7] bg-[#557aa0] rounded-10 px-12 cursor-pointer'} 
        onClick={() => {
          navigate("profile")
        }}
      >
        <div className={'flex items-center'}>            
          <img className={'w-28 h-28 mr-12'} src={Avatar} alt="avatar" />
          <div className={'text-12 font-bold text-[white]'}>ACE Support</div>
        </div>
        <div className={`flex items-center`}>
          <Icon name={'more'} />
        </div>
      </div>
    </Layout.Sider>
  </>
}

export default Aside