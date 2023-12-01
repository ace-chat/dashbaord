import { useState } from 'react'
import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { pxToVw } from '@/utils'
import { Button, Input } from 'antd'
import Avatar from '../../../assets/message_avatar.png'

const Chat = () => {
  const { t } = useTranslation()
  const [message, setMessage]: any = useState("");
  const [messages, setMessages]: any = useState([]);

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

  const sendMessage = () => {
    console.log([...messages, message]);
    setMessages([...messages, message]);
    setMessage("");
  };

  return <>
    <div className='flex flex-col mt-14' style={{ marginLeft: pxToVw(29), overflow: "hidden" }}>
      <div className={`text-black`} style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(18)}}>{ t("Chat With ACE") }</div>
      <div className={`text-[#545B65] mt-4`} style={{ fontFamily: "PingFang SC Light", fontSize: pxToVw(14) }}>{ t("How Can ACE Help You Today?") }</div>
    </div>
    <div className={`bg-white rounded-8 mt-14`} style={{ width: pxToVw(1389), height: pxToVw(748), marginLeft: pxToVw(29), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
      <div className={`flex justify-around`}>

        <div className="flex" style={{ flexDirection: "column", height: pxToVw(748) }}>
            <div className="scrollable-content p-24" style={{ 'width': pxToVw(1081), 'height': pxToVw(680), display: "flex", flexDirection: "column" }}>
            {messages.length == 0 ?
              <div className='flex' style={{  display: "flex" , 'height': pxToVw(680), flexDirection:"column", alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={'generate'} style={{ 'width': pxToVw(62), 'height': pxToVw(40) }} />
                <div className='mt-10'>
                    <Icon name={"ace"} style={{ 'width': pxToVw(62), 'height': pxToVw(40) }} />
                </div>
                <p className="text-12 text-[#C4C4C4]" style={{ fontFamily: "PingFang SC Light" }}>{ t("Let's Get Started!") }</p>
              </div>
            :
                messages.map((message: any, index: any) => {
                  return(
                    <div style={{ display: "flex", width: pxToVw(930), alignSelf: "center", flexDirection: "row", alignItems: "center", marginTop: index !== 0 ? pxToVw(20) : pxToVw(0) }}>

                      <div className='message-profile' 
                        style={{ 
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background: index % 2 !== 0 ? `linear-gradient(47deg, #8810C0 6.38%, #4D5BE2 52.16%, #1C9AFF 94.05%)` : "#d9d9d9",
                          alignSelf: "flex-start" 
                        }} 
                      >
                        {index % 2 !== 0 ? 
                          <Icon name={"ace_white"} style={{ width: pxToVw(30), height: pxToVw(20), alignSelf: "center" }} />
                        :
                          <img src={Avatar} alt="Profile Image" style={{ width: pxToVw(40), height: pxToVw(40), borderRadius: pxToVw(8), alignSelf: "center", objectFit: "contain" }} />
                        }
                      </div>

                      <p key={index} style={{ fontFamily: "PingFang SC Regular", fontSize: pxToVw(14), color: "black", marginLeft: pxToVw(18), width: pxToVw(870) }}>
                        {message}
                      </p>

                      <div className={`flex items-center justify-end self-start`}>
                        {index % 2 !== 0 ? 
                          <div className={`w-78 flex items-center justify-between`}>
                            <div className={`cursor-pointer`}>
                              <Icon name={'copied'} style={{ 'width': pxToVw(15), 'height': pxToVw(15), color: "grey" }} />
                            </div>
                            <div className={`cursor-pointer`}>
                              <Icon name={'good'} style={{ 'width': pxToVw(15), 'height': pxToVw(15), color: "grey"  }} />
                            </div>
                            <div className={`cursor-pointer`}>
                              <Icon name={'poor'} style={{ 'width': pxToVw(15), 'height': pxToVw(15), color: "grey"  }} />
                            </div>
                          </div>
                        :
                        index === messages.length - 2 && 
                          <div className={`w-78 flex items-center justify-between`}>
                            <div className={`cursor-pointer`}>
                              <Icon name={'pen'} style={{ 'width': pxToVw(15), 'height': pxToVw(15), color: "grey", marginLeft: pxToVw(65) }} />
                            </div>
                          </div>
                        }
                      </div>

                    </div>                    
                  )
                })
                }
            </div>
            <div>
                <Input className='message-box' styles={{ input: { fontSize: pxToVw(12) } }} placeholder={t('Send a Message')} value={message} onChange={(e) => setMessage(e.target.value)}
                    suffix={
                      <div onClick={() => {
                        sendMessage()
                      }}>
                        <Icon name={"send"} style={{ 'width': pxToVw(12), 'height': pxToVw(12) }} />
                      </div>
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
          <div style={{ fontFamily: "PingFang SC Regular" }}>{t('Create New Chat')}</div>
        </Button>
          <div className={`mt-24 scrollable-content`}>
            {
              history.map(item => {
                return <div key={item.key} className={`mb-30`}>
                  <div className={`text-10 text-[#787878]`} style={{ fontFamily: "PingFang SC Light" }}>{ t(item.time) }</div>
                  <div className={`cursor-pointer`}>
                    {
                      item.children.map(it => {
                        return <div key={it.key} className={`flex items-center mt-18`}>
                          <Icon name={'history'} style={{ 'width': pxToVw(12), 'height': pxToVw(14) }} />
                          <span className={`text-12 text-black ml-8 truncate`} style={{ fontFamily: "PingFang SC Medium" }}>{ t(it.text) }</span>
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
