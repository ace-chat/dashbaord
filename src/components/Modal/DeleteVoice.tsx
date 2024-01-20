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
      footer={null}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="text-black text-27">
          {t('Delete Brand Voice?')}
        </div>
        <div className="text-[#767676] text-14 mt-6">
          {t('Are you sure you want to delete this brand voice?')}
        </div>
        <div className="mt-55 h-90 flex flex-col justify-between items-center">
          <div
            className="w-166 h-39 bg-[#EA6969] rounded-20 text-13 flex items-center justify-center text-white cursor-pointer"
            onClick={onCancel}
          >
            {t('Cancel')}
          </div>
          <div
            className="w-166 h-39 bg-[#E6E6F4] rounded-20 text-13 flex items-center justify-center text-[#6D6D6D] cursor-pointer"
            onClick={onConfirm}
          >
            {t('Delete')}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteVoice
