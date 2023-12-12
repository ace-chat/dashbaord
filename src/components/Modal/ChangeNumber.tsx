import { Button, Input, Modal, Select } from 'antd'
import { pxToVw } from '@/utils'
import { useState } from 'react';

export const ChangeNumber = ({t, changeNumber, toggleChangeNumber, oldNumber, setOldNumber, newNumber, setNewNumber, confirmNumber, setConfirmNumber, checkNumbers, toggleVerifyNumber}: any) => {
    const [sampleCodes] = useState([
        { value: "+971", label: "+971" },
        { value: "+1", label: "+1" },
        { value: "+20", label: "+20" },
    ]);

    return(
        <Modal
            className='number_modal'
            centered
            open={changeNumber}
            onCancel={toggleChangeNumber}
            maskClosable={false}
            footer={() => {
                return(
                    <div className='flex items-center justify-center'>
                        <Button
                            type="default"
                            style={{ borderRadius: pxToVw(20), marginTop: pxToVw(30), marginBottom: pxToVw(30) }}
                            // disabled={checkNumbers()}
                            onClick={() => {
                                toggleVerifyNumber();
                                toggleChangeNumber();
                            }}
                            className={`w-167 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 cursor-pointer select-none`}
                        >
                            <div className='modal-text'>{t('Change number ✨')}</div>
                        </Button>
                    </div>
                )
            }}
        >
            <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(22) }}>{t("Change Number")}</div>
            <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(12), color: "#767676"  }}>{t("Verify and change the existing number with easy steps. ")}</div>
            <div className='flex flex-row' style={{ marginTop: pxToVw(24) }}>
                {/* add country code */}
                <Select style={{ width: pxToVw(70), height: pxToVw(35) }} options={sampleCodes} placeholder={"+971"} value={oldNumber.code} onChange={(e) => setOldNumber({ ...oldNumber, code: e })} />
                <Input styles={{ input: { width: pxToVw(422), height: pxToVw(35), fontSize: pxToVw(10), marginLeft: pxToVw(18) } }} 
                    placeholder={t('Old number')} value={oldNumber.number} onChange={(e) => setOldNumber({ ...oldNumber, number: e.target.value })} 
                    onKeyDown={(e) => {
                        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                        if (e.key !== 'Delete' && e.key !== 'Backspace' && !allowedKeys.includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                />
            </div>
            <div className='flex flex-row' style={{ marginTop: pxToVw(20) }}>
                {/* add country code */}
                <Select bordered={false} style={{ width: pxToVw(70), height: pxToVw(35), backgroundColor: "#F4F6FA", borderRadius: pxToVw(4) }} options={sampleCodes} placeholder={"+971"} value={newNumber.code} onChange={(e) => setNewNumber({ ...newNumber, code: e })} />
                <Input styles={{ input: { width: pxToVw(422), height: pxToVw(35), fontSize: pxToVw(10), marginLeft: pxToVw(18), backgroundColor: "#F4F6FA", borderWidth: 0 } }} 
                    placeholder={t('New number')} value={newNumber.number}  onChange={(e) => setNewNumber({ ...newNumber, number: e.target.value })} 
                    onKeyDown={(e) => {
                        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                        if (e.key !== 'Delete' && e.key !== 'Backspace' && !allowedKeys.includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                />
            </div>
            <div className='flex flex-row' style={{ marginTop: pxToVw(20) }}>
                {/* add country code */}
                <Select bordered={false} style={{ width: pxToVw(70), height: pxToVw(35), backgroundColor: "#F4F6FA", borderRadius: pxToVw(4) }} options={sampleCodes} placeholder={"+971"} value={confirmNumber.code} onChange={(e) => setConfirmNumber({ ...confirmNumber, code: e })} />
                <Input styles={{ input: { width: pxToVw(422), height: pxToVw(35), fontSize: pxToVw(10), marginLeft: pxToVw(18), backgroundColor: "#F4F6FA", borderWidth: 0 } }} 
                    placeholder={t('Confirm number')} value={confirmNumber.number}  onChange={(e) => setConfirmNumber({ ...confirmNumber, number: e.target.value })} 
                    onKeyDown={(e) => {
                        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                        if (e.key !== 'Delete' && e.key !== 'Backspace' && !allowedKeys.includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                />
            </div>
      </Modal>
    )
};