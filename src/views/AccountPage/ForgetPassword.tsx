import { useState } from 'react'
import { Button, Input, message } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './AccountPage.module.css'
import AceText from '@/assets/login/ace_text.svg'
import Bot from '@/assets/login/bot.svg'
import Logo from '@/assets/login/logo.svg'
import { pxToVw } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { resetPasswordCode } from '@/request'

function ForgetPassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [code, setCode] = useState<string>('')

  const onClickSendCode = async () => {
    if (!code || code === '') return
    try {
      const result = await resetPasswordCode(code)
      if (result.code === 20000) {
        navigate('/verifycode', {
          state: {
            email: code,
          },
        })
        message.success(t("Verification code sent successfully, please check your email"))
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
            {t('Smart Chatbot For Your Business')}
          </div>
          <div className={'flex'} style={{ marginTop: 100 }}>
            <img
              src={Bot}
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
                {t('Business Chatbot')}
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
                  'You can create a knowledge base for the chatbot of your business, along with some questions and answers constructed by you, and we will create a generative-AI chatbot and deploy it on WhatsApp so you can convert leads for your business.  '
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

          <div style={{ marginTop: 70 }}>
            {t('Enter your phone number or recovery email')}
          </div>

          <div style={{ width: 400, margin: 'auto', marginTop: 80 }}>
            <Input
              size="large"
              placeholder="Email or Phone Number"
              name="code"
              onChange={(val) => setCode(val.target.value)}
              value={code}
            />
          </div>

          <Button
            type="primary"
            shape="round"
            style={{ marginTop: 80, width: 202, height: 46 }}
            onClick={onClickSendCode}
          >
            {t('Send Code')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
