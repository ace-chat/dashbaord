import { getDeepAnalyticList } from '@/request'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Modal, Space, Table, TableProps, message } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const DeepTool = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    setLoading(true)
    Promise.all([getList()]).then()
  }, [])

  const getList = async () => {
    setLoading(true)
    const result = await getDeepAnalyticList()
    try {
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Your Tasks',
      colSpan: 3,
      dataIndex: 'company_name',
      align: 'center',
    },
    {
      title: 'Sale Content',
      dataIndex: 'company_introduction',
      colSpan: 0,
      align: 'center',
    },
    {
      title: 'Sale Time',
      dataIndex: 'sale_time',
      colSpan: 0,
      align: 'right',
      render: (text) => (
        <>
          <p>Start {text[0]}</p>
          <p>End {text[1]}</p>
        </>
      ),
    },
    {
      title: 'Sale Pitch',
      dataIndex: 'sales_pitches',
      colSpan: 1,
      align: 'center',
      render: (text: Array<any>) => (
        <a
          onClick={() => {
            // onClickSalesPitches(text)
          }}
        >
          View
        </a>
      ),
    },
    {
      title: 'Info',
      dataIndex: 'info',
      colSpan: 1,
      align: 'center',
      render: (text: any) => (
        <a
          onClick={() => {
            // onClickInfos(text)
          }}
        >
          View
        </a>
      ),
    },

    {
      title: 'Q/A',
      dataIndex: 'qa',
      colSpan: 1,
      align: 'center',
      render: (text: Array<any>) => (
        <a
          onClick={() => {
            // onClickQas(text)
          }}
        >
          View
        </a>
      ),
    },
    {
      title: 'File',
      dataIndex: 'files',
      colSpan: 1,
      align: 'center',
      render: (text: Array<any>) => (
        <a
          onClick={() => {
            // onClickFiles(text)
          }}
        >
          View
        </a>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      colSpan: 1,
      align: 'center',
      render: (text: any) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: (
                    <a
                      onClick={async () => {
                        // await onClickStatus(text.id, 1)
                      }}
                    >
                      {t('Active')}
                    </a>
                  ),
                },
                {
                  key: '2',
                  label: (
                    <a
                      onClick={async () => {
                        // await onClickStatus(text.id, 2)
                      }}
                    >
                      {t('Inactive')}
                    </a>
                  ),
                },
              ],
            }}
          >
            <a>
              {text.status === 1 ? 'Active' : 'Inactive'}
              <DownOutlined style={{ marginLeft: 10 }} />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className="flex flex-col mt-14 ml-29">
        <div
          className={`text-black text-18`}
          style={{ fontFamily: 'PingFang SC Medium' }}
        >
          {t('Deep Analytics Tool')}
        </div>
      </div>
    </>
  )
}

export default DeepTool
