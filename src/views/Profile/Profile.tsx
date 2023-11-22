import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { pxToVw } from '@/utils'

const Profile = () => {
  const { t } = useTranslation();

  return <>
    <div className={`bg-white items-center rounded-8 mt-40 ml-20`} style={{"width": pxToVw(1110), "height": pxToVw(727), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
    
    </div>

    <div className={`bg-white items-center rounded-8 mt-40 ml-20`} style={{"width": pxToVw(1110), "height": pxToVw(193), marginTop: pxToVw(25), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
    
    </div>

    <div className='flex' style={{ marginTop: pxToVw(20) }} />
  </>
}

export default Profile
