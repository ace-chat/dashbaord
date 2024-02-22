import { pxToVw } from '@/utils'
import { Text } from '@chakra-ui/react'
import Robo from '@/assets/robo.svg'
import { useTranslation } from 'react-i18next'

const LoginInfo = ({
  title = 'title',
  heading = 'heading',
  content = 'content',
  icon = Robo,
}) => {
  const { t } = useTranslation()

  return (
    <div
      style={{
        width: pxToVw(635),
        height: pxToVw(762),
        marginLeft: pxToVw(80),
      }}
    >
      <Text
        style={{
          fontSize: pxToVw(72),
          fontWeight: '700',
          fontFamily: 'PT Sans Caption',
          color: '#2C2A7E',
        }}
      >
        {t(title)}
      </Text>
      <div className="flex flex-row" style={{ marginTop: pxToVw(80) }}>
        <img
          src={icon}
          alt="chatbot"
          style={{
            width: pxToVw(58),
            height: pxToVw(65),
            objectFit: 'contain',
          }}
        />
        <div
          className="ml-16"
          style={{
            width: pxToVw(488),
            fontSize: pxToVw(26),
            fontWeight: '700',
            fontFamily: 'Poppins',
            color: '#FFFFFF',
          }}
        >
          <Text
            className="mt-12"
            style={{
              fontSize: pxToVw(26),
              fontWeight: '700',
              fontFamily: 'Poppins',
            }}
          >
            {t(heading)}
          </Text>
          <Text
            className="mt-12"
            style={{
              fontSize: pxToVw(18),
              fontWeight: '500',
              fontFamily: 'Poppins',
            }}
          >
            {t(content)} 
          </Text>
        </div>
      </div>
    </div>
  )
}

export default LoginInfo
