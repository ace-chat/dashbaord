import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { pxToVw } from '@/utils'
import Icon from '@/components/Icon/Icon.tsx'
import { Button, Input, Select, Switch, Space } from 'antd'

import { getOptions, changePlatform } from '@/request'

import type { BusinessChat, Option } from '@/types'
import type { FC } from 'react'

type Prop = {
  chatBot: BusinessChat & {
    platform: Array<{ id: number; name: string; status: boolean }>
  }
  refresh: () => void
  openChangeNumber: (status: boolean) => void
  openQuestionAnswer: (status: boolean) => void
  openSalesPitches: (status: boolean) => void
  deleteConfirm: () => void
}

const ChatBot: FC<Prop> = (props) => {
  const { t } = useTranslation()

  const [type, setType] = useState<number>()
  const [options, setOptions] = useState<Array<Option>>([])

  const change = async (value: boolean, id: number) => {
    await changePlatform({ id, status: value })
    props.refresh()
  }

  const disabled = (name: string) => {
    return name === 'Telegram'
  }

  const getBusinessChatBotOptions = async () => {
    try {
      const result = await getOptions()
      let res: Array<{ id: number; option: string }> = result.data
      let arr: Array<Option> = []
      res.forEach((item) => {
        arr.push({
          label: item.option,
          value: item.id,
        })
      })
      if (arr.length !== 0) {
        setType(arr[0].value)
      }

      setOptions(arr)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getBusinessChatBotOptions().then()
  }, [])

  return (
    <>
      <div className={`w-full h-748 flex justify-between`}>
        <div className={`w-1/2 h-full p-24 pt-65 flex items-center flex-col`}>
          <div className={`text-28`}>{t('Initiate Conversation')}</div>
          <div>
            <div className={`flex items-center mt-60`}>
              <Icon
                name={'first'}
                style={{ width: pxToVw(22), height: pxToVw(22) }}
              />
              <span className={`ml-8 text-16`}>{t('Options')}</span>
            </div>
            <div className={`mt-22`}>
              <Select
                value={type}
                onChange={(value) => {
                  setType(value)
                }}
                style={{
                  width: pxToVw(436),
                  height: pxToVw(36),
                  fontSize: pxToVw(16),
                }}
                placeholder={t('Select Options')}
                options={options}
              />
            </div>

            {/* new section */}
            {type === 3 && (
              <>
                <div className={`flex items-center mt-24`}>
                  <Icon
                    name={'second'}
                    style={{ width: pxToVw(22), height: pxToVw(22) }}
                  />
                  <span className={`ml-8 text-16`}>{t('Send To')}</span>
                </div>
                <div className={`mt-12`}>
                  <Input
                    styles={{
                      input: {
                        width: '100%',
                        height: pxToVw(36),
                        fontSize: pxToVw(16),
                      },
                    }}
                    placeholder={t('Type Phone Numbers')}
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
                        '+',
                        ',',
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
                </div>
              </>
            )}
            {/* new section */}
            {type === 2 && (
              <>
                <div className={`flex items-center mt-24`}>
                  <Icon
                    name={'second'}
                    style={{ width: pxToVw(22), height: pxToVw(22) }}
                  />
                  <span className={`ml-8 text-16`}>{t('Choose file')}</span>
                </div>
                <div
                  className="flex rounded-8 mt-16 justify-center items-center"
                  style={{
                    backgroundColor: '#F4F6FA',
                    display: 'flex',
                    width: pxToVw(436),
                    height: pxToVw(103),
                    border: '1px dashed #8B8B8B',
                    flexDirection: 'column',
                  }}
                >
                  <input
                    type="file"
                    multiple={true}
                    id="fileInput"
                    accept=".txt"
                    style={{ display: 'none' }}
                  />
                  <Icon
                    name={'upload'}
                    style={{
                      width: pxToVw(22),
                      height: pxToVw(22),
                      marginTop: pxToVw(5),
                    }}
                  />
                  <div className={`mt-2 text-black opacity-60 text-10`}>
                    {t('Upload numbers as a file.txt here')}
                  </div>
                </div>
              </>
            )}

            {/* new section */}
            <div className={`flex items-center mt-24`}>
              <Icon
                name={type !== 1 ? 'third' : 'second'}
                style={{ width: pxToVw(22), height: pxToVw(22) }}
              />
              <span className={`ml-8 text-16`}>{t('Message')}</span>
            </div>
            <div className={`mt-22`}>
              <Input.TextArea
                styles={{
                  textarea: {
                    width: '100%',
                    height: pxToVw(181),
                    fontSize: pxToVw(16),
                  },
                }}
                placeholder={t('Type Here')}
              />
            </div>
            <Button
              className={`mt-22 rounded-8`}
              type="primary"
              style={{
                width: pxToVw(206),
                height: pxToVw(36),
                marginLeft: pxToVw(120),
                fontSize: pxToVw(16),
              }}
            >
              {t('Send')}
            </Button>
          </div>
        </div>
        <div className="w-px bg-[#F3F3F3]"></div>
        {/* Vertical line */}
        <div className={`w-1/2 h-full flex flex-col items-center p-24 pt-65`}>
          <div className={`text-24`}>{t('Your Active Chatbots')}</div>
          <div className={`text-14 text-[#545B65] mt-4`}>
            {t('Your Active Chatbots on social media')}
          </div>
          <div className="flex flex-row mt-70">
            <Space>
              {props.chatBot.platform.map((item) => {
                return (
                  <div key={item.id} className="flex flex-col items-center">
                    <div className="flex items-center justify-center flex-col border border-solid border-[#DBDBDB] p-10 rounded-6">
                      <Icon
                        name={item.name.toLowerCase()}
                        style={{ width: pxToVw(60), height: pxToVw(60) }}
                      />
                      <div className={`text-12 mt-4`}>{item.name}</div>
                    </div>
                    <Switch
                      size="small"
                      disabled={disabled(item.name)}
                      checked={item.status}
                      onChange={(value) => {
                        change(value, item.id).then()
                      }}
                    />
                    <div className={`mt-5 text-12 text-center`}>
                      {item.status ? t('Active') : t('Coming Soon')}
                    </div>
                  </div>
                )
              })}
            </Space>
          </div>

          <div>
            <Button
              type="default"
              onClick={() => {
                props.openChangeNumber(true)
              }}
              className={`w-273 h-36 mt-55 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
            >
              {t('Change Number')}
            </Button>
            <div className="mt-20">
              <Button
                type="default"
                className={`w-273 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
              >
                {t('Manage Uploaded Files')}
              </Button>
            </div>
            <div className="mt-20">
              <Button
                type="default"
                onClick={() => {
                  props.openQuestionAnswer(true)
                }}
                className={`w-273 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
              >
                {t('Manage Questions & Answers')}
              </Button>
            </div>
            <div className="mt-20">
              <Button
                type="default"
                onClick={() => {
                  props.openSalesPitches(true)
                }}
                className={`w-273 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
              >
                {t('Manage Sales Pitches')}
              </Button>
            </div>
            <div className="mt-20">
              <Button
                type="default"
                onClick={props.deleteConfirm}
                className={`w-273 h-36 flex items-center justify-center bg-[#EA6969] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
              >
                {t('Delete')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatBot
