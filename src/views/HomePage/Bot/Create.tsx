import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { pxToVw } from '@/utils'
import { Button, Input, Select } from 'antd'

const Create = () => {
  const { t } = useTranslation()

  return <>
    <div className={`mt-40`}>
      <div className={`flex items-center flex-col mr-240`}>
        <div className={`text-20 text-black mt-30`}>{ t("Ready To Generate AI Chatbot For Your Business?") }</div>
        <div className={`text-12 text-[#545B65] mt-12 pb-12`}>{ t("Get your best customer support chatbot for your business. Just a click away.") }</div>
      </div>
      <div className={`flex justify-around mr-240`}>
        <div className='flex bg-white rounded-8 mt-20 p-24' style={{ "width": pxToVw(796), "height": pxToVw(441), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)', flexDirection: "column"}}>

            <div className='flex items-start justify-between' style={{display: "flex", flexDirection: "row"}}>
                <div>
                    <div className={`mt-12`}>
                        <Input styles={{ input: { width: pxToVw(368), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Company Name')} />
                    </div>
                    <div className={`mt-12`}>
                        <Select mode='multiple' showSearch={false} placeholder={t('Add Website Links')} style={{ width: pxToVw(368), height: pxToVw(36), fontSize: pxToVw(10) }} options={[{value: "", label: ""}]}
                            optionRender={() => {
                            return (
                                <div className={`flex items-center justify-between`}>
                                    <Input styles={{ input: { width: pxToVw(368), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Type New Link')} />

                                </div>
                            );
                            }}
                        />
                    </div>
                    <div className={`mt-12`}>
                        <Input styles={{ input: { width: pxToVw(368), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Type brand name')} />
                    </div>
                    <div className={`mt-12`}>
                        <Input styles={{ input: { width: pxToVw(368), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Type brand name')} />
                    </div>
                    <div className={`mt-12`}>
                        <Input styles={{ input: { width: pxToVw(368), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Type brand name')} />
                    </div>
                </div>
                <div className={`mt-12`}>
                    <Input.TextArea style={{resize: "none"}} styles={{ textarea: { width: pxToVw(368), height: pxToVw(228), fontSize: pxToVw(10) } }} placeholder={t('Description about service/product')} />
                </div>
            </div>

            <div className='flex rounded-8 mt-12 justify-center items-center' style={{"backgroundColor": "#F4F6FA", "display": "flex", "width": pxToVw(748), "height": pxToVw(93), border: "1px dashed #8B8B8B", }}>

            </div> 

            <div className={`mt-24 items-center self-center`}>
                <Button
                type="default"
                //sample on click function
                onClick={() => {}}
                className={`w-112 h-36 flex items-center justify-center bg-[#4F6BE8] rounded-5 text-12 text-white cursor-pointer select-none`}
                >
                {t('Submit')}
                </Button>
          </div>

        </div>
      </div>
    </div>
  </>
}

export default Create
