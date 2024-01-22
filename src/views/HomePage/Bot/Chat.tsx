import { useState, useEffect, useRef, useMemo } from 'react'
import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { pxToVw, copied } from '@/utils'
import { Button, Input } from 'antd'
import Avatar from '@/assets/message_avatar.png'
import Loading from "@/assets/chat_loading.gif"

import { getChatList, getChatHistory, createChatBot, askChatBot } from "@/request"
import {ChatHistory, ChatHistoryChildren, ChatMessage} from "@/types";
import moment from "moment-timezone";
import { cloneDeep } from "lodash-es"

const Chat = () => {
  const { t } = useTranslation()
  const mg = useRef<null | HTMLDivElement>(null);
  const [chatId, setChatId] = useState<string>("");
  const [message, setMessage]: any = useState("");
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [history, setHistory] = useState<Array<ChatHistory>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isNewChat, setIsNewChat] = useState<boolean>(false);

  const disabled = useMemo(() => {
    return chatId === "";

  }, [chatId]);

  useEffect(() => {
    if (chatId && isNewChat) {
      messaging()
      // setIsNewChat(false)
    } else {
      setMessages([])
    }
  }, [chatId, isNewChat])

  const createNewChat = () => {
    setIsNewChat(false)
    create().then()
  }

  
  const sendMessage = async () => {
    setIsNewChat(true)
    if (chatId === '') {
      await create()
    }
    if (chatId) {
      messaging()
    }
    setIsNewChat(false)
  }

  const messaging = () => {
    setLoading(true)
    let m = cloneDeep(messages)
    m.push({
      key: Math.random() * 10000,
      type: 'human',
      content: message,
      time: moment().local().format(),
    })
    setMessages(m)
    setMessage('')

    askChatBot({ id: chatId, content: message })
      .then((res) => {
        let mCopy = cloneDeep(m)
        mCopy.push({
          key: Math.random() * 10000,
          type: 'ai',
          content: res,
          time: moment().local().format(),
        })
        setMessages(mCopy)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const create = async () => {
    setChatId('')
    let res = await createChatBot();
    await getHistory(res.chat_id);
    setMessages([]);
    setLoading(false);
  }

  const choose = async (id: string) => {
    await getHistory(id);
    setLoading(false);
  }

  const getList = async () => {
    let response: Array<ChatHistoryChildren> = await getChatList();

    let arr: Map<string, Array<ChatHistoryChildren>> = new Map();
    response.forEach(item => {
      let time = moment(item.created_at).local().format("MMMM Do YYYY");

      if(arr.has(time)){
        let a = arr.get(time) || [];
        a.push(item);
        arr.set(time, a);
      }else{
        arr.set(time, [item])
      }
    })

    let a: Array<ChatHistory> = [];
    arr.forEach((value, key) => {
      a.push({
        time: key,
        children: value,
      })
    })

    let realArr = a.reverse();
    if(realArr.length !== 0) {
      await getHistory(realArr[0].children[0].chat_id)
    }
    setHistory(realArr);
  };

  const getHistory = async (id: string) => {
    setChatId(id);
    let res: Array<ChatMessage> = await getChatHistory(id);

    let m: Array<ChatMessage> = [];
    res.forEach(item => {
      m.push({
        key: Math.random() * 10000,
        type: item.type,
        content: item.content,
        time: item.time
      })
    })

    setMessages(m);
  }

  useEffect(() => {
    setLoading(false);
    Promise.all([
      getList()
    ]).then();
  }, []);

  useEffect(() => {
    mg.current?.scrollTo({
      top: 10000000,
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <>
      <div className="flex flex-col mt-14 ml-29 overflow-hidden">
        <div
          className={`text-black text-18`}
          style={{ fontFamily: 'PingFang SC Medium' }}
        >
          {t('Chat With ACE')}
        </div>
        <div
          className={`text-[#545B65] mt-4 text-14`}
          style={{ fontFamily: 'PingFang SC Light' }}
        >
          {t('How Can ACE Help You Today?')}
        </div>
      </div>
      <div
        className={`bg-white rounded-8 mt-14 w-1389 h-748 ml-29`}
        style={{ boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)' }}
      >
        <div className={`flex justify-around`}>
          <div className={'flex flex-col h-748'}>
            <div
              ref={mg}
              className={
                'p-24 flex flex-col w-1081 h-680 overflow-y-auto items-center'
              }
            >
              {messages.length == 0 ? (
                <div
                  className={`w-680 flex flex-col items-center justify-center pt-306`}
                >
                  <Icon
                    name={'generate'}
                    style={{ width: pxToVw(62), height: pxToVw(40) }}
                  />
                  <div className="mt-10">
                    <Icon
                      name={'ace'}
                      style={{ width: pxToVw(62), height: pxToVw(40) }}
                    />
                  </div>
                  <p
                    className="text-12 text-[#C4C4C4]"
                    style={{ fontFamily: 'PingFang SC Light' }}
                  >
                    {t("Let's Get Started!")}
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  return (
                    <div
                      key={msg.key}
                      className={`w-930 flex self-center items-center flex-row mt-20`}
                    >
                      <div
                        className={`message-profile flex items-center justify-center self-start `}
                        style={{
                          background:
                            msg.type === 'ai'
                              ? `linear-gradient(47deg, #8810C0 6.38%, #4D5BE2 52.16%, #1C9AFF 94.05%)`
                              : '#d9d9d9',
                        }}
                      >
                        {msg.type === 'ai' ? (
                          <Icon
                            name={'ace_white'}
                            style={{
                              width: pxToVw(30),
                              height: pxToVw(20),
                              alignSelf: 'center',
                            }}
                          />
                        ) : (
                          <img
                            src={Avatar}
                            alt="Profile Image"
                            className={`w-40 h-40 rounded-8 self-center object-contain`}
                          />
                        )}
                      </div>

                      <div
                        className={`text-14 text-black ml-18 w-870 leading-4`}
                        style={{ fontFamily: 'PingFang SC Regular' }}
                        dangerouslySetInnerHTML={{ __html: msg.content }}
                      ></div>

                      <div
                        className={`flex items-center justify-end self-start`}
                      >
                        {msg.type === 'ai' && (
                          <div
                            className={`w-78 flex items-center justify-between`}
                          >
                            <div className={`cursor-pointer`}
                            onClick={() => copied(msg.content)}
                            >
                              <Icon
                                name={'copied'}
                                style={{
                                  width: pxToVw(15),
                                  height: pxToVw(15),
                                  color: 'grey',
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
              {loading && (
                <div className={`flex items-center justify-center mt-20`}>
                  <div className={`w-930 flex items-center`}>
                    <div
                      className={`message-profile flex items-center justify-center self-start `}
                      style={{
                        background:
                          'linear-gradient(47deg, #8810C0 6.38%, #4D5BE2 52.16%, #1C9AFF 94.05%)',
                      }}
                    >
                      <Icon
                        name={'ace_white'}
                        style={{
                          width: pxToVw(30),
                          height: pxToVw(20),
                          alignSelf: 'center',
                        }}
                      />
                    </div>
                    <div className={`w-120 text-14 text-black ml-18`}>
                      <img src={Loading} alt="loading" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <Input
                className="message-box"
                disabled={disabled}
                styles={{ input: { fontSize: pxToVw(12) } }}
                placeholder={t('Send a Message')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onPressEnter={sendMessage}
                suffix={
                  <div onClick={sendMessage}>
                    <Icon
                      name={'send'}
                      style={{ width: pxToVw(12), height: pxToVw(12) }}
                    />
                  </div>
                }
              />
            </div>
          </div>

          <div className={`w-289 p-24 h-680`}>
            <Button
              type="default"
              onClick={createNewChat}
              className={`w-161 h-36 flex items-center justify-center rounded-8 text-14 cursor-pointer select-none`}
            >
              <Icon
                name={'add'}
                style={{
                  width: pxToVw(11),
                  height: pxToVw(11),
                  marginRight: '12px',
                }}
              />
              <div style={{ fontFamily: 'PingFang SC Regular' }}>
                {t('Create New Chat')}
              </div>
            </Button>
            <div className={`mt-24 h-full overflow-y-auto`}>
              {history.map((item) => {
                return (
                  <div key={item.time} className={`mb-30`}>
                    <div
                      className={`text-10 text-[#787878]`}
                      style={{ fontFamily: 'PingFang SC Light' }}
                    >
                      {item.time}
                    </div>
                    <div className={`cursor-pointer`}>
                      {item.children.map((it) => {
                        return (
                          <div
                            key={it.created_at}
                            className={`flex items-center mt-18`}
                            onClick={() => {
                              choose(it.chat_id)
                            }}
                          >
                            <Icon
                              name={'history'}
                              style={{ width: pxToVw(12), height: pxToVw(14) }}
                            />
                            <span
                              className={`text-12 text-black ml-8 truncate`}
                              style={{ fontFamily: 'PingFang SC Medium' }}
                            >
                              {it.title}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
