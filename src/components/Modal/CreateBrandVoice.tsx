import { Button, Input, Modal } from 'antd'
import { pxToVw } from '@/utils'
import { useState } from 'react';

export const CreateBrandVoice = ({t, createBrandVoice, toggleCreateBrandVoice, brandVoiceText, setBrandVoiceText, brandVoiceTitle, setBrandVoiceTitle}: any) => {
    const [tag, setTag] = useState(0);

    return(
        <Modal
            className='brand_model'
            centered
            open={createBrandVoice}
            onCancel={toggleCreateBrandVoice}
            maskClosable={false}
            footer={() => {
                return(
                    <div className='flex items-center justify-center'>
                        <Button
                            type="default"
                            style={{ borderRadius: pxToVw(20), marginTop: pxToVw(30), marginBottom: pxToVw(30) }}
                            disabled={
                                brandVoiceText && tag == 0 ? false : brandVoiceTitle && brandVoiceText && tag == 1 ? false : true
                            }
                            onClick={() => {
                                tag == 0 ? setTag(1) : toggleCreateBrandVoice();
                            }}
                            className={`w-167 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 cursor-pointer select-none`}
                        >
                            <div className='modal-text'>{tag == 0 ? t('Create Brand Voice! ✨') : t('Save Brand Voice!')}</div>
                        </Button>
                    </div>
                )
            }}
        >
            <div className='flex flex-col justify-center items-start'>
                <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(22) }}>{tag == 0 ? t("Create Brand Voice") : t("Save Brand Voice")}</div>
                <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(12), color: "#767676"  }}>{t("Write or paste content that reflects your brand voice. For best results, we recommend between 50-500 words.")}</div>
                {tag == 1 &&
                    <Input styles={{ input: { width: "100%", height: pxToVw(40), fontSize: pxToVw(10), marginTop: pxToVw(30), backgroundColor: "#F4F6FA", borderWidth: 0, } }} 
                        placeholder={t('Name your brand voice')} value={brandVoiceTitle} onChange={(e) => setBrandVoiceTitle(e.target.value) } />
                }
                <Input.TextArea styles={{ textarea: { width: pxToVw(680), height: pxToVw(200), fontSize: pxToVw(10), backgroundColor: "#F4F6FA", borderWidth: 0, marginTop: pxToVw(30) } }} 
                    placeholder={t('Add a snippet of an article, blog, or any content so ACE can create a best Brand voice for you.')} 
                    value={brandVoiceText} onChange={(e) => setBrandVoiceText(e.target.value)}
                />
            </div>
      </Modal>
    )
};