import { useState } from 'react'
import { Button, message } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './AccountPage.module.css'
import AceText from '@/assets/login/ace_text.svg'
import Logo from '@/assets/login/logo.svg'
import Content from '@/assets/login/content.svg'
import { pxToVw } from '@/utils'
import { useLocation, useNavigate } from 'react-router-dom'

import { InputOTP } from 'antd-input-otp'
import { checkoutResetPasswordCode, resetPasswordCode } from '@/request'

function VerifyCode() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const params = location.state

  const [codeLength] = useState<number>(6)
  const [code, setCode] = useState<any[]>([])

  const onClickContinue = async () => {
    if (!params.email || params.email === '') {
      message.error(
        t('Please confirm that the information is filled in correctly')
      )
      return
    }

    const codeString = code.join('')
    if (!codeString || codeString === '' || codeString.length !== codeLength) {
      message.error(
        t('Please confirm that the information is filled in correctly')
      )
      return
    }

    try {
      const result = await checkoutResetPasswordCode(params.email, codeString)
      if (result.code === 20000) {
        navigate('/resetpassword', {
          state: {
            email: params.email,
            code: codeString
          }
        })
      } else {
        message.error(t('Invalid code, please confirm again'))
      }
    } catch (e) {
      console.error(e)
    }
  }

  const onClickResendCode = async () => {
    if (!params.email || params.email === '') {
      message.error(t('Email not found'))
      return
    }

    try {
      const result = await resetPasswordCode(params.email)
      if (result.code === 20000) {
        message.success(
          t('Verification code resent successfully, please check your email')
        )
      } else {
        message.error(t('Reset failed, please confirm account validity'))
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
            {t('Best Content Generation Tools')}
          </div>
          <div className={'flex'} style={{ marginTop: 100 }}>
            <img
              src={Content}
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
                {t('Content  Generation')}
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
                  'Say goodbye to content creation hassles. Our AI-powered tool generates compelling content for social media ads and more, so you can focus on strategy. Empower your marketing with our AI content generation tool. From ads to blogs, turn ideas into impactful content.'
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

          <div style={{ marginTop: 70, fontWeight: 500, fontSize: 28 }}>
            {t('Verify')}
          </div>

          <div style={{ marginTop: 30 }}>
            {t('Enter the code we sent on your email')}
          </div>

          <div style={{ marginTop: 10 }}>{params.email}</div>

          <div style={{ marginTop: 60 }}>
            <InputOTP
              // inputType={'alphabet-numeric'}
              inputType="all"
              length={codeLength}
              inputStyle={{ width: pxToVw(42), height: pxToVw(42) }}
              value={code}
              // onChange={(value) => {
              //   setCode(value)
              // }}
              onChange={setCode}
              autoFocus
            />
          </div>

          <div style={{ marginTop: 40 }}>
            <a
              onClick={onClickResendCode}
              style={{
                fontWeight: 500,
                fontSize: 14,
                marginLeft: 10,
                color: '#1273EB',
                cursor: 'pointer',
              }}
            >
              {t('Resend Code?')}
            </a>
          </div>

          <Button
            type="primary"
            shape="round"
            style={{ marginTop: 60, width: 202, height: 46 }}
            onClick={onClickContinue}
          >
            {t('Continue')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VerifyCode
