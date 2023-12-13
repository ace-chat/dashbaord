import { Button, Input, Modal, Select } from 'antd'
import { pxToVw } from '@/utils'
import { useState } from 'react';
import { InputOTP } from 'antd-input-otp';

export const VerifyNumber = ({t, verifyNumber, toggleVerifyNumber, code, setCode, newNumber}: any) => {
    const maskMiddleCharacters = (str: any, start: number, length: number) => {
        if(newNumber.number){
            const masked = Array(length).fill('*').join('');
            return str.substring(0, start) + masked + str.substring(start + length);
        }
    };
    
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
                            disabled={code && code.length == 6 && !code.includes("") ? false : true}
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
                <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(12), color: "#767676"  }}>{newNumber.code + maskMiddleCharacters(newNumber.number, 2, 5)}</div>
                <div style={{marginTop: pxToVw(40)}}>
                    <InputOTP inputType="numeric" value={code} onChange={setCode} />
                </div>
                <div className='flex flex-row' style={{ marginTop: pxToVw(20)}}>
                    <div style={{ fontFamily: "PingFang SC Regular", fontSize: pxToVw(12), color: "#767676" }}>{t("Didn't Recieve?")}</div>
                    <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(12), color: "#1273EB", marginLeft: pxToVw(2) }}>{t("Resend Code")}</div>
                </div>
            </div>
      </Modal>
    )
};