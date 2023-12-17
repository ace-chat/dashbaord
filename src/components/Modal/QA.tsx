import { Button, Input, Modal } from 'antd'
import { pxToVw } from '@/utils'
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
                            disabled={(qAPairs.length === 0 || !qAPairs.every((pair: any) => pair.question !== '' && pair.answer !== '')) ? true : false}
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
                {qAPairs.map((pair: any, index: any) => {
                    return(
                        <>
                            <div key={index} style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(14), marginTop: pxToVw(10) }}>{t("Question")+" "+(index + 1)}</div>
                            <div className='flex flex-row' style={{ marginTop: pxToVw(10) }}>
                                <Input styles={{ input: { width: pxToVw(850), height: pxToVw(40), fontSize: pxToVw(14), backgroundColor: "#F4F6FA", borderWidth: 0 } }} 
                                    placeholder={t("Type here")} value={pair[index]?.question} 
                                    onChange={(e) => {
                                        const updatedQAPairs = [...qAPairs]; 
                                        updatedQAPairs[index] = { ...updatedQAPairs[index], question: e.target.value }; 
                                        setQAPairs(updatedQAPairs); 
                                    }}
                                    />
                                <div style={{
                                    width: pxToVw(40),
                                    height: pxToVw(40),
                                    backgroundColor: "#F4F6FA",
                                    alignItems: "center",
                                    justifyContent: "center",   
                                    marginLeft: pxToVw(10),
                                    borderRadius: pxToVw(4),
                                    display: "flex"
                                }}
                                onClick={() => {
                                    setQAPairs((prevQAPairs :any) => prevQAPairs.filter((_: any, mainIndex: any) => mainIndex !== index));
                                }}
                                >
                                    <Icon name='trash' style={{ width: pxToVw(13), height: pxToVw(13) }} />
                                </div>
                            </div>
            
                            <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(14), marginTop: pxToVw(10) }}>{t("Answer")+" "+(index + 1)}</div>
                            <div className='flex flex-row' style={{ marginTop: pxToVw(10) }}>
                                <Input styles={{ input: { width: pxToVw(900), height: pxToVw(40), fontSize: pxToVw(14), backgroundColor: "#FFF",} }} 
                                    placeholder={t("Type here")} value={pair[index]?.answer} 
                                    onChange={(e) => {
                                        const updatedQAPairs = [...qAPairs]; 
                                        updatedQAPairs[index] = { ...updatedQAPairs[index], answer: e.target.value }; 
                                        setQAPairs(updatedQAPairs); 
                                    }}
                                />
                            </div>
                        </>
                    )
                })}

                {/* ADD QA PAIR */}
                <div className='mt-40'>
                    <Button
                        type="default"
                        onClick={() => {
                            const updatedQAPairs = [...qAPairs]; 
                            updatedQAPairs.push({question: "", answer: ""});
                            setQAPairs(updatedQAPairs)
                        }}
                        className={`w-900 h-40 flex items-center justify-center bg-[#F4F6FA] rounded-4 text-14 text-[#F4F6FA] cursor-pointer select-none`}
                        style={{
                            borderWidth: 0
                        }}
                    >
                        <Icon name='add' style={{ width: pxToVw(13), height: pxToVw(13) }} />
                    </Button>
                </div>
            </div>
            
      </Modal>
    )
};