import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { toggle } from "@/reducers/menu.ts"
import { useDispatch } from 'react-redux'

import notFound from '@/assets/404.png'
import {useTranslation} from "react-i18next";

const Oops: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const backHome = () => {
    dispatch(toggle('home'))
    navigate('/home', { replace: true })
  }

  return <div className={'w-screen h-screen'}>
    <div className={"flex items-center justify-between px-36"}>
      <div></div>
      <div></div>
    </div>
    <div className={"w-full flex items-center flex-col"}>
      <img className={"w-720 h-406 mb-90"} src={notFound} alt="404" />
      <div className={"w-140 h-42 rounded-40 bg-[#000000] flex items-center justify-center text-[#FFFFFF] text-16 cursor-pointer"} onClick={backHome}>
        { t('Back Home') }
      </div>
    </div>
  </div>
}

export default Oops
