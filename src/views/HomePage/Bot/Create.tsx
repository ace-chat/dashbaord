import { useState, useRef } from 'react'
import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { Button, Input, Select, Space, Switch } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { pxToVw } from '@/utils'

import { ChangeNumber } from '@/components/Modal/ChangeNumber';
import { VerifyNumber } from '@/components/Modal/Verify';
import { ManageFiles } from '@/components/Modal/ManageFiles';
import { QA } from '@/components/Modal/QA';

import { SalesPitch } from '@/components/Modal/SalesPitch';

type Prop = {
  title: string;
  flow?: string;
  subTitle: string;
  tag: string;
}

const Create = (props: Prop) => {
    const { t } = useTranslation()
    const [loading] = useState(false);

    // copied from the code in Create.tsx
    const [sampleCodes] = useState([
        { value: "+971", label: "+971" },
        { value: "+1", label: "+1" },
        { value: "+20", label: "+20" },
    ]);

    const [whatsappActive, setWhatsappActive] = useState(true);
    const [generatedBot, setGeneratedBot]: any = useState();

    //state variables
    const [websiteLinks, setWebsiteLinks]:any = useState([]);
    const [typedLink, setTypedLink] = useState("");
    const [companyName, setCompanyName]: any = useState();
    const [tone, setTone]: any = useState();
    const [platform, setPlatform]: any = useState();
    const [phoneNumber, setPhoneNumber]: any = useState();
    const [companyIntro, setCompanyIntro]: any = useState();
    const [selectedFiles, setSelectedFiles]: any = useState([]);
    const fileInput: any = useRef();
    const [oldNumber, setOldNumber] = useState({code: null, number: null});
    const [newNumber, setNewNumber] = useState({code: null, number: null});
    const [confirmNumber, setConfirmNumber] = useState({code: null, number: null});
    const [code, setCode] = useState();
    const [qAPairs, setQAPairs] = useState([{question: "", answer: ""}]);
    const [sPPairs, setSPPairs] = useState([{question: "", answer: ""}]);
    const [text, setText] = useState("");
    const [phoneInputs, setPhoneInputs] = useState<string[]>([]);
    const [inputOption, setInputOption]: any = useState();

    //modal state controls
    const [changeNumber, setChangeNumber] = useState(false);
    const toggleChangeNumber = () => {
        setChangeNumber(!changeNumber);
    };
    const [verifyNumber, setVerifyNumber] = useState(false);
    const toggleVerifyNumber = () => {
        setVerifyNumber(!verifyNumber);
    };
    const [qA, setQA] = useState(false);
    const [sP, setSP] = useState(false);
    const toggleQA = () => {
        setQA(!qA);
    };
    const toggleSP = () => {
        setSP(!sP);
    };
    const [manageFiles, setManageFiles] = useState(false);
    const toggleManageFiles = () => {
        setManageFiles(!manageFiles);
    };

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
        { value: 'whatsapp', label: 'Whatsapp' },
        { value: 'telegram', label: 'Telegram' },
    ]);

    const [inputOptions] = useState([
        { value: 'db-input', label:t('Fetch Numbers from Database')},
        { value: 'typing-input', label:t('Type in the Numbers')},
        { value: 'file-input', label:t('Get Numbers from File')},
        ]);


    const handleFileInputChange = (e: any) => {
        const chosenFiles = e.target.files;
        if (chosenFiles.length > 0) {
          // Convert the FileList to an array
          const filesArray = Array.from(chosenFiles);
      
          // Update the selectedFiles array with the new files
          setSelectedFiles((prevFiles: any) => [...prevFiles, ...filesArray]);
      
          // Log file details
          filesArray.forEach((file: any) => {
            const { name, size, type } = file;
            console.log('File Details:', { name, size, type });
          });
      
          // Reset the file input
          fileInput.current.value = '';
        }
    };

    const validate = () => {
        if(companyName && companyIntro && platform && tone && phoneNumber && selectedFiles.length > 0 && websiteLinks.length >= 1){
            return false;
        } 
        else 
            return true;
    };

    const checkNumbers = () => {
        if (
            oldNumber?.code !== null &&
            oldNumber?.number !== null &&
            newNumber?.code !== null &&
            newNumber?.number !== null &&
            confirmNumber?.code !== null &&
            confirmNumber?.number !== null &&
            oldNumber?.number !== "" &&
            confirmNumber?.number !== "" &&
            confirmNumber?.number !== "" 
        ){
            //add condition to check if old number matches what is saved in the db 
            if(JSON.stringify(newNumber) == JSON.stringify(confirmNumber))
                return false;
            else
                return true;
        }
        else 
            return true;
    };

    const deleteFile = (index: any) => {
        var uploadedFiles =[ ...selectedFiles];
        uploadedFiles = uploadedFiles.filter((_, ind): any => {
            return index !== ind;
        });
        setSelectedFiles(uploadedFiles);
    };

  return <>
    <div className={`flex flex-col`}>
      <div className='flex flex-row mt-14' style={{ marginLeft: pxToVw(29) }}>
        {props?.flow &&
          <div className={`text-[#545B65]`} style={{ fontFamily: "PingFang SC Regular", fontSize: pxToVw(18)}}>{t(props.flow)}&nbsp;&gt;&nbsp;</div>
        }
        <div className={`text-black`} style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(18)}}>{ t("Ready To Generate AI Chatbot For Your Business?") }</div>
      </div>
      <div className={`text-[#545B65] mt-4`} style={{ marginLeft: pxToVw(29), fontFamily: "PingFang SC Light", fontSize: pxToVw(14) }}>{ t("Get your best customer support chatbot for your business. Just a click away.") }</div>
    </div>
    <div className={`bg-white rounded-8 mt-14`} style={{ width: pxToVw(1389), marginLeft: pxToVw(29), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>

{/* ------------------------------------------------------------------------------------------------------- */}
          {generatedBot ?
              <div className={`flex justify-between`}>
                  <div className={`flex p-24 flex-col`} style={{ width: pxToVw(686), height: pxToVw(748), justifyContent: "center", alignItems: "center" }}>
                      <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(28.87) }}>{t('Aurpay Chatbot - Initiate Conversation')}</div>
                      <div>
                          <div className={`flex items-center mt-60`}>
                              <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                              <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold", fontSize: pxToVw(16) }}>{t('Options')}</span>
                          </div>
                          <div className={`mt-22`}>
                              <Select style={{ width: pxToVw(436), height: pxToVw(36), fontFamily: "PingFang SC Bold", fontSize: pxToVw(16) }} options={inputOptions}
                                  placeholder={t("Select Options")}
                                  value={inputOption} onSelect={(value) => setInputOption(value)} />
                          </div>

                          {/* new section */}
                          {inputOption === 'typing-input' &&
                          <>
                          <div className={`flex items-center mt-60`}>
                              <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                              <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold", fontSize: pxToVw(16) }}>{t('Send To')}</span>
                          </div>
                          <div className={`mt-12`}>
                              <Input styles={{ input: { width: pxToVw(436), height: pxToVw(36), fontSize: pxToVw(16) } }}
                                  placeholder={t('Type Phone Numbers')} value={phoneInputs}
                                  onChange={(e) => setPhoneInputs([e.target.value])}
                                  onKeyDown={(e) => {
                                      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', ','];
                                      if (e.key !== 'Delete' && e.key !== 'Backspace' && !allowedKeys.includes(e.key)) {
                                          e.preventDefault();
                                      }
                                  }}
                              />
                          </div>
                          </>

                          }

                          {/* new section */}
                          {inputOption === 'file-input' &&
                          <>
                          <div className={`flex items-center mt-60`}>
                              <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                              <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold", fontSize: pxToVw(16) }}>{t('Choose file')}</span>
                          </div>
                          <div className='flex rounded-8 mt-16 justify-center items-center'
                              style={{ "backgroundColor": "#F4F6FA", "display": "flex", "width": pxToVw(436), "height": pxToVw(103), border: "1px dashed #8B8B8B", flexDirection: "column" }}
                              onClick={() => fileInput.current.click()}>
                              <input
                                  type="file"
                                  multiple={true}
                                  id="fileInput"
                                  accept=".txt"
                                  ref={fileInput}
                                  onChange={handleFileInputChange}
                                  style={{ display: "none" }}
                              />
                              <Icon name={'upload'} style={{ 'width': pxToVw(22), 'height': pxToVw(22), 'marginTop': pxToVw(5) }} />
                              <div className={`mt-2`} style={{ color: "#000", opacity: 0.6, fontSize: pxToVw(10), fontFamily: "PingFang SC Light" }}>{t("Upload numbers as a file.txt here")}</div>
                          </div>
                          </>
                          }


                          {/* new section */}
                          <div className={`flex items-center mt-60`}>
                              <Icon name={inputOption !== 'db-input' ? 'third' : 'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                              <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold", fontSize: pxToVw(16) }}>{t('Message')}</span>

                          </div>
                          <div className={`mt-22`}>
                              <Input.TextArea styles={{ textarea: { width: pxToVw(436), height: pxToVw(181), fontSize: pxToVw(16) } }}
                                  placeholder={t('Type Here')} value={text} onChange={(e) => setText(e.target.value)} />
                          </div>
                          <Button className={`mt-22 borderRadius-8`} type="primary" style={{ width: pxToVw(206), height: pxToVw(36), marginLeft: pxToVw(120), fontFamily: "PingFang SC Bold", fontSize: pxToVw(16) }}>{t('Send')}</Button>
                      </div>

              {/* ------------------------------------------------------------------------------------------------------- */}
                
            </div>
            <div className="w-px bg-[#F3F3F3]"></div> {/* Vertical line */}
            <div className={`flex p-24 flex-col`} style={{ width: pxToVw(686), height: pxToVw(748), justifyContent: "center", alignItems: "center", paddingBottom: pxToVw(72)  }}>
                <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(24) }}>{ t('Your Active Chatbots') }</div>
                <div style={{ fontFamily: "PingFang SC Regular", fontSize: pxToVw(14), color: "#545B65" }}>{ t('Your Active Chatbots on social media') }</div>
                <div className='flex flex-row mt-70'>

                    <div className='flex flex-col items-center'>
                        <div className='flex social-div flex-col' style={{ justifyContent: 'center', alignItems: "center", borderColor: whatsappActive ? "#4F6BE8" : "" }}>
                            <Icon name={whatsappActive ? 'whatsapp' : 'whatsapp_offline'} style={{ 'width': pxToVw(60), 'height': pxToVw(60) }} /> 
                            <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(12), marginTop: pxToVw(4) }}>{ t('Whatsapp') }</div>
                        </div>
                        <Switch size='small' checked={whatsappActive} onChange={setWhatsappActive} style={!whatsappActive ? { opacity: 0.6 } : {}} />
                        <div style={{ marginTop: pxToVw(5), fontSize: pxToVw(12), fontFamily: "PingFang SC Regular", textAlign: "center"}}>{whatsappActive ? "Active" : "Inactive"}</div>
                    </div>
                    
                    <div className='flex flex-col items-center'>
                        <div className='flex social-div flex-col' style={{ justifyContent: 'center', alignItems: "center" }}>
                            <Icon name={'telegram'} style={{ 'width': pxToVw(60), 'height': pxToVw(60) }} /> 
                            <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(12), marginTop: pxToVw(4) }}>{ t('Telegram') }</div>
                        </div>
                        <Switch size='small' disabled={true} />
                        <div style={{ marginTop: pxToVw(5), fontSize: pxToVw(12), fontFamily: "PingFang SC Regular", textAlign: "center"}}>{t('Coming Soon')}</div>
                    </div>

                </div>

              <div>
              <Button
                    type="default"
                    onClick={toggleChangeNumber}
                    className={`w-273 h-36 mt-55 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
                >
                    <div style={{ fontFamily: "PingFang SC Regular" }}>{t('Change Number')}</div>
                </Button>
                <div className='mt-20'>
                    <Button
                        type="default" 
                        onClick={toggleManageFiles}
                        className={`w-273 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
                    >
                        <div style={{ fontFamily: "PingFang SC Regular" }}>{t('Manage Uploaded Files')}</div>
                    </Button>
                </div>
                <div className='mt-20'>
                    <Button
                        type="default"
                        onClick={() => {
                            toggleQA();
                        }}
                        className={`w-273 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
                    >
                        <div style={{ fontFamily: "PingFang SC Regular" }}>{t('Manage Questions & Answers')}</div>
                    </Button>
                </div>
                <div className='mt-20'>
                    <Button
                        type="default"
                        onClick={() => {
                            toggleSP();
                        }}
                        className={`w-273 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
                    >
                        <div style={{ fontFamily: "PingFang SC Regular" }}>{t('Manage Sales Pitches')}</div>
                    </Button>
                </div>
                <div className='mt-20'>
                    <Button
                        type="default"
                        onClick={() => {
                            //add delete bot api
                            setGeneratedBot();
                        }}
                        className={`w-273 h-36 flex items-center justify-center bg-[#EA6969] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
                    >
                        <div style={{ fontFamily: "PingFang SC Regular" }}>{t('Delete')}</div>
                    </Button>
                </div>

              </div>
            </div>
        </div>
    :
      <div className={`flex justify-around`}>
        <div className={`w-300 p-24`} style={{ fontFamily: "PingFang SC Regular" }}>

            <div>
                <div className={`flex items-center`}>
                    <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                    <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Details') }</span>
                    <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
                </div>
                <div className={`mt-12`}>
                    <div> 
                        <Input styles={{ input: { width: pxToVw(336), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Company Name')} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className={`mt-12`}>
                        <Select
                            mode='multiple'
                            value={websiteLinks}
                            onChange={(e) => setWebsiteLinks(e)}
                            showSearch={false}
                            placeholder={t('Add Website Links')}
                            className="custom-select"
                            style={{ width: pxToVw(336), fontSize: pxToVw(10) }}
                            dropdownRender={() => (
                                <Space className='flex pt-2 pb-2 ml-2 mr-2 items-center justify-center'>
                                <Input
                                    style={{width: pxToVw(324), height: pxToVw(25), fontSize: pxToVw(10) }}
                                    placeholder="Type New Link"
                                    value={typedLink}
                                    onPressEnter={() => {
                                        if(typedLink !== ""){
                                            setWebsiteLinks([...websiteLinks, typedLink.trim()]);
                                            setTypedLink("");
                                        }
                                    }}
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
                    <div className={`mt-12 w-336`}>
                        <Input.TextArea styles={{ textarea: { height: pxToVw(73), fontSize: pxToVw(10) } }} placeholder={t('Company Introduction')}
                        value={companyIntro} onChange={(e) => setCompanyIntro(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className={`mt-24`}>
                <div className={`flex items-center`}>
                    <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                    <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Platform') }</span>
                    <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
                </div>
                <div className={`mt-12`}>
                    <div>
                        <Select style={{ width: pxToVw(336), height: pxToVw(36) }} options={platforms} placeholder={t("Platform")} defaultValue={['whatsapp']} onSelect={(value) => setPlatform(value)} />
                    </div>
                    <div className={`mt-12`}>
                        <Select style={{ width: pxToVw(70), height: pxToVw(35) }} options={sampleCodes} placeholder={"+971"} value={phoneNumber} onChange={(e) => setPhoneNumber(...phoneNumber , e.target.value)} />
                        <Input styles={{ input: { width: pxToVw(160), height: pxToVw(35), fontSize: pxToVw(10), marginLeft: pxToVw(5) } }} 
                            placeholder={t('Phone Number')} value={phoneNumber} onChange={(e) => setPhoneNumber(...phoneNumber, e.target.value)}
                            onKeyDown={(e) => {
                                const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                                if (e.key !== 'Delete' && e.key !== 'Backspace' && !allowedKeys.includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {/* <Input styles={{ input: { width: pxToVw(336), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Phone Number')} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} 
                        onKeyDown={(e) => {
                            const allowedKeys = ['+', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                            if (e.key !== 'Delete' && e.key !== 'Backspace' && !allowedKeys.includes(e.key)) {
                                e.preventDefault();
                            }
                        }} /> */}
                    </div>
                </div>
            </div>

            <div className={`mt-24`}>
                <div className={`flex items-center`}>
                    <Icon name={'third'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                    <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Style') }</span>
                    <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
                </div>
                <div className={`mt-12`}>
                    <Select placeholder={t('Tones')} style={{ width: pxToVw(336), height: pxToVw(36), fontSize: pxToVw(10) }} options={tones} value={tone} onSelect={(value) => setTone(value)} />
                </div>
            </div>

            <div className={`mt-24`}>
                <div className={`flex items-center`}>
                    <Icon name={'fourth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                    <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Upload') }</span>
                    <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
                </div>
                <div className={`mt-12`}>
                <Button block style={{ width: pxToVw(335), height: pxToVw(35), fontSize: pxToVw(10), fontFamily: "PingFang SC" }}  onClick={() => {
                            toggleQA();
                        }}><span>{t('Add Questions & Answers')}</span><PlusOutlined style={{marginLeft: pxToVw(180), color: 'rgba(0,0,0,.45)' }} /></Button>
                <Button block className={`mt-12`} style={{ width: pxToVw(335), height: pxToVw(35), fontSize: pxToVw(10), fontFamily: "PingFang SC" }} onClick={() => {
                            toggleSP();
                        }}>{t('Add Sales Pitches')} <PlusOutlined style={{marginLeft: pxToVw(220), color: 'rgba(0,0,0,.45)' }} /></Button>
                <div className='flex rounded-8 mt-16 justify-center items-center' 
                    style={{"backgroundColor": "#F4F6FA", "display": "flex", "width": pxToVw(336), "height": pxToVw(144), border: "1px dashed #8B8B8B", flexDirection: "column" }}
                    onClick={() => fileInput.current.click()}>
                    <input
                        type="file"
                        multiple={true}
                        id="fileInput"
                        accept=".pdf"
                        ref={fileInput}
                        onChange={handleFileInputChange}
                        style={{ display: "none" }}
                    />
                    <Icon name={'upload'} style={{ 'width': pxToVw(22), 'height': pxToVw(22), 'marginTop': pxToVw(5) }} />
                    <div className={`mt-2`} style={{ color: "#000", opacity: 0.6, fontSize: pxToVw(10), fontFamily: "PingFang SC Light" }}>{ t("Upload all Product/Service Catalogs and FAQs") }</div>
                    <div className={`mt-2`} style={{ color: "#000", opacity: 0.6, fontSize: pxToVw(10), fontFamily: "PingFang SC Light" }}>{ t("Drop PDF files here") }</div>
                </div> 
                </div>
            </div>
            
          <div className={`mt-24`}>
            <Button
              type="default"
              loading={loading}
              disabled={validate()}
              onClick={() => {
                //sample generated bot function
                setGeneratedBot("generated");
              }}
              className={`w-336 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
            >
              <div style={{ fontFamily: "PingFang SC Regular" }}>{t('Generate')}</div>
            </Button>
          </div>

        </div>

        <div>
            <div style={{ 'width': pxToVw(971), 'height': pxToVw(750), display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', }}>
                <Icon name={'generate'} style={{ 'width': pxToVw(62), 'height': pxToVw(40) }} />
                <p className="text-18 text-[#C4C4C4] mt-14" style={{ fontFamily: "PingFang SC Light" }}>{t("Let's Get Started!")}</p>
                <p className="text-12 text-[#C4C4C4] font-light mt-10" style={{ fontFamily: "PingFang SC Light", textAlign: "center", width: pxToVw(573) }}>{t("Choose the service to generate content")}</p>
            </div>
        </div>

      </div>
    }
        {/* Modals Import */}
        <ChangeNumber  t={t} changeNumber={changeNumber} toggleChangeNumber={toggleChangeNumber} oldNumber={oldNumber} 
            setOldNumber={setOldNumber} newNumber={newNumber} setNewNumber={setNewNumber} confirmNumber={confirmNumber} setConfirmNumber={setConfirmNumber} checkNumbers={checkNumbers} toggleVerifyNumber={toggleVerifyNumber} />
        <VerifyNumber t={t} verifyNumber={verifyNumber} toggleVerifyNumber={toggleVerifyNumber} code={code} setCode={setCode} newNumber={newNumber} />
    <ManageFiles t={t} manageFiles={manageFiles} toggleManageFiles={toggleManageFiles} fileInput={fileInput} handleFileInputChange={handleFileInputChange} selectedFiles={selectedFiles} deleteFile={deleteFile} />
        <QA t={t} qA={qA} toggleQA={toggleQA} qAPairs={qAPairs} setQAPairs={setQAPairs} />
        <SalesPitch t={t} openSP={sP} toggleSP={toggleSP} sPPairs={sPPairs} setSPPairs={setSPPairs} />
    </div>
  </>
}

export default Create