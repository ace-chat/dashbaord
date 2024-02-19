import { Button, Input, Modal } from 'antd'
import { pxToVw } from '@/utils'
import Icon from '../Icon/Icon';

export const SalesPitch = ({t, openSP, toggleSP, sPPairs, setSPPairs}: any) => {
    return(
        <Modal
            className='qa_modal'
            centered
            open={openSP}
            onCancel={toggleSP}
            maskClosable={false}
            footer={() => {
                return(
                    <div className='flex items-center justify-center'>
                        <Button
                            type="default"
                            style={{ borderRadius: pxToVw(20), marginTop: pxToVw(30), marginBottom: pxToVw(30) }}
                            disabled={(sPPairs.length === 0 || !sPPairs.every((pair: any) => pair.question !== '' && pair.answer !== '')) ? true : false}
                            onClick={() => {
                                toggleSP();
                            }}
                            className={`w-167 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 cursor-pointer select-none`}
                        >
                            <div className='modal-text'>{t('Save Sales Pitch ✨')}</div>
                        </Button>
                    </div>
                )
            }}
        >
            <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(22) }}>{t("Add Sales Pitches to Knowledge Base")}</div>
            <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(12), color: "#767676"  }}>{t("Add Sales Pitch to your chatbot’s knowledge base so when they ask a relevant question to the topic the chatbot can send them a marketing message")}</div>
            <div className='flex flex-col items-start' style={{marginTop: 20}}>
                {sPPairs.map((pair: any, index: any) => {
                    return(
                        <>
                            <div key={index} style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(14), marginTop: pxToVw(10) }}>{t("Topic (Keyword)")+" "+(index + 1)}</div>
                            <div className='flex flex-row' style={{ marginTop: pxToVw(10) }}>
                                <Input styles={{ input: { width: pxToVw(850), height: pxToVw(40), fontSize: pxToVw(14), backgroundColor: "#F4F6FA", borderWidth: 0 } }} 
                                    placeholder={t("Type Here")} value={pair[index]?.question} 
                                    onChange={(e) => {
                                        const updatedSPPairs = [...sPPairs]; 
                                        updatedSPPairs[index] = { ...updatedSPPairs[index], question: e.target.value }; 
                                        setSPPairs(updatedSPPairs); 
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
                                    setSPPairs((prevSPPairs :any) => prevSPPairs.filter((_: any, mainIndex: any) => mainIndex !== index));
                                }}
                                >
                                    <Icon name='trash' style={{ width: pxToVw(13), height: pxToVw(13) }} />
                                </div>
                            </div>
            
                            <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(14), marginTop: pxToVw(10) }}>{t("Sales Pitch")+" "+(index + 1)}</div>
                            <div className='flex flex-row' style={{ marginTop: pxToVw(10) }}>
                                <Input styles={{ input: { width: pxToVw(900), height: pxToVw(40), fontSize: pxToVw(14), backgroundColor: "#FFF",} }} 
                                    placeholder={t("Type Here")} value={pair[index]?.answer} 
                                    onChange={(e) => {
                                        const updatedSPPairs = [...sPPairs]; 
                                        updatedSPPairs[index] = { ...updatedSPPairs[index], answer: e.target.value }; 
                                        setSPPairs(updatedSPPairs); 
                                    }}
                                />
                            </div>
                        </>
                    )
                })}

                {/* ADD SalesPitch PAIR */}
                <div className='mt-40'>
                    <Button
                        type="default"
                        onClick={() => {
                            const updatedSPPairs = [...sPPairs]; 
                            updatedSPPairs.push({question: "", answer: ""});
                            setSPPairs(updatedSPPairs)
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