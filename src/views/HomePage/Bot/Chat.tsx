import { useState } from 'react'
import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { pxToVw } from '@/utils'
import { Button, Input } from 'antd'

const Chat = () => {
  const { t } = useTranslation()

  const [history] = useState([
    { key: '1', time: 'Today', children: [
        { key: '1-1', text: 'Borem ipsum dolordict ImahBorem ipsum d' },
        { key: '1-2', text: 'Borem ipsum dolordict ImahBorem ipsum d' }
      ] },
    { key: '2', time: 'Oct, 10st', children: [
        { key: '2-1', text: 'Borem ipsum dolordict ImahBorem ipsum d' },
        { key: '2-2', text: 'Borem ipsum dolordict ImahBorem ipsum d' }
      ] }
  ]);


  return <>
    <div className={`bg-white rounded-8 mt-40`} style={{ boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
      <div className={`flex items-center flex-col`} style={{ 'width': pxToVw(1150) }}>
        <div className={`text-20 text-black mt-30`}>{ t("Ace, Your Brand Centric Chatbot") }</div>
        <div className={`text-12 text-[#545B65] mt-12 pb-12`}>{ t("How Can ACE Chatbot Help You Today?") }</div>
      </div>
      <div className={`flex justify-around`}>

        <div className='flex' style={{ flexDirection: "column" }}>
            <div className="p-24" style={{ 'width': pxToVw(1150), 'height': pxToVw(750), display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', }}>
                <Icon name={'generate'} style={{ 'width': pxToVw(62), 'height': pxToVw(40) }} />
                <div className='mt-10'>
                    <Icon name={"ace"} style={{ 'width': pxToVw(62), 'height': pxToVw(40) }} />
                </div>
                <p className="text-12 text-[#C4C4C4] font-light">{ t("Let's Get Started!") }</p>
            </div>
            <div>
                <Input className='message-box' styles={{ input: { fontSize: pxToVw(10) } }} placeholder={t('Send a Message')}
                    suffix={
                        <Icon name={"send"} style={{ 'width': pxToVw(10), 'height': pxToVw(10) }} />
                    } 
                />
            </div>
        </div>
    
        <div className={`w-289 p-24 h-821`}>
        <Button
            type="default"
            onClick={() => {}}
            className={`w-161 h-36 flex items-center justify-center rounded-8 text-14 cursor-pointer select-none`}
        >
            <Icon name={'add'} style={{ 'width': pxToVw(11), 'height': pxToVw(11), 'marginRight': '12px' }} />
            {t('Create New Chat')}
        </Button>
          <div className={`mt-24`}>
            {
              history.map(item => {
                return <div key={item.key} className={`mb-30`}>
                  <div className={`text-10 text-[#787878]`}>{ t(item.time) }</div>
                  <div className={`cursor-pointer`}>
                    {
                      item.children.map(it => {
                        return <div key={it.key} className={`flex items-center mt-18`}>
                          <Icon name={'history'} style={{ 'width': pxToVw(12), 'height': pxToVw(14) }} />
                          <span className={`text-12 text-black ml-8 truncate`}>{ t(it.text) }</span>
                        </div>
                      })
                    }
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Chat
