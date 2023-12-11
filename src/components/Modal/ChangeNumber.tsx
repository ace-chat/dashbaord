import { Button, Input, Modal, Select } from 'antd'
import { pxToVw } from '@/utils'
import { useState } from 'react';

export const ChangeNumber = ({t, changeNumber, toggleChangeNumber, oldNumber, setOldNumber, newNumber, setNewNumber, confirmNumber, setConfirmNumber}: any) => {
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
                            onClick={() => {
                                
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
                <Select style={{ width: pxToVw(70), height: pxToVw(35) }} options={sampleCodes} placeholder={"+971"} />
                <Input styles={{ input: { width: pxToVw(422), height: pxToVw(35), fontSize: pxToVw(10), marginLeft: pxToVw(18) } }} placeholder={t('Old number')} value={oldNumber} onChange={(e) => setOldNumber(e.target.value)} />
            </div>
            <div className='flex flex-row' style={{ marginTop: pxToVw(20) }}>
                {/* add country code */}
                <Select style={{ width: pxToVw(70), height: pxToVw(35) }} options={sampleCodes} placeholder={"+971"} />
                <Input styles={{ input: { width: pxToVw(422), height: pxToVw(35), fontSize: pxToVw(10), marginLeft: pxToVw(18) } }} placeholder={t('New number')} value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
            </div>
            <div className='flex flex-row' style={{ marginTop: pxToVw(20) }}>
                {/* add country code */}
                <Select style={{ width: pxToVw(70), height: pxToVw(35) }} options={sampleCodes} placeholder={"+971"} />
                <Input styles={{ input: { width: pxToVw(422), height: pxToVw(35), fontSize: pxToVw(10), marginLeft: pxToVw(18) } }} placeholder={t('Confirm number')} value={confirmNumber} onChange={(e) => setConfirmNumber(e.target.value)} />
            </div>
      </Modal>
    )
};