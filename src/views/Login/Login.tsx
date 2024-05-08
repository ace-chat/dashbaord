import { useState } from 'react'
import { Button, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from '@/reducers/token.ts'
import { login } from '@/request'

import styles from './Login.module.css'

import AceText from '@/assets/login/ace_text.svg'
import Bot from '@/assets/login/bot.svg'
// import Content from '@/assets/login/content.svg'
import Logo from '@/assets/login/logo.svg'
// import SquareOne from '@/assets/login/square_one.svg'
// import SquareTwo from '@/assets/login/square_two.svg'
import { pxToVw } from '@/utils'
import { UserOutlined } from '@ant-design/icons'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // const [form] = Form.useForm()

  const [username, setUsername] = useState('test@test1.com')
  const [password, setPassword] = useState('abcd123456')
  const [key, setKey] = useState('testgooglekey')
  const onClickLogin = async () => {
    // const valid = await form.validateFields()
    // if (valid) {
    const formData = new URLSearchParams()
    formData.append('username', username)
    formData.append('password', password)
    const params = {
      username: username,
      password: password,
    }
    const response = await login(params)
    dispatch(setToken(response.token))
    navigate('/home')
    // }
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
            {t('Log in')}
          </div>

          <div style={{ width: 400, margin: 'auto', marginTop: 50 }}>
            <Input
              size="large"
              placeholder="Email ID"
              prefix={<UserOutlined />}
              name="username"
              onChange={(val) => setUsername(val.target.value)}
              value={username}
            />
            <Input.Password
              size="large"
              placeholder="Enter Your Password"
              style={{ marginTop: 20 }}
              onChange={(val) => setPassword(val.target.value)}
              value={password}
            />

            <Input
              size="large"
              placeholder="Google Key"
              style={{ marginTop: 20 }}
              prefix={<UserOutlined />}
              name="key"
              onChange={(val) => setKey(val.target.value)}
              value={key}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <a
              onClick={() => {
                navigate('/forgetPassword')
              }}
              style={{
                fontWeight: 500,
                fontSize: 14,
                marginLeft: 10,
                color: '#1273EB',
              }}
            >
              {t('Forgot Password?')}
            </a>
          </div>

          <Button
            type="primary"
            shape="round"
            style={{ marginTop: 60, width: 202, height: 46 }}
            onClick={onClickLogin}
          >
            Log in
          </Button>

          <div className="flex justify-center mt-60">
            <div style={{ fontWeight: 500, fontSize: 14 }}>
              {t('You don’t have account?')}
            </div>
            <a
              onClick={() => {
                navigate('/signup')
              }}
              style={{
                fontWeight: 500,
                fontSize: 14,
                marginLeft: 10,
                color: '#1273EB',
              }}
            >
              {t('Sign up')}
            </a>
          </div>
        </div>

        {/* <div className={styles.title}>{ t("Test") }</div>
        <Form
          name="login"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: "0 auto" }}
          onFinish={finish}
          autoComplete="off"
        >
          <Form.Item
            label={t('Username')}
            initialValue={username}
            name="username"
            rules={[
              { required: true, message: t('Please input your username!') },
            ]}
          >
            <Input
              value={username}
              onChange={(val) => setUsername(val.target.value)}
            />
          </Form.Item>

          <Form.Item
            label={t('Password')}
            initialValue={password}
            name="password"
            rules={[
              { required: true, message: t('Please input your password!') },
            ]}
          >
            <Input.Password
              value={password}
              onChange={(val) => setPassword(val.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={t('Google Key')}
            initialValue={key}
            name="key"
            rules={[
              { required: true, message: t('Please input your Google key!') },
            ]}
          >
            <Input.Password
              value={key}
              onChange={(val) => setKey(val.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {t('Submit')}
            </Button>
          </Form.Item>
        </Form> */}
      </div>
    </div>
  )
}

export default Login
