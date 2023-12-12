import { Button, Input, Modal, Select } from 'antd'
import { pxToVw } from '@/utils'
import { useState } from 'react';

export const VerifyNumber = ({t, verifyNumber, toggleVerifyNumber, code, setCode, newNumber}: any) => {
    return(
        <Modal
            className='number_modal'
            centered
            open={verifyNumber}
            onCancel={toggleVerifyNumber}
            maskClosable={false}
            footer={() => {
                return(
                    <div className='flex items-center justify-center'>
                        <Button
                            type="default"
                            style={{ borderRadius: pxToVw(20), marginTop: pxToVw(30), marginBottom: pxToVw(30) }}
                            disabled={verifyNumber && verifyNumber !== "" ? false : true}
                            onClick={() => {
                                toggleVerifyNumber();
                            }}
                            className={`w-167 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 cursor-pointer select-none`}
                        >
                            <div className='modal-text'>{t('Confirm ✨')}</div>
                        </Button>
                    </div>
                )
            }}
        >
            <div className='flex flex-col justify-center items-center'>
                <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(22) }}>{t("Verify")}</div>
                <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(12), color: "#767676"  }}>{t("Enter the code we sent")}</div>
                <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(12), color: "#767676"  }}>{newNumber.code+newNumber.number}</div>
                <div className='flex flex-row' style={{ marginTop: pxToVw(24) }}>
                
                </div>
            </div>
      </Modal>
    )
};