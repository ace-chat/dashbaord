import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AccountPage.module.css'
import { useLocation } from 'react-router'
import { verifyRegisterCode } from '@/request'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

function Confirm() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const code = queryParams.get('code')

  useEffect(() => {
    init()
  }, [])

  const handleCodeConfirm = async () => {
    try {
      if (!code || code === '') return
      const response = await verifyRegisterCode(code)
      if (response.code === 20000) {
        message.success(t('Registration is successful, please log in directly'))

        navigate('/login')
      } else {
        message.error(t('The code is not supported, please try again'))
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function init() {
    await handleCodeConfirm()
  }

  return (
    <div className={styles.box}>
      <div
        className="grid"
        style={{ textAlign: 'center', fontWeight: 500, fontSize: 20 }}
      ></div>
    </div>
  )
}
export default Confirm
