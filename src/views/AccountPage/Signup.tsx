import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, message } from 'antd'
import styles from './AccountPage.module.css'
import AceText from '@/assets/login/ace_text.svg'
import Bot from '@/assets/login/bot.svg'
// import Content from '@/assets/login/content.svg'
import Logo from '@/assets/login/logo.svg'
// import SquareOne from '@/assets/login/square_one.svg'
// import SquareTwo from '@/assets/login/square_two.svg'
import { pxToVw } from '@/utils'
import { RegisterRequest } from '@/types'
import { register } from '@/request'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

function Signup() {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  const { t } = useTranslation()

  const [isEnableSign, setIsEnableSign] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [kind, setKind] = useState<number>(0)

  const onClickPayPlan = () => {
    setKind(1)
    setIsEnableSign(true)
  }

  const onClickFreeTrial = () => {
    setKind(2)
    setIsEnableSign(true)
  }

  const clearField = () => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setKind(0)
    setIsEnableSign(false)
  }

  const onClickSignup = async () => {
    if (kind === 0 || name === "" || email === "" || password === "" || confirmPassword === "") {
      message.error(t("Please confirm that the information is filled in correctly"))
      return
    }

    if (password !== confirmPassword) {
      message.error(t("Passwords are inconsistent"))
      return
    }

    try {
      const params: RegisterRequest = {
        name: name,
        email: email,
        password: password,
        plan: kind,
      }
      const response = await register(params)
      if (response.code === 20000) {
        message.success(
          t('Registration successful, please go to your email to confirm')
        )
        clearField()
      } else {
        message.error(t('Registration failed, please try it again'))
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

          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: '#333333',
              marginTop: 50,
            }}
          >
            {t('Sign up')}
          </div>

          <div style={{ width: 400, margin: 'auto', marginTop: 50 }}>
            {isEnableSign ? (
              <>
                <Input
                  size="large"
                  placeholder="Your Full Name"
                  style={{ marginTop: 20 }}
                  name="name"
                  onChange={(val) => setName(val.target.value)}
                  value={name}
                />
                <Input
                  size="large"
                  placeholder="Email ID"
                  style={{ marginTop: 20 }}
                  name="email"
                  onChange={(val) => setEmail(val.target.value)}
                  value={email}
                />
                <Input.Password
                  size="large"
                  placeholder="Enter Password"
                  style={{ marginTop: 20 }}
                  name="password"
                  onChange={(val) => setPassword(val.target.value)}
                  value={password}
                />
                <Input.Password
                  size="large"
                  placeholder="Confirm Password"
                  style={{ marginTop: 20 }}
                  name="confirmPassword"
                  onChange={(val) => setConfirmPassword(val.target.value)}
                  value={confirmPassword}
                />

                <Button
                  type="primary"
                  shape="round"
                  style={{ marginTop: 60, width: 202, height: 46 }}
                  onClick={onClickSignup}
                >
                  {t('Sign up')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  shape="round"
                  style={{ marginTop: 60, width: 202, height: 46 }}
                  onClick={onClickPayPlan}
                >
                  {t('Pay For A Plan')}
                </Button>
                <Button
                  type="default"
                  shape="round"
                  style={{ marginTop: 20, width: 202, height: 46 }}
                  onClick={onClickFreeTrial}
                >
                  {t('Start 3 Days Trial!')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
