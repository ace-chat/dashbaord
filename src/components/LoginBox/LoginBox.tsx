import { pxToVw } from '@/utils'
import CustomInput from '../CustomInput/CustomInput'
import { HStack, Link, PinInput, PinInputField, Text } from '@chakra-ui/react'
import logo from '@/assets/header_logo.png'
import { SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function LoginBox({ flow = 'reset', ...props }) {
  const { t } = useTranslation()

  const [screen, setScreen] = useState('1')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [fullname, setFullname] = useState('')

  // destructure the props here as needed, Don't directly use props in the component
  const { handleSubmit, partialEmail = 'Zubair1********.com' } = props

  const handleNext = () => {
    switch (screen) {
      case '1':
        // handle any extra logic for screen 1
        setScreen('2')
        break
      case '2':
        // handle any extra logic for screen 2
        setScreen('3')
        break
      default:
        // handle any extra logic for additional screens
        setScreen('1')
        break
    }
  }

  return (
    <div
      className="flex justify-center items-center h-screen bg-white"
      style={{
        width: pxToVw(665),
        height: pxToVw(762),
        borderRadius: '22.17px',
        marginLeft: pxToVw(80),
        fontFamily: 'Poppins',
      }}
    >
      <form className="flex flex-col justify-center items-center">
        <img
          src={logo}
          alt="logo"
          style={{
            width: pxToVw(94.04),
            height: pxToVw(87.61),
            objectFit: 'contain',
            marginBottom: pxToVw(50),
          }}
        />
        {flow === 'login' && (
          <>
            <Text
              className="mt-22 mb-22"
              style={{
                fontSize: pxToVw(28.01),
                fontWeight: '500',
                fontFamily: 'Poppins',
                color: '#000000',
                marginBottom: pxToVw(50),
              }}
            >
              {t('Login')}
            </Text>
            <CustomInput
              id="username"
              label="Email ID"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setEmail(e.target.value)
              }
            />
            <CustomInput
              id="password"
              label="Enter Your Password"
              type="password"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setPassword(e.target.value)
              }
            />
            <Text
              style={{
                fontSize: pxToVw(16),
                fontWeight: '500',
                fontFamily: 'Poppins',
                color: '#1273EB',
              }}
            >
              {t('Forgot Password?')}
            </Text>
            <button
              className="mt-22 p-2 bg-blue-500 text-white"
              style={{
                borderRadius: '22.76px',
                width: pxToVw(202),
                height: pxToVw(46),
              }}
              onClick={handleNext}
            >
              {t('Login')}
            </button>
            <Text
              className="mt-22"
              style={{
                fontSize: pxToVw(16),
                fontWeight: '500',
                fontFamily: 'Poppins',
                color: '#000000',
              }}
            >
              {t('You don’t have account?')}{' '}
              <span style={{ color: '#1273EB' }}>{t('Sign Up')}</span>
            </Text>
          </>
        )}
        {flow === 'signup' && (
          <>
            <Text
              className="mt-22 mb-22"
              style={{
                fontSize: pxToVw(28),
                fontWeight: '500',
                fontFamily: 'Poppins',
                color: '#000000',
                marginBottom: pxToVw(50),
              }}
            >
              {t('Sign Up')}
            </Text>
            {screen === '1' && (
              <>
                <button
                  className=" p-2 bg-blue-500 text-white"
                  style={{
                    borderRadius: '22.76px',
                    width: pxToVw(202),
                    height: pxToVw(46),
                    marginTop: pxToVw(80),
                  }}
                >
                  {t('Pay For A Plan')}
                </button>
                <button
                  className="mt-12 p-2 bg-blue-500 text-white"
                  style={{
                    borderRadius: '22.76px',
                    width: pxToVw(202),
                    height: pxToVw(46),
                    border: '1.17px solid #4F6BE8',
                    backgroundColor: '#FFFFFF',
                    color: '#4F6BE8',
                  }}
                  onClick={handleNext}
                >
                  {t('Start 3 Days Trial!')}
                </button>
              </>
            )}
            {screen === '2' && (
              <>
                <CustomInput
                  id="fullname"
                  label="Your Full Name"
                  onChange={(e: {
                    target: { value: SetStateAction<string> }
                  }) => setFullname(e.target.value)}
                />
                <CustomInput
                  id="email"
                  label="Email ID"
                  onChange={(e: {
                    target: { value: SetStateAction<string> }
                  }) => setEmail(e.target.value)}
                />
                <CustomInput
                  id="password"
                  label="Enter Password"
                  type="password"
                  onChange={(e: {
                    target: { value: SetStateAction<string> }
                  }) => setPassword(e.target.value)}
                />
                <CustomInput
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  onChange={(e: {
                    target: { value: SetStateAction<string> }
                  }) => setConfirmPassword(e.target.value)}
                />
                <button
                  className=" p-2 bg-blue-500 text-white"
                  style={{
                    borderRadius: '22.76px',
                    width: pxToVw(202),
                    height: pxToVw(46),
                    marginTop: pxToVw(80),
                  }}
                  onClick={handleNext}
                >
                  {t('Sign Up')}
                </button>
              </>
            )}
          </>
        )}
        {flow === 'reset' && (
          <>
            {screen === '1' && (
              <>
                <Text
                  className="mt-22 mb-22"
                  style={{
                    fontSize: pxToVw(16.35),
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    color: '#333333',
                    marginBottom: pxToVw(50),
                  }}
                >
                  {t('Enter your phone number or recovery email')}
                </Text>
                <CustomInput
                  id="email"
                  label="Email or Phone Number"
                  onChange={(e: {
                    target: { value: SetStateAction<string> }
                  }) => setEmail(e.target.value)}
                />
                <button
                  className=" p-2 bg-blue-500 text-white"
                  style={{
                    borderRadius: '22.76px',
                    width: pxToVw(202),
                    height: pxToVw(46),
                    marginTop: pxToVw(80),
                  }}
                  onClick={handleNext}
                >
                  {t('Send Code')}
                </button>
              </>
            )}
            {screen === '2' && (
              <>
                <Text
                  className="mt-22 mb-22"
                  style={{
                    fontSize: pxToVw(28),
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    color: '#000000',
                    marginBottom: pxToVw(50),
                  }}
                >
                  {t('Verify')}
                </Text>
                <Text
                  className="mt-22 mb-22"
                  style={{
                    fontSize: pxToVw(14),
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    color: '#000000',
                    marginBottom: pxToVw(50),
                  }}
                >
                  {t('Enter the code we sent on your email')} {partialEmail}
                </Text>
                <HStack>
                  <PinInput otp placeholder="―" onChange={(v) => setOtp(v)}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <PinInputField key={index} />
                    ))}
                  </PinInput>
                </HStack>
                <Link color="#1273EB" href="#">
                  {t('Resend Code?')}
                </Link>
                <button
                  className=" p-2 bg-blue-500 text-white"
                  style={{
                    borderRadius: '22.76px',
                    fontWeight: '500',
                    width: pxToVw(202),
                    height: pxToVw(46),
                    marginTop: pxToVw(80),
                  }}
                  onClick={handleNext}
                >
                  {t('Continue')}
                </button>
              </>
            )}
            {screen === '3' && (
              <>
                <Text
                  className="mt-22 mb-22"
                  style={{
                    fontSize: pxToVw(27.88),
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    color: '#6B6B6B',
                    marginBottom: pxToVw(50),
                  }}
                >
                  {t('Reset Password')}{' '}
                </Text>
                <CustomInput
                  id="password"
                  label="New Password"
                  type="password"
                  onChange={(e: {
                    target: { value: SetStateAction<string> }
                  }) => setPassword(e.target.value)}
                />
                <CustomInput
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  onChange={(e: {
                    target: { value: SetStateAction<string> }
                  }) => setConfirmPassword(e.target.value)}
                />
                <button
                  className="mt-22 p-2 bg-blue-500 text-white"
                  style={{
                    fontSize: pxToVw(17),
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    borderRadius: '22.76px',
                    width: pxToVw(202),
                    height: pxToVw(46),
                  }}
                  onClick={handleNext}
                >
                  {t('Reset Password')}
                </button>
              </>
            )}
          </>
        )}
      </form>
    </div>
  )
}
