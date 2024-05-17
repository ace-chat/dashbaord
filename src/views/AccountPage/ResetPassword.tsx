import { useState } from 'react'
import { Button, Input, message } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './AccountPage.module.css'
import AceText from '@/assets/login/ace_text.svg'
import SquareOne from '@/assets/login/square_one.svg'
import SquareTwo from '@/assets/login/square_two.svg'
import Logo from '@/assets/login/logo.svg'
import { pxToVw } from '@/utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '@/request'
import { ResetPasswordRequest } from '@/types'

function ResetPassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const params = location.state

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const onClickResetPassword = async () => {
    if (
      !params.email ||
      params.email === '' ||
      !params.code ||
      params.code === '' ||
      !password ||
      !confirmPassword ||
      password === '' ||
      confirmPassword === '' ||
      password !== confirmPassword
    ) {
      message.error(
        t('Please confirm that the information is filled in correctly')
      )
      return
    }

    try {
      const data: ResetPasswordRequest = {
        email: params.email,
        code: params.code,
        password: password,
      }
      const result = await resetPassword(data)
      if (result.code === 20000) {
        message.success(
          t('Password changed successfully, please log in directly')
        )
        navigate('/login')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={styles.box}>
      <div className="grid grid-cols-2 gap-4">
        <div style={{ margin: '10vh auto 0', width: 600 }}>
          <div
            style={{
              color: '#2C2A7E',
              fontWeight: '700',
              fontSize: 72,
            }}
          >
            {t('Analytics Now Like Never.')}
          </div>
          <div className={'flex'} style={{ marginTop: 100 }}>
            <img
              src={SquareOne}
              alt="Bot"
              style={{
                width: pxToVw(58),
                height: pxToVw(65),
              }}
            />
            <div
              style={{
                marginLeft: 20,
              }}
            >
              <div
                style={{
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: 26,
                }}
              >
                {t('Simple Analytics')}
              </div>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 18,
                  color: '#FFFFFF',
                  marginTop: 20,
                  lineHeight: 2,
                }}
              >
                {t(
                  'Uncover actionable insights effortlessly with our AI-driven Simple Analytics. From data to decisions, streamline your strategy.'
                )}
              </div>
            </div>
          </div>
          <div className={'flex'} style={{ marginTop: 50 }}>
            <img
              src={SquareTwo}
              alt="Bot"
              style={{
                width: pxToVw(58),
                height: pxToVw(65),
              }}
            />
            <div
              style={{
                marginLeft: 20,
              }}
            >
              <div
                style={{
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: 26,
                }}
              >
                {t('Deep Analytics')}
              </div>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 18,
                  color: '#FFFFFF',
                  marginTop: 20,
                  lineHeight: 2,
                }}
              >
                {t(
                  'Collaborate with seasoned experts to unearth profound insights. Our Deep Analytics service is your path to strategic brilliance.'
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            margin: '10vh auto 0',
            width: 665,
            height: 762,
            backgroundColor: '#ffffff',
            borderRadius: 22,
            textAlign: 'center',
          }}
        >
          <div style={{ marginTop: 80 }}>
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: pxToVw(90),
                height: pxToVw(62),
              }}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <img
              src={AceText}
              alt="AceText"
              style={{
                width: pxToVw(80),
                height: pxToVw(18),
              }}
            />
          </div>

          <div
            style={{
              marginTop: 70,
              color: '#6B6B6B',
              fontWeight: 500,
              fontSize: 28,
            }}
          >
            {t('Reset Password ')}
          </div>

          <div style={{ width: 400, margin: 'auto', marginTop: 60 }}>
            <Input.Password
              size="large"
              placeholder="New Password"
              name="password"
              onChange={(val) => setPassword(val.target.value)}
              value={password}
            />

            <Input.Password
              size="large"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(val) => setConfirmPassword(val.target.value)}
              value={confirmPassword}
              style={{ marginTop: 20 }}
            />
          </div>

          <Button
            type="primary"
            shape="round"
            style={{ marginTop: 80, width: 202, height: 46 }}
            onClick={onClickResetPassword}
          >
            {t('Reset Password')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
