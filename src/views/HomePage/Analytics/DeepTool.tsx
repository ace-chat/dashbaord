import {
  changeDeepAnalyticsBotUploadFile,
  changeDeepAnalyticsStatus,
  getDeepAnalyticList,
  upload,
} from '@/request'
import {
  ChangeDeepBotUploadFiles,
  ChangeStatus,
  DeepAnalyticsTool,
  DeepAnalyticsToolInfo,
  DeepAnalyticsToolStatus,
  DownloadFile,
} from '@/types'
import { DownOutlined } from '@ant-design/icons'
import {
  Dropdown,
  Modal,
  Space,
  Table,
  TableProps,
  Upload,
  message,
} from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DownloadSvg from '@/assets/download.svg'
import { pxToVw } from '@/utils'
import AnalyticsInformationDetail from '@/components/Modal/AnalyticsInformationDetail'
import Icon from '@/components/Icon/Icon'
import { RcFile } from 'antd/es/upload'

const DeepTool = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])
  const [infoOpen, setInfoOpen] = useState(false)
  const [infos, setInfos] = useState<DeepAnalyticsToolInfo>({
    business_desc: '',
    data_desc: '',
    product_desc: '',
    service_name: '',
  })

  useEffect(() => {
    setLoading(true)
    Promise.all([getList()]).then()
  }, [])

  const getList = async () => {
    setLoading(true)

    try {
      const result = await getDeepAnalyticList()
      if (result.code === 20000) {
        if (result.data.list && result.data.list.length > 0) {
          const datas: Array<DeepAnalyticsTool> = []
          result.data.list.forEach((item: any) => {
            const status: DeepAnalyticsToolStatus = {
              id: item.id,
              status: item.status,
            }

            const info: DeepAnalyticsToolInfo = {
              business_desc: item.business_desc,
              product_desc: item.product_desc,
              data_desc: item.data_desc,
              service_name: item.service_name,
            }

            const upload_files: DownloadFile = {
              id: item.id,
              name: item.upload_files.name,
              download_url: item.upload_files.download_url,
            }

            const bot_upload_files: DownloadFile = {
              id: item.id,
              name: item.bot_upload_files.name,
              download_url: item.bot_upload_files.download_url,
            }

            datas.push({
              key: item.id,
              username: item.username,
              business_desc: item.business_desc,
              upload_files: upload_files,
              bot_upload_files: bot_upload_files,
              status: status,
              analytics_time: [
                new Date(item.created_time * 1000).toLocaleDateString(),
                new Date(item.ended_time * 1000).toLocaleDateString(),
              ],
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

  const onClickInfos = (data: DeepAnalyticsToolInfo) => {
    setInfos(data)
    setInfoOpen(true)
  }

  const handleFileInputChange = async (file: RcFile, id: number) => {
    if (file) {
      const allowedExtensions = ['.csv', '.xlsx', '.xlx', '.tsv']
      const fileExtension = file.name.split('.').pop()?.toLowerCase()
      if (!allowedExtensions.includes(`.${fileExtension}`)) {
        message.error(
          'Invalid file type. Please select a CSV, XLSX, XLX, or TSV file.'
        )
      } else {
        await uploadFile(file, id)
      }
    }
  }

  const uploadFile = async (chosenFile: any, id: number) => {
    const formData = new FormData()
    formData.append('file', chosenFile)

    setLoading(true)

    try {
      const upload_result = await upload(formData)
      if (upload_result.code === 20000) {
        const file_data: ChangeDeepBotUploadFiles = {
          id: id,
          filename: upload_result.data,
        }
        const update_result = await changeDeepAnalyticsBotUploadFile(file_data)
        if (update_result.code === 20000) {
          message.success(t('Successfully upload'))
          await getList()
        }
      }
    } catch (e: any) {
      console.error(e)
      message.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const onClickDownloadCsvFiles = (data: DownloadFile) => {
    if (data.download_url === '') {
      message.error(t('No file to download'))
    } else {
      window.location.href = data.download_url
    }
  }

  const onClickStatus = async (id: number, status: number) => {
    try {
      const data: ChangeStatus = {
        id: id,
        status: status,
      }
      const result = await changeDeepAnalyticsStatus(data)
      if (result.code === 20000) {
        message.success(t('Update completed'))
      } else {
        message.error(t('Update failed, please try again later'))
      }

      await getList()
    } catch (e) {
      console.error(e)
    }
  }

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Your Tasks',
      colSpan: 4,
      dataIndex: 'username',
      align: 'center',
      render: (text: string) => (
        <p
          style={{
            color: '#A5A5A5',
          }}
        >
          {text}
        </p>
      ),
    },
    {
      title: 'Analytics Content',
      dataIndex: 'business_desc',
      colSpan: 0,
      align: 'center',
    },
    {
      title: 'Upload files',
      dataIndex: 'upload_files',
      colSpan: 0,
      align: 'center',
      width: 100,
      render: (text: DownloadFile) => (
        <a
          onClick={() => {
            onClickDownloadCsvFiles(text)
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: '#0D99FF',
              fontWeight: 400,
            }}
          >
            CSV
          </p>

          <img
            src={DownloadSvg}
            alt="Bot"
            style={{
              width: pxToVw(15),
              height: pxToVw(15),
            }}
          />
        </a>
      ),
    },
    {
      title: 'Analytics Time',
      dataIndex: 'analytics_time',
      colSpan: 0,
      align: 'right',
      width: 150,
      render: (text) => (
        <>
          <p
            style={{
              color: '#A5A5A5',
            }}
          >
            Start {text[0]}
          </p>
          <p
            style={{
              color: '#A5A5A5',
            }}
          >
            End {text[1]}
          </p>
        </>
      ),
    },
    {
      title: 'Info',
      dataIndex: 'info',
      colSpan: 1,
      align: 'center',
      render: (text: DeepAnalyticsToolInfo) => (
        <a
          onClick={() => {
            onClickInfos(text)
          }}
          style={{
            color: '#A5A5A5',
          }}
        >
          View
        </a>
      ),
    },
    {
      title: 'File',
      dataIndex: 'bot_upload_files',
      colSpan: 1,
      align: 'center',
      render: (file: DownloadFile) => (
        <>
          {file.name !== '' && file.download_url !== '' ? (
            <>
              <a
                href={file.download_url}
                style={{
                  color: '#A5A5A5',
                }}
              >
                {file.name}
              </a>
            </>
          ) : (
            <>
              <Upload
                accept=".csv,.xlx,.xlsx,.tsv"
                beforeUpload={async (e) => {
                  await handleFileInputChange(e, file.id as number)
                }}
              >
                <div
                  className="flex rounded-8 mt-16 justify-center items-center"
                  style={{
                    backgroundColor: '#F4F6FA',
                    display: 'flex',
                    border: '1px dashed #8B8B8B',
                    flexDirection: 'column',
                    padding: 10,
                  }}
                >
                  <Icon
                    name={'upload'}
                    style={{
                      width: pxToVw(22),
                      height: pxToVw(22),
                      marginTop: pxToVw(5),
                    }}
                  />
                  <div
                    className={`mt-2`}
                    style={{
                      color: '#000',
                      opacity: 0.6,
                      fontSize: pxToVw(10),
                      fontFamily: 'PingFang SC Bold',
                    }}
                  >
                    {t('Upload a CSV/XLX/XLSX/TSV file here')}
                  </div>
                </div>
              </Upload>
            </>
          )}
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      colSpan: 1,
      align: 'center',
      render: (text: DeepAnalyticsToolStatus) => (
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
                      {t('Done')}
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
                      {t('Pending')}
                    </a>
                  ),
                },
              ],
            }}
          >
            <a
              style={{
                color: '#A5A5A5',
              }}
            >
              {text.status === 1 ? 'Down' : 'Pending'}
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
          open={infoOpen}
          onCancel={() => {
            setInfoOpen(false)
          }}
          destroyOnClose
          footer={null}
        >
          <AnalyticsInformationDetail infos={infos} />
        </Modal>
      </div>
    </>
  )
}

export default DeepTool
