import LoginBox from '@/components/LoginBox/LoginBox'
import Bg from '@/assets/bg.png'
import LoginInfo from '@/components/LoginInfo/LoginInfo'
import Robo from '@/assets/robo.svg'

const Login = () => {
  return (
    <div
      className="flex flex-row p-90"
      style={{ height: '100vh', width: '100vw', background: `url(${Bg})` }}
    >
      {/* send random title, heading, content, icon as props*/}
      <LoginInfo
        title="title"
        heading="heading"
        content="content"
        icon={Robo}
      />
      <LoginBox />
    </div>
  )
}

export default Login
