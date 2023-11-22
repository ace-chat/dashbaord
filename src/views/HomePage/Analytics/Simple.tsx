import Icon from '@/components/Icon/Icon.tsx'
import { useSSR, useTranslation } from 'react-i18next'
import { pxToVw } from '@/utils'
import { Button } from 'antd'
import { useRef, useState } from 'react'

const Simple = () => {
  const { t } = useTranslation();

  //state variables
  const fileInput: any = useRef();
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

  return <>
    <div className={`mt-40`}>
      <div className={`flex items-center flex-col mr-240`}>
        <div className={`text-20 text-black mt-30`}>{ t("Simple Analytics Tool") }</div>
        <div className={`text-12 text-[#545B65] mt-12 pb-12`}>{ t("Get your data all set with our simple analytics tool. Just a click away.") }</div>
      </div>
      <div className={`flex justify-around mr-240`}>
        <div className='flex mt-10 p-24' style={{ flexDirection: "column" }}>
            <div className='flex rounded-8 mt-12 justify-center items-center' 
                style={{"backgroundColor": "#F4F6FA", "display": "flex", "width": pxToVw(368), "height": pxToVw(75), border: "1px dashed #8B8B8B", flexDirection: "column" }}
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
                <div className={`mt-2`} style={{ color: "#000", opacity: 0.6, fontSize: pxToVw(10) }}>{ t("Upload a CSV file here") }</div>
            </div> 

            <div className={`mt-30 items-center self-center`}>
                <Button
                    type="default"
                    disabled={selectedFile ? false : true}
                    //sample on click function
                    onClick={() => {}}
                    className={`w-112 h-36 flex items-center justify-center bg-[#4F6BE8] rounded-5 text-12 text-white cursor-pointer select-none`}
                >
                {t('Generate Report')}
                </Button>
          </div>

        </div>
      </div>
    </div>
  </>
}

export default Simple
