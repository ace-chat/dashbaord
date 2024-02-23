import LoginBox from '@/components/LoginBox/LoginBox'
import Bg from '@/assets/bg.png'
import LoginInfo from '@/components/LoginInfo/LoginInfo'
import { LoginText } from '@/constants/loginText'
import { useTranslation } from 'react-i18next'

const Login = () => {
    const random = Math.floor(Math.random() * LoginText.length)
    const { t } = useTranslation()
  return (
    <div
      className="flex flex-row p-90"
      style={{ height: '100vh', width: '100vw', background: `url(${Bg})` }}
    >
      <LoginInfo
        title={t(LoginText[random].title)}
        heading={t(LoginText[random].heading)}
        content={t(LoginText[random].content)}
        icon={t(LoginText[random].icon)}
      />
      <LoginBox />
    </div>
  )
}

export default Login
