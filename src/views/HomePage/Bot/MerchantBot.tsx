import FileDetail from '@/components/Modal/FileDetail'
import InformationDetail from '@/components/Modal/ChatBotInformationDetail'
import QuestionAnswerDetail from '@/components/Modal/QuestionAnswerDetail'
import SalesPitchDetail from '@/components/Modal/SalesPitchDetail'
import { changeStatus, getBusinessChatBotList } from '@/request'
import {
  BusinessMerchantChatBot,
  BusinessMerchantChatBotInformation,
  BusinessMerchantChatBotStatus,
  ChangeStatus,
  DownloadFile,
  QuestionAndAnswer,
  SalesAndPitches,
} from '@/types'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Modal, Space, Table, TableProps, message } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const MerchantBot = () => {
  const { t } = useTranslation()

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<BusinessMerchantChatBot[]>([])

  const [pitchesOpen, setPitchesOpen] = useState(false)
  const [sps, setSps] = useState<Array<SalesAndPitches>>([])
  const [qaOpen, setQaOpen] = useState(false)
  const [qas, setQas] = useState<Array<QuestionAndAnswer>>([])
  const [infoOpen, setInfoOpen] = useState(false)
  const [infos, setInfos] = useState<BusinessMerchantChatBotInformation>({
    company_name: '',
    company_introduction: '',
    platform: [
      {
        id: 0,
        name: '',
        status: false,
      },
    ],
    tone: 0,
    tone_name: '',
    phone_number: '',
    links: [],
  })
  const [fileOpen, setFileOpen] = useState(false)
  const [files, setFiles] = useState<Array<DownloadFile>>([])

  const getList = async () => {
    setLoading(true)
    try {
      const result = await getBusinessChatBotList()
      if (result.code === 20000) {
        if (result.data.list && result.data.list.length > 0) {
          let datas: Array<BusinessMerchantChatBot> = []
          result.data.list.forEach((item: any) => {
            const info: BusinessMerchantChatBotInformation = {
              company_name: item.company_name,
              company_introduction: item.company_introduction,
              platform: item.platform,
              tone: item.tone,
              tone_name: item.tone_name,
              phone_number: item.phone_number,
              links: item.links,
            }
            const status: BusinessMerchantChatBotStatus = {
              id: item.id,
              status: item.status
            }
            datas.push({
              key: item.id,
              company_name: item.company_name,
              company_introduction: item.company_introduction,
              sale_time: [
                new Date(item.created_time * 1000).toLocaleDateString(),
                new Date(item.ended_time * 1000).toLocaleDateString(),
              ],
              sales_pitches: item.sales_pitches,
              qa: item.qa,
              files: item.files,
              status: status,
              info: info,
            })
          })
          setData(datas)
        } else {
          setData([])
        }
      } else {
        message.error(result.message)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    Promise.all([getList()]).then()
  }, [])

  const onClickSalesPitches = (data: Array<SalesAndPitches>) => {
    setSps(data)
    setPitchesOpen(true)
  }

  const onClickQas = (data: Array<QuestionAndAnswer>) => {
    setQas(data)
    setQaOpen(true)
  }

  const onClickInfos = (data: BusinessMerchantChatBotInformation) => {
    setInfos(data)
    setInfoOpen(true)
  }

  const onClickFiles = (data: DownloadFile[]) => {
    setFiles(data)
    setFileOpen(true)
  }

  const onClickStatus = async (id: number, status: number) => {
    try {
      const data: ChangeStatus = {
        id: id,
        status: status
      }
      const result = await changeStatus(data)
      if (result.code === 20000) {
        message.success(t("Update completed"))
      } else {
        message.error(t("Update failed, please try again later"))
      }

      await getList()
    } catch(e) {
      console.error(e)
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
      render: (text: Array<SalesAndPitches>) => (
        <a
          onClick={() => {
            onClickSalesPitches(text)
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
      render: (text: BusinessMerchantChatBotInformation) => (
        <a
          onClick={() => {
            onClickInfos(text)
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
      render: (text: Array<QuestionAndAnswer>) => (
        <a
          onClick={() => {
            onClickQas(text)
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
      render: (text: Array<DownloadFile>) => (
        <a
          onClick={() => {
            onClickFiles(text)
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
      render: (text: BusinessMerchantChatBotStatus) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: (
                    <a
                      onClick={async () => {
                        await onClickStatus(text.id, 1)
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
                        await onClickStatus(text.id, 2)
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
              <DownOutlined style={{marginLeft: 10}} />
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
          {t('Merchant Chatbot')}
        </div>

        <div className={`mt-30`}>
          {data && data.length > 0 ? (
            <>
              <Table
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
              />
            </>
          ) : (
            <>
              <div>Not Found</div>
            </>
          )}
        </div>
        <Modal
          width={`70vw`}
          style={{ padding: '40px 60px' }}
          centered
          open={pitchesOpen}
          onCancel={() => {
            setPitchesOpen(false)
          }}
          destroyOnClose
          footer={null}
        >
          <SalesPitchDetail sps={sps} />
        </Modal>
        <Modal
          width={`70vw`}
          style={{ padding: '40px 60px' }}
          centered
          open={qaOpen}
          onCancel={() => {
            setQaOpen(false)
          }}
          destroyOnClose
          footer={null}
        >
          <QuestionAnswerDetail qas={qas} />
        </Modal>
        <Modal
          width={`70vw`}
          style={{ padding: '40px 60px' }}
          centered
          open={infoOpen}
          onCancel={() => {
            setInfoOpen(false)
          }}
          destroyOnClose
          footer={null}
        >
          <InformationDetail infos={infos} />
        </Modal>
        <Modal
          width={`70vw`}
          style={{ padding: '40px 60px' }}
          centered
          open={fileOpen}
          onCancel={() => {
            setFileOpen(false)
          }}
          destroyOnClose
          footer={null}
        >
          <FileDetail files={files} />
        </Modal>
      </div>
    </>
  )
}

export default MerchantBot
