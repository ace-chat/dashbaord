import { Button, Input, Modal, Select } from 'antd'
import { pxToVw } from '@/utils'
import { useState } from 'react';
import Icon from '../Icon/Icon';

export const QA = ({t, qA, toggleQA, qAPairs, setQAPairs}: any) => {
    return(
        <Modal
            className='qa_modal'
            centered
            open={qA}
            onCancel={toggleQA}
            maskClosable={false}
            footer={() => {
                return(
                    <div className='flex items-center justify-center'>
                        <Button
                            type="default"
                            style={{ borderRadius: pxToVw(20), marginTop: pxToVw(30), marginBottom: pxToVw(30) }}
                            disabled={qAPairs?.length > 0 ? false : true}
                            onClick={() => {
                                toggleQA();
                            }}
                            className={`w-167 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 cursor-pointer select-none`}
                        >
                            <div className='modal-text'>{t('Save Q&A ✨')}</div>
                        </Button>
                    </div>
                )
            }}
        >
            <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(22) }}>{t("Add Q/A pairs to Knowledge Base")}</div>
            <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(12), color: "#767676"  }}>{t("Add question-answer pairs to your chatbot's knowledge base that your customers are most likely to ask.")}</div>
            <div className='flex flex-col items-start' style={{marginTop: 20}}>
                <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(14) }}>{t("Question")+" "+(qAPairs.length + 1)}</div>
                <div className='flex flex-row' style={{ marginTop: pxToVw(10) }}>
                    <Input styles={{ input: { width: pxToVw(850), height: pxToVw(40), fontSize: pxToVw(14), backgroundColor: "#F4F6FA", borderWidth: 0 } }} 
                        placeholder={t('Answer')+" "+(qAPairs.length + 1)} />
                    <div style={{
                        width: pxToVw(40),
                        height: pxToVw(40),
                        backgroundColor: "#F4F6FA",
                        alignItems: "center",
                        justifyContent: "center",   
                        marginLeft: pxToVw(10),
                        borderRadius: pxToVw(4),
                        display: "flex"
                    }}>
                        <Icon name='trash' style={{ width: pxToVw(13), height: pxToVw(13) }} />
                    </div>
                </div>
                {/* ADD QA PAIR */}
            </div>
            
      </Modal>
    )
};