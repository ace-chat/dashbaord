import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Layout, MenuProps, Space } from 'antd'

const items: MenuProps['items'] = [
  {
    label: <p onClick={() => {}}>EN</p>,
    key: '0',
  },
  {
    label: <p onClick={() => {}}>CN</p>,
    key: '1',
  },
]

const HomeHeader = () => {
  return (
    <Layout>
      <div className={'w-full h-full flex items-center flex-row justify-end'}>
        {/* <img src={logo} alt="logo" style={{ width: pxToVw(42), height: pxToVw(28), objectFit: "contain" }}  /> */}
        {/* <div className='text-bold' style={{ color: "white", fontSize: pxToVw(24), marginLeft: pxToVw(15), fontFamily: "PingFang SC Medium"}}>ACE</div> */}
        <Dropdown menu={{ items }} trigger={['click']}>
          <a
            onClick={(e) => e.preventDefault()}
            className={'text-right'}
            style={{
              color: '#000000',
            }}
          >
            <Space>
              EN
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Layout>
  )
}

export default HomeHeader
