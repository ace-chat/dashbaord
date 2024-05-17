import { Button, Input, Modal, message } from 'antd'
import { pxToVw } from '@/utils'
import { useState } from 'react'
import {
  innerResetPasswordCode,
  updatePassword,
} from '@/request'
import { useTranslation } from 'react-i18next'

export const ChangePassword = ({
  changePassword,
  toggleChangePassword,
}: any) => {
  const { t } = useTranslation()

  // const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [code, setCode] = useState('')

  const handleChangePassword = async () => {
    if (
      newPassword === '' ||
      confirmPassword === '' ||
      code === '' ||
      newPassword !== confirmPassword
    ) {
      message.error(
        t('Please confirm that the information is filled in correctly')
      )
      return
    }

    try {
      const result = await updatePassword({
        code: code,
        password: newPassword,
      })

      if (result.code === 20000) {
        message.success(t('Update completed'))
        toggleChangePassword()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const onClickGetCode = async () => {
    try {
      const result = await innerResetPasswordCode()
      if (result.code === 20000) {
        message.success(
          t('Verification code sent successfully, please check your email')
        )
      } else {
        message.error(
          t('Verification code failed to be sent, please try again')
        )
      }
    } catch (e) {
      console.error(e)
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
              <div
                className={`text-13 text-transparent`}
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #9C34AB -0.02%, #4F6BE8 47.92%, #14B8BC 100.02%)',
                  backgroundClip: 'text',
                }}
              >
                {t('Change Password ✨')}
              </div>
            </Button>
          </div>
        )
      }}
    >
      <div style={{ fontFamily: 'PingFang SC Medium', fontSize: pxToVw(22) }}>
        {t('Change Password')}
      </div>
      <div className="flex flex-row" style={{ marginTop: pxToVw(24) }}>
        {/* <Input
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
        /> */}
        <Input
          styles={{
            input: {
              width: pxToVw(422),
              height: pxToVw(35),
              fontSize: pxToVw(10),
              marginLeft: pxToVw(18),
              marginRight: pxToVw(18),
            },
          }}
          placeholder="Enter your code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          style={{
            height: pxToVw(35),
          }}
          type="primary"
          onClick={onClickGetCode}
        >
          {t('Get Code')}
        </Button>
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
