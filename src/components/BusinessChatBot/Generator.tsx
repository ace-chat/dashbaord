import { useState, useMemo, useEffect } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/Icon/Icon.tsx'
import { pxToVw } from '@/utils'
import { Button, Input, Select, Space, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash-es'

import { Option, Platform, Tone, SP, QA } from '@/types'
import {
  getAllPhoneCode,
  getAllPlatform,
  getAllTone,
  upload,
  createBusinessChatBot,
} from '@/request'
import type { RcFile } from 'antd/es/upload/interface'

type Props = {
  salesPitches: Array<SP>
  questionAnswer: Array<QA>
  openSalesPitches: (status: boolean) => void
  openQuestionAnswer: (status: boolean) => void
  openActive: (status: boolean) => void
}

const Generator: FC<Props> = (props) => {
  const { t } = useTranslation()

  const [loading] = useState(false)
  //data sets
  const [tones, setTones] = useState<Array<Option>>([])

  const [platforms, setPlatforms] = useState<Array<Option>>([])
  // copied from the code in Create.tsx
  const [codes, setCodes] = useState<Array<Option>>([])

  const [websiteLinks, setWebsiteLinks] = useState<Array<string>>([])
  const [typedLink, setTypedLink] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [tone, setTone] = useState<number>(0)
  const [platform, setPlatform] = useState<number>(0)
  const [phoneNumber, setPhoneNumber] = useState<{
    code: string
    number: string
  }>({
    code: '',
    number: '',
  })
  const [companyIntro, setCompanyIntro] = useState('')
  const [files, setFiles] = useState<Array<{ name: string; url: string }>>([])

  const validate = useMemo(() => {
    return !(
      companyName &&
      companyIntro &&
      platform &&
      tone &&
      phoneNumber &&
      websiteLinks.length >= 1
    )
  }, [companyName, companyIntro, platform, tone, phoneNumber, websiteLinks])

  const uploadFile: (
    file: RcFile,
    FileList: RcFile[]
  ) => Promise<boolean> = async (file) => {
    const data = new FormData()
    data.append('file', file)
    try {
      let result = await upload(data)
      if (result.code === 20000) {
        let filesCopy = cloneDeep(files)
        filesCopy.push({
          name: file.name,
          url: result.data,
        })
        setFiles(filesCopy)
      } else {
        message.error(result.message)
      }
    } catch (e) {
      console.error(e)
    }

    return false
  }

  const getPlatforms = async () => {
    try {
      const result = await getAllPlatform(3)
      if (result.code === 20000) {
        let res: Array<Platform> = result.data
        let arr: Array<Option> = []
        res.forEach((item) => {
          arr.push({
            label: item.name,
            value: item.id,
          })
        })
        setPlatforms(arr)
      } else {
        message.error(result.message)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getPhoneCodes = async () => {
    try {
      const result = await getAllPhoneCode()
      if (result.code === 20000) {
        let res: Array<string> = result.data
        let arr: Array<Option> = []
        res.forEach((item) => {
          arr.push({
            label: item,
            value: item,
          })
        })
        setCodes(arr)
      } else {
        message.error(result.message)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getTones = async () => {
    try {
      const result = await getAllTone(3)
      if (result.code === 20000) {
        let res: Array<Tone> = result.data
        let arr: Array<Option> = []
        res.forEach((item) => {
          arr.push({
            label: item.name,
            value: item.id,
          })
        })
        setTones(arr)
      } else {
        message.error(result.message)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const generator = async () => {
    let f: Array<string> = []
    files.forEach((item) => {
      f.push(item.url)
    })
    try {
      const data = {
        company_name: companyName,
        links: websiteLinks,
        company_introduction: companyIntro,
        platform: platform,
        phone_number: `${phoneNumber.code}${phoneNumber.number}`,
        tone: tone,
        qa: props.questionAnswer,
        sales_pitches: props.salesPitches,
        files: f,
      }
      const result = await createBusinessChatBot(data)
      if (result.code === 20000) {
        props.openActive(true)
      } else {
        message.error(result.message)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    Promise.all([getPlatforms(), getPhoneCodes(), getTones()]).then()
  }, [])

  return (
    <>
      <div className={`flex justify-around`}>
        <div className={`w-384 p-24`}>
          <div>
            <div className={`flex items-center`}>
              <Icon
                name={'first'}
                style={{ width: pxToVw(22), height: pxToVw(22) }}
              />
              <span className={`ml-8 text-12`}>{t('Details')}</span>
              <Icon
                name={'require'}
                style={{
                  width: pxToVw(8),
                  height: pxToVw(8),
                  marginLeft: '3px',
                  marginBottom: '5px',
                }}
              />
            </div>
            <div className={`mt-12`}>
              <div>
                <Input
                  styles={{
                    input: {
                      width: '100%',
                      height: pxToVw(36),
                      fontSize: pxToVw(10),
                    },
                  }}
                  placeholder={t('Company Name')}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className={`mt-12`}>
                <Select
                  mode="multiple"
                  value={websiteLinks}
                  onChange={(e) => setWebsiteLinks(e)}
                  showSearch={false}
                  placeholder={t('Add Website Links')}
                  className="custom-select"
                  style={{ width: '100%', fontSize: pxToVw(10) }}
                  dropdownRender={() => (
                    <Input
                      styles={{
                        input: {
                          width: '100%',
                          height: pxToVw(25),
                          fontSize: pxToVw(10),
                        },
                      }}
                      placeholder="Type New Link"
                      value={typedLink}
                      onPressEnter={() => {
                        if (typedLink !== '') {
                          setWebsiteLinks([...websiteLinks, typedLink.trim()])
                          setTypedLink('')
                        }
                      }}
                      onChange={(e) => setTypedLink(e.target.value)}
                      suffix={
                        <div
                          className={`flex items-center justify-center`}
                          onClick={() => {
                            if (typedLink !== '') {
                              setWebsiteLinks([
                                ...websiteLinks,
                                typedLink.trim(),
                              ])
                              setTypedLink('')
                            }
                          }}
                        >
                          <Icon
                            name={'add'}
                            style={{ width: pxToVw(8), height: pxToVw(8) }}
                          />
                        </div>
                      }
                    />
                  )}
                  options={[]}
                />
              </div>
              <div className={`mt-12 w-full`}>
                <Input.TextArea
                  styles={{
                    textarea: {
                      width: '100%',
                      height: pxToVw(73),
                      fontSize: pxToVw(10),
                    },
                  }}
                  placeholder={t('Company Introduction')}
                  value={companyIntro}
                  onChange={(e) => setCompanyIntro(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon
                name={'second'}
                style={{ width: pxToVw(22), height: pxToVw(22) }}
              />
              <span className={`ml-8 text-12`}>{t('Platform')}</span>
              <Icon
                name={'require'}
                style={{
                  width: pxToVw(8),
                  height: pxToVw(8),
                  marginLeft: '3px',
                  marginBottom: '5px',
                }}
              />
            </div>
            <div className={`mt-12`}>
              <div>
                <Select
                  style={{ width: '100%', height: pxToVw(36) }}
                  options={platforms}
                  placeholder={t('Platform')}
                  onSelect={(value) => setPlatform(value)}
                />
              </div>
              <div className={`mt-12 flex items-center justify-between`}>
                <Space>
                  <Select
                    style={{ width: pxToVw(84), height: pxToVw(35) }}
                    options={codes}
                    placeholder={''}
                    value={phoneNumber.code}
                    onChange={(e) =>
                      setPhoneNumber({ code: e, number: phoneNumber.number })
                    }
                  />
                  <Input
                    styles={{
                      input: {
                        width: pxToVw(242),
                        height: pxToVw(35),
                        fontSize: pxToVw(10),
                      },
                    }}
                    placeholder={t('Phone Number')}
                    value={phoneNumber.number}
                    onChange={(e) =>
                      setPhoneNumber({
                        code: phoneNumber.code,
                        number: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        '0',
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                      ]
                      if (
                        e.key !== 'Delete' &&
                        e.key !== 'Backspace' &&
                        !allowedKeys.includes(e.key)
                      ) {
                        e.preventDefault()
                      }
                    }}
                  />
                </Space>
              </div>
            </div>
          </div>

          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon
                name={'third'}
                style={{ width: pxToVw(22), height: pxToVw(22) }}
              />
              <span className={`ml-8 text-12`}>{t('Style')}</span>
              <Icon
                name={'require'}
                style={{
                  width: pxToVw(8),
                  height: pxToVw(8),
                  marginLeft: '3px',
                  marginBottom: '5px',
                }}
              />
            </div>
            <div className={`mt-12`}>
              <Select
                placeholder={t('Tones')}
                style={{
                  width: pxToVw(336),
                  height: pxToVw(36),
                  fontSize: pxToVw(10),
                }}
                options={tones}
                value={tone}
                onSelect={(value) => setTone(value)}
              />
            </div>
          </div>

          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon
                name={'fourth'}
                style={{ width: pxToVw(22), height: pxToVw(22) }}
              />
              <span className={`ml-8 text-12`}>{t('Upload')}</span>
              <Icon
                name={'require'}
                style={{
                  width: pxToVw(8),
                  height: pxToVw(8),
                  marginLeft: '3px',
                  marginBottom: '5px',
                }}
              />
            </div>
            <div className={`mt-12`}>
              <Button
                block
                className={`w-full h-35 text-10 flex items-center justify-between`}
                onClick={() => {
                  props.openQuestionAnswer(true)
                }}
              >
                <span>{t('Add Questions & Answers')}</span>
                <PlusOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Button>
              <Button
                block
                className={`mt-12 w-full h-35 text-10 flex items-center justify-between`}
                onClick={() => {
                  props.openSalesPitches(true)
                }}
              >
                {t('Add Sales Pitches')}{' '}
                <PlusOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
              </Button>
              <Upload
                accept={'.pdf'}
                beforeUpload={uploadFile}
                multiple
                showUploadList={false}
              >
                <div
                  className={`w-336 h-144 flex justify-center items-center flex-col rounded-8 mt-16 bg-[#F4F6FA] border border-[#8B8B8B] border-dashed cursor-pointer`}
                >
                  <Icon
                    name={'upload'}
                    style={{
                      width: pxToVw(22),
                      height: pxToVw(22),
                      marginTop: pxToVw(5),
                    }}
                  />
                  <div className={`mt-2 text-black opacity-60 text-10`}>
                    {t('Upload all Product/Service Catalogs and FAQs')}
                  </div>
                  <div className={`mt-2 text-black opacity-60 text-10`}>
                    {t('Drop PDF files here')}
                  </div>
                </div>
              </Upload>
            </div>
          </div>

          <div className={`mt-24`}>
            <Button
              type="default"
              loading={loading}
              disabled={validate}
              onClick={generator}
              className={`w-full h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
            >
              {t('Generate')}
            </Button>
          </div>
        </div>

        <div>
          <div
            className={`w-971 h-750 flex items-center justify-center flex-col`}
          >
            <Icon
              name={'generate'}
              style={{ width: pxToVw(62), height: pxToVw(40) }}
            />
            <p className="text-18 text-[#C4C4C4] mt-14">
              {t("Let's Get Started!")}
            </p>
            <p className="w-573 text-center text-12 text-[#C4C4C4] font-light mt-10">
              {t('Choose the service to generate content')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Generator
