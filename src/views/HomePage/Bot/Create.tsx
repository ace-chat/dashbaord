import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { pxToVw } from '@/utils'
import { Button, Input, Select, Space } from 'antd'
import { useRef, useState } from 'react'

const Create = () => {
  const { t } = useTranslation();

  //state variables
  const [websiteLinks, setWebsiteLinks]:any = useState([]);
  const [typedLink, setTypedLink] = useState("");
  const [companyName, setCompanyName]: any = useState();
  const [tone, setTone]: any = useState();
  const [platform, setPlatform]: any = useState();
  const [phoneNumber, setPhoneNumber]: any = useState();
  const [companyIntro, setCompanyIntro]: any = useState();
  const [selectedFile, setSelectedFile] = useState();
  const fileInput: any = useRef();

  //data sets
  const [tones] = useState([
    { value: 'luxury', label: t('Luxury') },
    { value: 'persuasive', label: t('Persuasive') },
    { value: 'professional', label: t('Professional') },
    { value: 'funny', label: t('Funny') },
    { value: 'narrative', label: t('Narrative') },
    { value: 'conversational', label: t('Conversational') }
  ]);

  const [platforms] = useState([
    { value: 'facebook', label: t('Facebook') },
    { value: 'instagram', label: t('Instagram') },
    { value: 'X', label: t('X') },
    { value: 'linkedin', label: t('LinkedIn') }
  ]);

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
    if(companyName && companyIntro && platform && tone && phoneNumber && selectedFile && websiteLinks.length >= 1){
        return false;
    } 
    else 
        return true;
  };

  return <>
    <div className={`mt-40`}>
      <div className={`flex items-center flex-col mr-240`}>
        <div className={`text-20 text-black mt-30`} style={{ fontFamily: "PingFang SC Medium" }}>{ t("Ready To Generate AI Chatbot For Your Business?") }</div>
        <div className={`text-12 text-[#545B65] mt-12 pb-12`} style={{ fontFamily: "PingFang SC Light" }}>{ t("Get your best customer support chatbot for your business. Just a click away.") }</div>
      </div>
      <div className={`flex justify-around mr-240`}>
        <div className='flex bg-white rounded-8 mt-20 p-24' style={{ "width": pxToVw(796), "height": pxToVw(441), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)', flexDirection: "column"}}>

            <div className='flex items-start justify-between' style={{display: "flex", flexDirection: "row"}}>
                <div>
                    <div className={`mt-12`}>
                        <Input styles={{ input: { width: pxToVw(368), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Company Name')} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className={`mt-12`}>
                        <Select
                            mode='multiple'
                            value={websiteLinks}
                            onChange={(e) => setWebsiteLinks(e)}
                            showSearch={false}
                            placeholder={t('Add Website Links')}
                            className="custom-select"
                            style={{ width: pxToVw(368), fontSize: pxToVw(10) }}
                            dropdownRender={() => (
                                <Space className='flex pt-2 pb-2 ml-2 mr-2 items-center justify-center'>
                                <Input
                                    style={{width: pxToVw(358), height: pxToVw(25), fontSize: pxToVw(10) }}
                                    placeholder="Type New Link"
                                    value={typedLink}
                                    onChange={(e) => setTypedLink(e.target.value)}
                                    suffix={
                                        <div
                                            onClick={() => {
                                                if(typedLink !== ""){
                                                    setWebsiteLinks([...websiteLinks, typedLink.trim()]);
                                                    setTypedLink("");
                                                }
                                            }}
                                        >
                                            <Icon name={'add'} style={{ 'width': pxToVw(8), 'height': pxToVw(8)  }} />
                                        </div>
                                    }
                                />
                            </Space>
                            )}
                            options={[]}
                        />
                    </div>
                    <div className={`mt-12`}>
                        <Select placeholder={t('Tones')} style={{ width: pxToVw(368), height: pxToVw(36), fontSize: pxToVw(10) }} options={tones} value={tone} onSelect={(value) => setTone(value)} />
                    </div>
                    <div className={`mt-12`}>
                        <Select style={{ width: pxToVw(368), height: pxToVw(36) }} options={platforms} placeholder={t("Platform")} value={platform} onSelect={(value) => setPlatform(value)} />
                    </div>
                    <div className={`mt-12`}>
                        <Input styles={{ input: { width: pxToVw(368), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Phone Number')} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} 
                        onKeyDown={(e) => {
                            const allowedKeys = ['+', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                            if (e.key !== 'Delete' && e.key !== 'Backspace' && !allowedKeys.includes(e.key)) {
                                e.preventDefault();
                            }
                        }} />
                    </div>
                </div>
                <div className={`mt-12`}>
                    <Input.TextArea styles={{ textarea: { width: pxToVw(368), height: pxToVw(228), fontSize: pxToVw(10) } }} placeholder={t('Company Introduction')}
                    value={companyIntro} onChange={(e) => setCompanyIntro(e.target.value)} />
                </div>
            </div> 
            
            <div className='flex rounded-8 mt-12 justify-center items-center' 
                style={{"backgroundColor": "#F4F6FA", "display": "flex", "width": pxToVw(748), "height": pxToVw(93), border: "1px dashed #8B8B8B", flexDirection: "column" }}
                onClick={() => fileInput.current.click()}>
                <input
                    type="file"
                    id="fileInput"
                    accept=".pdf"
                    ref={fileInput}
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                />
                <Icon name={'upload'} style={{ 'width': pxToVw(22), 'height': pxToVw(22), 'marginTop': pxToVw(5) }} />
                <div className={`mt-10`} style={{ color: "#000", opacity: 0.6, fontSize: pxToVw(10), fontFamily: "PingFang SC Regular" }}>{ t("Upload all Product/Service Catalogs and FAQs") }</div>
                <div className={`mt-2`} style={{ color: "#000", opacity: 0.6, fontSize: pxToVw(10), fontFamily: "PingFang SC Bold" }}>{ t("Drop PDF files here") }</div>
            </div> 

            <div className={`mt-24 items-center self-center`}>
                <Button
                    type="default"
                    disabled={validate()}
                    //sample on click function
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

export default Create
