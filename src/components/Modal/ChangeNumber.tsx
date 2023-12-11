import { Button, Modal } from 'antd'
import { pxToVw } from '@/utils'

export const ChangeNumber = ({t, changeNumber, toggleChangeNumber, oldNumber, setOldNumber}: any) => {
    return(
        <Modal
            centered
            open={changeNumber}
            onCancel={toggleChangeNumber}
            maskClosable={false}
            footer={() => {
                return(
                    <div className='flex items-center justify-center'>
                        <Button
                            type="default"
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
            <div className='flex flex-row'>
                {/* add country code */}
                
            </div>
      </Modal>
    )
};