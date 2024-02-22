import { useState, useEffect } from 'react'
import type { Key } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Spin } from 'antd'
import { pxToVw } from '@/utils'
import { cloneDeep } from 'lodash-es'

import { getBusinessChatBot, changePhoneNumber, sendVerifyCode, changeQuestionAnswer, changeSalesPitches, changeUploadFiles, deleteChatBot } from "@/request"

import ChangeNumber from '@/components/Modal/ChangeNumber';
import Verify from '@/components/Modal/Verify';
import ManageFiles from '@/components/Modal/ManageFiles';
import QuestionAnswer from '@/components/Modal/QuesionAnswer.tsx';
import SalesPitch from '@/components/Modal/SalesPitch';
import Generator from "@/components/BusinessChatBot/Generator.tsx";
import ChatBot from "@/components/BusinessChatBot/ChatBot.tsx";

import {SP, QA, BusinessChat, Dialog, QuestionAndAnswer, SalesAndPitches, File} from "@/types";

const Create = () => {
  const {t} = useTranslation()

  const [loading, setLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [chatBot, setChatBot] = useState<BusinessChat & { platform: Array<{ id: number, name: string, status: boolean }> }>({
    id: 0,
    company_name: "",
    links: [],
    company_introduction: "",
    platform: [],
    phone_number: "",
    tone: 0,
    qa: [],
    sales_pitches: [],
    files: []
  });

  const [questionAnswerOpen, setQuestionAnswerOpen] = useState(false);
  const [qas, setQas] = useState<Array<QA>>([]);

  const qaChange = (text: string, key: Key, type: 'question' | 'answer') => {
    let qasCopy = cloneDeep(qas);
    let index = qasCopy.findIndex(elem => elem.key === key);
    switch (type) {
      case "question":
        qasCopy[index].question = text;
        break
      case "answer":
        qasCopy[index].answer = text;
        break;
      default:
        break;
    }
    setQas(qasCopy);
  }

  const qaAdd = () => {
    let qasCopy = cloneDeep(qas);
    qasCopy.push({
      key: `sp ${new Date().getTime()}`,
      question: "",
      answer: ""
    });
    setQas(qasCopy);
  }

  const qaRemove = (key: Key) => {
    let qasCopy = cloneDeep(qas);
    let index = qasCopy.findIndex(elem => elem.key === key);
    qasCopy.splice(index, 1)
    setQas(qasCopy);
  }

  const qaConfirm = async () => {
    if(isActive){
      let qa: Array<QuestionAndAnswer> = [];
      qas.forEach(item => {
        qa.push({
          question: item.question,
          answer: item.answer
        })
      })
      await changeQuestionAnswer({ id: chatBot.id, qa });
    }
    setQuestionAnswerOpen(false);
  }

  const [salesPitchesOpen, setSalesPitchesOpen] = useState(false);
  const [sps, setSps] = useState<Array<SP>>([]);

  const spChange = (text: string, key: Key, type: 'topic' | 'value') => {
    let spsCopy = cloneDeep(sps);
    let index = spsCopy.findIndex(elem => elem.key === key);
    switch (type) {
      case "topic":
        spsCopy[index].topic = text;
        break
      case "value":
        spsCopy[index].input = text;
        break;
      default:
        break;
    }
    setSps(spsCopy);
  }

  const spAdd = () => {
    let spsCopy = cloneDeep(sps);
    spsCopy.push({
      key: `sales pitches ${new Date().getTime()}`,
      topic: "",
      input: ""
    });
    setSps(spsCopy);
  }

  const spRemove = (key: Key) => {
    let spsCopy = cloneDeep(sps);
    let index = spsCopy.findIndex(elem => elem.key === key);
    spsCopy.splice(index, 1)
    setSps(spsCopy);
  }

  const spConfirm = async () => {
    if(isActive){
      let s: Array<SalesAndPitches> = [];
      sps.forEach(item => {
        s.push({
          topic: item.topic,
          input: item.input,
        })
      })
      await changeSalesPitches({ id: chatBot.id, sales_pitches: s });
    }
    setSalesPitchesOpen(false);
  }

  const [changeNumberOpen, setChangeNumberOpen] = useState<Dialog & { phoneNumber: string }>({
    show: false,
    phoneNumber: "",
    step: 2,
  });

  const [uploadedFileOpen, setUploadedFileOpen] = useState(false);

  /* Generator component prop functions */
  const openSalesPitches = (status: boolean) => {
    if(isActive){
      let s: Array<SP> = [];
      chatBot.sales_pitches.forEach(item => {
        s.push({
          key: new Date().getTime(),
          topic: item.topic,
          input: item.input,
        })
      })
      setSps(s)
    }
    setSalesPitchesOpen(status);
  }

  const openQuestionAnswer = (status: boolean) => {
    if(isActive){
      let s: Array<QA> = [];
      chatBot.qa.forEach(item => {
        s.push({
          key: new Date().getTime(),
          question: item.question,
          answer: item.answer,
        })
      })
      setQas(s)
    }
    setQuestionAnswerOpen(status);
  }

  const openActive = (status: boolean) => {
    setIsActive(status)
  }

  const openChangeNumber = (status: boolean) => {
    setChangeNumberOpen({
      show: status,
      phoneNumber: "",
      step: 1,
    })
  }

  const inputPhoneNumberConfirm = async (phoneNumber: string) => {
    await sendVerifyCode({
      type: "phone",
      target: phoneNumber,
    });
    setChangeNumberOpen({
      show: true,
      phoneNumber,
      step: 2,
    })
  }

  const VerifyConfirm = async (code: string) => {
    await changePhoneNumber({
      id: chatBot.id,
      phone: changeNumberOpen.phoneNumber,
      verifyCode: code
    })
    openChangeNumber(false);
  }

  const filesUpload = (file: File) => {
    let chatBotCopy = cloneDeep(chatBot)
    chatBotCopy.files.push(file.url)
    setChatBot(chatBotCopy)
  }

  const filesRemove = (file: File) => {
    let chatBotCopy = cloneDeep(chatBot)
    const index = chatBotCopy.files.findIndex(f => f === file.url)
    chatBotCopy.files.splice(index, 1)
    setChatBot(chatBotCopy)
  }

  const fileConfirm = async () => {
    const params = {
      id: chatBot.id,
      urls: chatBot.files,
    }
    await changeUploadFiles(params)
    setUploadedFileOpen(false)
  }

  const deleteChatBotConfirm = async () => {
    await deleteChatBot({ id: chatBot.id });
    await getActive()
  }
  /* Generator component prop functions */

  const refresh = () => {
    getActive().then()
  }

  const getActive = async () => {
    setLoading(true)
    let res = await getBusinessChatBot()
    console.log(res)
    if(res){
      setChatBot(res);
      setIsActive(true);
    }else{
      setIsActive(false);
    }
    setLoading(false)
  }

  useEffect(() => {
    getActive().then();
  }, []);

  return <>
    <Spin spinning={loading}>
      <div className={`flex flex-col`}>
        <div className='flex flex-row mt-14' style={{marginLeft: pxToVw(29)}}>
          <div className={`text-black text-18`}>{t("Ready To Generate AI Chatbot For Your Business?")}</div>
        </div>
        <div
          className={`text-[#545B65] mt-4 ml-29 text-14`}>{t("Get your best customer support chatbot for your business. Just a click away.")}</div>
      </div>
      <div className={`w-1389 ml-29 bg-white rounded-8 mt-14`}
           style={{boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
        {
          isActive ? <ChatBot chatBot={chatBot} openChangeNumber={openChangeNumber} openQuestionAnswer={openQuestionAnswer} openSalesPitches={openSalesPitches} refresh={refresh} /> :
            <Generator salesPitches={sps} questionAnswer={qas} openSalesPitches={openSalesPitches} openQuestionAnswer={openQuestionAnswer} openActive={openActive}/>
        }
      </div>
    </Spin>

    {/* Modals Import */}
    <Modal width={`70vw`} style={{padding: '40px 60px'}} centered open={uploadedFileOpen} onCancel={() => {
      setUploadedFileOpen(false)
    }} destroyOnClose footer={null}>
      <ManageFiles files={chatBot.files} onUpload={filesUpload} onRemove={filesRemove} onConfirm={fileConfirm} />
    </Modal>
    <Modal width={`40vw`} style={{padding: '40px 60px'}} centered open={changeNumberOpen.show} onCancel={() => {
      setChangeNumberOpen({
        show: false,
        phoneNumber: "",
        step: 1,
      })
    }} destroyOnClose footer={null}>
      { changeNumberOpen.step === 1 ? <ChangeNumber onConfirm={inputPhoneNumberConfirm} /> : <Verify phone={changeNumberOpen.phoneNumber} onConfirm={VerifyConfirm} /> }
    </Modal>
    <Modal width={`55vw`} style={{padding: '40px 60px'}} centered open={questionAnswerOpen} onCancel={() => {
      setQuestionAnswerOpen(false)
    }} destroyOnClose footer={null}>
      <QuestionAnswer qas={qas} onChange={qaChange} onAdd={qaAdd} onRemove={qaRemove} onConform={qaConfirm}/>
    </Modal>
    <Modal width={`55vw`} style={{padding: '40px 60px'}} centered open={salesPitchesOpen} onCancel={() => {
      setSalesPitchesOpen(false)
    }} destroyOnClose footer={null}>
      <SalesPitch sps={sps} onChange={spChange} onAdd={spAdd} onRemove={spRemove} onConform={spConfirm}/>
    </Modal>
  </>
}

export default Create