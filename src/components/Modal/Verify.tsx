import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { FC } from 'react'
import { Button } from 'antd'
import { pxToVw } from '@/utils'
import { InputOTP } from 'antd-input-otp';

type Props = {
  phone: string;
  onConfirm: (code: string) => void;
}

const Verify: FC<Props> = (props) => {
  const { t } = useTranslation()

  const [code, setCode] = useState<Array<string>>([]);

  const disabled = useMemo(() => {
    let status = code.includes("");
    if(code.length !== 8){
      status = true
    }
    return status;
  }, [code])

  const maskMiddleCharacters = (str: string, start: number) => {
    return str.substring(0, start) + '*****' + str.substring(-1)
  };

  const confirm = () => {
    props.onConfirm(code.join(""));
  }

  return <>
    <div className='flex flex-col justify-center items-center pt-60'>
      <div className={`text-22 mb-12`}>{t("Verify")}</div>
      <div className={`text-12 text-[#767676] mb-12`}>{t("Enter the code we sent")}</div>
      <div className={`text-12 text-[#767676]`}>{ maskMiddleCharacters(props.phone, 2) }</div>
      <div style={{marginTop: pxToVw(40)}}>
        <InputOTP inputType={"alphabet-numeric"} length={8} inputStyle={{ width: pxToVw(42), height: pxToVw(42) }} value={code} onChange={(value) => { setCode(value) }}/>
      </div>
      <div className='flex items-center mt-20'>
        <div className={`text-12 text-[#767676]`}>{t("Didn't Recieve?")}</div>
        <div className={`text-12 text-[#1273EB] ml-2`}>{t("Resend Code")}</div>
      </div>
    </div>
    <div className='flex items-center justify-center'>
      <Button
        type="default"
        style={{borderRadius: pxToVw(20), marginTop: pxToVw(30), marginBottom: pxToVw(30)}}
        disabled={disabled}
        onClick={confirm}
        className={`w-167 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 cursor-pointer select-none`}
      >
        <div className={`text-13 text-transparent`} style={{ backgroundImage: "linear-gradient(90deg, #9C34AB -0.02%, #4F6BE8 47.92%, #14B8BC 100.02%)", backgroundClip: 'text' }}>{t('Confirm ✨')}</div>
      </Button>
    </div>
  </>
};

export default Verify