import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'

const DeleteVoice = ({
  onConfirm,
  onCancel,
  showDeleteModal,
}: {
  onConfirm: () => void
  onCancel: () => void
  showDeleteModal: boolean
}) => {
  const { t } = useTranslation()
  return (
    <Modal
      centered
      open={showDeleteModal}
      onCancel={onCancel}
      maskClosable={false}
      footer={() => {
        return (
          <div className="w-[331px] h-[209.75px] relative">
            <div className="left-0 top-[44px] absolute text-neutral-500 text-sm font-normal font-['PingFang SC']">
              {t('Are you sure you want to delete this brand voice?')}
            </div>
            <div className="w-[166.82px] h-[90px] left-[82px] top-[119.75px] absolute">
              <button
                className="w-[166.64px] h-[39px] left-[0.18px] top-[51px] absolute bg-slate-200 rounded-[19.50px] text-center text-neutral-500 text-[13px] font-normal font-['PingFang SC']"
                onClick={onCancel}
              >
                {t('Cancel')}
              </button>
              <button
                className="w-[166.64px] h-[39px] left-0 top-0 absolute bg-red-400 rounded-[19.50px] text-center text-white text-[13px] font-normal font-['PingFang SC']"
                onClick={onConfirm}
              >
                {t('Delete')}
              </button>
            </div>
            <div className="left-[34.50px] top-0 absolute text-black text-[27px] font-normal font-['PingFang SC']">
              {t('Delete Brand Voice?')}
            </div>
          </div>
        )
      }}
    ></Modal>
  )
}

export default DeleteVoice
