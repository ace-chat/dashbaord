import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from '@/reducers/token.ts'
import { login } from "@/request"

import styles from './Login.module.css'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [form] = Form.useForm()

  const [username, setUsername] = useState('test@test1.com')
  const [password, setPassword] = useState('abcd123456')
  const [key, setKey] = useState('testgooglekey')
  const finish = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      const params = {
        username: username,
        password: password,
      }
      const response = await login(params);
      dispatch(setToken(response.token));
      navigate("/home");
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.title}>{ t("Test") }</div>
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
        </Form>
      </div>
  )
}

export default Login
