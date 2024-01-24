import { useState, useMemo } from 'react'
import { Button, Input, Modal } from 'antd'
import { pxToVw } from '@/utils'
import { useTranslation } from 'react-i18next'
import { createVoice, saveVoice } from "@/request"

type Prop = {
  open: boolean;
  confirm: (id: number) => void;
}

export const CreateBrandVoice = (prop: Prop) => {
  const { t } = useTranslation()

  const [dialog, setDialog] = useState({
    title: "Create Brand Voice",
    step: 0,
    show: false,
    desc: "Write or paste content that reflects your brand voice. For best results, we recommend between 50-500 words."
  });
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [voice, setVoice] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => {
    if(dialog.step === 0){
      return desc === "";
    }else{
      return name === "";
    }
  }, [name, desc])
  const descDisabled = useMemo(() => {
    return dialog.step !== 0;
  }, [dialog])

  const toggle = async () => {
    setLoading(true);
    if(dialog.step === 0){
      let res = await createVoice({ text: desc });
      setVoice(res);
      setDialog({
        title: "Save Brand Voice",
        step: 1,
        show: true,
        desc: "Write or paste content that reflects your brand voice. For best results, we recommend between 50-500 words."
      });
      setLoading(false);
    }else{
      let res = await saveVoice({ name: name, text: desc, content: voice });
      prop.confirm(res.id);
    }
  }

  return (
    <Modal
      className="brand_model"
      centered
      open={prop.open}
      maskClosable={false}
      footer={null}
      destroyOnClose
    >
      <div className="flex flex-col justify-center items-start">
        <div className={`text-22`}>
          {t(dialog.title)}
        </div>
        <div className={`text-12 text-[#767676] mt-5`}>
          {t(dialog.desc)}
        </div>
        {dialog.step === 1 && (
          <>
            <Input
              styles={{
                input: {
                  width: '100%',
                  height: pxToVw(40),
                  fontSize: pxToVw(15),
                  marginTop: pxToVw(30),
                  backgroundColor: '#F4F6FA',
                  borderWidth: 0,
                },
              }}
              placeholder={t('Name your brand voice')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className={`w-full bg-[#F5F5FB] p-18 rounded-9 text-16 text-[#767676] my-15`}>{ desc }</div>

            <div className={`w-full bg-[#F5F5FB] p-18 rounded-9 text-16 text-[#767676]`}>{ voice }</div>
          </>
        )}
        {
          dialog.step === 0 && <>
            <Input.TextArea disabled={descDisabled} className={`w-648 !h-294 text-10 bg-[#F4F6FA] border-0 mt-30`}
                            placeholder={t(
                              'Add a snippet of an article, blog, or any content so ACE can create a best Brand voice for you.'
                            )}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
            />
          </>
        }

        <div className="w-full flex items-center justify-center">
          <Button
            type="default"
            disabled={disabled}
            loading={loading}
            onClick={toggle}
            className={`w-167 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 cursor-pointer select-none my-30 border-none`}
          >
            <div className="modal-text">
              {dialog.step == 0 ? t('Create Brand Voice! ✨') : t('Save Brand Voice!')}
            </div>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
