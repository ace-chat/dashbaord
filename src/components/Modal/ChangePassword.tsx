import { Button, Input, Modal } from 'antd'
import { pxToVw } from '@/utils'
import { useState } from 'react'
import { updatePassword } from '@/request'
import { useTranslation } from 'react-i18next'

export const ChangePassword = ({
  changePassword,
  toggleChangePassword,
}: any) => {
  const { t } = useTranslation()

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangePassword = async () => {
    if (newPassword === confirmPassword) {
      await updatePassword({
        old_password: oldPassword,
        new_password: newPassword,
      })
      toggleChangePassword()
    } else {
      // change this after design
      alert('Password does not match')
    }
  }

  return (
    <Modal
      className="password_modal"
      centered
      open={changePassword}
      onCancel={toggleChangePassword}
      maskClosable={false}
      footer={() => {
        return (
          <div className="flex items-center justify-center">
            <Button
              type="default"
              style={{
                borderRadius: pxToVw(20),
                marginTop: pxToVw(30),
                marginBottom: pxToVw(30),
              }}
              onClick={handleChangePassword}
              className={`w-167 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 cursor-pointer select-none`}
            >
              <div className="modal-text">{t('Change Password ✨')}</div>
            </Button>
          </div>
        )
      }}
    >
      <div style={{ fontFamily: 'PingFang SC Medium', fontSize: pxToVw(22) }}>
        {t('Change Password')}
      </div>
      {/* old password */}
      <div className="flex flex-row" style={{ marginTop: pxToVw(24) }}>
        <Input
          styles={{
            input: {
              width: pxToVw(422),
              height: pxToVw(35),
              fontSize: pxToVw(10),
              marginLeft: pxToVw(18),
            },
          }}
          placeholder={t('Old Password')}
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>

      {/* new password */}
      <div className="flex flex-row" style={{ marginTop: pxToVw(24) }}>
        <Input
          styles={{
            input: {
              width: pxToVw(422),
              height: pxToVw(35),
              fontSize: pxToVw(10),
              marginLeft: pxToVw(18),
            },
          }}
          placeholder={t('New Password')}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      {/* confirm password */}
      <div className="flex flex-row" style={{ marginTop: pxToVw(24) }}>
        <Input
          styles={{
            input: {
              width: pxToVw(422),
              height: pxToVw(35),
              fontSize: pxToVw(10),
              marginLeft: pxToVw(18),
            },
          }}
          placeholder={t('Confirm Password')}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    </Modal>
  )
}
