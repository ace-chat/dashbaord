import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input } from 'antd'
import { pxToVw } from '@/utils'
import Icon from '../Icon/Icon';

import type { Key } from 'react'
import type { SalesPitchProps } from '@/types'

const SalesPitch = (props: SalesPitchProps) => {
  const { t } = useTranslation();

  const sps = useMemo(() => props.sps, [props.sps])

  const disabled = useMemo(() => {
    let status = props.sps.length === 0;
    props.sps.forEach(item => {
      if(item.input === "" || item.topic === ""){
        status = true;
      }
    })
    return status
  }, [props.sps])

  const change = (text: string, key: Key, type: 'topic' | 'value') => {
    props.onChange(text, key, type);
  }

  const remove = (key: Key) => {
    props.onRemove(key)
  }

  const add = () => {
    props.onAdd()
  }

  const confirm = () => {
    props.onConform()
  }

  return <>
    <div style={{
      fontSize: pxToVw(22)
    }}>{t("Add Sales Pitches to Knowledge Base")}</div>
    <div style={{
      fontSize: pxToVw(12),
      color: "#767676"
    }}>{t("Add Sales Pitch to your chatbot’s knowledge base so when they ask a relevant question to the topic the chatbot can send them a marketing message")}</div>
    <div className='w-full max-h-[40vh] overflow-y-auto flex flex-col items-start' style={{marginTop: 20}}>
      {
        sps.map(item => {
          return <div key={item.key} className={`w-full`}>
            <div className={`w-full`}>
              <div style={{fontSize: pxToVw(14), marginTop: pxToVw(10)}}>{t("Topic (Keyword)")}</div>
              <div className='flex items-center w-full' style={{marginTop: pxToVw(10)}}>
                <Input styles={{
                  input: {
                    flex: 1,
                    height: pxToVw(40),
                    fontSize: pxToVw(14),
                    backgroundColor: "#F4F6FA",
                    borderWidth: 0
                  }
                }} placeholder={t("Type Here")} value={item.topic} onChange={(e) => {
                  change(e.target.value, item.key, 'topic')
                }}/>
                <div className={`w-40 h-40 bg-[#F4F6FA] flex items-center justify-center rounded-4 ml-10 cursor-pointer`} onClick={() => { remove(item.key) }}>
                  <Icon name='trash' style={{width: pxToVw(13), height: pxToVw(13)}}/>
                </div>
              </div>
            </div>
            <div className={`w-full`}>
              <div style={{fontSize: pxToVw(14), marginTop: pxToVw(10)}}>{t("Sales Pitch")}</div>
              <div className='flex items-center w-full' style={{marginTop: pxToVw(10)}}>
                <Input styles={{input: {flex: 1, height: pxToVw(40), fontSize: pxToVw(14), backgroundColor: "#FFF"}}}
                       placeholder={t("Type Here")} value={item.input} onChange={(e) => {
                  change(e.target.value, item.key, 'value')
                }}/>
              </div>
            </div>
          </div>
        })
      }
    </div>
    {/* ADD SalesPitch PAIR */}
    <div className='mt-40 w-full'>
      <Button
        type="default"
        onClick={add}
        className={`w-full h-40 flex items-center justify-center bg-[#F4F6FA] rounded-4 text-14 text-[#F4F6FA] cursor-pointer select-none`}
        style={{
          borderWidth: 0
        }}
      >
        <Icon name='add' style={{width: pxToVw(13), height: pxToVw(13)}}/>
      </Button>
    </div>

    <div className='w-full flex items-center justify-center'>
      <Button
        type="default"
        style={{borderRadius: pxToVw(20), marginTop: pxToVw(30), marginBottom: pxToVw(30)}}
        disabled={disabled}
        onClick={confirm}
        className={`w-167 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 cursor-pointer select-none`}
      >
        <div className={`text-13 text-transparent`} style={{ backgroundImage: "linear-gradient(90deg, #9C34AB -0.02%, #4F6BE8 47.92%, #14B8BC 100.02%)", backgroundClip: 'text' }}>{t('Save Sales Pitch ✨')}</div>
      </Button>
    </div>
  </>
};

export default SalesPitch