import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Aside from "@/components/Aside/Aside.tsx";
import Header from "@/components/Header/Header.tsx";

import type { FC } from 'react'

const HomePage: FC = () => {
  return <Layout className={"w-full h-full"}>
      <div className='flex flex-col'>
        <Header />
        <Aside />
      </div>
      <Layout.Content style={{ padding: 10, background: 'transparent', overflowY: 'auto' }}>
        <Outlet />
      </Layout.Content>
 
  </Layout>
}

export default HomePage