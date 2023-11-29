import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { pxToVw } from '@/utils'
import { Button, Input, Select, Space } from 'antd'
import { useRef, useState } from 'react'

const Deep = () => {
  const { t } = useTranslation();

  //state variables
  const fileInput: any = useRef();
  const [business, setBusiness]:any = useState();
  const [product, setProduct]:any = useState();
  const [data, setData]:any = useState();
  const [requirements, setRequirements]:any = useState();
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e: any) => {
    const chosenFile = e.target.files[0];
    if (chosenFile) {
        setSelectedFile(chosenFile);
        console.log('Selected File:', chosenFile);
        const { name, size, type } = chosenFile;
        console.log('File Details:', { name, size, type });

        // Handle the file as needed (e.g., upload to server)
    }
  };

  const validate = () => {
    if(business && product && data && selectedFile){
        return false;
    }
    else 
        return true;
  };

  return <>
    <div className={`mt-40`}>
      <div className={`flex items-center flex-col mr-240`}>
        <div className={`text-20 text-black mt-30`} style={{ fontFamily: "PingFang SC Medium" }}>{ t("Deep Analytics Tool") }</div>
        <div className={`text-12 text-[#545B65] mt-12 pb-12`} style={{ fontFamily: "PingFang SC Medium" }}>{ t("Get your data all set with our deep analytics tool. Just a click away.") }</div>
      </div>
      <div className={`flex justify-around mr-240`}>
        <div className='flex bg-white rounded-8 mt-20 p-24' style={{ "width": pxToVw(808), "height": pxToVw(467), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)', flexDirection: "column"}}>

            <div className='flex items-start justify-between' style={{display: "flex", flexDirection: "row"}}>
                <div>
                    <div>
                        <div className={`text-bold`} style={{ color: "#000", fontSize: pxToVw(12), fontFamily: "PingFang SC Medium"}}>
                            { t("Business Description") }
                            <Icon name={'info'} style={{ 'width': pxToVw(7), 'height': pxToVw(7), 'marginLeft': pxToVw(2) }} />
                        </div>
                        <Input.TextArea styles={{ textarea: { width: pxToVw(368), height: pxToVw(102), fontSize: pxToVw(10), marginTop: pxToVw(5) } }} placeholder={t('Type here')} 
                        value={business} onChange={(e) => setBusiness(e.target.value)} />
                    </div>
                    <div className={`mt-12`}>
                        <div className={`text-bold`} style={{ color: "#000", fontSize: pxToVw(12), fontFamily: "PingFang SC Medium"}}>
                            { t("Data Description") }
                            <Icon name={'info'} style={{ 'width': pxToVw(7), 'height': pxToVw(7), 'marginLeft': pxToVw(2) }} />
                        </div>
                        <Input.TextArea styles={{ textarea: { width: pxToVw(368), height: pxToVw(102), fontSize: pxToVw(10), marginTop: pxToVw(5) } }} placeholder={t('Type here')} 
                        value={data} onChange={(e) => setData(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <div>
                        <div className={`text-bold`} style={{ color: "#000", fontSize: pxToVw(12), fontFamily: "PingFang SC Medium"}}>
                            { t("Product Description") }
                            <Icon name={'info'} style={{ 'width': pxToVw(7), 'height': pxToVw(7), 'marginLeft': pxToVw(2) }} />
                        </div>
                        <Input.TextArea styles={{ textarea: { width: pxToVw(368), height: pxToVw(102), fontSize: pxToVw(10), marginTop: pxToVw(5) } }} placeholder={t('Type here')} 
                        value={product} onChange={(e) => setProduct(e.target.value)}/>
                    </div>
                    <div className={`mt-12`}>
                        <div className={`text-bold`} style={{ color: "#000", fontSize: pxToVw(12), fontFamily: "PingFang SC Medium"}}>
                            { t("Any Other Requirements") }
                            <Icon name={'info'} style={{ 'width': pxToVw(7), 'height': pxToVw(7), 'marginLeft': pxToVw(2) }} />
                        </div>
                        <Input.TextArea styles={{ textarea: { width: pxToVw(368), height: pxToVw(102), fontSize: pxToVw(10), marginTop: pxToVw(5) } }} placeholder={t('Type here')} 
                        value={requirements} onChange={(e) => setRequirements(e.target.value)}/>
                    </div>
                </div>
            </div> 
            
            <div className='flex rounded-8 mt-16 justify-center items-center' 
                style={{"backgroundColor": "#F4F6FA", "display": "flex", "width": pxToVw(760), "height": pxToVw(75), border: "1px dashed #8B8B8B", flexDirection: "column" }}
                onClick={() => fileInput.current.click()}>
                <input
                    type="file"
                    id="fileInput"
                    accept=".csv"
                    ref={fileInput}
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                />
                <Icon name={'upload'} style={{ 'width': pxToVw(22), 'height': pxToVw(22), 'marginTop': pxToVw(5) }} />
                <div className={`mt-2`} style={{ color: "#000", opacity: 0.6, fontSize: pxToVw(10), fontFamily: "PingFang SC Bold" }}>{ t("Upload a CSV file here") }</div>
            </div> 

            <div className={`mt-24 items-center self-center`}>
                <Button
                    type="default"
                    //sample on click function
                    disabled={validate()}
                    onClick={() => {}}
                    className={`w-112 h-36 flex items-center justify-center bg-[#4F6BE8] rounded-5 text-12 text-white cursor-pointer select-none`}
                >
                    <div style={{ fontFamily: "PingFang SC Regular"}}>{t('Submit')}</div>
                </Button>
          </div>

        </div>
      </div>
    </div>
  </>
}

export default Deep
